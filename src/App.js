import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from './components/Table';
import generateData from './data/dummy';
import moment from 'moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

const DateCell = React.memo(({ data }) => {
    return moment(data).format('YYYY-MM-DD');
});

class App extends Component {
    render() {
        const data = generateData(1000);
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
                width: 150
            },
            {
                key: 'modified',
                label: 'Modified',
                component: DateCell,
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
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <CssBaseline />
                <Grid
                    container
                    direction="column"
                    justify="stretch"
                    alignItems="center"
                    style={{flex:1}}
                >
                    <Paper
                        style={{
                            height: '100%',
                            width: '100%',
                            maxWidth: '1000px',
                            flex: 1
                        }}
                    >
                        <Table data={data} columns={columns} />
                    </Paper>
                </Grid>
            </div>
        );
    }
}

export default App;
