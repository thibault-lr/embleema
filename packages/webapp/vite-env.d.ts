/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KEYCLOAK_AUTH_URL: string;
  readonly VITE_KEYCLOAK_AUTH_REDIRECT_URL: string;
  readonly VITE_KEYCOAK_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
