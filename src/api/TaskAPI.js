const HOST = 'http://140.238.194.85:8080'

const fetchAllTasksAsync = async () => {
    return fetch(`${HOST}/api/v1/task/all`)
    .then(response => response.json())
    .then(data => {return data})
    .catch(error => {
        console.error('There was an error!', error);
    })
  }

const deleteTaskById = async (id) => {
    const options = {
        method: 'DELETE'
    }

    fetch(`${HOST}/api/v1/task/${id}/delete`, options)
    .then(async response => {
        if (!response.ok) {
            if (response.code === 404) {
                return { errors: ['Task not found']}
            }
        }
    })
    .catch(error => {
        console.error('There was an error!', error);
    })
}

const createTask = async (task) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    }

    return fetch(`${HOST}/api/v1/task/create`, options)
    .then(async response => {
        if (!response.ok) {
            if (response.status === 422) {
                return await response.json()
            }
        }

        return await response.json()})
    .then(data => {return data})
    .catch(error => {
        console.error('There was an error!', error);
    })
}

const updateTask = async (task) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    }

    return fetch(`${HOST}/api/v1/task/update`, options)
    .then(async response => {
        if (!response.ok) {
            if (response.status === 422) {
                return await response.json()
            }
            else if (response.status === 404) {
                return { errors: ['Task not found']}
            }
        }

        return await response.json()
    })
    .catch(error => {
        console.error('There was an error!', error);
    })
}

export { fetchAllTasksAsync, deleteTaskById, createTask, updateTask }
