import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../src/components/Counter';

test('shows the correct initial count', () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
});

test('increases count when button is pressed', () => {
    render(<Counter />);

    // If multiple buttons are found, the first one is selected
    const button = screen.getAllByRole("button", { name: "Increase" })[0];

    fireEvent.click(button);
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
});