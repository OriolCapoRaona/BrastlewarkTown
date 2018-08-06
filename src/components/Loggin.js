import React from 'react';
import './../styles/index.css';

// This component shows the log in page.
// It just have 2 inputs, and when they are filled in,
// and when clicking on Log in button, navigates
// to the Home Page
export class Loggin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ""
        }
    }

    LogIn = () => {
        let that = this;
        let username = document.getElementById("usernameInput");
        let password = document.getElementById("passwordInput");
        let state = "";
        if (username.value.length && password.value.length) {
            document.getElementById('spinner').style.display = 'inline-block';
            setTimeout(function(){
                state = "";
                that.props.LogIn(username.value);
            }, 1500);
        } else {
            state = "Username or password incorrect. Please, try again";
        }
        this.setState({
            errorMessage: state
        })
    }

    render() {
        return (
            <div className="LogginBackground">
                <nav className="navbar navbar-light bg-light mynavbar">
                    <a className="navbar-brand">
                        <img src="https://www.shareicon.net/download/2016/08/02/805648_gnome.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
                        Brastlewark
                    </a>
                </nav>
                <div className="CenteredLoggin">
                    <div className="LogginZone">
                        <h2>Sign in <i id="spinner" className="fa fa-spinner fa-spin" style={{ fontSize: "24px" }}></i></h2>
                        <div className="input-group mb-3" style={{ marginBottom: '10px!important' }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-user"></i></span>
                            </div>
                            <input id="usernameInput" type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon2"><i className="fas fa-lock"></i></span>
                            </div>
                            <input id="passwordInput" type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon2" />
                        </div>
                        <button type="button" className="btn btn-outline-warning btn-lg btn-block" onClick={this.LogIn}>Sign in</button>
                        <p className="text-danger" style={{ marginTop: "20px" }}>{this.state.errorMessage}</p>
                    </div>
                </div>
            </div>
        )
    }
}