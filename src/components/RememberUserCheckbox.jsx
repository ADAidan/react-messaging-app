import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function RememberUserCheckbox() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      label="Remember me"
      control={<Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'Remember user' }}
      />} />
  );
};