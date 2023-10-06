import '@/styles/globals.css';
import { store } from '@/store';
import { Provider } from 'react-redux';
import MainLayout from '@/components/MainLayout';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
