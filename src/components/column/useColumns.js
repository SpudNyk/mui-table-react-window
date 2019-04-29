import { useMemo } from 'react';
import createColumn from './createColumn';

const useColumns = columns => {
    return useMemo(() => columns.map(createColumn), [columns]);
};

export default useColumns;
