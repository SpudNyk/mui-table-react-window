import React, { useMemo, useState, useCallback } from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Table from './components/AutoSize';
import generateData from './data/dummy';
import moment from 'moment';

const DateCell = React.memo(({ data }) => {
    return moment(data).format('YYYY-MM-DD');
});
const theme = createMuiTheme({});

const App = () => {
    const [dataCount, setDataCount] = useState(1000);
    const [overscan, setOverscan] = useState(1);
    const data = useMemo(() => generateData(dataCount), [dataCount]);
    const [selection, setSelection] = useState([]);
    const [message, setMessage] = useState('');
    const [messageAlign, setMessageAlign] = useState('inherit');
    const onOverscan = useCallback(e => setOverscan(e.target.value), []);
    const onDataCount = useCallback(e => setDataCount(e.target.value), []);
    const onMessage = useCallback(e => setMessage(e.target.value), []);
    const onMessageAlign = useCallback(
        e => setMessageAlign(e.target.value),
        []
    );
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
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Paper
                    style={{
                        marginTop: 16,
                        maxWidth: '1000px',
                        padding: 16
                    }}
                >
                    <Grid alignItems="stretch" container spacing={8}>
                        <Grid item xs={2}>
                            <TextField
                                label="Items"
                                type="number"
                                value={dataCount}
                                onChange={onDataCount}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="Overscan"
                                type="number"
                                value={overscan}
                                onChange={onOverscan}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Message"
                                value={message}
                                onChange={onMessage}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="Align"
                                value={messageAlign}
                                onChange={onMessageAlign}
                                fullWidth
                                select
                            >
                                <MenuItem value="inherit">Inherit</MenuItem>
                                <MenuItem value="left">Left</MenuItem>
                                <MenuItem value="center">Center</MenuItem>
                                <MenuItem value="right">Right</MenuItem>
                                <MenuItem value="justify">Justify</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper
                    style={{
                        marginTop: 16,
                        maxWidth: '1000px',
                        flex: 1
                    }}
                >
                    <Table
                        items={data}
                        overscanCount={overscan}
                        columns={columns}
                        selectable
                        selection={selection}
                        onSelect={onSelect}
                        onSelectAll={onSelectAll}
                        message={message}
                        messageAlign={messageAlign}
                        itemPlural="People"
                    />
                </Paper>
            </ThemeProvider>
        </div>
    );
};

export default App;
