import React from 'react';
import api from './lib/api';
export class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            "username": '',
            "password": ''
        };
    }
    handleChangeUsername(value) {
        this.setState({
            "username": value
        });
    }

    handleChangePassword(value) {
        this.setState({
            "password": value
        });
    }

    login() {
        var data = {
            "username": this.state.username,
            "password": this.state.password
        }
        api.setMethod("POST").sendRequest("login", data, function(output) {
            /*if(output.error){
                document.getElementsByClassName('alert')[0].setAttribute('class', 'alert alert-danger');
                document.getElementsByClassName('alert')[0].innerText = '';
                document.getElementsByClassName('alert')[0].append(output.msg);
            } else {
                document.getElementsByClassName('alert')[0].setAttribute('class', 'alert alert-success');
                document.getElementsByClassName('alert')[0].innerText = '';
                document.getElementsByClassName('alert')[0].append(output.msg);
            }*/
            console.log(output.msg);
        });
    }
    render() {
        return (
            <div>
                <h2 className="page-header">Login</h2>
                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Username" name="username" value={this.state.username} onChange={(e) =>this.handleChangeUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="Password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={(e) => this.handleChangePassword(e.target.value)}/>
                    </div>
                </form>
                <button className="btn btn-default" name="Submit" onClick = {(e) => this.login()}>Submit</button>
            </div>
        );
    }
}
