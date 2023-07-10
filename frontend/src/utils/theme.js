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
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: 'black',
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color:"black",
            fontFamily:"poppins",
            fontSize:"20px",
            "&.Mui-focused": {
              color:"red",
            }
          }
        }
        
      },
      // MuiOutlinedInput: {
      //   styleOverrides: {
      //     root: {
      //       "& .MuiSvgIcon-root": {
      //         color: "black",
      //       },
      //       "& .MuiOutlinedInput-notchedOutline": {
      //         border: `1px solid red`,
      //       },
      //       "&.Mui-focused": {
      //         "& .MuiOutlinedInput-notchedOutline": {
      //           border: `1px solid black`,
      //           color:'red'
      //         }
      //       }
      //     }
      //   }
      //},
      MuiInput: {
        styleOverrides: {
          // props:{
          //   inputProps: { spellCheck: 'false' }
          // },
          underline: {
            borderBottomColor: `black`,
            '&:after': {
              borderBottomColor: `black`,
            },
            '&$focused:after': {
              borderBottomColor: `black`,
            },
            '&:before': {
              borderBottomColor: `black`,
            },
            "&:hover": {
              // color: "white",
              // backgroundColor:"red"
              borderBottomColor:"black",
            },
          }
        }
      }
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
          light:'#d2c8c8',
          dark:"#000000",
          contrastText: '#0C7B93',
        },
        secondary: {
          main: '#FF0000',
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