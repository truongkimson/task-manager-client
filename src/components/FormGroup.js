import React from 'react'
import { useState } from 'react'
import AddToggleButton from './AddToggleButton'
import FormBody from './FormBody'

const FormGroup = ({ onCreateTask }) => {
    const [formVisible, setFormVisible] = useState(false)

    return (
        <div className="container">
            <AddToggleButton visible={formVisible} onClick={visible => setFormVisible(visible)} />
            {formVisible &&
                <div className="card">
                    <FormBody onAction={onCreateTask} action="Create"
                        defaultTask={{ id: 0, description: '', date: '' }}
                        onComplete={() => setFormVisible(false)} />
                </div>
            }
        </div>
    )
}

export default FormGroup
