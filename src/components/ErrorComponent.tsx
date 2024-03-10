import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface Props {
  message: string;
}

const ErrorComponent: React.FC<Props> = ({ message }): JSX.Element => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorComponent;
