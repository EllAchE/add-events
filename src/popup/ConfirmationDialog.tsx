import { Checkbox, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

/*
  Popup that appears when user is creating an event.
  This behavior can be disabled by the user.
*/
export default function ConfirmationDialog({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Create Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to create an event?
          <br />
          {' '}
          Event details
        </DialogContentText>
        <FormControlLabel
          control={<Checkbox />}
          label="Don't ask me next time. You can re-enable confirmations on the settings page."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Create Event</Button>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
