import React from 'react';

const ExpenseListeItem = ({ description, price, createdAt }) => ( //component a render
        <li>Description : {description} - Price : {price} - createdAt : {createdAt}</li>
);

export default ExpenseListeItem;



