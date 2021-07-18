import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";

const AddToggleButton = ({ visible, onClick }) => {
    return (
        <>
            {visible ? (
                <div className="m-2 d-flex flex-row-reverse">
                    <Button text="Close" onClick={() => onClick(-1)} />
                </div>
            ) : (
                <div className="m-2 d-flex flex-row-reverse">
                    <Button text="Add" onClick={() => onClick(0)} />
                </div>
            )}
        </>
    );
};

AddToggleButton.propTypes = {
    visible: PropTypes.bool,
    onClick: PropTypes.func,
};

export default AddToggleButton;
