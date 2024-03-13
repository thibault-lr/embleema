import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

import * as ReactOidcContextModule from 'react-oidc-context';

vi.mock('react-oidc-context', () => ({
  useAuth: vi.fn(),
}));

describe('App Component', () => {
  it('render the loader by default', () => {
    vi.spyOn(ReactOidcContextModule, 'useAuth').mockReturnValue({ isLoading: true, isAuthenticated: false } as any);

    render(<App />);

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it('triggers a login page redirection if not authenticated', async () => {
    const signinRedirectMock = vi.fn();
    vi.spyOn(ReactOidcContextModule, 'useAuth').mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
      signinRedirect: signinRedirectMock,
    } as any);

    render(<App />);

    await waitFor(() => {
      expect(signinRedirectMock).toHaveBeenCalled();
    });
  });

  describe('when user is authenticated', () => {
    it('displays the Patients component ', () => {
      vi.spyOn(ReactOidcContextModule, 'useAuth').mockReturnValue({
        isAuthenticated: true,
        user: { access_token: 'token' },
      } as any);

      render(<App />);

      expect(screen.getByText(/Patients/)).toBeInTheDocument();
    });
  });
});
