import React from "react"
import Button from "../Button"
import { render } from "@testing-library/react"

test("should render correct Button text", () => {
    const { getByTestId } = render(<Button text="Test" />)
    expect(getByTestId('btn')).toHaveTextContent('Test')
})