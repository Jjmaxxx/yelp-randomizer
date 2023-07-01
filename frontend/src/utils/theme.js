import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    components:{
      MuiButton: {
        styleOverrides: {
          root: {
            color:"black",
            fontSize:"20px",
            fontWeight:"1000 ",
            "&:hover": {
              // color: "white",
              // backgroundColor:"red"
              borderBottom:"100px red solid",
            },
          }
        }
      },
      MuiList: {
        styleOverrides: {
          root: {
            border:"2px red solid",
          },
        },
      },
    },
    // MuiButtonBase: {
    //   styleOverrides: {
    //     root: {
    //       margin:0,
    //       padding:0,
    //       backgroundColor:'red'
    //     },
    //   },
    // },
    typography: {
        button: {
          textTransform: 'none'
        }
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