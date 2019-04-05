import React, { useMemo, useState, useRef, useLayoutEffect } from 'react';
import classnames from 'classnames';
import AutoSizer from 'react-virtualized-auto-sizer';
import TableCell from '@material-ui/core/TableCell';
import { VariableSizeList as List, areEqual } from 'react-window';

import { withStyles } from '@material-ui/core/styles';

const Content = ({ data, column, row, columnIndex, rowIndex }) => {
    return String(data);
};

const Row = React.memo(({ index, style, data }) => {
    const { columns, items, classes } = data;
    const row = items[index];
    return (
        <div
            className={classnames(classes.row, classes.container)}
            style={style}
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
                    >
                        <Item
                            data={row[column.key]}
                            column={column}
                            row={row}
                            columnIndex={columnIndex}
                            rowIndex={index}
                        />
                    </TableCell>
                );
            })}
        </div>
    );
}, areEqual);

const styles = theme => ({
    row: {
        display: 'flex',
        boxSizing: 'border-box',
        flexWrap: 'none'
    },
    cell: {
        overflow: 'hidden'
    },
    table: {
        fontFamily: theme.typography.fontFamily
    },
    header: {
        '& $cell': {
            fontWeight: 800
        }
    },
    body: {}
});

const Header = ({ classes, columns, width, domRef }) => {
    console.log(columns);
    return (
        <div
            className={classnames(classes.header, classes.row)}
            ref={domRef}
            style={{ width: width }}
        >
            {columns.map((column, columnIndex) => {
                console.log(column);
                console.log(`${columnIndex}`);
                return (
                    <TableCell
                        component="div"
                        className={classnames(classes.cell)}
                        variant="head"
                        key={columnIndex}
                        style={getColumnStyle(column)}
                    >
                        {column.label}
                    </TableCell>
                );
            })}
        </div>
    );
};
const getColumnStyle = column => {
    const { flex, width } = column;
    if (!width) {
        return { flex: flex || 1 };
    } else {
        return { minWidth: width, maxWidth: width };
    }
};

const getColumnConfig = column => {
    return {
        ...column,
        component: column.component || Content,
        style: getColumnStyle(column)
    };
};

const Table = ({ classes, columns, data, width, height }) => {
    const [headerHeight, setHeaderHeight] = useState(56);
    const headerRef = useRef(null);
    useLayoutEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(0);
        }
        setHeaderHeight(headerRef.current.clientHeight);
    });
    const cols = useMemo(() => columns.map(getColumnConfig), [columns]);
    return (
        <div className={classes.table}>
            <Header
                domRef={headerRef}
                classes={classes}
                width={width}
                columns={cols}
            />
            <div className={classes.body}>
                <List
                    className={classes.grid}
                    height={height - headerHeight}
                    itemCount={1000}
                    itemSize={() => 56}
                    itemData={{ classes, columns: cols, items: data }}
                    width={width}
                >
                    {Row}
                </List>
            </div>
        </div>
    );
};

const AutoSizedTable = props => (
    <AutoSizer>
        {({ width, height }) => {
            return <Table width={width - 2} height={height - 4} {...props} />;
        }}
    </AutoSizer>
);

export default withStyles(styles)(AutoSizedTable);
