import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    content: {
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
});
const Content = ({ value }) => {
    const classes = useStyles();
    return <div className={classes.content}>{String(value)}</div>;
};
Content.propTypes = {
    value: PropTypes.any
};
export default React.memo(Content);
