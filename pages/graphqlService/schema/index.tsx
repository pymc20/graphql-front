import React from "react"
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import MainContents from '../../../components/MainContents';
import Link from 'next/link'

export default class Index extends React.Component {

    render() {
        return (
            <MainContents/>
        )
    }
}