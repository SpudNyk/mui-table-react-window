import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { areEqual } from 'react-window';

const Row = ({ index, style, data }) => {
    const { columns, classes, getItem, isItemSelected } = data;
    const item = getItem(index);
    const itemSelected = isItemSelected(item, index);
    return (
        <TableRow
            component="div"
            className={classnames(classes.row, classes.container)}
            style={style}
            selected={itemSelected}
            hover
        >
            {columns.map((column, columnIndex) => {
                const Content = column.component;
                const content = (
                    <Content
                        value={item[column.key]}
                        item={item}
                        index={index}
                        column={column}
                        columnIndex={columnIndex}
                        itemSelected={itemSelected}
                    />
                );
                return (
                    <TableCell
                        component="div"
                        className={classnames(classes.cell)}
                        variant="body"
                        key={columnIndex}
                        style={column.style}
                        align={column.align}
                    >
                        {column.rawContent === true ? (
                            content
                        ) : (
                            <div className={classes.content}>{content}</div>
                        )}
                    </TableCell>
                );
            })}
        </TableRow>
    );
};
Row.propTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
    data: PropTypes.object
};
export default React.memo(Row, areEqual);
