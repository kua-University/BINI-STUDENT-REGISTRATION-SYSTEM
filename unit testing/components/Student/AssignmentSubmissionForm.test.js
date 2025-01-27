// tests/unit/components/Student/AssignmentSubmissionForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import AssignmentSubmissionForm from '../../../src/components/Student/AssignmentSubmissionForm';

describe('AssignmentSubmissionForm', () => {
    it('displays a success message on successful submission', async () => {
        render(<AssignmentSubmissionForm />);
        fireEvent.change(screen.getByPlaceholderText(/assignment title/i), {
            target: { value: 'Math Homework' },
        });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(await screen.findByText(/submission successful/i)).toBeInTheDocument();
    });
});
