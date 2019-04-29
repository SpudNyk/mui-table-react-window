import PropTypes from 'prop-types';

const Text = ({ value, item, column }) => {
    return column.formatter(value, column.format, item);
};
Text.propTypes = {
    value: PropTypes.any,
    item: PropTypes.object,
    column: PropTypes.object
};
Text.prepareColumn = def => {
    const { formatter = String, format = null } = def;
    return {
        ...def,
        formatter,
        format
    }
};
export default Text;
