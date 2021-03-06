import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './styles.css'; 
import * as selectors from '../../../reducers';

import Event from '../Event';


const dateFormat = {
    lastDay : '[Yesterday]',
    sameDay : '[Today]',
    nextDay : '[Tomorrow]',
    lastWeek : '[last] dddd',
    nextWeek : 'dddd',
    sameElse : 'L'
}

const Day = ({ date, events = [] }) => {
    return (
        <div className='day div-display-column'>
            <div>
                <h1>{ moment(date).calendar(null, dateFormat) }</h1>
                <h3>{ moment(date).format("DD-MM-YYYY") }</h3>
            </div>
            <div className="scrollEvents">
                {
                    events.length === 0 && (
                        <p>{ 'No hay' }</p>
                    )
                }
                {
                    events.length > 0 && (
                        <table>
                            <tbody>
                                {
                                    events.map(({ id }) => <Event key={id} id={id} />)
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
        </div>
    );
};

export default connect(
    (state, { date }) => ({
        events: selectors.getEventsOnDay(state, date),
    })
)(Day);
