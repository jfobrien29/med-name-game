import { useToast as useChakraToast } from '@chakra-ui/react';

export const useToast = () => {
  const toast = useChakraToast();

  const success = (message: string) => {
    toast({
      description: message,
      position: 'top',
      status: 'success',
      duration: 1000,
      isClosable: true,
      styleConfig: {
        textColor: 'white',
      },
    });
  };

  const warning = (message: string) => {
    toast({
      description: message,
      position: 'top',
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
  };

  const info = (message: string) => {
    toast({
      description: message,
      position: 'top',
      status: 'info',
      duration: 3000,
      isClosable: true,
      styleConfig: {
        textColor: 'white',
      },
    });
  };

  const error = (message: string) => {
    toast({
      description: message,
      position: 'top',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  return { success, error, info, warning };
};
