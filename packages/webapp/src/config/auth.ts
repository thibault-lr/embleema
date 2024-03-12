import { AuthProviderNoUserManagerProps } from 'react-oidc-context';

function readFromEnv(envKey: string): string {
  const envValue = import.meta.env[envKey];

  if (envValue === undefined) {
    throw new Error(`Key ${envKey} is not defined in env`);
  }

  return envValue;
}

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
