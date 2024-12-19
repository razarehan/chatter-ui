import { forwardRef } from 'react';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Snackbar as MUISnackbar } from '@mui/material';
import MUIAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useReactiveVar } from '@apollo/client';
import { snackVar } from '../../constants/snackbar';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MUIAlert elevation={6} ref={ref} variant='filled' {...props} />
});

export default function Snackbar() {
  const snack = useReactiveVar(snackVar);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    snackVar(undefined);
  };

  return (
    <>
      {
        snack && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <MUISnackbar
              open={!!snack}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity={snack.type}
                sx={{ width: '100%' }}
              >
                {snack.message}
              </Alert>
            </MUISnackbar>
          </Stack>
        )
      }
    </>
  );
}
