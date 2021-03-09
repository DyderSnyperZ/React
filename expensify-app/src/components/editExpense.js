import React from 'react';
import ExpenseForm from './expenseForm';
import { connect } from 'react-redux';
import { editState, removeState } from '../actions/expenses';

const EditExpensePage = (props) => (
    <div>
        <ExpenseForm
            expense={props.expense}
            onSubmit={(expense) => {
                props.dispatch(editState(props.expense.id, expense )); //edit expense
                props.history.push('/'); // redirect to route
            }} />
            <button onClick={() => {
                props.dispatch(removeState(({id: props.expense.id})));
                props.history.push('/'); // redirect to route
        }}
        >Remove
</button>
    </div>
);

const MapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find(element => element.id === props.match.params.id) // retourne expense par id qu'on souhaite
    }
}

export default connect(MapStateToProps)(EditExpensePage);