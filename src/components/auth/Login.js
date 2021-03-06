import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { notifyUser } from '../../actions/notifyActions';
import Alert from '../utilities/Alert';

class Login extends Component {
    state={
        email:'',
        password:''
    }

    onChange=(e)=>{
        this.setState({
          [e.target.name]:e.target.value  
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const {firebase,notifyUser} =  this.props; //notifyUser action is availabe in props
        const {email,password} =  this.state;
        firebase.login(
            {
                email,
                password
            }
        ).catch(error => notifyUser('Invalid User Credentials','error'));
    }

    render() {
        const {message,messageType} = this.props.notify;
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            {message ? (
                                <Alert message={message} messageType={messageType}/>
                            ):null}
                            <h1 className="text-center pb-4 pt-3">
                                <span className="text-primary">
                                    <i className="fas fa-lock"></i> Login
                                </span>
                            </h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email" className="fw-bold">Email</label>
                                    <input 
                                        type="email"
                                        name="email"
                                        className="form-control" 
                                        required
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="fw-bold">Password</label>
                                    <input 
                                        type="password"
                                        name="password"
                                        className="form-control" 
                                        required
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input type="submit" value="Login" className="btn btn-primary mt-2" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    firebase:PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    notify:state.notify
})

export default compose(
    connect(mapStateToProps,{notifyUser}),
    firebaseConnect()
)(Login);
// Actions must be passed in connect