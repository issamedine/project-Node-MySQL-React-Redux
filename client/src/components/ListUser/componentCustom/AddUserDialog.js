import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";

import ModalAddUpdate from "./ModalAddUpdate";

const AddUserDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    console.log("handleClickOpen");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={() => handleClickOpen()}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <ModalAddUpdate open={open} handleClose={handleClose} />
    </div>
  );
};

export default AddUserDialog;
