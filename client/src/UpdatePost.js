import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Nav from './Nav';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import {getToken} from './helpers';

const UpdatePost = props => {
    const [state, setState] = useState({
        title: '',
        slug: '',
        user: ''
    });

    // separate state for contento (rich text editor)
    const [content, setContent] = useState('');

    const {title, slug, user} = state;
    
    useEffect(() =>{
        axios.get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then(response => {
                const {title, content, slug, user} = response.data;

                setState({...state, title, slug, user});
                setContent(content);
            })
            .catch(error => alert('Error updating post'));
    }, []);

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
        axios.put(
                `${process.env.REACT_APP_API}/post/${slug}`,
                {title, content, user},
                {
                    headers:
                    {
                        authorization: `Bearer ${getToken()}`
                    }
                })
            .then(response => {
                console.log(response);
                const {title, content, slug, user} = response.data;

                // empty state
                setState({...state, title, content, slug, user});
                // show sucess alert
                alert(`Post titled ${title} is updated`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    } 
    

    const showUpadateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={handleChange('title')}
                    value={title} type="text"
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
                <input onChange={handleChange('user')}
                    value={user} type="text"
                    className="form-control"
                    placeholder="Your name"
                    required />
            </div>
            <div className="form-group">
                <button className="btn btn-primary">Update</button>
            </div>       
        </form>);

    return(
        <div className="container pb-5">
            <Nav />
            <br/>
            <h1>UPDATE POST</h1>
            <div>{showUpadateForm()}</div>
        </div>
    );    
}

export default UpdatePost;