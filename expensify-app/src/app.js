import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { addState } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getFilteredExpense from './selectors/expenses';

const store = configureStore(); // instancier store

const action1 = store.dispatch(addState({ description: 'Water bill', price: 10000, createdAt: -11000 }));
const action2 = store.dispatch(addState({ description: 'Gas bill', price: 100000, createdAt: -1000 }));

//store.dispatch(setTextFilter('bill'));
store.dispatch(setTextFilter('water'));

const jsx = ( // Provider permet de passer les données de store au composent principal
    <Provider store={store}> 
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
