import React, { useState } from 'react';
import { isLogged } from './../auth/index';
import { useDispatch } from 'react-redux'; 
import { addPost } from '../redux/actions/postActions';
import { useHistory } from 'react-router-dom';
import './css/AddPost.css';


function AddPost(){
    const [post, setPost] = useState({
        body: "",
        file: [],
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect]= useState(false);
    const [categorySelected, setCategorySelected] = useState();

    const history = useHistory();


    const jwt = isLogged();
    const dispatch = useDispatch();

    const postData = new FormData();

    function isValid() {
        const {brand, productname, body, size} = post;
        if(size > 10000) {
            setError("File size should be less than 100kb");
            return false;
        }
        if(brand.length === 0 || productname === 0 || body.length === 0) {
            setError("All fields are required");
            setLoading(false);
            return false;
        }

        return true;
    };

    function handlefileChange(event){
        setError("");
        const value = event.target.files;

        function totalsize() {
            const value = event.target.files
            var total = 0;
            for (var i = 0; i < value.length; i++) {
              total += event.target.files[i].size;
            }
            return total;
        }

        const size = totalsize();

        setPost({...post, [ event.target.name ]: value, size });


    }


    function handleBodyChange(event){
        setError("");
        const value = event.target.value;

        setPost({...post, [ event.target.name ]: value});

    }


    // function handleFormSubmit(event){
    //     event.preventDefault();

    //     const userId = jwt.user._id;
    //     const token = jwt.token;
    //     const postData = new FormData();

    //     post.body && postData.append("body", post.body);

    //     for(let i= 0; i < post.file.length; i++) {
    //         post.file[i] && postData.append('file', post.file[i])
    //     };
        

    //     dispatch(addPost(token, userId, postData));
    //     setPost({...post, body: "", file: []});
    //     setRedirect(true);
    //     if (redirect){
    //         return <Redirect to="/" ></Redirect>
    //     };
    //     setLoading(false);
    // };

    async function handleFormSubmit(event) {
        event.preventDefault();
    
        try {
            const userId = jwt.user._id;
            const token = jwt.token;
            const postData = new FormData();
    
            if (post.body) {
                postData.append("body", post.body);
            }
    
            for (let i = 0; i < post.file.length; i++) {
                if (post.file[i]) {
                    postData.append("file", post.file[i]);
                }
            }
    
            setLoading(true);
            await dispatch(addPost(token, userId, postData));
            setPost({ ...post, body: "", file: [] });
            setRedirect(true);
            if (redirect) {
                history.push('/');
            }
        } catch (error) {
            console.error("Error while submitting form:", error);
        } finally {
            setLoading(false);
        }
    }
    

    return (
        <div className="addpost_container">
            <div className="addpost">
                <h2 className="mt-5 mb-5">Create a Post</h2>

                <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
                    <div className="form-group_addpost">
                        <label className="file_select">
                            <input 
                            onChange={handlefileChange} 
                            type="file" 
                            multiple
                            accept= "image/*"
                            name="file">
                            </input>
                            Select images
                        </label>
                    </div>
                    
                    <div className="form-group_addpost">
                        <label className="text-muted">Text</label>
                        <textarea 
                        name="body"
                        onChange={handleBodyChange}  
                        type="text" 
                        required
                        value={post.body}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-raised btn-primary">Submit</button>        
                </form>
            </div> 
        </div>
    )
};

export default AddPost;

