import * as React from "react";
import propTypes from "prop-types";
import { Checkbox, FormControlLabel } from "@mui/material";

function TermsCheckbox({ setAgreeTerms }) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setAgreeTerms(event.target.checked);
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      label="Agree to terms of service"
      control={
        <Checkbox
          required
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "agree to terms of service" }}
        />
      }
    />
  );
}

TermsCheckbox.propTypes = {
  setAgreeTerms: propTypes.func,
};

TermsCheckbox.defaultProps = {
  setAgreeTerms: () => {},
};

export default TermsCheckbox;
