import axios from 'axios';
import {
  CREATE_COMMENT,
  FETCH_POSTS,
  FETCH_COMMENTS,
  PHOTO_NAME
} from './types';

export function fetchPosts() {
  return function(dispatch) {
    axios.get('http://localhost:5000/api/post/')
    // axios.get('/api/post/')
    .then((res) => {
      dispatch({
        type: FETCH_POSTS,
        payload: res.data,
      });
    });
  }
}

export const showLoader = () => dispatch => {
  dispatch({
    type:"SHOW_LOADER"
  })
}

export const hideLoader = () => dispatch => {
  dispatch({
    type:"HIDE_LOADER"
  })
}

export const showaccountCreated = () => dispatch => {
  dispatch({
    type:"SHOW_ACCOUNT_CREATED"
  })
}

export const hideaccountCreated = () => dispatch => {
  dispatch({
    type:"HIDE_ACCOUNT_CREATED"
  })
}

export function createComment({ comment, postId }, clearTextEditor, historyReplace) {

  return function(dispatch) {
    axios.post('http://localhost:5000/api/createcomment', { content: comment , postid : postId }, {
    // axios.post('/api/createcomment', { content: comment , postid : postId }, {
      headers: {authorization: localStorage.getItem('token')},  // require auth
    })
      .then((response) => {  // If success, clear the text editor
        dispatch({
          type: CREATE_COMMENT,
          payload: response.data,
        });
        clearTextEditor();  // - Clear text editor (UI)
        // historyReplace(`/posts/${postId}`, null);  // - clear alert message
      })
      .catch(({response}) => {  // If fail, render alert message

        // failure reason: un-authenticated
        if (!response.data.message) {
          return historyReplace(`/posts/${postId}`, {
            time: new Date().toLocaleString(),
            message: 'You must sign in before you can post new comment.',
          });
        }

        // failure reason: comment is empty
        historyReplace(`/posts/${postId}`, {
          time: new Date().toLocaleString(),
          message: response.data.message,
        });
      });
  }
}

export function fetchComments(postId) {
  return function(dispatch) {
    axios.get(`http://localhost:5000/api/comments/${postId}`).then((response) => {
    // axios.get(`/api/comments/${postId}`).then((response) => {
      dispatch({
        type: FETCH_COMMENTS,
        payload: response.data,
      });
    });
  }
}
// export function createPost({ title, categories, content }, historyPush, historyReplace) {

//   return function(dispatch) {
//     axios.post('http://localhost:5000/api/createpost/', {
//       title,
//       categories,
//       content,
//     }, {
//       headers: {authorization: localStorage.getItem('token')},  // require auth
//     })
//       .then((response) => {  // If create post succeed, navigate to the post detail page
//         dispatch({
//           type: CREATE_POST,
//           payload: response.data,
//         });
//       })
//       .catch((response) => {  // If create post failed, alert failure message
//         historyReplace('/postnew', {
//           time: new Date().toLocaleString(),
//           // message: response.data.message,
//         });
//       });
//   }
// }