import React from "react";
import { useContext } from "react";
import { ActiveFormContext } from "../App";
import AddToggleButton from "./AddToggleButton";
import FormBody from "./FormBody";

const FormGroup = ({ onCreateTask, onActiveFormChange }) => {
    const activeForm = useContext(ActiveFormContext);

    return (
        <div className="container">
            <AddToggleButton
                visible={activeForm === 0}
                onClick={onActiveFormChange}
            />
            {activeForm === 0 && (
                <div className="card">
                    <FormBody
                        onAction={onCreateTask}
                        action="Create"
                        defaultTask={{ id: 0, description: "", date: "" }}
                        onComplete={() => onActiveFormChange(-1)}
                    />
                </div>
            )}
        </div>
    );
};

export default FormGroup;
