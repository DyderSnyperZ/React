import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const expensesReducerDefaultState = [];
////////////////////// NEVER CHANGER LES DONNEES DU STORE DIRECTEMENT
/* const state = {
    expense: [{
        id: 'randomInt',
        square: '24m2',
        description: 'big flat',
        price: 225421,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
} */

const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const addState = (
    { //valeur par defaut
        square = '',
        description = '',
        price = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        square,
        description,
        price,
        createdAt
    }
});

const removeState = ({ id } = {} /* set valeur default mais rend obligatoire l'argument*/) => (
    {
        type: 'REMOVE_EXPENSE',
        id
    }
);

const setTextFilter = (text = '') => (
    {

        type: 'SET_TEXT_FILTER',
        text
    }
);

const editState = (id, updates) => (
    {
        type: 'EDIT_EXPENSE',
        id,
        updates
    }
);

const sortByAmount = () => (
    {
        type: 'SORT_BY_AMOUNT'
    }
);

const sortByDate = () => (
    {
        type: 'SORT_BY_DATE'
    }
);

const setStartDate = (startDate) => (
    {
        type: 'SET_START_DATE',
        startDate

    }
);

const setEndDate = (endDate) => (
    {
        type: 'SET_END_DATE',
        endDate

    }
);

const expenseReducers = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state, // recréer un tableau avec toute les entités de state
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            const idFound = state.find(({ id }) => id === action.id) ? true : false;
            if (idFound)
                return state.filter(({ id }) => id !== action.id); // recréer un tableau avec toute les entités de state
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id)
                    return { //object destructuring
                        ...expense, // récupère les données d'expense
                        ...action.updates // update uniquement les données souhaité (mount)
                    };
                else {
                    return expense;
                }
            })
        default:
            return state;
    }
}


const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'price'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
}

const getFilteredExpense = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date')
            return a.createdAt < b.createdAt ? 1 : -1;
        else if (sortBy === 'price')
            return a.price < b.price ? 1 : -1;
    })

};

const store = createStore(combineReducers( // permet de conbiner les réducers qui permet de split le fonctionnement
    {
        expenses: expenseReducers,
        filter: filterReducer
    }
));

store.subscribe(() => {
    const state = store.getState();
    const stateFiltered = getFilteredExpense(state.expenses, state.filter);
    console.log(stateFiltered);
});


const action1 = store.dispatch(addState({ description: 'Rent', price: 10000, createdAt: -11000 }));
const action2 = store.dispatch(addState({ description: 'Sale', price: 100000, createdAt: -1000 }));

//store.dispatch(editState(action1.expense.id, { price: 10 }));

//store.dispatch(editState(action1.expense.id, { price: 10 }));

//store.dispatch(setTextFilter('s'));
//store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
///store.dispatch(sortByDate());

//store.dispatch(setStartDate(125));
//store.dispatch(setStartDate());
//store.dispatch(setEndDate(2021));

//store.dispatch(removeState({ id: action1.expense.id }));

/* const Mec = {
    name: 'Mec',
    age: 28
};

console.log({
    //...Mec si placé avant new valeur, prend la new valeur
    city: 'Monaco',
    age: 24,
    ...Mec, // si placé après dessous d'une new valeur, il prend la valeur de mec
});
 */