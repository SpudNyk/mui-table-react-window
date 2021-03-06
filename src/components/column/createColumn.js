import Label from './Label';
import Text from './type/Text';

const flexValue = (value, emptyValue = 0, trueValue = 1, falseValue = 0) => {
    const type = typeof value;
    if (type === 'boolean') {
        return value ? trueValue : falseValue;
    }
    if (value == null) {
        return emptyValue;
    }
    return value;
};

const createColumnStyle = column => {
    const { grow, shrink, width, minWidth = null, maxWidth = null } = column;

    const style = {
        // grow by default unless a width is set, if a maxWidth is supplied then grow is set
        flexGrow: flexValue(grow, width == null || maxWidth != null ? 1 : 0),
        // don't shrink by default unless a minimum width is supplied
        flexShrink: flexValue(shrink, minWidth != null ? 1 : 0),
        // flex basis is 0 by default
        // (we don't want the css default of 'auto' or content will force cells to grow)
        flexBasis: flexValue(width)
    };

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
