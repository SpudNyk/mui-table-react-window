import { useMemo } from 'react';
import { createColumns } from './create';

const useColumns = (
    columns,
    width,
    selectable = false,
    selection = null,
    items = null,
    onSelectAll = null
) => {
    return useMemo(
        () =>
            createColumns(
                columns,
                width,
                selectable,
                selection.length,
                items.length,
                onSelectAll
            ),
        [columns, selectable, selection.length, items.length, onSelectAll]
    );
};

export default useColumns;
