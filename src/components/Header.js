import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableCell from '@material-ui/core/TableCell';

const Header = ({ classes, columns, width, domRef }) => {
    return (
        <div
            className={classnames(classes.header, classes.row)}
            ref={domRef}
            style={{ width: width }}
        >
            {columns.map((column, columnIndex) => {
                return (
                    <TableCell
                        component="div"
                        className={classnames(classes.cell)}
                        variant="head"
                        key={columnIndex}
                        style={column.style}
                        align={column.align}
                    >
                        {column.label}
                    </TableCell>
                );
            })}
        </div>
    );
};
Header.propTypes = {
    classes: PropTypes.object,
    align: PropTypes.oneOf(['left', 'center', 'right', 'justify', 'inherit']),
    width: PropTypes.number,
    domRef: PropTypes.any
};
export default React.memo(Header);
