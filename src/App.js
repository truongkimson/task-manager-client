import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import FormGroup from "./components/FormGroup";
import {
    fetchAllTasksAsync,
    deleteTaskById,
    createTask,
    updateTask,
} from "./api/TaskAPI";

export const ActiveFormContext = React.createContext();

function App() {
    const [tasks, setTasks] = useState([]);
    const [activeForm, setActiveForm] = useState(-1);

    useEffect(() => {
        const getAndSetTasks = async () => {
            setTasks(await fetchAllTasksAsync());
        };

        getAndSetTasks();
    }, []);

    const onDeleteTask = (id) => {
        const deleteTask = async () => {
            const res = await deleteTaskById(id);
            if (res) {
                console.log(res.errors);
            }
            setTasks(tasks.filter((task) => task.id !== id));
        };

        deleteTask();
    };

    const onCreateTask = (task) => {
        const createNewTask = async (task) => {
            const res = await createTask(task);
            if (res.errors) {
                console.log(res.errors);
                return;
            }

            setTasks(
                [...tasks, res].sort(
                    (t1, t2) => Date.parse(t1.date) - Date.parse(t2.date)
                )
            );
        };

        createNewTask(task);
    };

    const onUpdateTask = (task) => {
        const updateExistingTask = async (task) => {
            const res = await updateTask(task);
            if (res.errors) {
                console.log(res.errors);
                return;
            }

            const id = task.id;
            setTasks(
                [...tasks.filter((t) => t.id !== id), task].sort(
                    (t1, t2) => Date.parse(t1.date) - Date.parse(t2.date)
                )
            );
        };

        updateExistingTask(task);
    };

    return (
        <ActiveFormContext.Provider value={activeForm}>
            <div className="container col-6">
                <Header title="Task Manager" />
                <FormGroup
                    onCreateTask={onCreateTask}
                    onActiveFormChange={setActiveForm}
                />
                <Header title="Task List" />
                {tasks.length > 0 ? (
                    <TaskList
                        tasks={tasks}
                        onDeleteTask={onDeleteTask}
                        onUpdateTask={onUpdateTask}
                        onActiveFormChange={setActiveForm}
                    />
                ) : (
                    <p className="alert text-center">
                        There is no tasks no show
                    </p>
                )}
            </div>
        </ActiveFormContext.Provider>
    );
}

export default App;
