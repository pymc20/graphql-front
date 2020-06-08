import React from 'react';
import SideMenu from '../components/SideMenu'
import jwt from 'jsonwebtoken'
import Router from 'next/router';

class Auth extends React.Component{

    introRender = (Component, auth) => {
        if(auth && Component.displayName !== 'Connect(Index)') {
            return (
                <>
                    <div className="content-container">
                        <SideMenu/>
                        <div id="content-canvas-container" className="content">
                            <Component/>
                        </div>
                    </div>
                    <div className="general-footer">
                        <span>Created By bym</span>
                    </div>
                </>
            )
        } else if(!auth && Component.displayName === 'Connect(Index)'){
            return (
                <>
                    <Component/>
                    <div className="general-footer">
                        <span>Created By bym</span>
                    </div>
                </>
            )
        } else {
            return (
                <div className="loading-container">
                    <div className="loading-spin"></div>
                    <div className="loading-text">Loading</div>
                </div>
            )
        }
    }

    render() {
        const { Component, pageProps } = this.props;
        const store = JSON.parse(localStorage.getItem('persist:root'));
        const { token } = JSON.parse(store.TokenReducer);
        let auth = false;
        jwt.verify(token, 'secret', (err, decode) => {
            console.log(err);
            if(err === null) {
                auth = true;
                if(Router.pathname === '/') {
                    Router.push('/graphqlService/schema')
                }
            } else if(Router.pathname !== '/') {
                Router.push('/');
            }
        });
        return (
            <div className="most-outside-container">
                {this.introRender(Component,auth)}
            </div>
        )
    }
}

export default Auth