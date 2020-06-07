import React from "react"
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import MainContents from '../../../components/MainContents';
import Link from 'next/link'

export default class Index extends React.Component {

    static async getInitialProps(context) {
        const { ctx, Component, router } = context;
        let pageProps = {}
        console.log(window);
        return { pageProps }
    }

    render() {
        return (
            <MainContents/>
        )
    }
}