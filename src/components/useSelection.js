import { useMemo, useCallback, useReducer } from 'react';
import Select from './column/type/Select';

const selectionReducer = (state, action) => {
    const type = action.type;
    switch (type) {
        case 'add': {
            const index = action.getItemIndex(state.items, action.item);
            if (index !== -1 && state.exclude) {
                // remove from items
                const items = [].concat(
                    state.items.slice(0, index),
                    state.items.slice(index + 1)
                );
                return {
                    exclude: true,
                    items,
                    count: action.count - items.length
                };
            } else if (index === -1 && !state.exclude) {
                // not exclusionary
                const items = [].concat(state.items, action.item);
                return {
                    exclude: false,
                    items,
                    count: items.length
                };
            }
            return state;
        }
        case 'remove': {
            const index = action.getItemIndex(state.items, action.item);
            if (index !== -1 && !state.exclude) {
                // remove from items
                const items = [].concat(
                    state.items.slice(0, index),
                    state.items.slice(index + 1)
                );
                return {
                    exclude: false,
                    items,
                    count: items.length
                };
            } else if (index === -1 && state.exclude) {
                // not exclusionary
                const items = [].concat(state.items, action.item);
                return {
                    exclude: true,
                    items,
                    count: action.count - items.length
                };
            }
            return state;
        }
        case 'all':
            return action.count === 0
                ? state
                : {
                      exclude: true,
                      items: [],
                      count: action.count
                  };

        case 'none':
            return {
                exclude: false,
                items: [],
                count: 0
            };

        default:
            throw new Error('Unknown action');
    }
};

const initialSelection = {
    exclude: false,
    items: [],
    count: 0
};

const useSelection = (count, isSameItem = null) => {
    const [selection, dispatch] = useReducer(
        selectionReducer,
        initialSelection
    );

    const reset = useCallback(() => dispatch({ type: 'none' }), []);

    const isAllSelected =
        count > 0 && selection.exclude
            ? selection.items.length === 0
            : selection.items.length === count;

    const getItemIndex = useMemo(() => {
        if (typeof isSameItem === 'function') {
            return (items, item) =>
                items.findIndex(candidate => isSameItem(candidate, item));
        }
        return (items, item) => items.indexOf(item);
    }, [isSameItem]);

    const onSelect = useCallback(
        (item, selected) => {
            dispatch({
                type: selected ? 'add' : 'remove',
                item,
                count,
                getItemIndex
            });
        },
        [getItemIndex, count]
    );

    const onSelectAll = useCallback(
        selected => {
            dispatch({
                type: selected ? 'all' : 'none',
                count
            });
        },
        [count]
    );

    const isItemSelected = useCallback(
        (item, index, selected = false) => {
            if (selected || isAllSelected) {
                return true;
            }
            const selectIndex = getItemIndex(selection.items, item);
            return selection.exclude ? selectIndex === -1 : selectIndex !== -1;
        },
        [selection, getItemIndex, isAllSelected]
    );

    const hasSelection = useCallback(() => {
        return count > 0 && selection.count > 0;
    }, [selection, count]);

    const column = useMemo(() => {
        return {
            component: Select,
            onSelect,
            onSelectAll,
            isItemSelected,
            isAllSelected,
            hasSelection
        };
    }, [onSelect, onSelectAll, isItemSelected, isAllSelected, hasSelection]);

    return [selection, column, reset];
};

export default useSelection;
