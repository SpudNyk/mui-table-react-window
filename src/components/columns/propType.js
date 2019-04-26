import PropTypes from 'prop-types'
export default PropTypes.shape({
    label: PropTypes.string,
    align: PropTypes.oneOf(['left','center','right', 'justify', 'inherit']),
    minWidth: PropTypes.number, 
    maxWidth: PropTypes.number,
    width:  PropTypes.number,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ])
})