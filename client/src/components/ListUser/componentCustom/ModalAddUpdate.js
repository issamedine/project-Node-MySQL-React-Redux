import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import { connect } from "react-redux";

import { signup, editUser } from "../../../Redux/actions/user";

const initialUser = {
  name: "",
  family_name: "",
  password: "",
};

function ModalAddUpdate(props) {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    if (props.userValue) setUser(props.userValue);
  }, [props.userValue]);

  const handleChange = (name) => ({ target: { value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleEdit = () => {
    props.editUser(user);
    setUser(initialUser);
    handleClose();
  };

  const handleAdd = (event) => {
    // addUserHandler(user)
    // setUser(initialUser)
    props.signup(user);
    setUser(initialUser);
    handleClose();
  };
  const { handleClose, open } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>Demo add item to react table.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={user.name}
            onChange={handleChange("name")}
          />
          <TextField
            autoFocus
            margin="dense"
            label="family name"
            type="text"
            fullWidth
            value={user.family_name}
            onChange={handleChange("family_name")}
          />
          {props.userValue ? null : (
            <TextField
              autoFocus
              margin="dense"
              label="password"
              type="text"
              fullWidth
              value={user.password}
              onChange={handleChange("password")}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Cancel
          </Button>
          {props.userValue ? (
            <Button onClick={() => handleEdit()} color="primary">
              Edit
            </Button>
          ) : (
            <Button onClick={() => handleAdd()} color="primary">
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(null, { signup, editUser })(ModalAddUpdate);
