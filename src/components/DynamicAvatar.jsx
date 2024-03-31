import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  let initials;
  if (!name) return null;
  try {
    const [firstName, lastName] = name.split(' ');
    if (!lastName) {
      initials = `${firstName?.[0] || ''}`;
    }
    initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`;
  } catch (error) {
    const [firstName] = name;
    initials = firstName?.[0] || '';
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${initials}`,
  };
}

function DynamicAvatar({ name }) {
  if (!name) return null;
  const avatarProps = stringAvatar(name);
  return <Avatar sx={avatarProps.sx}>{avatarProps.children}</Avatar>;
}

DynamicAvatar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DynamicAvatar;
