import { Center, Flex, VStack, Text, Progress, Box, Link } from '@chakra-ui/react';

interface Props {
  isLoading?: boolean;
  loadingText?: string;
  sideBarOpen?: boolean;
  maxW?: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<Props> = ({ isLoading, loadingText, children, maxW }) => {
  return (
    <Flex flexDir="column" h="100vh" position="relative" bg="white" w="full">
      {/* <Header onOpenSide={onSideBarOpen} onCloseSide={onSideBarClose} isOpen={isOpen} /> */}
      <Flex w="full" h="100vh" position="relative">
        <Box w="full" h="full" overflow="scroll">
          <Flex
            as="main"
            grow={1}
            flexDir="column"
            w="full"
            alignItems="center"
            // mt={[0, 0, '89px']}
            mt={[0, 0, 0]}
            textColor="gray.700"
            background="linear-gradient(90deg,#fff 8px,transparent 1%) 50%,linear-gradient(#fff 8px,transparent 1%) 50%,#f4f4f6"
            backgroundSize="10px 10px"
          >
            <Flex maxW={maxW || '1200px'} w="full" h="full" minH="80vh" mb={8} px={4}>
              {isLoading && (
                <Center w="full" h="full" minH="90vh">
                  <VStack w="400px">
                    <Text fontWeight="semibold">{loadingText || 'Loading...'}</Text>
                    <Progress
                      isIndeterminate
                      w="full"
                      bg="transparent"
                      rounded="md"
                      border="solid 1px"
                      borderColor="gray.400"
                      colorScheme="teal"
                      h="20px"
                    />
                  </VStack>
                </Center>
              )}
              {!isLoading && children}
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Flex w="full" borderTop="1px" borderColor="gray.200" fontSize="xs" justify="center">
        <Link href="https://twitter.com/thejackobrien">Made with 💚 by Jack O'Brien</Link>
      </Flex>
    </Flex>
  );
};

export default PageContainer;
