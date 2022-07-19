import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControlLabel } from '@mui/material';

export default function AlertDialog({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to create an event?<br></br> Event details
          </DialogContentText>
          <FormControlLabel
            control={<Checkbox />}
            label="Don't ask me next time"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Create Event</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
