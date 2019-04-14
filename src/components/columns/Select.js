import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const Select = ({ item, selected, onSelect }) => (
    <Checkbox
        checked={selected}
        onChange={event => onSelect && onSelect(item, event.target.checked)}
    />
);

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
