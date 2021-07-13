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

        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            post : ''
        }
    }

    handleInputChange(e) {
        this.setState({
            post: e.target.files[0]
          })
    }

    onSubmit(e) {
        e.preventDefault()

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
        

        // setTimeout(() => {
        //     this.props.history.push({
        //         pathname: '/posts',
        //     });
        // },2000);
    }

    render() {
        return (
            <div class="min-h-screen flex items-center justify-center bg-blue-400">
            <div class="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2 lg:w-1/4">

                <h2 class="text-3xl font-bold mb-6 text-gray-900 flex justify-center">Add Post</h2>
                
                <form class="space-y-5" onSubmit={this.onSubmit} id="form">
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

export default connect(mapStatetoProps)(Files);