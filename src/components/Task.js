import React from "react";
import { useContext } from "react";
import Button from "./Button";
import FormBody from "./FormBody";
import { FaRegCalendar, FaTimes } from "react-icons/fa";
import { ActiveFormContext } from "../App";

const Task = ({ task, onDeleteTask, onUpdateTask, onActiveFormChange }) => {
    const activeForm = useContext(ActiveFormContext);

    return (
        <div className="card my-1">
            {activeForm === task.id ? (
                <>
                    <div>
                        <div className="mt-3 ms-3 float-start">
                            <h5>Edit task</h5>
                        </div>
                        <FaTimes
                            className="mt-3 me-3 float-end"
                            size={20}
                            style={{ cursor: "pointer" }}
                            onClick={() => onActiveFormChange(-1)}
                        />
                    </div>

                    <FormBody
                        onAction={onUpdateTask}
                        action="Update"
                        defaultTask={task}
                        onComplete={() => onActiveFormChange(-1)}
                    />
                </>
            ) : (
                <div className="card-body">
                    <div data-testid="task-item" className="row">
                        <div className="col-10">
                            <h5
                                data-testid="task-desc"
                                onClick={() => onActiveFormChange(task.id)}
                                style={{ cursor: "pointer" }}
                            >
                                {task.description}
                            </h5>
                            <div data-testid="task-date">
                                <FaRegCalendar className="me-1 align-baseline" />
                                {task.date}
                            </div>
                            {task.overdue && (
                                <div>
                                    <span className="text-danger">OVERDUE</span>
                                </div>
                            )}
                        </div>
                        <div className="col-2">
                            <div className="text-center">
                                <Button
                                    text="Done"
                                    onClick={() => onDeleteTask(task.id)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
