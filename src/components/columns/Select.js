import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const Select = ({ item, selected, onSelect }) => (
    <Checkbox
        checked={selected}
        onChange={event => onSelect && onSelect(item, event.target.checked)}
    />
);
Select.propTypes = {
    item: PropTypes.any,
    selected: PropTypes.bool,
    onSelect: PropTypes.func
};

export const selectColumn = (selectCount, itemCount, onSelectAll) => {
    return {
        label: (
            <Checkbox
                indeterminate={selectCount > 0 && selectCount < itemCount}
                checked={selectCount === itemCount}
                onChange={event =>
                    onSelectAll && onSelectAll(event.target.checked)
                }
            />
        ),
        isSelector: true,
        component: Select,
        align: 'center',
        width: 50
    };
};

export default Select;
