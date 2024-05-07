import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Products from './Products';
import { useDataFetching } from '../../Hooks/useDataFetching';

jest.mock('../../Hooks/useDataFetching');

describe('Products Component', () => {
    test('renders loading state correctly', async () => {
        // Mock the useDataFetching hook to return loading state
        (useDataFetching as jest.Mock).mockReturnValue({ loading: true, data: null });

        const { getAllByTestId } = render(<Products />);
        const shimmerLoader = getAllByTestId('shimmer-row')[0];

        // Check if the shimmer loader is rendered
        expect(shimmerLoader).toBeInTheDocument();
    });

    test('renders data correctly', async () => {
        const mockData = {
            products: [
                { id: 1, title: 'Product 1', description: 'Description 1', images: ['image1.jpg'] },
                { id: 2, title: 'Product 2', description: 'Description 2', images: ['image2.jpg'] }
            ]
        };

        // Mock the useDataFetching hook to return data
        (useDataFetching as jest.Mock).mockReturnValue({ loading: false, data: mockData });

        const { getByText } = render(<Products />);
        const product1Title = getByText('Product 1');
        const product2Title = getByText('Product 2');

        // Check if the product titles are rendered
        expect(product1Title).toBeInTheDocument();
        expect(product2Title).toBeInTheDocument();
    });
});
