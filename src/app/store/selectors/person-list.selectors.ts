import { createSelector } from '@ngrx/store';
import {State} from '..'

export const selectSelectedPerson = (state: State) => state.personList.selectedPerson;