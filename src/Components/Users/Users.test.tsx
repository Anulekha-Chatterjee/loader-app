import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Users from './Users';

const mockFetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ users: [{ id: 1, firstName: 'John', lastName: 'Doe', age: 30, gender: 'Male', email: 'john@example.com', phone: '1234567890' }] }),
    })
);

(global as any).fetch = mockFetch;

describe('Users component', () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });

    xit('renders content correctly after loading', async () => {
        const { getByText, findByText } = render(<Users />);
        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1)); // Wait for fetch to be called
        expect(getByText('John Doe')).toBeInTheDocument();
        expect(getByText('Age: 30')).toBeInTheDocument();
        expect(getByText('Gender: Male')).toBeInTheDocument();
        expect(getByText('Email: john@example.com')).toBeInTheDocument();
        expect(getByText('Phone: 1234567890')).toBeInTheDocument();
    });
});
