import _ from 'lodash';
import React, { Component ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from "../../actions/index"
import Header from "../header";
import Reload from "../Reload";
import Comments from "./posts_detail/comments"
import Commentnew from "./posts_detail/comment_new"
import Helmet from 'react-helmet';
import jwt from "jsonwebtoken";
import axios from 'axios';
import jsPDF from 'jspdf';
import download from 'downloadjs';
import "./profileUpdateStyle.css";


class PostList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      verified: '',
      signedin: ''
    }
    this.decide = this.decide.bind(this);
  }


  componentDidMount() {
    this.decide();
    this.props.fetchPosts();
    
  }
  
  renderTags(tags) {
    return tags.map(tag => {
      return <span className="" key={tag}>{tag}</span>;
    });
  }

  
  
   pdfGenerate = () =>{
     var doc = new jsPDF('landscape','px','a4',false);
    //  doc.addFileToVFS(`http://localhost:5000/public/img/users/${post.post}`,"Hello");
     doc.save('a.pdf');
   }
  renderPostSummary(post) {
    const downloadFile = async (id, path, mimetype) => {
      try {
        const result = await axios.get(`http://localhost:5000/download/${post._id}`, {
          responseType: 'blob'
        });
        // const split = path.split('/');
        const filename = path;
        // setErrorMsg('');
        console.log("sai");
        console.log(filename);
        return download(result.data, filename, mimetype);
      } catch (error) {
        // if (error.response && error.response.status === 400) {
        //   setErrorMsg('Error while downloading file. Try again later');
        // }
        console.log(error);
      }
    };
  
    return (
      <div key={post._id}>
        <span>Title: {post.title}</span><br />
        <span className="span-with-margin text-grey"> • </span><br></br>
        <span className="span-with-margin text-grey">Author : {post.authorName}</span><br></br>
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey">{post.post}</span>
        {/* {<Link className="link-without-underline" to={`http://localhost:5000/public/img/users/${post.post}`}>  Download file</Link>} */}
        {/* <a href = {`http://localhost:5000/public/img/users/${post.post}`} target = "_blank">Download Pdf</a> */}
        <div class = "image-preview" id = "imagePreview"> 
          <img src = {`http://localhost:5000/public/img/users/useruploadedpost - ${post.content}.jpeg`} class = "image-preview__image"  alt = "Image Preview"/> 
        </div>
        <a href="#/" onClick={() =>
                        downloadFile(`${post._id}`, `${post.post}`, 'application/pdf')
                      }
        > Download file </a>
        <h3>
          {/* <Link className="link-without-underline" to={`/posts/${post._id}`}>
            {post.title}
          </Link> */}
          <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
        </h3>
        <br />
        {/* <Link className="link-without-underline" to={`/commentnew/${post._id}`}> Comment </Link>
        <br />
        <Link className="link-without-underline" to={`/comments/${post._id}`}> View Comments </Link> */}
        {this.state.signedin === true && <Link className="link-without-underline" to={`/commentnew/${post._id}`}> Comment </Link>}
        <br />
        {<Link className="link-without-underline" to={`/comments/${post._id}`}> View Comments </Link>}
        {/* {this.renderTags(post.categories)} */}
        <hr />
        <Helmet>
          <script>
              {`
                  const inpFile = document.getElementById("inpFile");
                  const previewContainer = document.getElementById("imagePreview");
                  const previewImage = previewContainer.querySelector(".image-preview__image");
                  const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

                  inpFile.addEventListener("change", function() {
                      const file = this.files[0];

                      if (file) {
                          const reader = new FileReader();

                          previewDefaultText.style.display = "none";
                          previewImage.style.display = "block";

                          reader.addEventListener("load", function() {
                              console.log(this);
                              previewImage.setAttribute("src",this.result);
                          });
                          reader.readAsDataURL(file);
                      }
                      else {
                          previewDefaultText.style.display = null;
                          previewImage.style.display = null;
                          previewImage.setAttribute("src","");
                      }
                      
                  })
              `}
          </script>
          </Helmet>
      </div>
    );
  }
  decide() {
    axios.get('http://localhost:5000/token', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
    // axios.get('/token', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => {
        if (res.data === true) {
          this.setState({
            signedin : true
          })
          console.log(this.state.signedin);
        }
      })
      .catch((error) => {
        console.log(error)
      });
      setTimeout(() => {
        if(this.state.signedin === true) {
          axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
          // axios.get('/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
                .then((res) => {
                  if (res.data.isverified === "true") {
                    this.setState({
                      verified : true
                    })
                  }
                  console.log(this.state.verified);
                })
                .catch(error => {
                  console.log(error);
                })
            }
      }, 4000);
    
    }

    
  render() {
    // this.reload();
      return (
        <div>
          {/* <Header /> */}
          <Reload />
        <br></br>
        <br />
        <br />
        <div className="post">
        {/* {this.decide()} */}
          { this.state.verified === true && <Link className="btn btn-primary mb-5" to={'/postnew'}>Publish A New Post</Link> }
          {_.map(this.props.posts, post => {
            return this.renderPostSummary(post);
          })}
          
        </div>
        </div>
      );
    
  }
}



function mapStateToProps(state) {
    // window.location.reload(false);
    console.log(state)

  return {
    authenticated: state.auth.authenticated, 
    posts: state.posts 
  };
}

export default connect(mapStateToProps , { fetchPosts })(PostList);

