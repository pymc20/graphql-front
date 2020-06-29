import React, { useState } from "react"
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import Router from 'next/router'
import { connect } from 'react-redux';
import { addTokenAction } from '../redux/actions/TokenAction';
import getConfig from 'next/config'

function Login(props:any) {
  const [id,setId] = useState('');
  const [pass,setPass] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const graphqlPost = async (query:string) => {
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

  const onChangePass = (e:any) => {
    const pass = e.target.value;
    setPass(pass)
  }

  const onChangeId = (e:any) => {
    const id = e.target.value;
    setId(id)
  }

  const onClickSignUp = () => {
    setModalVisible(!modalVisible)
  }

  const onClickSignIn = async () => {
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
      const { getHash } = await graphqlPost(query);
      console.log(getHash)
      const { hash, salt } = getHash;
      if(bcrypt.compareSync(pass,hash)) {
        const token = jwt.sign({
          data: 'data'
        }, publicRuntimeConfig.secret, {expiresIn: '1h'});
        props.addTokenAction(token);
        const query = `
          {
            signIn(id: "${id}") {
              done
            }
          }
        `;
        const { signIn } = await graphqlPost(query);
        const { done } = signIn;
        if(done) {
          Router.push('/graphqlService/schema');
        }
      }
    }
  }

  return (
    <div className="sign-container">
        <h1>GraphQL Service Page</h1>
        <div className="sign-in-container">
          <div className="sign-id">
            <input onChange={onChangeId} placeholder="id"></input>
          </div>
          <div className="sign-pass">
            <input type="password" onChange={onChangePass} placeholder="password"></input>
          </div>
          <div className="sign-button-container">
            <span className="sign-button" onClick={onClickSignIn}>Sign In</span>
            <div className="sign-seperate"/>
            <span className="sign-button" onClick={onClickSignUp}>Sign Up</span>
          </div>
        </div>
        <div className={`${modalVisible ? 'modal modal-visible' : 'modal'}`}>
          <div className="modal-content">
            <div className="sign-id">
              <input onChange={onChangeId} placeholder="id"></input>
            </div>
            <div className="sign-pass">
              <input type="password" onChange={onChangePass} placeholder="password"></input>
            </div>
            <h1>Sign Up</h1>
          </div>
        </div>
      </div>
  )
}

const mapStateToProps = (state:any) => {
  return {
      TokenReducer: {...state.TokenReducer}
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
      addTokenAction: (token:any) => dispatch(addTokenAction(token)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)