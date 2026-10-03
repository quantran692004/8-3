import { render, screen } from '@testing-library/react';
import App from './App';

test("renders the Women's Day greeting", () => {
  render(<App />);
  expect(screen.getByText(/Chúc mừng ngày 8\/3/i)).toBeInTheDocument();
});
