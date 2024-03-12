import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

import * as ReactOidcContextModule from 'react-oidc-context';

vi.mock('react-oidc-context');

describe('App Component', () => {
  it('renders the title correctly', () => {
    vi.spyOn(ReactOidcContextModule, 'useAuth').mockReturnThis();

    render(<App />);

    expect(screen.getByText(/Embleema/)).toBeInTheDocument();
  });

  describe('when user is authenticated', () => {
    it('renders "Conntected" ', () => {
      vi.spyOn(ReactOidcContextModule, 'useAuth').mockReturnValue({ isAuthenticated: true } as any);

      render(<App />);

      expect(screen.getByText(/Connected/)).toBeInTheDocument();
    });
  });
});
