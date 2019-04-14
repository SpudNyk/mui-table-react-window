import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    content: {
        flex: 1,
        textOverflow: 'ellipsis'
    }
};
const Content = ({ classes, value }) => {
    return <div className={classes.content}>{String(value)}</div>;
};

export default withStyles(styles)(Content);
