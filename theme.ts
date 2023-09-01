import { extendTheme } from '@chakra-ui/react';

const variantOutlined = () => ({
  field: {
    _focus: {
      borderColor: 'teal.500',
      boxShadow: 'none',
    },
  },
});

export default extendTheme({
  colors: {
    black: {
      100: '#000000',
      200: '#000000',
      300: '#000000',
      400: '#000000',
      500: '#000000',
      600: '#000000',
      700: '#000000',
      900: '#000000',
    },
    white: {
      100: '#fff',
      200: '#fff',
      300: '#fff',
      400: '#fff',
      500: '#fff',
      600: '#fff',
      700: '#fff',
      900: '#fff',
    },
  },
  components: {
    MultiSelect: {
      variants: {
        outline: () => variantOutlined().field,
      },
    },
    Select: {
      variants: {
        outline: variantOutlined,
      },
    },
    Input: {
      variants: {
        outline: variantOutlined,
      },
    },
    Textarea: {
      variants: {
        outline: () => variantOutlined().field,
      },
    },
    Switch: {
      defaultProps: {
        colorScheme: 'teal',
      },
      variants: {
        outline: variantOutlined,
        thumb: {
          bg: 'teal',
        },
      },
    },
  },
  styles: {
    global: {
      // Create a CSS variable with the focus ring color desired.
      // rgba function does not work here so use the hex value.
      // Either :host,:root or html work. body does not work for
      // button, checkbox, radio, switch.
      // html: {
      ':host,:root': {
        '--chakra-ui-focus-ring-color': '#BEB4FF',
      },
    },
  },
});
