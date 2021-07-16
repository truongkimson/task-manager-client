import React from "react";
import { useContext } from "react";
import Button from "./Button";
import FormBody from "./FormBody";
import { FaRegCalendar, FaTimes } from "react-icons/fa";
import { CurrentUpdateContext } from "./TaskList";

const Task = ({ task, onDeleteTask, onUpdateTask, onUpdateChange }) => {
    const currentUpdate = useContext(CurrentUpdateContext);

    return (
        <div className="card my-1">
            {currentUpdate === task.id ? (
                <>
                    <div>
                        <div className="mt-3 ms-3 float-start"><h5>Edit task</h5></div>
                        <FaTimes
                            className="mt-3 me-3 float-end"
                            size={20}
                            style={{ cursor: "pointer" }}
                            onClick={() => onUpdateChange(-1)}
                        />
                    </div>

                    <FormBody
                        onAction={onUpdateTask}
                        action="Update"
                        defaultTask={task}
                        onComplete={() => onUpdateChange(-1)}
                    />
                </>
            ) : (
                <div className="card-body">
                    <div className="row">
                        <div className="col-10">
                            <h5
                                onClick={() => onUpdateChange(task.id)}
                                style={{ cursor: "pointer" }}
                            >
                                {task.description}
                            </h5>
                            <div>
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
