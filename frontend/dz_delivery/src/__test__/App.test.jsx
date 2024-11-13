import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  it("renders the heading and button", () => {
    render(<App />);

    // Check if the heading is in the document
    const heading = screen.getByText(/Vite \+ React/i);
    expect(heading).toBeInTheDocument();

    // Check if the button with initial count is in the document
    const button = screen.getByText(/count is 0/i);
    expect(button).toBeInTheDocument();
  });

  it("increments the count when button is clicked", () => {
    render(<App />);

    // Find the button
    const button = screen.getByText(/count is 0/i);

    // Click the button
    fireEvent.click(button);

    // Check if the count has incremented
    expect(button).toHaveTextContent(/count is 1/i);
  });
});
