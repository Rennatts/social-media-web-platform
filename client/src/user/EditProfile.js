import React, { Component } from 'react';
import { isAuthenticated, updateUser } from './../auth';
import { Redirect} from 'react-router-dom';
import DefaultProfile from '../images/avatar.jpg';
import './css/EditProfile.css';



class EditProfile extends Component {

    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            about: "",
            password: "",
            redirectToProfile: false,
            error: "",
            loading: false,
            fileSize: 0,
            file: ""
        }
    };

    componentDidMount() {
       this.userData = new FormData()
        const userId = this.props.match.params.userId;
        fetch(`http://localhost:5050/users/user/${userId}`, {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${isAuthenticated().token}`,
            }
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({ 
                    id: data._id, 
                    name: data.name, 
                    email: data.email, 
                    error: "",
                    about: data.about
                });
            }
        });
    };



    isValid = () => {
        const {name, password, fileSize} = this.state
        if(fileSize > 1000000) {
            this.setState({error: "File size should be less than 100kb"});
            return false;
        }
        if(name.length === 0) {
            this.setState({error: "Name is required", loading: false});
            return false;
        }
        if(password.length >= 1 && password.length <=5) {
            this.setState({error: "Password must be at least 6 characters long", loading: false});
            return false;
        }
        return true;
    }

    handleChange = (name) => (event) => {
        this.setState({error: ""})
        const value = name === 'file' ? event.target.files[0] : event.target.value

        const fileSize = name === 'file' ? event.target.files[0].size : 0;
        this.userData.set(name, value)
        this.setState({ [name]: value, fileSize });

    };


    onSubmit = event => {
        event.preventDefault();
        this.setState({loading: true})

        if (this.isValid()){
    
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
            fetch(`http://localhost:5050/users/user/${userId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: this.userData
            })
            .then(res => {
                return res.json()
            })
            .catch(error => console.log(error))
            .then(data => {
                if(data.error) {
                    this.setState({ error: data.error })
                } else {
                    updateUser(data, () => {
                        this.setState({
                            redirectToProfile: true
                        });
                    })
                };
            }); 
        }
    };



    signupForm = (name, password, about) => (
        <form className="edit_profile_form">
            
            <div className="form-group_profile">
                <label className="text-muted">Profile photo</label>
                <input 
                onChange={this.handleChange("file")} 
                type="file" 
                accept= "image/*"
                className="edit_profile_img">
                </input>
            </div>

            <div className="form-group_profile">
                <label className="text-muted">Name</label>
                <input 
                onChange={this.handleChange("name")} 
                type="text" 
                className="profile_input"
                value={name}></input>
            </div>

            <div className="form-group_profile">
                <label className="text-muted">Password</label>
                <input 
                onChange={this.handleChange("password")} 
                type="password" 
                required
                className="profile_input"
                value={password}></input>
            </div>


            <div className="form-group_profile">
                <label className="text-muted">About</label>
                <textarea 
                onChange={this.handleChange("about")} 
                type="text" 
                className="profile_input"
                value={about}></textarea>
            </div>

            <button onClick={this.onSubmit} className="btn btn-raised btn-primary">Update</button>
                    
        </form>  
    );


    render() {
        const {id, name, password, redirectToProfile, error, loading, file, about} = this.state;
        if(redirectToProfile) {
            return <Redirect to={`/user/${id}`}></Redirect>
        }
        

        return (
            <div className= "editar_perfil_container">
                <div className= "perfil_container">
                    <h2 className="mt-5 mb-5">Edit Profile{this.props.name}</h2>
                    
                    <div 
                    className="alert alert-danger" 
                    style={{display: error ? "" : "none"}}>{error}
                    </div>

                    
                    <img 
                    style={{height: "200px", width: "auto"}} 
                    className= "img-thumbnail"
                    src={file}
                    onError= {i => (i.target.src= `${DefaultProfile}`)} 
                    alt={name}
                    ></img>

                    {this.signupForm(name, password, about)}
                </div>
            </div>
        );
    }
}

export default EditProfile;