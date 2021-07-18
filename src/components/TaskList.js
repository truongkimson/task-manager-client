import React from "react";
import Task from "./Task";

const TaskList = ({
    tasks,
    onDeleteTask,
    onUpdateTask,
    onActiveFormChange,
}) => {
    return (
        <div className="container">
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onDeleteTask={onDeleteTask}
                    onUpdateTask={onUpdateTask}
                    onActiveFormChange={onActiveFormChange}
                />
            ))}
        </div>
    );
};

export default TaskList;
