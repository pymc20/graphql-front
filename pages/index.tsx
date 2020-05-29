import Head from 'next/head'
import React from "react"

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>GraphQL Service Page</title>
      </Head>
      <main>
        <h1>GraphQL Service Page</h1>
        <div className="sign-in-container">
          <div className="sign-in-id">
            <input></input>
          </div>
          <div className="sign-in-pass">
            <input type="password"></input>
          </div>
          <div className="sign-in-button">
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
