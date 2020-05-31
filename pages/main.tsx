import Head from 'next/head'
import React from "react"
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import Router from 'next/router'
import MainContents from '../components/MainContents';


type state = {
    schemaDisplay: string,
    typeDisplay: string
};

export default class Main extends React.Component<{},state> {
    constructor(props) {
        super(props);
        this.state = {
            schemaDisplay: 'none',
            typeDisplay: 'none'
        }
    }

    onClickSchema = () => {
        this.setState({schemaDisplay: this.state.schemaDisplay === 'none' ? 'block' : 'none',typeDisplay:'none'});
    }

    onClickType = () => {
        this.setState({typeDisplay: this.state.typeDisplay === 'none' ? 'block' : 'none',schemaDisplay:'none'});
    }

    render() {
        return (
            <div className="container">
      <Head>
        <title>GraphQL Service Page</title>
      </Head>
        <div className="main">
            <div className="side">
                <div className="main-menu-schema" onClick={this.onClickSchema} style={{background: `${this.state.schemaDisplay === 'none' ? '' : '#ececec'}`}}>Schema</div>
                <div className="sub-menu" style={{display: `${this.state.schemaDisplay}`}}>Query</div>
                <div className="sub-menu" style={{display: `${this.state.schemaDisplay}`}}>Mutation</div>
                <div className="main-menu-type" onClick={this.onClickType} style={{background: `${this.state.typeDisplay === 'none' ? '' : '#ececec'}`}}>Type</div>
                <div className="sub-menu" style={{display: `${this.state.typeDisplay}`}}>Type</div>
                <div className="sub-menu" style={{display: `${this.state.typeDisplay}`}}>Input</div>
                <div className="sub-menu" style={{display: `${this.state.typeDisplay}`}}>Enum</div>
                <div className="sub-menu" style={{display: `${this.state.typeDisplay}`}}>Interface</div>
                <div className="sub-menu" style={{display: `${this.state.typeDisplay}`}}>Union</div>
            </div>
            <div id="content-container" className="content">
                <MainContents/>
            </div>
        </div>
      <footer>
        <span>
          Created by bym
        </span>
      </footer>

      <style jsx>{`
        .container {
          min-height: 98vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .main {
          width: 100%;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: stretch;
        }

        .side {
            flex: 1;
        }

        .content {
            flex: 5;
        }

        footer {
          background: #fbfbfb;
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .main-menu-schema {
            cursor: pointer;
            user-select: none;
       }

       .main-menu-schema:hover {
            cursor: pointer;
            background: #ececec;
        }

       .main-menu-type {
            cursor: pointer;
            user-select: none;
       }

       .main-menu-type:hover {
            cursor: pointer;
            background: #ececec;
        }

       .sub-menu {
            cursor: pointer;
            margin: 10px 10px 10px 10px;
       }

       .sub-menu:hover {
            cursor: pointer;
            margin: 10px 10px 10px 10px;
            background: #ececec;
        }
       .sub-menu-mutation {

       }

        body {
            background: #b5a3ff;
        }

      `}</style>
    </div>
        )
    }
}