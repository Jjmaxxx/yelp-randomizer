import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    components:{

    },
    palette: {
        primary: {
            main: '#FFFFFF',
            light:'#FFFFFF',
            dark:"#000000",
            contrastText: '#0C7B93',
        },
        secondary: {
            main: '#00A8CC',
            // light:'#5cdfe7',
            // dark:"#007d85",
            contrastText: '#00A8CC',
        },
        background:{
            default:"#FFFFFF"
        }
    },
})
export default theme;