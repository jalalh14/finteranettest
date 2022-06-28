import { Action, createReducer, on } from '@ngrx/store';
import { FormModel } from '../../models/form-model';
import * as fromFormActions from '../actions/form.actions';


export const formFeatureKey = 'form';

/** Form State Extends FormModel interface */
export interface State extends FormModel {
}

export const initialState: State = {
  amount: null,
  date: null,
  status: null,
  sourceOfFund: null
};

export const reducer = createReducer(
  initialState,

  on(fromFormActions.saveFormData, (state, { data }) => {
    return { ...state, ...data };
  }),

  on(fromFormActions.removeFormData, (state) => {
    return { ...initialState };
  })
);
