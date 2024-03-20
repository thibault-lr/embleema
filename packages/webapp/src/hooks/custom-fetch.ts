import { readFromEnv } from '@src/utils/env';
import { Patient } from 'embleema-domain';
import { useState } from 'react';
import { useAuth } from 'react-oidc-context';
import useFetch, { Interceptors } from 'use-http';

const API_URL = readFromEnv('VITE_EMBLEEMA_API_URL');

export function useCustomFetch<T>() {
  const { user } = useAuth();

  const { get, response, post, loading } = useFetch<T>(API_URL, {
    interceptors: {
      request: ({ options }: Parameters<NonNullable<Interceptors['request']>>[0]) => {
        if (!user?.access_token) {
          throw new Error('Access token undefined');
        }
        const reqHeaders = new Headers(options.headers);
        reqHeaders.set('Authorization', `Bearer ${user.access_token}`);
        return { ...options, headers: reqHeaders };
      },
    },
  });

  return { get, response, loading, post };
}
