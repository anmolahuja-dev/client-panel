import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
    state={
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        balance:''
    }

    onChange=(e)=>{
        this.setState({
          [e.target.name]:e.target.value  
        });
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const newClient =  this.state;

        const {firestore}= this.props;

        if(newClient.balance===''){
            newClient.balance=0;
        }

        //firestore.add returns promise
        firestore.add({collection:'clients'},newClient).then(()=> this.props.history.push('/'));
    }

    render() {

        const {disableBalanceOnAdd} = this.props.settings;

        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left"></i> Back to dashboard
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        Add Client
                    </div>
                    <div className="card-body">
                        <form action="post" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName"> First Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    minLength="2"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName"> Last Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    minLength="2"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.lastName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"> Email</label>
                                <input 
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone"> Phone</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    minLength="10"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.phone}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="balance"> Balance</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    name="balance"
                                    onChange={this.onChange}
                                    value={this.state.balance}
                                    disabled={disableBalanceOnAdd}
                                />
                            </div>
                            <input type="submit" value="Submit" className="btn btn-primary mt-2"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddClient.propTypes = {
    firestore:PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    settings: state.settings
})

export default compose(connect(mapStateToProps),firestoreConnect())(AddClient);
//This add firestore methods as props to AddClient