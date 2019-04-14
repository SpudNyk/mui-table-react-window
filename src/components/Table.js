import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

import { withStyles } from '@material-ui/core/styles';
import {
    darken,
    fade,
    lighten
} from '@material-ui/core/styles/colorManipulator';
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import useColumns from './columns/useColumns';

const styles = theme => ({
    row: {
        display: 'flex',
        boxSizing: 'border-box',
        flexWrap: 'none'
    },
    cell: {
        display: 'flex',
        boxSizing: 'border-box',
        alignItems: 'center',
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
            flex: 1,
            borderTop: `1px solid ${
                theme.palette.type === 'light'
                    ? lighten(fade(theme.palette.divider, 1), 0.88)
                    : darken(fade(theme.palette.divider, 1), 0.68)
            }`
        }
    },
    body: {}
});

const Table = ({
    classes,
    columns,
    items,
    itemCount,
    itemPlural,
    width,
    height,
    listRef,
    selectable,
    selection,
    selectAll,
    onSelect,
    onSelectAll,
    onItemsRendered
}) => {
    const [offsetHeight, setHeightOffset] = useState(0);
    const [metrics, setMetrics] = useState({});
    const headerRef = useRef(null);
    const footerRef = useRef(null);

    if (itemCount == null) {
        itemCount = items ? items.length : 0;
    }
    const selectCount = selectAll
        ? itemCount
        : selection
        ? selection.length
        : 0;

    useLayoutEffect(() => {
        let offset = 0;
        if (footerRef.current) {
            offset += footerRef.current.clientHeight;
        }
        if (headerRef.current) {
            offset += headerRef.current.clientHeight;
        }
        setHeightOffset(offset);
    });

    const handleItemsRendered = useCallback(
        metrics => {
            setMetrics(metrics);
            if (onItemsRendered) {
                onItemsRendered(metrics);
            }
        },
        [onItemsRendered, setMetrics]
    );

    const cols = useColumns(
        columns,
        width,
        selectable,
        selectCount,
        itemCount,
        onSelectAll
    );

    const getItemForIndex = useCallback(index => items[index], [items]);
    return (
        <div className={classes.table}>
            <Header
                domRef={headerRef}
                classes={classes}
                width={width}
                columns={cols}
            />
            <Body
                classes={classes}
                height={height - offsetHeight}
                width={width}
                columns={cols}
                selectable={selectable}
                selection={selection}
                selectAll={selectAll}
                onSelect={onSelect}
                onItemsRendered={handleItemsRendered}
                listRef={listRef}
                itemCount={itemCount}
                getItem={getItemForIndex}
            />
            <Footer
                classes={classes}
                domRef={footerRef}
                visibleStart={metrics.visibleStartIndex}
                visibleStop={metrics.visibleStopIndex}
                selectCount={selectCount}
                itemCount={itemCount}
                itemPlural={itemPlural}
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
