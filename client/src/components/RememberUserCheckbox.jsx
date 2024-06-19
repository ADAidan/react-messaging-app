import * as React from "react";
import propTypes from "prop-types";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function RememberUserCheckbox({ setRememberUser }) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setRememberUser(event.target.checked);
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      label="Remember me"
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "Remember user" }}
        />
      }
    />
  );
}

RememberUserCheckbox.propTypes = {
  setRememberUser: propTypes.func,
};

RememberUserCheckbox.defaultProps = {
  setRememberUser: () => {},
};
