import React, { useMemo, useState, useCallback } from 'react';
import Table from './components/Table';
import generateData from './data/dummy';
import moment from 'moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

const DateCell = React.memo(({ data }) => {
    return moment(data).format('YYYY-MM-DD');
});

const App = () => {
    const data = useMemo(() => generateData(10000), []);
    const [selection, setSelection] = useState([]);
    const onSelect = useCallback(
        (item, selected) => {
            const index = selection.indexOf(item);
            if (selected && index === -1) {
                setSelection([].concat(selection, item));
            } else if (index !== -1) {
                setSelection(
                    [].concat(
                        selection.slice(0, index),
                        selection.slice(index + 1)
                    )
                );
            }
        },
        [selection]
    );
    const onSelectAll = useCallback(
        selected => {
            if (!selected) {
                setSelection([]);
            } else {
                setSelection([].concat(data));
            }
        },
        [data]
    );
    const columns = [
        {
            key: 'firstName',
            label: 'First Name',
            width: 200
        },
        {
            key: 'lastName',
            label: 'Last Name'
        },
        {
            key: 'created',
            label: 'Created',
            component: DateCell,
            align: 'right',
            width: 150
        },
        {
            key: 'modified',
            label: 'Modified',
            component: DateCell,
            align: 'right',
            width: 150
        },
        {
            key: 'title',
            label: 'Title',
            flex: 1
        }
    ];
    return (
        <div
            style={{
                padding: 12,
                minHeight: '100vh',
                // workaround IE11
                height: '0px',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <CssBaseline />
            <Paper
                style={{
                    maxWidth: '1000px',
                    flex: 1
                }}
            >
                <Table
                    items={data}
                    columns={columns}
                    selectable
                    selection={selection}
                    onSelect={onSelect}
                    onSelectAll={onSelectAll}
                    itemPlural="People"
                />
            </Paper>
        </div>
    );
};

export default App;
