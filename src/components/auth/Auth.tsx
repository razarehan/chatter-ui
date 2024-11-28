import { Stack, Button, TextField } from '@mui/material';
import { useState } from 'react';

interface AuthProps {
  submitLabel: string;
  onSubmit: (credentials: { email: string, password: string }) => Promise<void>;
  children: React.ReactNode;
  error?: string;
}

const Auth = ({ submitLabel, onSubmit, children, error }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return <>
    <Stack spacing={3} sx={{
      height: "100vh",
      margin: "0 auto",
      justifyContent: "center",
      maxWidth: {
        xs: "70%",
        md: "30%"
      }
    }}>
      <TextField
        type="email"
        label="Email"
        variant='outlined'
        value={email}
        onChange={(event) => setEmail(event?.target.value)}
        error={!!error}
        helperText={error} />
      <TextField
        type="password"
        label="Password"
        variant='outlined'
        value={password}
        onChange={(event) => setPassword(event?.target.value)}
        error={!!error}
        helperText={error} />
      <Button
        variant='contained'
        onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  </>
}
export default Auth;