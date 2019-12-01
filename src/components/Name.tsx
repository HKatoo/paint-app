import React, { FC, useState } from 'react';
import { TextField } from '@material-ui/core';

const Name: FC = () => {
  const [name, setName] = useState('');
  return (
    <div className="header-name">
      <TextField
        value={name}
        onChange={e => setName(e.target.value)}
        label="Title"
        style={{ width: 400, margin: 15 }}
      />
    </div>
  );
};

export default Name;
