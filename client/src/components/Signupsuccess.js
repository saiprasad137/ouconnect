import React, { Component } from 'react'
import "./Loginstyle.css"
import { connect } from 'react-redux'
import Loadergif from  "./loader.gif";

class Signupsuccess extends Component {
state = {}

    render() {
        const {accountCreated} = this.props;

        if(!accountCreated) return null;

        return (
            <div class="loader-container">
                <div className="loader">
                    <label>Sign Up is succesful.Please log in!</label>
                </div>
            </div>
            // <div class="sk-chase">
            //     <div class="sk-chase-dot"></div> 
            //     <img src={Loadergif} />
            //     <div class="sk-chase-dot"></div>
            //     <div class="sk-chase-dot"></div>
            //     <div class="sk-chase-dot"></div> 
            //     <div class="sk-chase-dot"></div> 
            //     <div class="sk-chase-dot"></div>
            // </div>
        )
    }
}

function mapStatetoProps(state) {
    console.log(state)
    return {
        authenticated : state.auth.authenticated,
        loading : state.auth.loading,
        accountCreated : state.auth.accountCreated
    }
}

export default connect(mapStatetoProps)(Signupsuccess);
