import React from "react";
import Header from "../Header";
import { render } from "@testing-library/react";

it("should render correct Header text", () => {
    const { getByTestId } = render(<Header title="Test Header" />);
    expect(getByTestId("header")).toHaveTextContent("Test Header");
});
