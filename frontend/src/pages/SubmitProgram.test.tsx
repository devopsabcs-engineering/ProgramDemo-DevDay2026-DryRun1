import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SubmitProgram from './SubmitProgram';
import { programService } from '../services/programService';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('../services/programService', () => ({
  programService: {
    getProgramTypes: vi.fn(),
    submitProgram: vi.fn(),
  },
}));

const mockProgramTypes = [
  { id: 1, typeName: 'Grant', typeNameFr: 'Subvention' },
  { id: 2, typeName: 'Loan', typeNameFr: 'Prêt' },
];

describe('SubmitProgram', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (programService.getProgramTypes as ReturnType<typeof vi.fn>).mockResolvedValue(mockProgramTypes);
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <SubmitProgram />
      </MemoryRouter>
    );

  it('renders the form with all required fields', async () => {
    renderComponent();
    expect(screen.getByLabelText(/program name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/program description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/program type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit request/i })).toBeInTheDocument();
  });

  it('loads program types on mount', async () => {
    renderComponent();
    await waitFor(() => {
      expect(programService.getProgramTypes).toHaveBeenCalledOnce();
    });
    expect(screen.getByText('Grant')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /submit request/i }));
    await waitFor(() => {
      expect(screen.getByText(/program name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/program description is required/i)).toBeInTheDocument();
      expect(screen.getByText(/program type is required/i)).toBeInTheDocument();
      expect(screen.getByText(/your name is required/i)).toBeInTheDocument();
    });
  });

  it('submits successfully and navigates to confirmation', async () => {
    const mockResponse = {
      id: 1,
      programName: 'Test Program',
      programDescription: 'A test program',
      programTypeId: 1,
      programTypeName: 'Grant',
      programTypeNameFr: 'Subvention',
      status: 'SUBMITTED',
      reviewerComments: null,
      submittedAt: '2026-01-01T12:00:00',
      reviewedAt: null,
      createdAt: '2026-01-01T12:00:00',
      updatedAt: '2026-01-01T12:00:00',
      createdBy: 'Jane Doe',
      programBudget: null,
    };
    (programService.submitProgram as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Grant')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/program name/i), { target: { value: 'Test Program' } });
    fireEvent.change(screen.getByLabelText(/program description/i), { target: { value: 'A test program' } });
    fireEvent.change(screen.getByLabelText(/program type/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Jane Doe' } });

    fireEvent.click(screen.getByRole('button', { name: /submit request/i }));

    await waitFor(() => {
      expect(programService.submitProgram).toHaveBeenCalledWith({
        programName: 'Test Program',
        programDescription: 'A test program',
        programTypeId: 1,
        createdBy: 'Jane Doe',
        programBudget: null,
      });
      expect(mockNavigate).toHaveBeenCalledWith('/submit/confirmation', {
        state: { program: mockResponse },
      });
    });
  });

  it('sets aria-invalid on fields with validation errors', async () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /submit request/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/program name/i)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/program description/i)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/program type/i)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('marks all required fields with aria-required', () => {
    renderComponent();
    expect(screen.getByLabelText(/program name/i)).toHaveAttribute('aria-required', 'true');
    expect(screen.getByLabelText(/program description/i)).toHaveAttribute('aria-required', 'true');
    expect(screen.getByLabelText(/program type/i)).toHaveAttribute('aria-required', 'true');
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-required', 'true');
  });
});
