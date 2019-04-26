import React from 'react';
import PropTypes from 'prop-types';
import { VariableSizeList as List } from 'react-window';
import Row from './Row';

function Body({
    classes,
    width,
    height,
    listRef,
    columns,
    itemCount,
    overscanCount,
    selectable,
    selection,
    selectAll,
    getItem,
    getItemHeight,
    onItemsRendered,
    onSelect
}) {
    return (
        <div className={classes.body}>
            <List
                className={classes.grid}
                height={height}
                itemCount={itemCount}
                itemSize={getItemHeight}
                itemData={{
                    classes,
                    columns,
                    selectable,
                    selection,
                    selectAll,
                    onSelect,
                    getItem
                }}
                width={width}
                onItemsRendered={onItemsRendered}
                overscanCount={overscanCount}
                ref={listRef}
            >
                {Row}
            </List>
        </div>
    );
}
Body.propTypes = {
    classes: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    listRef: PropTypes.any,
    columns: PropTypes.array,
    itemCount: PropTypes.number,
    overscanCount: PropTypes.number,
    selectable: PropTypes.bool,
    selection: PropTypes.array,
    selectAll: PropTypes.bool,
    getItem: PropTypes.func,
    onItemsRendered: PropTypes.func,
    onSelect: PropTypes.func
};
Body.defaultProps = {
    overscanCount: 1
};
export default React.memo(Body);
