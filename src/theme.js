import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  components: {
		MuiTypography: {
			variants: [
				{
					props: {
						variant: "caption",
					},
					style: {
						fontSize: 11,
					}
				}
			]
		}
	},
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;