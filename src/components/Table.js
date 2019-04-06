import React, { useMemo, useState, useRef, useLayoutEffect } from 'react';
import classnames from 'classnames';
import AutoSizer from 'react-virtualized-auto-sizer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

import { VariableSizeList as List, areEqual } from 'react-window';

import { withStyles } from '@material-ui/core/styles';

const SmallCheckbox = withStyles({
    root: {
        padding: 0
    }
})(props => (
    <Checkbox
        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
        checkedIcon={<CheckBoxIcon fontSize="small" />}
        indeterminateIcon={<IndeterminateCheckBoxIcon fontSize="small" />}
        {...props}
    />
));

const Content = ({ value }) => {
    return String(value);
};

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
        <TableRow component="div"
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

const styles = theme => ({
    row: {
        display: 'flex',
        boxSizing: 'border-box',
        flexWrap: 'none'
    },
    cell: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
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
                        style={getColumnStyle(column)}
                        align={column.align}
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
        isSelect: false,
        ...column,
        component: column.component || Content,
        style: getColumnStyle(column)
    };
};

const SelectCell = ({ item, selected, onSelect }) => (
    <SmallCheckbox
        checked={selected}
        onChange={event => onSelect && onSelect(item, event.target.checked)}
    />
);

const selectColumn = (selectCount, itemCount, onSelectAll) => {
    return {
        label: (
            <SmallCheckbox
                indeterminate={selectCount > 0 && selectCount < itemCount}
                checked={selectCount === itemCount}
                onChange={event =>
                    onSelectAll && onSelectAll(event.target.checked)
                }
            />
        ),
        isSelector: true,
        component: SelectCell,
        align: 'center',
        width: 50
    };
};

const Table = ({
    classes,
    columns,
    data,
    width,
    height,
    selectable,
    selection,
    selectAll,
    onSelect,
    onSelectAll
}) => {
    const [headerHeight, setHeaderHeight] = useState(56);
    const headerRef = useRef(null);
    useLayoutEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(0);
        }
        setHeaderHeight(headerRef.current.clientHeight);
    });

    const itemCount = data.length;
    const selectCount = selectable
        ? selectAll
            ? itemCount
            : selection.length
        : 0;

    const cols = useMemo(() => {
        if (selectable) {
            return [selectColumn(selectCount, itemCount, onSelectAll)]
                .concat(columns)
                .map(getColumnConfig);
        }
        return columns.map(getColumnConfig);
    }, [columns, selectable, selectCount, itemCount, onSelectAll]);
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
                    itemCount={itemCount}
                    itemSize={() => 30}
                    itemData={{
                        classes,
                        columns: cols,
                        items: data,
                        selectable,
                        selection,
                        selectAll,
                        onSelect
                    }}
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
            return <Table width={width} height={height} {...props} />;
        }}
    </AutoSizer>
);

export default withStyles(styles)(AutoSizedTable);
