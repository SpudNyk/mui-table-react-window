import PropTypes from 'prop-types';

const Label = ({ column }) => {
    if (column.label == null) {
        return null;
    }
    switch (typeof column.label) {
        case 'function':
        case 'string':
        case 'object':
            return column.label;
        default:
            return String(column.label);
    }
};
Label.propTypes = {
    column: PropTypes.object
};
export default Label;
