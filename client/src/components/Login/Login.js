import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Login.css'

import { connect } from "react-redux";

import { login } from "../../Redux/actions/user"

class Login extends Component {

    state = {
        name: "",
        password: ""
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }));

    render() {
        return this.props.isAuth ? (
            <Redirect to="/list-user" />
        ) : (
                <form className={this.useStyles.root} noValidate autoComplete="off">
                    <TextField
                        id="standard-basic"
                        label="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="standard-basic"
                        label="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            e.preventDefault();
                            this.props.login(this.state);
                            this.setState({
                                name: '',
                                password: ''
                            })
                        }}
                    >login</Button>
                </form>
            )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, { login })(Login)