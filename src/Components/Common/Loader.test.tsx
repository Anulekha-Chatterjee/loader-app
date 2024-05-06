import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShimmerLoader from './Loader';

describe('ShimmerLoader component', () => {
    it('renders shimmer effect when loading', () => {
        const shimmerRows: number = 3;
        const shimmerCellsPerRow: number = 2;

        render(
            <ShimmerLoader
                loading={true}
                shimmerRows={shimmerRows}
                shimmerCellsPerRow={shimmerCellsPerRow}
            >
                <div id="parent">
                    <div>Child 1</div>
                    <div>Child 2</div>
                </div>
            </ShimmerLoader>
        );

        // Check if shimmer rows and cells are rendered
        const shimmerRowsElements = screen.getAllByTestId('shimmer-row');
        expect(shimmerRowsElements.length).toBe(shimmerRows);

        const shimmerCellElements = screen.getAllByTestId('shimmer-cell');
        expect(shimmerCellElements.length).toBe(shimmerRows * shimmerCellsPerRow);
    });

    it('renders actual content when not loading', () => {
        const content = <div>Actual Content</div>;

        render(
            <ShimmerLoader loading={false} content={content}>
                <div id="parent">
                    <div>Child 1</div>
                    <div>Child 2</div>
                </div>
            </ShimmerLoader>
        );

        // Check if actual content is rendered
        expect(screen.getByText('Actual Content')).toBeInTheDocument();
    });
});
