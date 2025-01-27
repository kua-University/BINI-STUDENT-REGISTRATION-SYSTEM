// tests/unit/components/AdminSignIn.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminSignIn from '../../../src/components/Admin/AdminSignIn';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('AdminSignIn Component', () => {
  
  beforeEach(() => {
    // Clear mock calls before each test
    axios.post.mockClear();
  });

  it('renders the sign-in form correctly', () => {
    render(<AdminSignIn />);
    
    // Check that form elements are rendered
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('submits the form and calls axios.post with correct data on successful sign-in', async () => {
    // Mock a successful response from axios
    axios.post.mockResolvedValue({ status: 200 });

    render(<AdminSignIn />);
    
    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Wait for axios call to resolve
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/api/v1/users/signin', {
      email: 'admin@example.com',
      password: 'password123',
    }));

    // Ensure the redirection occurs on success (in a real test environment, we would mock window.location.href)
    expect(window.location.href).toBe('/admin/dashboard');
  });

  it('shows an error message if sign-in fails', async () => {
    // Mock a failed response from axios
    axios.post.mockRejectedValue(new Error('Sign-in failed'));

    render(<AdminSignIn />);
    
    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrongpassword' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Wait for error logging
    await waitFor(() => expect(axios.post).toHaveBeenCalled());

    // Test that the error message is logged in the console
    expect(console.error).toHaveBeenCalledWith('Error during sign-in:', expect.any(Error));
  });

});
