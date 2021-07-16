import React from "react";
import { useState } from "react"
import Task from "./Task";

export const CurrentUpdateContext = React.createContext();

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => {
    const [ currentUpdate, setCurrentUpdate ] = useState(-1)

    return (
        <CurrentUpdateContext.Provider value={currentUpdate}>
            <div className="container">
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onDeleteTask={onDeleteTask}
                        onUpdateTask={onUpdateTask}
                        onUpdateChange={id => setCurrentUpdate(id)}
                    />
                ))}
            </div>
        </CurrentUpdateContext.Provider>
    );
};

export default TaskList;
