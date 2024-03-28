import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      p: 1,
    }}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Aidan
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
