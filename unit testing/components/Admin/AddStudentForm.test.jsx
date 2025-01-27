// tests/unit/components/Admin/AddStudentForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import AddStudentForm from '../../../src/components/Admin/AddStudentForm';

describe('AddStudentForm', () => {
    it('displays error message if name is empty on submit', () => {
        render(<AddStudentForm />);
        const submitButton = screen.getByRole('button', { name: /add student/i });

        fireEvent.click(submitButton);

        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    it('calls API when all fields are valid', () => {
        const mockAddStudent = jest.fn();
        render(<AddStudentForm onSubmit={mockAddStudent} />);

        fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: '16' } });
        fireEvent.click(screen.getByRole('button', { name: /add student/i }));

        expect(mockAddStudent).toHaveBeenCalledWith({ name: 'John Doe', age: '16' });
    });
});
