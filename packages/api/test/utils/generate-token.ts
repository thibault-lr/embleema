export async function generateAuthToken(): Promise<string> {
  const realmName = process.env.KEYCLOAK_REALM;
  const clientId = process.env.KEYCLOAK_CLIENT_ID;
  const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;
  const authServerURL = process.env.KEYCLOAK_AUTH_SERVER_URL;

  const keyCloakAuthEndpoint = `${authServerURL}/realms/${realmName}/protocol/openid-connect/token`;

  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('client_id', clientId!);
  body.append('client_secret', clientSecret!);
  body.append('username', 'user'); // default credentials in the testdocker-compose
  body.append('password', 'user');

  const response = await fetch(keyCloakAuthEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  return data.access_token;
}
