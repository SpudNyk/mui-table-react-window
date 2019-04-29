import Label from './Label';
import Text from './type/Text';

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

const createColumn = def => {
    const component = def.component || Text;
    const prepare = def.prepare || component.prepareColumn;
    const column = typeof prepare === 'function' ? prepare(def) : def;
    const labelComponent = column.labelComponent || Label;
    return {
        ...column,
        labelComponent,
        component,
        style: createColumnStyle(column)
    };
};

export default createColumn;
