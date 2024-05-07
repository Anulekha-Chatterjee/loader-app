import React from 'react';
import './Loader.css'


const ShimmerLoader = ({ loading, shimmerRows, content, children }: any) => {
    const renderShimmer = () => {
        const shimmerRowsArray = [];

        for (let rowIndex = 0; rowIndex < shimmerRows; rowIndex++) {
            const shimmerCellsArray: any = [];

            React.Children.forEach(children, (child, index) => {
                const shimmerChild = addClassNameToChild(child, 'shimmer shimmer-cell', index);
                shimmerCellsArray.push(
                    shimmerChild
                );
            });


            shimmerRowsArray.push(
                <div key={rowIndex} className="shimmer-row">
                    {shimmerCellsArray}
                </div>
            );
        }

        return shimmerRowsArray;
    };

    //This method is to add the classname to each cell of a shimmer row in order to denote each row of data separately as a shimmer 
    const addClassNameToChild = (child: any, className: string, index: number): any => {
        if (React.isValidElement(child)) {
            const childWithProps = child as React.ReactElement<any, string | React.JSXElementConstructor<any>>;
            const isParent = childWithProps.type === 'div' && childWithProps.props.id === 'parent';

            const additionalClass = isParent ? '' : className;
            return React.cloneElement(childWithProps, {
                className: additionalClass,
                children: React.Children.map(childWithProps.props.children, (child: any) => addClassNameToChild(child, className, index)),
            });
        } else {
            return child;
        }
    };

    return (
        <div className="loader-container">
            {loading ? renderShimmer() : content}
        </div>
    );
};

export default ShimmerLoader;
