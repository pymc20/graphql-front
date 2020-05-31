import Head from 'next/head'
import React from "react"
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import Router from 'next/router'

let pass:String, id:String;

const onChangePass = (e:any) => {
  pass = e.target.value;
}

const onChangeId = (e:any) => {
  id = e.target.value;
}

const onClickSingIn = async () => {
  if(_.isEmpty(id) && _.isEmpty(pass)) {
    return
  } else {
    const query = `
        {
          getHash(id: "${id}") {
            hash
            salt
          }
        }
      `;
    const url = "http://localhost:8000/graphql";
      const opts:RequestInit = {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      };
      fetch(url, opts)
        .then(res => res.json())
        .then(({data}) => {
          const hash = _.get(data,"getHash.hash","");
          const salt = _.get(data,"getHash.salt","");
          if(bcrypt.compareSync(pass,hash)) {
            const token = jwt.sign({
              exp: new Date().getTime() + 3600000,
              iat: new Date().getTime()
            }, 'secret');
            console.log(token);
            const query = `
            {
              signIn(data: {
                id: "${id}"
                token: "${token}"
              }) {
                done
              }
            }
          `;
          const url = "http://localhost:8000/graphql";
          const opts:RequestInit = {
            method: "POST",
            headers: { 
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
          };
          fetch(url, opts)
            .then(res => res.json())
            .then(({data}) => {
              const done = _.get(data,"signIn.done","");
              if(done) {
                console.log(done);
                Router.push('/main');
              } else {
                console.log(done);
              }
            })
            .catch(console.error);
          } else {

          }})
          .catch(err=>console.log(err))
        }
}

export default () => {
  return (
    <div className="container">
      <Head>
        <title>GraphQL Service Page</title>
      </Head>
      <main>
        <h1>GraphQL Service Page</h1>
        <div className="sign-in-container">
          <div className="sign-in-id">
            <input onChange={onChangeId}></input>
          </div>
          <div className="sign-in-pass">
            <input type="password" onChange={onChangePass}></input>
          </div>
          <div className="sign-in-button" onClick={onClickSingIn}>
            Sign In
          </div>
        </div>
      </main>
      <footer>
        <span>
          Created by bym
        </span>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .sign-in-container {
          display: flex;
          flex-direction: column;
        }

        .sign-in-id {
          border: 1px solid;
          padding: 10px 10px 10px 10px;
          margin-bottom: 15px;
        }

        .sign-in-pass {
          border: 1px solid;
          padding: 10px 10px 10px 10px;
          margin-bottom: 25px;
        }

        .sign-in-button {
          text-align: center;
          font-size: 30px;
          font-weight: 100;
          cursor: pointer;
        }

        input {
          border: none;
          font-size: 15px;
        }

        input:focus {
          outline: none;
        }

      `}</style>
    </div>
  )
}
