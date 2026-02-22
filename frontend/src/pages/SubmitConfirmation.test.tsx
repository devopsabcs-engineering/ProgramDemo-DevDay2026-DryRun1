import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import SubmitConfirmation from './SubmitConfirmation';

const mockProgram = {
  id: 1,
  programName: 'Test Program',
  programDescription: 'A test program description',
  programTypeId: 1,
  programTypeName: 'Grant',
  programTypeNameFr: 'Subvention',
  status: 'SUBMITTED',
  reviewerComments: null,
  submittedAt: '2026-01-15T14:30:00',
  reviewedAt: null,
  createdAt: '2026-01-15T14:30:00',
  updatedAt: '2026-01-15T14:30:00',
  createdBy: 'Jane Doe',
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({
      state: { program: mockProgram },
      pathname: '/submit/confirmation',
      search: '',
      hash: '',
      key: 'default',
    }),
  };
});

describe('SubmitConfirmation', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <SubmitConfirmation />
      </MemoryRouter>
    );

  it('renders the confirmation title', () => {
    renderComponent();
    expect(screen.getByText(/program request submitted/i)).toBeInTheDocument();
  });

  it('displays the success alert', () => {
    renderComponent();
    expect(
      screen.getByText(/your program request has been submitted successfully/i)
    ).toBeInTheDocument();
  });

  it('shows program details table', () => {
    renderComponent();
    expect(screen.getByText('Test Program')).toBeInTheDocument();
    expect(screen.getByText('Grant')).toBeInTheDocument();
    expect(screen.getByText('Submitted')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('renders the submit another link', () => {
    renderComponent();
    expect(screen.getByRole('link', { name: /submit another request/i })).toBeInTheDocument();
  });

  it('has a success alert with role="status" for accessibility', () => {
    renderComponent();
    const alert = screen.getByRole('status');
    expect(alert).toBeInTheDocument();
  });
});
