import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/expenseForm';
import tabExpenses from '../fixtures/expenses';

test('should be form page without data', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should be form page with data', () => {
    const wrapper = shallow(<ExpenseForm expense={tabExpenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});

/*test si erreur submission*/
test('invalid form submition', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('form').simulate('submit', { // trouve et simule le submit du form
        preventDefault: () => { // génère un fake event pour passer le preventDefault

        }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0); //regarde si le state de error est différent de 0
    expect(wrapper).toMatchSnapshot();
});

test('should test description change', () => {
    const value = 'hello';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', { // find input, récupère le 1er élément avec at() et simule le onChange
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should test textarea change', () => {
    const value = 'hello';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should test valid price change', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('price')).toBe(value);
});

test('should test wrong price change', () => {
    const value = '12.136';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('price')).toBe(''); //default value
});



