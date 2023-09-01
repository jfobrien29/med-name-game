import { Box } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html
      lang="en"
      style={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Head />
      <Box
        as="body"
        style={{
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Main />
        <NextScript />
      </Box>
    </Html>
  );
}
