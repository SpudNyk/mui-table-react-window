import React from 'react';
import classnames from 'classnames';
import TableCell from '@material-ui/core/TableCell';

const Footer = ({
    classes,
    width,
    domRef,
    visibleStart,
    visibleStop,
    selectCount,
    itemCount,
    itemPlural = 'Items',
    align = 'right'
}) => {
    return (
        <div
            className={classnames(classes.footer, classes.row)}
            ref={domRef}
            style={{ width: width, height: 56 }}
        >
            <TableCell
                component="div"
                className={classnames(classes.cell)}
                variant="footer"
                align={align}
            >
                Viewing {visibleStart + 1} to {visibleStop + 1} of {itemCount}{' '}
                {itemPlural}
                {selectCount.length > 0 ? ` (${selectCount} selected)` : ''}
            </TableCell>
        </div>
    );
};

export default React.memo(Footer);
