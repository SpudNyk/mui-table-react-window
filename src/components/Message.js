import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableCell from '@material-ui/core/TableCell';

const Message = ({ classes, align, width, domRef, children }) => (
    <div
        className={classnames(classes.message, classes.row)}
        ref={domRef}
        style={{ width: width }}
    >
        <TableCell
            component="div"
            className={classnames(classes.cell, {
                [classes.center]: align === 'center'
            })}
            variant="body"
            align={align}
        >
            {children}
        </TableCell>
    </div>
);
Message.propTypes = {
    classes: PropTypes.object,
    align: PropTypes.oneOf(['left', 'center', 'right', 'justify', 'inherit']),
    width: PropTypes.number,
    domRef: PropTypes.any,
    children: PropTypes.node
};
export default React.memo(Message);
