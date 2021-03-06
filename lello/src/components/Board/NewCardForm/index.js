import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Field, reduxForm, reset } from 'redux-form';

import * as actions from '../../../actions/cards';
import * as selectors from '../../../reducers';
import { GeneralBtn } from '../../Buttons';
import { RenderInput } from '../../FormFields';

const NewCardForm = ({ handleSubmit }) => (
    <form onSubmit={ handleSubmit }>
        <div className="div-display-column">
            <Field
                name='title'
                type='text'
                placeholder="Nombre de la nueva tarjeta"
                component={ RenderInput }
            />
            <GeneralBtn 
                text={"+ Añadir otra tarjeta"}
                type={'submit'}
            />
        </div>
    </form>
);

export default connect(
    (state, { listId }) => ({
        listId: listId,
        boardId: selectors.getSelectedBoard(state),
        userId: selectors.getAuthUserID(state),
    }),
)(
    reduxForm({
        form: 'addCard',
        onSubmit({ title }, dispatch, { listId, boardId, userId }) {
            dispatch(
                actions.startAddingCard({
                    id: uuid(),
                    title,
                    lista: listId,
                    hours_estimated: 0,
                    hours_done: 0,
                    assigned_to: [ userId ]
                }),
            );
            dispatch(reset('addCard'));
        },
        validate(values) {
            const errors = {};
            if (values.title && values.title.length > 15) {
                errors.title = "¡El nombre es muy largo!";
            } else if (values.title && values.title.length < 2){
                errors.title = "¡El nombre es muy corto!";
            }
            return errors;
        }
    })(NewCardForm)
);
