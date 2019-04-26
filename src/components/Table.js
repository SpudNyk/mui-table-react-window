import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
    darken,
    fade,
    lighten
} from '@material-ui/core/styles/colorManipulator';
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import useColumns from './columns/useColumns';
import columnPropType from './columns/propType';
import Message from './Message';

const defaultRowHeight = 56;
const themeRowHeight = theme =>
    theme && theme.windowTable && theme.windowTable.rowHeight
        ? theme.windowTable.rowHeight
        : defaultRowHeight;

const useStyles = makeStyles(theme => ({
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
    message: {
        '&$row': {
            minHeight: themeRowHeight(theme)
        },
        '& $cell': {
            display: 'inline-block',
            flex: 1
        }
    },
    header: {
        '& $cell': {
            fontWeight: 800
        }
    },
    footer: {
        '&$row': {
            minHeight: themeRowHeight(theme)
        },
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
}));

const useItemHeightCallback = (callback, minHeight) => {
    const cb = callback
        ? index => Math.max(callback(index), minHeight)
        : () => minHeight;
    return useCallback(cb, [callback, minHeight]);
};

const useItemCallback = (callback, items) =>
    useCallback(callback ? callback : index => items[index], [callback, items]);

const Table = ({
    classes,
    columns,
    items,
    itemCount,
    itemPlural,
    getItem,
    getItemHeight,
    width,
    height,
    listRef,
    message,
    messageAlign,
    selectable,
    selection,
    selectAll,
    onSelect,
    onSelectAll,
    onItemsRendered
}) => {
    const theme = useTheme();
    const rowHeight = themeRowHeight(theme);
    classes = useStyles({ classes });
    const [offsetHeight, setHeightOffset] = useState(0);
    const [metrics, setMetrics] = useState({});
    const headerRef = useRef(null);
    const footerRef = useRef(null);
    const messageRef = useRef(null);
    if (itemCount == null) {
        itemCount = items ? items.length : 0;
    }
    const selectCount = selectAll
        ? itemCount
        : selection
        ? selection.length
        : 0;

    // calculate on every render in case heights have changed
    // setHeightOffset will protect against rerenders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        let offset = 0;
        if (footerRef.current) {
            offset += footerRef.current.clientHeight;
        }
        if (message && messageRef.current) {
            offset += messageRef.current.clientHeight;
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

    const getItemHeightForIndex = useItemHeightCallback(
        getItemHeight,
        rowHeight
    );

    const getItemForIndex = useItemCallback(getItem, items);
    return (
        <div className={classes.table}>
            <Header
                domRef={headerRef}
                classes={classes}
                width={width}
                columns={cols}
            />
            {message ? (
                <Message
                    classes={classes}
                    width={width}
                    domRef={messageRef}
                    align={messageAlign}
                >
                    {message}
                </Message>
            ) : (
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
                    getItemHeight={getItemHeightForIndex}
                />
            )}
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
Table.propTypes = {
    classes: PropTypes.object,
    columns: PropTypes.arrayOf(columnPropType),
    message: PropTypes.node,
    messageAlign: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    items: PropTypes.array,
    itemCount: PropTypes.number,
    itemPlural: PropTypes.string,
    getItem: PropTypes.func,
    getItemHeight: PropTypes.func,
    listRef: PropTypes.any,
    selectable: PropTypes.bool,
    selection: PropTypes.array,
    selectAll: PropTypes.bool,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onItemsRendered: PropTypes.func
};

export default Table;
