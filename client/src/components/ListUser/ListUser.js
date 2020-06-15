import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import { connect } from "react-redux";

import EnhancedTable from "./componentCustom/EnhancedTable";
import { getAllUser, deleteUser } from "../../Redux/actions/user";

import ModalAddUpdate from "./componentCustom/ModalAddUpdate";

import './Listuser.css'

const ListUser = (props) => {
  const [userValue, setUserValue] = useState({});

  const [open, setOpen] = useState(false);

  const handleOpen = (user) => {
    setOpen(true);
    setUserValue(user);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    props.deleteUser(id);
  };

  const columns = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "name",
      accessor: "name",
    },
    {
      Header: "family_name",
      accessor: "family_name",
    },
    {
      Header: "action",
      Cell: ({ row }) => (
        <div>
          <button className="update-class" onClick={() => handleOpen(row.values)}>Update</button>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(row.values.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const [data, setData] = useState(React.useMemo(() => props.user.list, []));

  // const [skipPageReset, setSkipPageReset] = useState(false);

  useEffect(() => {
    setData(props.user.list);
  }, [props.user.list]);

  useEffect(() => {
    props.getAllUser();
  }, []);

  // const updateMyData = (rowIndex, columnId, value) => {
  //   setSkipPageReset(true);
  //   setData((old) =>
  //     old.map((row, index) => {
  //       if (index === rowIndex) {
  //         return {
  //           ...old[rowIndex],
  //           [columnId]: value,
  //         };
  //       }
  //       return row;
  //     })
  //   );
  // };

  return (
    <div>
      {props.user.isAuth ? (
        <div>
          <CssBaseline />
          <EnhancedTable
            columns={columns}
            data={data || []}
            setData={setData}
            // updateMyData={updateMyData}
            // skipPageReset={skipPageReset}
          />
          <ModalAddUpdate
            userValue={userValue}
            open={open}
            handleClose={handleClose}
          />
        </div>
      ) : (
        <p>you must register please</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, { getAllUser, deleteUser })(ListUser);
