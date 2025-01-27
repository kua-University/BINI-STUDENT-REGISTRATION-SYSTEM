// tests/unit/components/Admin/AddTeacherForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import AddTeacherForm from '../../../src/components/Admin/AddTeacherForm';

describe('AddTeacherForm', () => {
    it('shows error if required fields are missing', () => {
        render(<AddTeacherForm />);
        const submitButton = screen.getByRole('button', { name: /add teacher/i });

        fireEvent.click(submitButton);

        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
});
