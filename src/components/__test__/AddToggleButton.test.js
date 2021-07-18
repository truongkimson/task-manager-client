import React from "react";
import AddToggleButton from "../AddToggleButton";
import { render } from "@testing-library/react";

it("should display Close correctly", () => {
    const { getByTestId } = render(<AddToggleButton visible={true} />);
    expect(getByTestId("btn")).toHaveTextContent("Close");
});

it("should display Add correctly", () => {
    const { getByTestId } = render(<AddToggleButton visible={false} />);
    expect(getByTestId("btn")).toHaveTextContent("Add");
});
