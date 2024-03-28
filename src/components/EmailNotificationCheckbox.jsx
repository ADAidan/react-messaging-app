import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const EmailNotificationCheckbox = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      label="Recive email notifications"
      control={<Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'receive email notifications' }}
      />} />
  );
};

export default EmailNotificationCheckbox;