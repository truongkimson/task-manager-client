import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ text, onClick }) => {
    return (
        <button className="btn btn-primary" onClick={onClick}>{text}</button>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
}

export default Button
