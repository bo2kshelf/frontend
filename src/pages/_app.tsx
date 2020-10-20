/* eslint-disable no-process-env */
import {Auth0Provider, Auth0ProviderOptions} from '@auth0/auth0-react';
import clsx from 'clsx';
import {AppProps} from 'next/app';
import Router from 'next/router';
import React from 'react';
import {I18nextProvider} from 'react-i18next';
import {HeaderNavbar} from '~/components/HeaderNavbar';
import i18n from '~/i18n';
import {Auth0AuthorizedApolloProvider} from '~/lib/Auth0AuthorizedApolloProvider';
import '~/styles/index.css';
import '~/styles/tailwind.css';

const onRedirectCallback: Auth0ProviderOptions['onRedirectCallback'] = (
  appState,
) => {
  // Use Next.js's Router.replace method to replace the url
  Router.replace(appState?.returnTo || '/');
};

export type Props = AppProps;
export const App: React.FC<Props> = ({Component, pageProps}) => {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}
      audience={process.env.NEXT_PUBLIC_AUDIENCE!}
      onRedirectCallback={onRedirectCallback}
      // eslint-disable-next-line @shopify/jsx-no-complex-expressions
      redirectUri={
        // eslint-disable-next-line no-negated-condition
        typeof window !== 'undefined' ? window.location.origin : undefined
      }
    >
      <Auth0AuthorizedApolloProvider
        apiEndpoint={process.env.GRAPHQL_API_ENDPOINT!}
        auth0={{
          audience: process.env.NEXT_PUBLIC_AUDIENCE!,
        }}
      >
        <I18nextProvider i18n={i18n}>
          <HeaderNavbar
            className={clsx('w-full', 'sticky', 'top-0', 'left-0', 'shadow-md')}
          />
          <Component {...pageProps} />
        </I18nextProvider>
      </Auth0AuthorizedApolloProvider>
    </Auth0Provider>
  );
};

export default App;
