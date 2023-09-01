import { useToast as useChakraToast } from '@chakra-ui/react';

export const useToast = () => {
  const toast = useChakraToast();

  const success = (message: string) => {
    toast({
      description: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
      styleConfig: {
        textColor: 'white',
      },
    });
  };

  const warning = (message: string) => {
    toast({
      description: message,
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  };

  const info = (message: string) => {
    toast({
      description: message,
      status: 'info',
      duration: 5000,
      isClosable: true,
      styleConfig: {
        textColor: 'white',
      },
    });
  };

  const error = (message: string) => {
    toast({
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return { success, error, info, warning };
};
