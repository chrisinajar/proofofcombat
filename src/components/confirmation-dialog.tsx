import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  message: string;
  warningMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmationDialog({
  open,
  title,
  message,
  warningMessage,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps): JSX.Element {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
    >
      <DialogTitle id="confirmation-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography>
          {message}
        </Typography>
        {warningMessage && (
          <Typography color="error" sx={{ mt: 2 }}>
            {warningMessage}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit" data-testid="cancel-button">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained" autoFocus data-testid="confirm-button">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
} 