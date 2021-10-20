import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App.js', () => {
  render(<App />);
  const linkElement = screen.getByTestId("webCrawlerApp");
  expect(linkElement).toBeInTheDocument();
});
