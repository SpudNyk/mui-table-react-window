import React, {
    useMemo,
    useState,
    useRef,
    useLayoutEffect,
    useCallback
} from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

import { VariableSizeList as List } from 'react-window';

import { withStyles } from '@material-ui/core/styles';
import Row from './Row';
import Header from './Header';
import Footer from './Footer';

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
    footer: {
        '& $cell': {
            flex: 1
        }
    },
    body: {}
});

export const getColumnStyle = column => {
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
    minHeight,
    width,
    height,
    selectable,
    selection,
    selectAll,
    onSelect,
    onSelectAll,
    onItemsRendered
}) => {
    const [offsetHeight, setHeightOffset] = useState(0);
    const [visibleIndexes, setVisibleIndexes] = useState({ start: 0, stop: 0 });
    const headerRef = useRef(null);
    const footerRef = useRef(null);
    useLayoutEffect(() => {
        let offset = 0
        if (footerRef.current) {
            offset += footerRef.current.clientHeight;
        }
        if (headerRef.current) {
            offset += headerRef.current.clientHeight;
        }
        setHeightOffset(offset);
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

    const handleItemsRendered = useCallback(
        metrics => {
            const { visibleStartIndex, visibleStopIndex } = metrics;
            setVisibleIndexes({
                start: visibleStartIndex,
                stop: visibleStopIndex
            });
            if (onItemsRendered) {
                onItemsRendered(metrics);
            }
        },
        [onItemsRendered]
    );
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
                    height={height - offsetHeight}
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
                    onItemsRendered={handleItemsRendered}
                >
                    {Row}
                </List>
            </div>
            <Footer
                classes={classes}
                domRef={footerRef}
                selectCount={selectCount}
                visibleStart={visibleIndexes.start}
                visibleStop={visibleIndexes.stop}
                itemCount={itemCount}
                width={width}
            />
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
