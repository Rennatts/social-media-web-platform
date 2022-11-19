import React, { useState, useEffect } from 'react';
import { isLogged } from './../auth';
import { useDispatch, connect } from 'react-redux'; 
import { getPost } from '../redux/actions/postActions';
import { Redirect } from 'react-router';
import './css/AddPost.css';


function EditPost({post, match}){
    const [editPost, setEditPost] = useState({
        brand: "",
        productname: "",
        category: "",
        subcategory: "",
        body: "",
        rating: 0,
        file: [],
    });


    const postId = match.params.postId;

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect]= useState(false);
    const [categorySelected, setCategorySelected] = useState();

    const jwt = isLogged();
    const dispatch = useDispatch();

    useEffect(() => {
        function singlePost(){
            dispatch(getPost(jwt.token, postId));
        }
        singlePost();

    },[dispatch]);

    console.log(post);

    const postData = new FormData();

    function isValid() {
        const {brand, productname, body, size} = editPost;
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

        setEditPost({...editPost, [ event.target.name ]: value, size });


    }

    function handleBrandChange(event){
        setError("");
        const value = event.target.value;

        setEditPost({...editPost, [ event.target.name ]: value});

    }

    function handleProductNameChange(event){
        setError("");
        const value = event.target.value;

        setEditPost({...editPost, [ event.target.name ]: value});

    }


    function handleBodyChange(event){
        setError("");
        const value = event.target.value;

        setEditPost({...editPost, [ event.target.name ]: value});

    }


    function handleFormSubmit(event){
        event.preventDefault();

        const userId = jwt.user._id;
        const token = jwt.token;
        const postData = new FormData();

        editPost.brand && postData.append("brand", editPost.brand);
        editPost.productname && postData.append("productname", editPost.productname);
        editPost.category && postData.append("category", editPost.category);
        editPost.body && postData.append("body", editPost.body);
        if(editPost.rating && editPost.rating !== 0){
            editPost.rating && postData.append("rating", editPost.rating);
        }

        console.log(editPost);

        for(let i= 0; i < editPost.file.length; i++) {
            editPost.file[i] && postData.append('file', editPost.file[i])
        };
        

        dispatch(editPost(token, post._id, postData));
        setEditPost({...editPost, brand: "", productname: "", category: "", body: "", file: []});
        setRedirect(true);
        if (redirect){
            return <Redirect to="/" ></Redirect>
        };
        setLoading(false);
    };

    function handleChange(e){
        setEditPost({...editPost, category: e.target.value});
        setCategorySelected(editPost.category)
    }

    function handleSubcategoryChang(e){
        setEditPost({...editPost, subcategory: e.target.value});
    }

    console.log(editPost);


    return (
        <div className="addpost_container">
            <div className="addpost">
                <h2 className="mt-5 mb-5">Edit the Review!!</h2>

                <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
                <div className="stars_reviews">

                    <div className="reviews">
                        <input type="radio" value={5} name="rating" id="rd-5" onChange={()=> setEditPost({...editPost, rating: 5})}></input>
                        <label htmlFor="rd-5" className="fas fa-star"></label>

                        <input type="radio" value={4} name="rating" id="rd-4" onChange={()=> setEditPost({...editPost, rating: 4})}></input>
                        <label htmlFor="rd-4" className="fas fa-star"></label>

                        <input type="radio" value={3} name="rating" id="rd-3" onChange={()=> setEditPost({...editPost, rating: 3})}></input>
                        <label htmlFor="rd-3" className="fas fa-star"></label>

                        <input type="radio" value={2} name="rating" id="rd-2" onChange={()=> setEditPost({...editPost, rating: 2})}></input>
                        <label htmlFor="rd-2" className="fas fa-star"></label>

                        <input type="radio" value={1} name="rating" id="rd-1" onChange={()=> setEditPost({...editPost, rating: 1})}></input>
                        <label htmlFor="rd-1" className="fas fa-star"></label>
                    </div>
                </div>
                    <div className="form-group_addpost">
                        <label className="text-muted">Add images</label>
                        <input 
                        onChange={handlefileChange} 
                        type="file" 
                        multiple
                        accept= "image/*"
                        name="file"
                        className="form-control">
                        </input>
                    </div>

                    <div className="form-group_addpost">
                        <label className="text-muted">Brand</label>
                        <textarea
                        onChange={handleBrandChange} 
                        type="text" 
                        name="brand"
                        required
                        name="brand"
                        value={post.brand}
                        className="form-control"
                        ></textarea>
                    </div>

                    <div className="form-group_addpost">
                        <label className="text-muted">Product Name</label>
                        <textarea
                        onChange={handleProductNameChange} 
                        type="text" 
                        name="productname"
                        required
                        name="productname"
                        value={post.productname}
                        className="form-control"
                        ></textarea>
                    </div>

                    <select 
                    class="selectpicker" 
                    name="selectpicker"
                    value={post.category} 
                    onChange={handleChange}>
                        <option name="" value="0">Select category</option>
                        <option value="batom" onChange={()=> setEditPost({...editPost, category: "batom"})}>Batom</option>
                        <option value="base" onChange={()=> setEditPost({...editPost, category: "base"})}>Base</option>
                        <option value="sombra" onChange={()=> setEditPost({...editPost, category: "sombra"})}>Sombra</option>
                    </select>

                    {editPost.category === "base" ? 
                    (
                    <select 
                        class="selectpicker" 
                        name="selectpicker"
                        value={editPost.subcategory} 
                        onChange={handleSubcategoryChang}>
                            <option name="" value="0">Select subcategory</option>
                            <option value="bb cream" onChange={()=> setEditPost({...editPost, subcategory: "bb cream"})}>BB Cream</option>
                            <option value="foundation" onChange={()=> setEditPost({...editPost, subcategory: "foundation"})}>Foundation</option>
                            <option value="cc cream" onChange={()=> setEditPost({...editPost, subcategory: "cc cream"})}>CC Cream</option>
                    </select> 
                    ) : 
                    (null)}  
                    
                    {post.category === "batom" ? 
                    (
                    <select 
                        class="selectpicker" 
                        name="selectpicker"
                        value={editPost.subcategory} 
                        onChange={handleSubcategoryChang}>
                            <option name="" value="0">Select subcategory</option>
                            <option value="bb cream" onChange={()=> setEditPost({...editPost, subcategory: "lips tink"})}>BB Cream</option>
                            <option value="foundation" onChange={()=> setEditPost({...editPost, subcategory: "gloss"})}>Foundation</option>
                            <option value="cc cream" onChange={()=> setEditPost({...editPost, subcategory: "lip care"})}>CC Cream</option>
                    </select> 
                    ) : 
                    (null)}  

                    <div className="form-group_addpost">
                        <label className="text-muted">Text</label>
                        <textarea 
                        name="body"
                        onChange={handleBodyChange}  
                        type="text" 
                        name= "body"
                        required
                        value={post.body}
                        className="form-control"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-raised btn-primary">Submit</button>        
                </form>
            </div> 
        </div>
    )
};


const mapStateToProps = ({ post: {post} }) => ({
    post
})


export default connect(mapStateToProps, null)(EditPost);