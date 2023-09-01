import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Inter /** Raleway */ } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Session } from '@supabase/auth-helpers-react';

import theme from '../theme';

const interFont = Inter({ subsets: ['latin'] });

const MainApp = ({ Component, pageProps }: any) => {

  return (
    <Component {...pageProps} />
  );
};

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // const [supabaseClient] = useState(() =>
  //   createBrowserSupabaseClient({
  //     supabaseUrl: NEXT_PUBLIC_SUPABASE_URL,
  //     supabaseKey: NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //   }),
  // );

  return (
    // <SessionContextProvider
    //   supabaseClient={supabaseClient}
    //   initialSession={pageProps.initialSession}
    // >
      <div className={interFont.className}>
        <ChakraProvider theme={theme}>
                <MainApp Component={Component} pageProps={pageProps} />
                <Analytics />
        </ChakraProvider>
      </div>
    // </SessionContextProvider>
  );
}
