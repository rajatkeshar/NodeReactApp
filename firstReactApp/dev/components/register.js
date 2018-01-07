import React from "react";
import api from './lib/api';
export class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            "name": '',
            "username": '',
            "email": '',
            "password1": '',
            "password2": '',
            "password": ''

        };
    }

    handleChangeName(value) {
        this.setState({
            "name": value
        });
    }
    handleChangeUsername(value) {
        this.setState({
            "username": value
        });
    }
    handleChangeEmail(value) {
        this.setState({
            "email": value
        });
    }
    handleChangePassword1(value) {
        this.setState({
            "password1": value
        });
    }
    handleChangePassword2(value) {
        this.setState({
            "password2": value
        });
        if(this.state.password1 === value) {
            this.setState({
                "password": value
            });
        }
    }

    registration(){
        console.log(this.state.password);
        var data = {
            "name": this.state.name,
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.password
        };
        this.setState({
            "name": '',
            "username": '',
            "email": '',
            "password1": '',
            "password2": ''
        });
        api.setMethod("POST").sendRequest("register", data, function(output) {
            if(output.error){
                document.getElementsByClassName('alert')[0].setAttribute('class', 'alert alert-danger');
                document.getElementsByClassName('alert')[0].innerText = '';
                document.getElementsByClassName('alert')[0].append(output.msg);
            } else {
                document.getElementsByClassName('alert')[0].setAttribute('class', 'alert alert-success');
                document.getElementsByClassName('alert')[0].innerText = '';
                document.getElementsByClassName('alert')[0].append(output.msg);
            }
        });
    }

    render() {
        return (
            <div>
                <h2 className="page-header">Registration</h2>
                <div className="alert"></div>
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.name} onChange={(e) =>this.handleChangeName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Username" name="username" value={this.state.username} onChange={(e) =>this.handleChangeUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={(e) =>this.handleChangeEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="Password" className="form-control" placeholder="Password" name="password" value={this.state.password1} onChange={(e) =>this.handleChangePassword1(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="Password" className="form-control" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={(e) =>this.handleChangePassword2(e.target.value)}/>
                    </div>
                </form>
                <button className="btn btn-default" onClick={() => this.registration()}>Submit</button>
            </div>
        );
    }
}
