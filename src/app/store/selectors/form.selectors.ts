import { createSelector } from '@ngrx/store';
import {State} from '..'

export const selectFormData = (state: State) => state.form;