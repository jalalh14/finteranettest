import { createSelector } from '@ngrx/store';
import {State} from '../'

export const selectImage = (state: State) => state.image;