import { useMemo } from 'react';
import { createColumns } from './create';

const useColumns = (
    columns,
    width,
    selectable = false,
    selectCount = 0,
    itemCount = 0,
    onSelectAll = null
) => {
    return useMemo(
        () =>
            createColumns(
                columns,
                width,
                selectable,
                selectCount,
                itemCount,
                onSelectAll
            ),
        [columns, selectable, selectCount, itemCount, onSelectAll, width]
    );
};

export default useColumns;
