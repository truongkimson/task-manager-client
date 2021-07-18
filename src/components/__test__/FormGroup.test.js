import React from "react";
import FormGroup from "../FormGroup";
import { ActiveFormContext } from "../../App";
import { render } from "@testing-library/react";

it("should display form with Close button when ActiveFormContext value = 0", () => {
    const { getByTestId } = render(
        <ActiveFormContext.Provider value={0}>
            <FormGroup />
        </ActiveFormContext.Provider>
    );

    expect(getByTestId("form-desc")).toBeInTheDocument();
    expect(getByTestId("form-date")).toBeInTheDocument();
    expect(getByTestId("form-btn")).toHaveTextContent("Create");
    expect(getByTestId("btn")).toHaveTextContent("Close");
});
