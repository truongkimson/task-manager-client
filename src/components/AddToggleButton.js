import React from "react";
import Button from "./Button";

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

export default AddToggleButton;
