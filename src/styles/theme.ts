export interface Theme {
  background: string;
  text: string;
  card: string;
  gradient: string;
  footer: string;
  button: string;
}

export const themes = {
  light: {
    background: 'bg-white',
    text: 'text-gray-800',
    card: 'bg-gray-100',
    gradient: 'bg-gradient-to-r from-green-100 to-brown-100',
    footer: 'bg-gradient-to-r from-gray-800 to-black',
    button: 'bg-green-500 hover:bg-green-600',
  },
  dark: {
    background: 'bg-gray-900',
    text: 'text-gray-100',
    card: 'bg-gray-800',
    gradient: 'bg-gradient-to-r from-green-900 to-brown-900',
    footer: 'bg-gradient-to-r from-gray-900 to-black',
    button: 'bg-green-700 hover:bg-green-800',
  },
};