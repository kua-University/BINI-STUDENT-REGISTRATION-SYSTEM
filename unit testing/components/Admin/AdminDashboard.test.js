// tests/unit/components/Admin/AdminDashboard.test.js
import { render, screen } from '@testing-library/react';
import AdminDashboard from '../../../src/components/Admin/AdminDashboard';

describe('AdminDashboard', () => {
    it('displays performance metrics', () => {
        const mockMetrics = { totalStudents: 100, totalTeachers: 10, passRate: 95 };
        render(<AdminDashboard metrics={mockMetrics} />);

        expect(screen.getByText(/total students: 100/i)).toBeInTheDocument();
        expect(screen.getByText(/pass rate: 95%/i)).toBeInTheDocument();
    });
});
