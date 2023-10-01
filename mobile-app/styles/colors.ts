export type AppColor = keyof typeof colors

export const colors = {
  black: '#111111',
  white: '#fff',
  transparent: '#FFFFFF00',

  orange400: '#ED7D3B',

  primary: '#00463E',
  primary300: '#A1A8A7',
  primary500: '#02B280',

  backgroundPrimary: 'white',

  grey400: '#E4E4E4',
} as const
