import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchPrograms from './SearchPrograms';
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
    programDescription: 'Employment program for youth',
    programTypeId: 2,
    programTypeName: 'Subsidy',
    programTypeNameFr: 'Subside',
    status: 'APPROVED',
    reviewerComments: 'Looks good',
    submittedAt: '2026-01-16T10:00:00',
    reviewedAt: '2026-01-17T09:00:00',
    createdAt: '2026-01-16T10:00:00',
    updatedAt: '2026-01-17T09:00:00',
    createdBy: 'Mary Jane',
    programBudget: null,
  },
];

describe('SearchPrograms', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (programService.getAllPrograms as ReturnType<typeof vi.fn>).mockResolvedValue(mockPrograms);
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <SearchPrograms />
      </MemoryRouter>
    );

  it('renders the search title', async () => {
    renderComponent();
    expect(screen.getByText(/search programs/i)).toBeInTheDocument();
  });

  it('loads and displays all programs', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Community Grants')).toBeInTheDocument();
      expect(screen.getByText('Youth Employment')).toBeInTheDocument();
    });
  });

  it('filters programs by search term', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Community Grants')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/search by program name/i), {
      target: { value: 'Youth' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^search$/i }));

    await waitFor(() => {
      expect(screen.queryByText('Community Grants')).not.toBeInTheDocument();
      expect(screen.getByText('Youth Employment')).toBeInTheDocument();
    });
  });

  it('clears search and shows all programs', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Community Grants')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/search by program name/i), {
      target: { value: 'Youth' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^search$/i }));

    await waitFor(() => {
      expect(screen.queryByText('Community Grants')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    await waitFor(() => {
      expect(screen.getByText('Community Grants')).toBeInTheDocument();
      expect(screen.getByText('Youth Employment')).toBeInTheDocument();
    });
  });

  it('shows no results message when no programs match', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Community Grants')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/search by program name/i), {
      target: { value: 'Nonexistent' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^search$/i }));

    await waitFor(() => {
      expect(screen.getByText(/no programs found/i)).toBeInTheDocument();
    });
  });

  it('shows error message when loading fails', async () => {
    (programService.getAllPrograms as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'));
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText(/failed to load programs/i)).toBeInTheDocument();
    });
  });

  it('has a search form with role="search" for accessibility', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByRole('search')).toBeInTheDocument();
    });
  });
});
