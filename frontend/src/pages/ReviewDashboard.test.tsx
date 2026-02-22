import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ReviewDashboard from './ReviewDashboard';
import { programService } from '../services/programService';

vi.mock('../services/programService', () => ({
  programService: {
    getAllPrograms: vi.fn(),
  },
}));

const mockPrograms = [
  {
    id: 1,
    programName: 'Community Grants',
    programDescription: 'Grants for communities',
    programTypeId: 1,
    programTypeName: 'Grant',
    programTypeNameFr: 'Subvention',
    status: 'SUBMITTED',
    reviewerComments: null,
    submittedAt: '2026-01-15T14:30:00',
    reviewedAt: null,
    createdAt: '2026-01-15T14:30:00',
    updatedAt: '2026-01-15T14:30:00',
    createdBy: 'John Smith',
    programBudget: null,
  },
  {
    id: 2,
    programName: 'Youth Employment',
    programDescription: 'Employment for youth',
    programTypeId: 2,
    programTypeName: 'Subsidy',
    programTypeNameFr: 'Subside',
    status: 'APPROVED',
    reviewerComments: 'Approved',
    submittedAt: '2026-01-16T10:00:00',
    reviewedAt: '2026-01-17T09:00:00',
    createdAt: '2026-01-16T10:00:00',
    updatedAt: '2026-01-17T09:00:00',
    createdBy: 'Mary Jane',
    programBudget: null,
  },
];

describe('ReviewDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (programService.getAllPrograms as ReturnType<typeof vi.fn>).mockResolvedValue(mockPrograms);
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ReviewDashboard />
      </MemoryRouter>
    );

  it('renders the review dashboard title', async () => {
    renderComponent();
    expect(screen.getByText(/review dashboard/i)).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    renderComponent();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays programs in a table after loading', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Community Grants')).toBeInTheDocument();
      expect(screen.getByText('Youth Employment')).toBeInTheDocument();
    });
  });

  it('renders review links for each program', async () => {
    renderComponent();
    await waitFor(() => {
      const reviewLinks = screen.getAllByRole('link', { name: /review/i });
      expect(reviewLinks.length).toBe(2);
      expect(reviewLinks[0]).toHaveAttribute('href', '/review/1');
      expect(reviewLinks[1]).toHaveAttribute('href', '/review/2');
    });
  });

  it('displays status badges', async () => {
    renderComponent();
    await waitFor(() => {
      const badges = document.querySelectorAll('[class*="ontario-badge"]');
      expect(badges.length).toBe(2);
      expect(badges[0].textContent).toBe('Submitted');
      expect(badges[1].textContent).toBe('Approved');
    });
  });

  it('shows error message when loading fails', async () => {
    (programService.getAllPrograms as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Error'));
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText(/failed to load programs/i)).toBeInTheDocument();
    });
  });

  it('shows no programs message when list is empty', async () => {
    (programService.getAllPrograms as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText(/no programs have been submitted/i)).toBeInTheDocument();
    });
  });

  it('has an accessible table with aria-label', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByRole('table')).toHaveAttribute('aria-label');
    });
  });
});
