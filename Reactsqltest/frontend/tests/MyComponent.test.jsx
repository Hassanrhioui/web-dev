import React from "react";
import { render, screen } from '@testing-library/react';
import MyComponent from '../src/components/MyComponent';

test('renders Hello, World!', () => {
  render(<MyComponent />);
  const element = screen.getByText(/Hello, World!/i);
  expect(element).toBeInTheDocument();
});