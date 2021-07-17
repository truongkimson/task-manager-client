import React from "react";
import TaskList from "../TaskList";
import { render } from "@testing-library/react";

const tasks = [
    {
        id: 1,
        description: "Learn Java",
        date: "2021-07-1",
    },
    {
        id: 2,
        description: "Learn ReactJs",
        date: "2021-07-2",
    },
];

it("should display list of Tasks correctly", () => {
    const { getAllByTestId, debug, container } = render(
        <TaskList tasks={tasks} />
    );

    expect(getAllByTestId("task-item").length).toBe(2);
});
