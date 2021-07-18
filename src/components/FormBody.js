import React from "react";
import { useState } from "react";

const FormBody = ({ onAction, action, defaultTask, onComplete }) => {
    const [description, setDescription] = useState(defaultTask.description);
    const [date, setDate] = useState(defaultTask.date);

    const onSubmit = (e) => {
        e.preventDefault();

        // check if description empty
        if (!description) {
            alert("Please enter a description");
            return;
        }

        // check if date empty
        if (!date) {
            alert("Date cannot be empty");
            return;
        }

        // check if date is in the past
        if (Date.parse(date) < new Date().setHours(0, 0, 0, 0)) {
            alert("Please select a date in the future");
            return;
        }

        onAction({ id: defaultTask.id, description, date });

        setDescription("");
        setDate("");

        onComplete();
    };

    return (
        <>
            <form data-testid={`form-${action}`} className="card-body" onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="desc">Description</label>
                    <input
                        data-testid="form-desc"
                        type="text"
                        className="form-control"
                        id="desc"
                        placeholder="Enter Task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="date">Date</label>
                    <input
                        data-testid="form-date"
                        type="date"
                        className="form-control"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button
                    data-testid="form-btn"
                    type="submit"
                    className="btn btn-primary"
                >
                    {action}
                </button>
            </form>
        </>
    );
};

export default FormBody;
