import React from 'react'
import { useState } from 'react'
import Button from './Button'
import FormBody from './FormBody'
import { FaRegCalendar, FaTimes } from 'react-icons/fa'

const Task = ({ task, onDeleteTask, onUpdateTask }) => {
    const [isUpdating, setIsUpdating] = useState(false)

    return (
        <div className="card my-1">
            {isUpdating ?
                <>
                    <div>
                        <FaTimes className="me-3 mt-3 float-end" size={20}
                            style={{ cursor: 'pointer' }} onClick={() => setIsUpdating(false)} />
                    </div>

                    <FormBody onAction={onUpdateTask} action="Update"
                        defaultTask={task} onComplete={() => setIsUpdating(false)} />
                </>
                : <div className="card-body">
                    <div className="row">
                        <div className="col-10">
                            <h5 onClick={() => setIsUpdating(true)} style={{ cursor: 'pointer' }}>
                                {task.description}
                            </h5>
                            <div>
                                <FaRegCalendar className="me-1 align-baseline" />
                                {task.date}
                            </div>
                            {task.overdue && <div>
                                <span className="text-danger">OVERDUE</span>
                            </div>}
                        </div>
                        <div className="col-2">
                            <div className="text-center">
                                <Button text="Done" onClick={() => onDeleteTask(task.id)} />
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Task
