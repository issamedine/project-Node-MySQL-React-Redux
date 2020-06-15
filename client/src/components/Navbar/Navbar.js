import React, { Component } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";

import { logoutUser } from "../../Redux/actions/user";
import { connect } from "react-redux";

import './Navbar.css'

class ActiveLastBreadcrumb extends Component {
  render() {
    return (
      <div>
        {this.props.user.isAuth ? (
          <Breadcrumbs aria- label="breadcrumb">
            <Link color="inherit" to="/" onClick={this.props.logoutUser}>
              Logout
            </Link>
            <Link color="inherit" to="/list-user">
              list user
            </Link>
          </Breadcrumbs>
        ) : (
          <Breadcrumbs aria- label="breadcrumb">
            <Link color="inherit" to="/login">
              Login
            </Link>
            <Link color="inherit" to="/signup">
              Sign up
            </Link>
          </Breadcrumbs>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(ActiveLastBreadcrumb);
