import { Action, createReducer, on } from '@ngrx/store';
import PersonModel from '../../models/PersonModel';
import * as fromPersonListActions from '../actions/person-list.actions';


export const personListFeatureKey = 'personList';

/** Form State Extends FormModel interface */
export interface State {
  selectedPerson: PersonModel | null;
}

export const initialState: State = {
  selectedPerson: null
}

export const reducer = createReducer(
  initialState,

  on(fromPersonListActions.selectPerson, (state, { data }) => {
    return { ...state, selectedPerson: { ...data } };
  })
);
