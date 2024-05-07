import React from 'react';
import { render } from '@testing-library/react';
import Users from './Users';

jest.mock('../../Hooks/useDataFetching');

describe('Users Component', () => {
  test('renders loading state correctly', () => {
    // Mock the useDataFetching hook to return loading state
    const mockDataFetching = jest.requireMock('../../Hooks/useDataFetching');
    mockDataFetching.useDataFetching.mockReturnValue({ loading: true, data: null });

    const { getAllByTestId } = render(<Users />);
    const shimmerLoader = getAllByTestId('shimmer-row')[0];

    expect(shimmerLoader).toBeInTheDocument();
  });

  test('renders data correctly', () => {
    const mockData = {
      users: [
        { id: 1, firstName: 'John', lastName: 'Doe', age: 30, gender: 'Male', email: 'john@example.com', phone: '1234567890' },
        { id: 2, firstName: 'Jane', lastName: 'Doe', age: 25, gender: 'Female', email: 'jane@example.com', phone: '0987654321' }
      ]
    };

    // Mock the useDataFetching hook to return data
    const mockDataFetching = jest.requireMock('../../Hooks/useDataFetching');
    mockDataFetching.useDataFetching.mockReturnValue({ loading: false, data: mockData });

    const { getByText } = render(<Users />);
    const userJohn = getByText('John Doe');
    const userJane = getByText('Jane Doe');

    expect(userJohn).toBeInTheDocument();
    expect(userJane).toBeInTheDocument();
  });
});
