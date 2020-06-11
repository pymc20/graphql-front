import React from "react"
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import Router from 'next/router'
import { connect } from 'react-redux';
import { addTokenAction } from '../redux/actions/TokenAction';
import getConfig from 'next/config'

interface state {
  id:String,
  pass:String,
  modalVisible:Boolean
}

interface props {
  addTokenAction:any;
}

class Index extends React.Component<props,state> {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pass: '',
      modalVisible: false
    }
  }

  graphqlPost = async (query) => {
    const url = "http://localhost:8000/graphql";
    const opts:RequestInit = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    };
    const res = await fetch(url, opts);
    const { data } = await res.json();
    return data;
  }

  onChangePass = (e:any) => {
    const pass = e.target.value;
    this.setState({pass})
  }

  onChangeId = (e:any) => {
    const id = e.target.value;
    this.setState({id})
  }

  onClickSignUp = () => {
    const { modalVisible } = this.state;
    this.setState({modalVisible: !modalVisible})
  }

  onClickSignIn = async () => {
    const { id, pass } = this.state;
    if(_.isEmpty(id) && _.isEmpty(pass)) {
      return
    } else {
      const { publicRuntimeConfig } = getConfig()
      console.log('serverRuntimeConfig : ',getConfig());
      const query = `
          {
            getHash(id: "${id}") {
              hash
              salt
            }
          }
        `;
      const { getHash } = await this.graphqlPost(query);
      const { hash, salt } = getHash;
      if(bcrypt.compareSync(pass,hash)) {
        const token = jwt.sign({
          data: 'data'
        }, publicRuntimeConfig.secret, {expiresIn: '1h'});
        this.props.addTokenAction(token);
        const query = `
          {
            signIn(id: "${id}") {
              done
            }
          }
        `;
        const { signIn } = await this.graphqlPost(query);
        const { done } = signIn;
        if(done) {
          Router.push('/graphqlService/schema');
        }
      }
    }
  }
  render() {
    return (
      <div className="sign-container">
        <h1>GraphQL Service Page</h1>
        <div className="sign-in-container">
          <div className="sign-id">
            <input onChange={this.onChangeId} placeholder="id"></input>
          </div>
          <div className="sign-pass">
            <input type="password" onChange={this.onChangePass} placeholder="password"></input>
          </div>
          <div className="sign-button-container">
            <span className="sign-button" onClick={this.onClickSignIn}>Sign In</span>
            <div className="sign-seperate"/>
            <span className="sign-button" onClick={this.onClickSignUp}>Sign Up</span>
          </div>
        </div>
        <div className={`${this.state.modalVisible ? 'modal modal-visible' : 'modal'}`}>
          <div className="modal-content">
            <div className="sign-id">
              <input onChange={this.onChangeId} placeholder="id"></input>
            </div>
            <div className="sign-pass">
              <input type="password" onChange={this.onChangePass} placeholder="password"></input>
            </div>
            <h1>Sign Up</h1>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      TokenReducer: {...state.TokenReducer}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      addTokenAction: (token) => dispatch(addTokenAction(token)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Index)