import React from "react";
import Button from "../Button";
import { render } from "@testing-library/react";

it("should render correct Button text", () => {
    const { getByTestId } = render(<Button text="Test" />);
    expect(getByTestId("btn")).toHaveTextContent("Test");
});
