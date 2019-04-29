import Label from './Label';
import Text from './type/Text';

const createColumnStyle = column => {
    const { flex, width, minWidth = null, maxWidth = null, baseWidth = 0 } = column;

    const style = {};
    if (width != null) {
        style.flexBasis = width;
    } else {
        style.flexGrow = flex || 1;
        style.flexBasis = baseWidth;
        style.flexShrink = 1;
    }
    if (maxWidth != null) {
        style.maxWidth = maxWidth;
    }
    if (minWidth != null) {
        style.minWidth = minWidth;
    }
    return style;
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
