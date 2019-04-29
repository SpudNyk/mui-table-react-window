import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const Select = ({ item, index, column, itemSelected }) => (
    <Checkbox
        checked={column.isItemSelected(item, index, itemSelected)}
        onChange={event => column.onSelect(item, event.target.checked)}
    />
);
Select.propTypes = {
    item: PropTypes.any,
    column: PropTypes.object
};

const SelectLabel = ({ column }) => {
    const isAllSelected = column.isAllSelected;
    return (
        <Checkbox
            indeterminate={column.hasSelection() && !isAllSelected}
            checked={isAllSelected}
            onChange={event => column.onSelectAll(event.target.checked)}
        />
    );
};
SelectLabel.propTypes = {
    column: PropTypes.object
};
const noop = () => {};
const falseFn = () => false;

Select.prepareColumn = def => {
    const {
        onSelectAll = noop,
        onSelect = noop,
        isItemSelected = falseFn,
        isAllSelected = falseFn,
        hasSelection = falseFn
    } = def;
    return {
        isSelect: true,
        // don't wrap content
        rawContent: true,
        labelComponent: SelectLabel,
        component: Select,
        align: 'center',
        width: 50,
        onSelectAll,
        onSelect,
        isItemSelected,
        isAllSelected,
        hasSelection
    };
};

export default Select;
