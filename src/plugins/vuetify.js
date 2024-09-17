
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { md3 } from 'vuetify/blueprints'
import { createVuetify } from 'vuetify'

export default createVuetify({
    display: {
        mobileBreakpoint: 'lg',
    },
    blueprint: md3,
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: "#205B30",
                    primaryVariant: "#2d409c",
                    info: "#2962FF",
                    secondary: "#BBD979",
                    secondaryVariant: "#00e74f",
                    background: "#b1acab",
                    surface: "#e1dfdf",
                    error: "#db0606",
                    onPrimary: "#222",
                    onSecondary: "#e5e5e5",
                    onBackground: "#000000",
                    onSurface: "#000000",
                    onError: "#d30000",
                    severidade2: "#db0606",
                    severidade0: "#e0d013",
                    severidade1: "#ff9850",
                    quantidade: "#00e74f",
                }
            },
            dark: {
                dark: true,
                colors: {
                    primary: "#205B30",
                    primaryVariant: "#00aeef",
                    secondary: "#BBD979",
                    secondaryVariant: "#00e74f",
                    background: "#232121",
                    surface: "#413f3f",
                    error: "#db0606",
                    onPrimary: "#222",
                    onSecondary: "#000000",
                    onBackground: "#FFFFFF",
                    onSurface: "#FFFFFF",
                    onError: "#000000",
                    severidade2: "#db0606",
                    severidade0: "#e0d013",
                    severidade1: "#ff9850",
                    quantidade: "#00e74f",
                }
            },
        },
    },
})
