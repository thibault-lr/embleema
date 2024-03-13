export function readFromEnv(envKey: string): string {
  const envValue = import.meta.env[envKey];

  if (envValue === undefined) {
    throw new Error(`Key ${envKey} is not defined in env`);
  }

  return envValue;
}
