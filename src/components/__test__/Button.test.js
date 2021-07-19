import React from "react";
import Button from "../Button";
import { render, fireEvent } from "@testing-library/react";

it("should render correct Button text", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Button text="Test" onClick={onClick}/>);
    expect(getByTestId("btn")).toHaveTextContent("Test"); 
    fireEvent.click(getByTestId("btn"))
    expect(onClick).toHaveBeenCalledTimes(1);
});
