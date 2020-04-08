import React, {useState} from 'react';
import axios from 'axios';
import Nav from './Nav';
import {getUser} from './helpers';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
require('dotenv').config();

const Create = () => {
    // state
    const [state, setState] = useState({
        title: '',
        user: getUser()
    });

    // separate state for contento (rich text editor)
    const [content, setContent] = useState('');

    // destructure values from state
    const{title, user} = state;

    // onChange event handler
    const handleChange = (name) => (event) => {
        // console.log('name', name, 'event', event.target.value);
        setState({...state, [name]: event.target.value});
    };

    // rich text editor event handler
    const handleContent = (event) => {
        console.log(event);
        setContent(event);
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/post`, {title, content, user})
            .then(response => {
                // empty state
                setState({...state, title: '', user: ''});
                setContent('');
                // show sucess alert
                alert(`Post titled ${response.data.title}`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    } 

    return (
        <div className="container pb-5">
            <Nav />
            <br/>
            <h1>CREATE POST</h1>
            <br/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input
                        onChange={handleChange('title')}
                        value={title}
                        type="text"
                        className="form-control"
                        placeholder="Post title"
                        required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Content</label>
                    <ReactQuill
                        onChange={handleContent}
                        value={content}
                        className="pb-5 mb-3"
                        theme="bubble"
                        placeholder="Write something"
                        style={{border: '1px solid #666'}}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">User</label>
                    <input
                        onChange={handleChange('user')}
                        value={user}
                        type="text"
                        className="form-control"
                        placeholder="Your name"
                        required />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Create</button>
                </div>        
            </form>
        </div>
    );
};

export default Create;
