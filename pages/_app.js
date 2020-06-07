import '../public/scss/main.scss';
import Head from 'next/head'
import React from 'react';
import App from 'next/app'
import SideMenu from '../components/SideMenu'
import { createWrapper } from 'next-redux-wrapper'
import { createStore } from 'redux'
import { ReactReduxContext } from 'react-redux'
import reducers from '../redux/reducers/index'
import Actions from '../redux/actions/index'
import { PersistGate } from 'redux-persist/integration/react';

const makeStore = () => {
    const {persistStore, persistReducer} = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;
    const persistConfig = {
        key: 'root',
        storage
    };
    const persistedReducer = persistReducer(persistConfig, reducers);
    
    const store = createStore(persistedReducer);
    
    store.__persistor = persistStore(store);

    return store;
}

const wrapper = createWrapper(makeStore);

class MyApp extends App{

    static async getInitialProps(context) {
        const { ctx, Component, router } = context;
        let pageProps = {}
        const store = ctx.store;
        const { TokenReducer } = store.getState();
        const { token } = store.dispatch(Actions.TokenAction.checkTokenAction(TokenReducer.token));
        if(token === '') {
            pageProps['auth'] = false;
            if(!(router.pathname === '/')) {
                ctx.res.writeHead(302, {
                    Location: '/',
                    'Content-Type': 'text/html; charset=utf-8',
                })
                ctx.res.end()
            }
        } else {
            pageProps['auth'] = true;
        }
        return { pageProps, store }
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <ReactReduxContext.Consumer>
                {({ store }) => {
                    return <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
                        <div className="most-outside-container">
                        <Head>
                            <title>GraphQL Service Page</title>
                        </Head>
                        {pageProps.auth
                        ?
                        <div className="content-container">
                            <SideMenu/>
                            <div id="content-canvas-container" className="content">
                                <Component {...pageProps} />
                            </div>
                        </div>
                        :
                        <Component pageProps="/"/>
                        }
                        <div className="general-footer">
                            <span>Created By bym</span>
                        </div>
                        </div>
                    </PersistGate>
                }}
            </ReactReduxContext.Consumer>
        )
    }
}

export default wrapper.withRedux(MyApp)