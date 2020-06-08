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
import Auth from '../components/Auth'

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

    render() {
        const { Component, pageProps } = this.props;
        return (
            <ReactReduxContext.Consumer>
                {({ store }) => {
                    return <PersistGate persistor={store.__persistor}>
                        <Head>
                            <title>GraphQL Service Page</title>
                        </Head>
                        <Auth Component={Component}/>
                    </PersistGate>
                }}
            </ReactReduxContext.Consumer>
        )
    }
}

export default wrapper.withRedux(MyApp)