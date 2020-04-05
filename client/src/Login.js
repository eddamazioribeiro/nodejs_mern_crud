import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import Nav from './Nav';
import {authenticate} from './helpers';

const Login = (props) => {
    // create state
    const [state, setState] = useState({
        name: '',
        password: ''
    });

    const {name, password} = state; // desctructure values from state

    // onChange event handler
    const handleChange = (name) => (event) => {
        // console.log('name', name, 'event', event.target.value);
        setState({...state, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.table({name, password});
        
        axios.post(`${process.env.REACT_APP_API}/login`, {name, password})
            .then(response => {
                console.log(response);
                authenticate(response, () =>{
                    props.history.push('/create');
                });
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return (
        <div className="container pb-5">
            <Nav />
            <br/>
            <h1>LOGIN</h1>
            <hr/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Username</label>
                    <input onChange={handleChange('name')}
                        value={name} 
                        type="text"
                        className="form-control" 
                        placeholder="Your username"
                        required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={handleChange('password')}
                        value={password}
                        type="password"
                        className="form-control"
                        placeholder="Your Password"
                        required></input>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Login</button>
                </div>        
            </form>
        </div>
    );
};

export default withRouter(Login);