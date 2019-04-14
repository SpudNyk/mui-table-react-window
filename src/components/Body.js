import React from 'react';
import { VariableSizeList as List } from 'react-window';
import Row from './Row';

export default React.memo(function Body({
    classes,
    height,
    itemCount,
    width,
    columns,
    items,
    selectable,
    selection,
    selectAll,
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
                    items,
                    selectable,
                    selection,
                    selectAll,
                    onSelect
                }}
                width={width}
                onItemsRendered={onItemsRendered}
            >
                {Row}
            </List>
        </div>
    );
});
