import React, { useMemo, useState, useCallback, useEffect } from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Table from './components/Table';
import AutoSize from './components/AutoSize';
import useSelection from './components/useSelection';
import generateData from './data/dummy';
import moment from 'moment';

const DateColumn = React.memo(({ value }) => {
    return moment(value).format('YYYY-MM-DD');
});
const theme = createMuiTheme({});

const App = () => {
    const [dataCount, setDataCount] = useState(1000);
    const [overscan, setOverscan] = useState(1);
    const data = useMemo(() => generateData(dataCount), [dataCount]);
    const [message, setMessage] = useState('');
    const [messageAlign, setMessageAlign] = useState('inherit');
    const onOverscan = useCallback(e => setOverscan(e.target.value), []);
    const onDataCount = useCallback(e => setDataCount(e.target.value), []);
    const onMessage = useCallback(e => setMessage(e.target.value), []);
    const onMessageAlign = useCallback(
        e => setMessageAlign(e.target.value),
        []
    );

    const [selection, selectColumn, resetSelection] = useSelection(data.length);
    useEffect(() => resetSelection(), [data, resetSelection]);

    const columns = [
        selectColumn,
        {
            key: 'firstName',
            label: 'First Name',
            width: 200,
            shrink: true
        },
        {
            key: 'lastName',
            label: 'Last Name',
            width: 200,
            shrink: true
        },
        {
            key: 'created',
            label: 'Created',
            component: DateColumn,
            align: 'right',
            width: 150
        },
        {
            key: 'modified',
            label: 'Modified',
            component: DateColumn,
            align: 'right',
            width: 150
        },
        {
            key: 'title',
            label: 'Title',
            width: 300,
            shrink: true,
            grow: 1
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
                        maxWidth: '1200px',
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
                        maxWidth: '1200px',
                        flex: 1
                    }}
                >
                    <AutoSize
                        component={Table}
                        items={data}
                        overscanCount={overscan}
                        columns={columns}
                        message={message}
                        messageAlign={messageAlign}
                        isItemSelected={selectColumn.isItemSelected}
                        selectCount={selection.count}
                        itemPlural="People"
                    />
                </Paper>
            </ThemeProvider>
        </div>
    );
};

export default App;
