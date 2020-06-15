import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { connect } from "react-redux";

import { signup } from '../../Redux/actions/user'


class Signup extends Component {

    state = {
        name: '',
        family_name: '',
        password: ''
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
        return (
            <form className={this.useStyles.root} >
                <TextField
                    id="standard-basic"
                    label="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <TextField
                    id="standard-basic"
                    label="family name"
                    name="family_name"
                    value={this.state.family_name}
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
                        this.props.signup(this.state);
                        this.setState({
                            name: '',
                            family_name: '',
                            password: ''
                        })
                    }}
                >signup</Button>
            </form>
        );
    }
}
export default connect(null, { signup })(Signup)