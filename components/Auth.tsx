import React from 'react';
import SideMenu from '../components/SideMenu'
import jwt from 'jsonwebtoken'
import Router from 'next/router';

function Auth(props:any) {

    const { Component } = props;
    const store = JSON.parse(localStorage.getItem('persist:root'));
    const { token } = store ? JSON.parse(store.TokenReducer) : {token:''};

    const introRender = (Component:any, token:string) => {
        if(token && Component.displayName !== 'Connect(Login)') {
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
        } else if(!token && Component.displayName === 'Connect(Login)'){
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


    jwt.verify(token, 'secret', (err:any, decode:any) => {
        console.log(err);
        if(err === null) {
            if(Router.pathname === '/') {
                Router.push('/graphqlService/schema')
            }
        } else if(Router.pathname !== '/') {
            Router.push('/');
        }
    });
    return (
        <div className="most-outside-container">
            {introRender(Component,token)}
        </div>
    )
}

export default Auth