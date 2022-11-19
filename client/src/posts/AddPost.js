import React, { useState } from 'react';
import { isLogged } from './../auth/index';
import { useDispatch } from 'react-redux'; 
import { addPost } from '../redux/actions/postActions';
import { Redirect } from 'react-router';
import './css/AddPost.css';


function AddPost(){
    const [post, setPost] = useState({
        brand: "",
        productname: "",
        category: "",
        subcategory: "",
        body: "",
        rating: 0,
        file: [],
    });

    console.log(post);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect]= useState(false);
    const [categorySelected, setCategorySelected] = useState();


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

    function handleBrandChange(event){
        setError("");
        const value = event.target.value;

        setPost({...post, [ event.target.name ]: value});

    }

    function handleProductNameChange(event){
        setError("");
        const value = event.target.value;

        setPost({...post, [ event.target.name ]: value});

    }


    function handleBodyChange(event){
        setError("");
        const value = event.target.value;

        setPost({...post, [ event.target.name ]: value});

    }


    function handleFormSubmit(event){
        event.preventDefault();

        const userId = jwt.user._id;
        const token = jwt.token;
        const postData = new FormData();

        post.brand && postData.append("brand", post.brand);
        post.productname && postData.append("productname", post.productname);
        post.category && postData.append("category", post.category);
        post.body && postData.append("body", post.body);
        if(post.rating && post.rating !== 0){
            post.rating && postData.append("rating", post.rating);
        }

        console.log(post);

        for(let i= 0; i < post.file.length; i++) {
            post.file[i] && postData.append('file', post.file[i])
        };
        

        dispatch(addPost(token, userId, postData));
        setPost({...post, brand: "", productname: "", category: "", body: "", file: []});
        setRedirect(true);
        if (redirect){
            return <Redirect to="/" ></Redirect>
        };
        setLoading(false);
    };

    function handleChange(e){
        setPost({...post, category: e.target.value});
        setCategorySelected(post.category)
    }

    function handleSubcategoryChang(e){
        setPost({...post, subcategory: e.target.value});
    }


    return (
        <div className="addpost_container">
            <div className="addpost">
                <h2 className="mt-5 mb-5">Create a Review!!</h2>

                <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
                    <div className="stars_reviews">

                        <div className="reviews">
                            <input type="radio" value={5} name="rating" id="rd-5" onChange={()=> setPost({...post, rating: 5})}></input>
                            <label htmlFor="rd-5" className="fas fa-star"></label>

                            <input type="radio" value={4} name="rating" id="rd-4" onChange={()=> setPost({...post, rating: 4})}></input>
                            <label htmlFor="rd-4" className="fas fa-star"></label>

                            <input type="radio" value={3} name="rating" id="rd-3" onChange={()=> setPost({...post, rating: 3})}></input>
                            <label htmlFor="rd-3" className="fas fa-star"></label>

                            <input type="radio" value={2} name="rating" id="rd-2" onChange={()=> setPost({...post, rating: 2})}></input>
                            <label htmlFor="rd-2" className="fas fa-star"></label>

                            <input type="radio" value={1} name="rating" id="rd-1" onChange={()=> setPost({...post, rating: 1})}></input>
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
                        <option value="batom" onChange={()=> setPost({...post, category: "batom"})}>Batom</option>
                        <option value="base" onChange={()=> setPost({...post, category: "base"})}>Base</option>
                        <option value="sombra" onChange={()=> setPost({...post, category: "sombra"})}>Sombra</option>
                    </select>

                    {post.category === "base" ? 
                    (
                    <select 
                        class="selectpicker" 
                        name="selectpicker"
                        value={post.subcategory} 
                        onChange={handleSubcategoryChang}>
                            <option name="" value="0">Select subcategory</option>
                            <option value="bb cream" onChange={()=> setPost({...post, subcategory: "bb cream"})}>BB Cream</option>
                            <option value="foundation" onChange={()=> setPost({...post, subcategory: "foundation"})}>Foundation</option>
                            <option value="cc cream" onChange={()=> setPost({...post, subcategory: "cc cream"})}>CC Cream</option>
                    </select> 
                    ) : 
                    (null)}  
                    
                    {post.category === "batom" ? 
                    (
                    <select 
                        class="selectpicker" 
                        name="selectpicker"
                        value={post.subcategory} 
                        onChange={handleSubcategoryChang}>
                            <option name="" value="0">Select subcategory</option>
                            <option value="bb cream" onChange={()=> setPost({...post, subcategory: "lips tink"})}>BB Cream</option>
                            <option value="foundation" onChange={()=> setPost({...post, subcategory: "gloss"})}>Foundation</option>
                            <option value="cc cream" onChange={()=> setPost({...post, subcategory: "lip care"})}>CC Cream</option>
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

export default AddPost;

