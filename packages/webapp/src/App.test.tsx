import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the title correctly', () => {
    render(<App />);
    expect(screen.getByText(/Embleema/)).toBeInTheDocument();
  });
});
