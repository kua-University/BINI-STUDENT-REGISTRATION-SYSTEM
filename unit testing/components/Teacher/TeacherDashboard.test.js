// tests/unit/components/Teacher/TeacherDashboard.test.js
import { render, screen } from '@testing-library/react';
import TeacherDashboard from '../../../src/components/Teacher/TeacherDashboard';

describe('TeacherDashboard', () => {
    it('renders a list of assignments', () => {
        const mockAssignments = [
            { id: 1, title: 'Math Homework' },
            { id: 2, title: 'Science Project' },
        ];
        render(<TeacherDashboard assignments={mockAssignments} />);

        expect(screen.getByText(/math homework/i)).toBeInTheDocument();
        expect(screen.getByText(/science project/i)).toBeInTheDocument();
    });
});
