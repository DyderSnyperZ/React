import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';
import { sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';

class ExpenseListFilter extends React.Component {
    state = {
        calendarFocused:null
    }
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }
    render() {
        return (
            <div>
                <input type="text" value={this.props.filter.text} onChange={(e) => {
                    this.props.dispatch(setTextFilter(e.target.value)); // set dans le store les data avec le tri qu'on veux
                }}></input>
                <select value={this.props.filter.sortBy} onChange={(e) => {
                    switch (e.target.value) {
                        case 'date':
                            this.props.dispatch(sortByDate());
                        case 'amount':
                            this.props.dispatch(sortByAmount());
                    }
                }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                startDate={this.props.filter.startDate}
                endDate={this.props.filter.endDate}
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.calendarFocused}
                onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
            />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
};

export default connect(mapStateToProps)(ExpenseListFilter);