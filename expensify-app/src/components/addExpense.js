import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addState } from '../actions/expenses';
import ExpenseForm from './expenseForm';

const AddExpensePage = (props) => (
    <div>
        <ExpenseForm onSubmit={expense => { // récupère les donées expense du formulaire
            props.dispatch(addState(expense));
            props.history.push('/'); // redirect to route
        }}/>
    </div>
);

export default connect()(AddExpensePage);