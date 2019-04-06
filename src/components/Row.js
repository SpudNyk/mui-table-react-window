import React from 'react';
import classnames from 'classnames';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { areEqual } from 'react-window';

const styles = {
    
}

const Row = React.memo(({ index, style, data }) => {
    const {
        columns,
        items,
        classes,
        selectable,
        selectAll,
        selection,
        onSelect
    } = data;
    const item = items[index];
    const selected =
        selectable && (selectAll || selection.indexOf(item) !== -1);
    return (
        <TableRow
            component="div"
            className={classnames(classes.row, classes.container)}
            style={style}
            selected={selected}
            hover
        >
            {columns.map((column, columnIndex) => {
                const Item = column.component;
                return (
                    <TableCell
                        component="div"
                        className={classnames(classes.cell)}
                        variant="body"
                        key={columnIndex}
                        style={column.style}
                        align={column.align}
                    >
                        <Item
                            value={item[column.key]}
                            item={item}
                            index={index}
                            column={column}
                            columnIndex={columnIndex}
                            selected={selected}
                            selectable={selectable}
                            onSelect={onSelect}
                        />
                    </TableCell>
                );
            })}
        </TableRow>
    );
}, areEqual);
export default Row;