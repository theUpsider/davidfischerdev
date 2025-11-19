export interface DefaultTheme {
  colors: Colors
  palette: Palette
}

interface Colors {
  black: string
  grey: string
  white: string
}

type Color = keyof Colors

interface Palette {
  foreground: {
    primary: Colors[Color]
    accent: Colors[Color]
  }
  background: {
    primary: Colors[Color]
    accent: Colors[Color]
  }
  text: {
    primary: Colors[Color]
    accent: Colors[Color]
  }
  type: 'light' | 'dark'
}

const colors: Colors = {
  black: '#000000',
  grey: '#484a4d',
  white: '#ffffff'
}

const darkPalette: Palette = {
  type: 'dark',
  foreground: {
    primary: colors.white,
    accent: colors.grey
  },
  background: {
    primary: colors.black,
    accent: colors.grey
  },
  text: {
    primary: colors.white,
    accent: colors.white
  }
}

const lightPalette: Palette = {
  type: 'light',
  foreground: {
    primary: colors.black,
    accent: colors.grey
  },
  background: {
    primary: colors.white,
    accent: colors.grey
  },
  text: {
    primary: colors.black,
    accent: colors.black
  }
}

export const darkTheme: DefaultTheme = {
  colors,
  palette: darkPalette
}

export const lightTheme: DefaultTheme = {
  colors,
  palette: lightPalette
}
