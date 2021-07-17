import React from "react";
import FormBody from "../FormBody";
import { fireEvent, render } from "@testing-library/react";

it("should render FormBody correctly", () => {
    const task = {
        id: 1,
        description: "Learn Java",
        date: "2021-07-01",
    };

    const { getByTestId } = render(
        <FormBody defaultTask={task} action="Test action" />
    );

    expect(getByTestId("form-desc")).toHaveValue("Learn Java");
    expect(getByTestId("form-date")).toHaveValue("2021-07-01");
    expect(getByTestId("form-btn")).toHaveTextContent("Test action");
});

it("should call OnAction and OnComplete when action button is clicked", () => {
    const mockOnAction = jest.fn();
    const mockOnComplete = jest.fn();
    const task = {
        id: 1,
        description: "Learn Java",
        date: new Date().toLocaleDateString("fr-CA"),
    };

    const { getByTestId } = render(
        <FormBody
            defaultTask={task}
            action="Test action"
            onAction={mockOnAction}
            onComplete={mockOnComplete}
        />
    );

    fireEvent.click(getByTestId("form-btn"));

    expect(mockOnAction).toHaveBeenCalled()
    expect(mockOnComplete).toHaveBeenCalled()
});

it("should fire an alert when form is submitted without description", () => {
    global.alert = jest.fn();
    const task = {
        id: 1,
        description: "",
        date: new Date().toLocaleDateString("fr-CA"),
    };

    const { getByTestId } = render(
        <FormBody
            defaultTask={task}
            action="Test action"
        />
    );

    fireEvent.click(getByTestId("form-btn"));

    expect(global.alert).toHaveBeenCalled();
})

it("should fire an alert when form is submitted with empty date", () => {
    global.alert = jest.fn();
    const task = {
        id: 1,
        description: "Learn Java",
        date: "",
    };

    const { getByTestId } = render(
        <FormBody
            defaultTask={task}
            action="Test action"
        />
    );

    fireEvent.click(getByTestId("form-btn"));

    expect(global.alert).toHaveBeenCalled();
})

it("should fire an alert when form is submitted with date in the past", () => {
    global.alert = jest.fn();
    const task = {
        id: 1,
        description: "Learn Java",
        date: "2000-07-01",
    };

    const { getByTestId } = render(
        <FormBody
            defaultTask={task}
            action="Test action"
        />
    );

    fireEvent.click(getByTestId("form-btn"));

    expect(global.alert).toHaveBeenCalled();
})
