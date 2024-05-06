import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Products from './Products';

const mockFetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ products: [{ id: 1, title: 'Product 1', description: 'Description 1', images: ['image1.jpg'] }] }),
    })
);

(global as any).fetch = mockFetch;

describe('Products component', () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });

    xit('renders content correctly after loading', async () => {
        const { rerender } = render(<Products />);

        // Wait for fetch to be called
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1);
        }, { timeout: 5000 });
        rerender(<Products />);
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Description 1')).toBeInTheDocument();
    });
});
