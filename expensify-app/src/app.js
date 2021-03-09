import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { addState } from './actions/expenses';
const store = configureStore(); // instancier store

const action1 = store.dispatch(addState({ description: 'Water bill', price: 3, createdAt: -11000 }));
const action2 = store.dispatch(addState({ description: 'Gas bill', price: 1, createdAt: 1000 }));
const action3 = store.dispatch(addState({ description: 'Test bill', price: 2, createdAt: -1000 }));

const jsx = ( // Provider permet de passer les données de store au composent principal
    <Provider store={store}> 
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
