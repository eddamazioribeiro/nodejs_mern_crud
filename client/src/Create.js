import React, {useState} from 'react';
import axios from 'axios';
require('dotenv').config();

const Create = () => {
    // state
    const [state, setState] = useState({
        title: '',
        content: '',
        user: ''
    });

    // destructure values from state
    const{title, content, user} = state;

    // onChange event handler
    const handleChange = (name) => (event) => {
        // console.log('name', name, 'event', event.target.value);
        setState({...state, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/post`, {title, content, user})
            .then(response => {
                // empty state
                setState({...state, title: '', content: '', user: ''});
                // show sucess alert
                alert(`Post titled ${response.data.title}`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    } 

    return (
        <div className="container p-5">
            <h1>CREATE POST</h1>
            <br/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input onChange={handleChange('title')} value={title} type="text" className="form-control" placeholder="Post title" required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Content</label>
                    <textarea onChange={handleChange('content')} value={content} type="text" className="form-control" placeholder="Write something" required></textarea>
                </div>
                <div className="form-group">
                    <label className="text-muted">User</label>
                    <input onChange={handleChange('user')} value={user} type="text" className="form-control" placeholder="Your name" required />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Create</button>
                </div>        
            </form>
        </div>
  );
};

export default Create;
