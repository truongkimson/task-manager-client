import React from 'react'
import Button from './Button'

const AddToggleButton = ({ visible, onClick }) => {
    return (
        <>
            {visible
                ? <div className="m-2 d-flex flex-row-reverse"><Button text="Close" onClick={() => onClick(false)} /></div>
                : <div className="m-2 d-flex flex-row-reverse"><Button text="Add" onClick={() => onClick(true)} /></div>}
        </>

    )
}

export default AddToggleButton
