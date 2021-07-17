import React from "react"
import Task from "../Task"
import { ActiveFormContext } from "../../App"
import { render } from "@testing-library/react"

const task = { id: 1, description: 'Learn Java', date: '2021-07-01'}

test("should render Task correctly" , () => {
    const { getByTestId } = render(<Task task={task} />)

    expect(getByTestId('task-desc')).toHaveTextContent('Learn Java')
    expect(getByTestId('task-date')).toHaveTextContent('2021-07-01')
    expect(getByTestId('btn')).toHaveTextContent('Done')
})

test("should display Update form when ActiveFormContext value = task.id", () => {
    const { getByTestId } = render(
        <ActiveFormContext.Provider value={task.id}>
            <Task task={task} />
        </ActiveFormContext.Provider>
    )

    expect(getByTestId('form-desc')).toHaveValue('Learn Java')
    expect(getByTestId('form-date')).toHaveValue('2021-07-01')
    expect(getByTestId('form-btn')).toHaveTextContent('Update')
}) 