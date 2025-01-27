// tests/integration/AdminDashboard.test.js
import axios from 'axios';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard from '../../../src/components/Admin/AdminDashboard';

jest.mock('axios');

describe('AdminDashboard Integration', () => {
    it('submits new student data to the API', async () => {
        // Mock API response
        axios.post.mockResolvedValue({ data: { message: 'Student added successfully' } });

        // Render component
        render(<AdminDashboard />);

        // Fire events to simulate user input
        fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: '16' } });
        fireEvent.click(screen.getByRole('button', { name: /add student/i }));

        // Wait for API response and check the success message
        await waitFor(() => screen.getByText(/student added successfully/i));

        expect(screen.getByText(/student added successfully/i)).toBeInTheDocument();
    });
});
