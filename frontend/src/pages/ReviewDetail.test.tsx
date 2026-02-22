import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ReviewDetail from './ReviewDetail';
import { programService } from '../services/programService';

vi.mock('../services/programService', () => ({
  programService: {
    getProgramById: vi.fn(),
    reviewProgram: vi.fn(),
  },
}));

const mockProgram = {
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
};

describe('ReviewDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (programService.getProgramById as ReturnType<typeof vi.fn>).mockResolvedValue(mockProgram);
  });

  const renderComponent = () =>
    render(
      <MemoryRouter initialEntries={['/review/1']}>
        <Routes>
          <Route path="/review/:id" element={<ReviewDetail />} />
        </Routes>
      </MemoryRouter>
    );

  it('renders the review detail title', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText(/review program/i)).toBeInTheDocument();
    });
  });

  it('loads and displays program details', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Community Grants')).toBeInTheDocument();
      expect(screen.getByText('Grants for communities')).toBeInTheDocument();
      expect(screen.getByText('Grant')).toBeInTheDocument();
      expect(screen.getByText('John Smith')).toBeInTheDocument();
    });
  });

  it('renders approve and reject buttons for submitted programs', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /approve/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /reject/i })).toBeInTheDocument();
    });
  });

  it('renders a comments textarea', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByLabelText(/reviewer comments/i)).toBeInTheDocument();
    });
  });

  it('approves a program successfully', async () => {
    const approvedProgram = { ...mockProgram, status: 'APPROVED', reviewedAt: '2026-01-17T09:00:00' };
    (programService.reviewProgram as ReturnType<typeof vi.fn>).mockResolvedValue(approvedProgram);

    renderComponent();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /approve/i })).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/reviewer comments/i), {
      target: { value: 'Looks good' },
    });
    fireEvent.click(screen.getByRole('button', { name: /approve/i }));

    await waitFor(() => {
      expect(programService.reviewProgram).toHaveBeenCalledWith(1, {
        status: 'APPROVED',
        reviewerComments: 'Looks good',
      });
      expect(screen.getByText(/program has been approved/i)).toBeInTheDocument();
    });
  });

  it('rejects a program successfully', async () => {
    const rejectedProgram = { ...mockProgram, status: 'REJECTED', reviewedAt: '2026-01-17T09:00:00' };
    (programService.reviewProgram as ReturnType<typeof vi.fn>).mockResolvedValue(rejectedProgram);

    renderComponent();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /reject/i })).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/reviewer comments/i), {
      target: { value: 'Does not meet criteria' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reject/i }));

    await waitFor(() => {
      expect(programService.reviewProgram).toHaveBeenCalledWith(1, {
        status: 'REJECTED',
        reviewerComments: 'Does not meet criteria',
      });
      expect(screen.getByText(/program has been rejected/i)).toBeInTheDocument();
    });
  });

  it('shows error message when program not found', async () => {
    (programService.getProgramById as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Not found'));
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText(/program not found/i)).toBeInTheDocument();
    });
  });

  it('has an accessible review form with aria-label', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByRole('form', { name: /program review form/i })).toBeInTheDocument();
    });
  });
});
