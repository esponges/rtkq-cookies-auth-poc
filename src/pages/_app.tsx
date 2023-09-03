import '@/styles/globals.css';
import { store } from '@/store';
import { Provider } from 'react-redux';
import AuthLayout from '@/components/AuthedLayout';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthLayout>
        <Component {...pageProps} />
      </AuthLayout>
    </Provider>
  );
}
