import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Counter } from "../old/counter";

describe("Counter Component", () => {
    it("renders with initial count", () => {
        render(<Counter initialCount={5} />);
        expect(screen.getByText("Count: 5")).toBeInTheDocument();
    });

    it("increments count when increment button is clicked", () => {
        render(<Counter />);
        const incrementButton = screen.getByText("Increment");
        fireEvent.click(incrementButton);
        expect(screen.getByText("Count: 1")).toBeInTheDocument();
    });

    it("decrements count when decrement button is clicked", () => {
        render(<Counter initialCount={3} />);
        const decrementButton = screen.getByText("Decrement");
        fireEvent.click(decrementButton);
        expect(screen.getByText("Count: 2")).toBeInTheDocument();
    });
});
