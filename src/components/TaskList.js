import React from 'react'
import Task from './Task'

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => {
    return (
        <div className="container">
            {tasks.map(task => (<Task key={task.id} task={task}
                onDeleteTask={onDeleteTask} onUpdateTask={onUpdateTask} />))}
        </div>
    )
}

export default TaskList
