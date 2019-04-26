import React from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';
import Table from './Table';

const getValue = (value, sized) => (value === 'auto' ? sized : value);

const AutoSize = ({ width, height, ...props }) => (
    <AutoSizer>
        {size => {
            return (
                <Table
                    width={getValue(width, size.width)}
                    height={getValue(height, size.height)}
                    {...props}
                />
            );
        }}
    </AutoSizer>
);
AutoSize.propTypes = {
    width: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number])
};
AutoSize.defaultProps = {
    width: 'auto',
    height: 'auto'
};

export default React.memo(AutoSize);
