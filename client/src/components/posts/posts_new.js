import React, { Component , useState, useRef } from 'react';
import axios from 'axios';
// import Header from "./header";
import Dropzone from 'react-dropzone';
import Helmet from 'react-helmet';
import { connect } from "react-redux";
import { Form, Row, Col, Button } from 'react-bootstrap';


  


    class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangecategories = this.onChangecategories.bind(this);
        this.onChangecontent = this.onChangecontent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            title : '',
            categories : '',
            content : ''
        }
    }


    onChangetitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangecategories(e) {
        this.setState({ categories: e.target.value })
    }

    onChangecontent(e){
        this.setState({ content: e.target.value })
    }

    changestringtoarray() {
        this.setState({
            categories : this.state.categories.split(',')
        })
    }

    handleInputChange(e) {
        this.setState({
            post: e.target.files[0]
          })
    }

    onSubmit(e) {
        e.preventDefault()

        // console.log(this.state.title,this.state.categories,this.state.content)
        const formdet = {
            title : this.state.title,
            categories : this.state.categories,
            content : this.state.content
        }
        const token = localStorage.getItem("token")
        axios.get('http://localhost:5000/token/restriction', { headers: {"Authorization" : `Bearer ${token}`} })
        // axios.get('/token/restriction', { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res) => {
            console.log(res.data);
            if(res.data){
            axios.post('http://localhost:5000/api/createpost',formdet,{
            // axios.post('/api/createpost',formdet,{
                headers: { "Authorization": `Bearer ${token}` }})
            .then((res)=>{
                console.log(res.data);
            })
            .catch((error)=>{
                console.log(error.response.data);
            })
            console.log("hoka");
        }
        })
        .catch((error)=>{
            console.log(error.response.data);
        })

        const data = new FormData();
        data.append('post', this.state.post);
        console.log(this.state.post);
        axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      // axios.get('/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      .then((res)=>{
          console.log(res.data);
          var name = res.data.Name;
          var content = this.state.content;
        //   console.log(id);
              axios.post(`http://localhost:5000/uploadpost/${name}/${content}`,data,{
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                //   }
              })
              .then((res) => {
                  console.log(res.data);
              }).catch((err) => {
                  console.log(err);
              })
          })
      .catch((err) => {
          console.error(err);
      })
        

        setTimeout(() => {
            this.props.history.push({
                pathname: '/posts',
            });
        },2000);
    }




    render() {
        // const [file, setFile] = useState(null); // state for storing actual image
        // const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
    
        // const [errorMsg, setErrorMsg] = useState('');
        // const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
        // const dropRef = useRef(); // React ref for managing the hover state of droppable area
      
        // const onDrop = (files) => {
        //     const [uploadedFile] = files;
        //     setFile(uploadedFile);
          
        //     const fileReader = new FileReader();
        //     fileReader.onload = () => {
        //       setPreviewSrc(fileReader.result);
        //     };
        //     fileReader.readAsDataURL(uploadedFile);
        //     setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
        // };

        
        return (
            // <div>
            //     <div class="form-container">


            //         <form onSubmit={this.onSubmit} id="form">
            //             <h3>Add Post</h3>
            //             <div class="container">                          
            //                 <input type="text" value={this.state.title} onChange={this.onChangetitle} placeholder="title"></input>
            //             </div>
            //             <div class="container">                            
            //                 <input type="text" value={this.state.categories} onChange={this.onChangecategories} placeholder="categories"></input>                           
            //             </div>
            //             <div class="container">                           
            //                 <input type="text" value={this.state.content} onChange={this.onChangecontent} placeholder="content" />                           
            //             </div>                       
            //             <input type="submit" value="Submit" />
            //         </form>
            //     </div>
            // </div>

            <div class="min-h-screen flex items-center justify-center bg-blue-400">
            <div class="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2 lg:w-1/4">

                <h2 class="text-3xl font-bold mb-6 text-gray-900 flex justify-center">Add Post</h2>
                
                <form class="space-y-5" onSubmit={this.onSubmit} id="form">
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Title</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.title} onChange={this.onChangetitle} />
                </div>
                
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Category</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.categories} onChange={this.onChangecategories} />
                </div>

                <div>
                    <label class="block mb-1 font-bold text-gray-700">Content</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.content} onChange={this.onChangecontent} />
                </div>
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Attach a pdf</label>
                    <input type = "file" name = "inpFile" id = "inpFile" accept = "application/pdf" onChange={this.handleInputChange} class="pt-4"/>
                </div>
                {/* <div className="upload-section">
                <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                    <input {...getInputProps()} />
                    <p>Drag and drop a file OR click here to select a file</p>
                    {file && (
                        <div>
                        <strong>Selected file:</strong> {file.name}
                        </div>
                    )}
                    </div>
                )}
                </Dropzone>
                {previewSrc ? (
                isPreviewAvailable ? (
                    <div className="image-preview">
                    <img className="preview-image" src={previewSrc} alt="Preview" />
                    </div>
                ) : (
                    <div className="preview-message">
                    <p>No preview available for this file</p>
                    </div>
                )
                ) : (
                <div className="preview-message">
                    <p>Image preview will be shown here after selection</p>
                </div>
                )}
                </div> */}
                <div class="flex justify-center">
                <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={this.update}>Submit</button>
                </div>
    
                </form>
            </div>

        </div>
        )
    }
}

function mapStatetoProps(state) {
    // console.log(state)
    return {
        authenticated : state.auth.authenticated,
        username :state.auth.username
    }
}

export default connect(mapStatetoProps)(CreateUser);