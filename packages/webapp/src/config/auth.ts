import { AuthProviderNoUserManagerProps } from 'react-oidc-context';

import { readFromEnv } from '@src/utils/env';



export function getAuthProviderConfig(): AuthProviderNoUserManagerProps {
  return {
    authority: readFromEnv('VITE_KEYCLOAK_AUTH_URL'),
    client_id: readFromEnv('VITE_KEYCOAK_CLIENT_ID'),
    redirect_uri: readFromEnv('VITE_KEYCLOAK_AUTH_REDIRECT_URL'),
    scope: 'openid',
    monitorSession: true,
    loadUserInfo: true,
    response_type: 'code',
  };
}
