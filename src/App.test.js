import React from "react";
import {
    render,
    screen,
    act,
    fireEvent,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
import * as TaskAPI from "./api/TaskAPI";

let fetchAll, deleteFetch, createFetch, updateFetch;

// mock implementation of fetch methods
beforeEach(() => {
    fetchAll = jest
        .spyOn(TaskAPI, "fetchAllTasksAsync")
        .mockImplementation(() =>
            Promise.resolve([
                {
                    id: 1,
                    description: "Learn Java",
                    date: "2021-07-1",
                    overdue: true,
                },
                {
                    id: 2,
                    description: "Learn ReactJs",
                    date: "2021-07-2",
                    overdue: true,
                },
            ])
        );

    deleteFetch = jest.spyOn(TaskAPI, "deleteTaskById");

    createFetch = jest.spyOn(TaskAPI, "createTask").mockImplementation(() =>
        Promise.resolve({
            id: 3,
            description: "Test create Task",
            date: new Date().toLocaleDateString("fr-CA"),
            overdue: false,
        })
    );

    updateFetch = jest
        .spyOn(TaskAPI, "updateTask")
        .mockImplementation((t) => Promise.resolve(t));
});

it("should load Task data and render correctly", async () => {
    await act(async () => render(<App />));

    expect(screen.getByText("Learn Java")).toBeInTheDocument();
    expect(screen.getByText("Learn ReactJs")).toBeInTheDocument();
    expect(screen.getAllByText("OVERDUE")).toHaveLength(2);
    expect(fetchAll).toHaveBeenCalledTimes(1);
});

it("should delete a Task correctly", async () => {
    await act(async () => render(<App />));

    expect(screen.getByText("Learn Java")).toBeInTheDocument();

    await act(async () => {
        fireEvent.click(screen.getAllByText("Done")[0]);
        await waitForElementToBeRemoved(() => screen.queryByText("Learn Java"));
    });

    expect(screen.getByText("Learn ReactJs")).toBeInTheDocument();

    await act(async () => {
        fireEvent.click(screen.getAllByText("Done")[0]);
        await waitForElementToBeRemoved(() =>
            screen.queryByText("Learn ReactJs")
        );
    });

    expect(deleteFetch).toHaveBeenCalledTimes(2);
});

it("should display only one active form at any point in time", async () => {
    await act(async () => render(<App />));

    expect(screen.getByText("Add")).toBeInTheDocument();

    // click on "Add" button and expect Create form to display
    await act(async () => {
        fireEvent.click(screen.getByText("Add"));
        await screen.findByTestId("form-Create");
        expect(screen.getByTestId("form-desc")).toBeInTheDocument();
        expect(screen.getByTestId("form-date")).toBeInTheDocument();
        expect(screen.getByTestId("form-btn")).toHaveTextContent("Create");
    });

    // click on Learn Java task and expect Create form to disappear, update form to display
    await act(async () => {
        fireEvent.click(screen.getByText("Learn Java"));
        await waitForElementToBeRemoved(() =>
            screen.queryByTestId("form-Create")
        );
        await screen.findByTestId("form-Update");
        expect(screen.getByTestId("form-desc")).toBeInTheDocument();
        expect(screen.getByTestId("form-date")).toBeInTheDocument();
        expect(screen.getByTestId("form-btn")).toHaveTextContent("Update");
    });
});

it("should create a Task correctly", async () => {
    await act(async () => render(<App />));

    await act(async () => {
        fireEvent.click(screen.getByText("Add"));
        await screen.findByTestId("form-Create");

        fireEvent.change(screen.getByTestId("form-desc"), {
            target: {
                value: "Test create Task",
            },
        });
        fireEvent.change(screen.getByTestId("form-date"), {
            target: {
                value: new Date().toLocaleDateString("fr-CA"),
            },
        });
        fireEvent.click(screen.getByTestId("form-btn"));
        await screen.findByText("Test create Task");
    });

    expect(createFetch).toHaveBeenCalledTimes(1);
});

it("should update a Task correctly", async () => {
    await act(async () => render(<App />));

    await act(async () => {
        fireEvent.click(screen.getByText("Learn Java"));
        await screen.findByTestId("form-Update");

        fireEvent.change(screen.getByTestId("form-desc"), {
            target: {
                value: "Updated Task",
            },
        });
        fireEvent.change(screen.getByTestId("form-date"), {
            target: {
                value: new Date().toLocaleDateString("fr-CA"),
            },
        });
        fireEvent.click(screen.getByTestId("form-btn"));

        await waitForElementToBeRemoved(() =>
            screen.queryByText("Learn Java")
        );
        await screen.findByText("Updated Task");
    });

    expect(updateFetch).toHaveBeenCalledTimes(1);
});
