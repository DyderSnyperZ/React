import { connect } from 'react-redux';
import React from 'react';
import ExpenseListeItem from './expenseListItem';
import filteredExpenses from '../selectors/expenses';

const ExpenseListe = (props) => ( //component a render
    <div>
        <h2>Expenses List</h2>
        <u1>
            {props.expenses.map(expense => <ExpenseListeItem key={expense.id}{...expense} />)}
        </u1>
    </div>
);

const mapStateToProps = (state) => { // maps les valeurs de state au variables du template
    console.log(filteredExpenses(state.expenses, state.filter))
    return {
        expenses: filteredExpenses(state.expenses, state.filter)
    }
};

export default connect(mapStateToProps)(ExpenseListe); //connect les variables redux store avec les variables du template



