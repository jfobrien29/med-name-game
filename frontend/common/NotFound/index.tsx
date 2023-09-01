import { Box, Center, Heading, VStack } from '@chakra-ui/react';
import MetaHead from 'common/MetaHead';
import PageContainer from 'common/PageContainer';
import Link from 'next/link';

interface Props {
  title?: string;
}

const NotFound: React.FC<Props> = ({ title = 'Uh oh, page not found!' }) => {
  return (
    <>
      <MetaHead title={title} />
      <PageContainer>
        <Center w="full" h="400px">
          <VStack>
            <Heading>{title}</Heading>
            <Link href="/">
              <Box as="span" textDecor="underline">
                Take me back home →
              </Box>
            </Link>
          </VStack>
        </Center>
      </PageContainer>
    </>
  );
};

export default NotFound;
