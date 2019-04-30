import React from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';

const constrainValue = (value, auto, minValue, maxValue) => {
    let size = value != null ? value : auto;
    if (minValue != null) {
        size = Math.max(size, minValue);
    }
    if (maxValue != null) {
        size = Math.min(size, maxValue);
    }
    return size;
};

// Set height and width properties for a component to parents available space
// Any additional properties are passed through to the component
const AutoSize = ({
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    component,
    ...props
}) => (
    <AutoSizer>
        {size => {
            const Component = component;
            return (
                <Component
                    width={constrainValue(
                        width,
                        size.width,
                        minWidth,
                        maxWidth
                    )}
                    height={constrainValue(
                        height,
                        size.height,
                        minHeight,
                        maxHeight
                    )}
                    {...props}
                />
            );
        }}
    </AutoSizer>
);
AutoSize.propTypes = {
    // The component to set width and height to
    component: PropTypes.elementType,
    // If provided this overrides the calculated width
    width: PropTypes.number,
    // If provided this overrides the calculated height
    height: PropTypes.number,
    // Set a minimum width that will be provided to the component
    minWidth: PropTypes.number,
    // Set a minimum height that will be provided to the component
    minHeight: PropTypes.number,
    // Set a maximum width that will be provided to the component
    maxWidth: PropTypes.number,
    // Set a maximum height that will be provided to the component
    maxHeight: PropTypes.number
};

export default React.memo(AutoSize);
