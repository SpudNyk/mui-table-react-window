import Content from './Content';
import { selectColumn } from './Select';

const createColumnStyle = column => {
    const { flex, width, minWidth = 0, maxWidth = Infinity } = column;
    if (!width) {
        return { flex: flex || 1 };
    } else {
        return {
            minWidth: Math.max(width, minWidth),
            maxWidth: Math.min(width, maxWidth)
        };
    }
};

export const createColumn = def => {
    return {
        isSelect: false,
        ...def,
        component: def.component || Content,
        style: createColumnStyle(def)
    };
};

export const createColumns = (
    columns,
    width,
    selectable,
    selection,
    items,
    onSelectAll
) => {
    if (selectable) {
        return [selectColumn(selection.length, items.length, onSelectAll)]
            .concat(columns)
            .map(createColumn);
    }
    return columns.map(createColumn);
};
