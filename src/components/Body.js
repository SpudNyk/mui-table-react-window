import React from 'react';
import { VariableSizeList as List } from 'react-window';
import Row from './Row';

export default React.memo(function Body({
    classes,
    width,
    height,
    columns,
    itemCount,
    selectable,
    selection,
    selectAll,
    getItem,
    onItemsRendered,
    onSelect
}) {
    return (
        <div className={classes.body}>
            <List
                className={classes.grid}
                height={height}
                itemCount={itemCount}
                itemSize={() => 56}
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
            >
                {Row}
            </List>
        </div>
    );
});
