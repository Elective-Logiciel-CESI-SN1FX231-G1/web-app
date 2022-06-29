
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (role: string, theme: any) {
  theme.name = themes[role || 'client'].name
  Object.assign(theme.light, themes[role || 'client'].light)
  Object.assign(theme.dark, themes[role || 'client'].dark)
}

const themes = {
  client: {
    name: 'Client',
    light: {
      primary: '#3ab2c2'
    },
    dark: {

    }
  },
  deliverer: {
    name: '',
    light: {
      primary: '#689f38'
    },
    dark: {

    }
  },
  restaurateur: {
    name: '',
    light: {
      primary: '#ef6c00'
    },
    dark: {

    }
  },
  developer: {
    name: '',
    light: {
      primary: '#7b1fa2'
    },
    dark: {

    }
  },
  commercial: {
    name: '',
    light: {
      primary: '#546e7a'
    },
    dark: {

    }
  },
  technician: {
    name: '',
    light: {
      primary: '#757575'
    },
    dark: {

    }
  }
}
