import { Action, createReducer, on } from '@ngrx/store';
import * as fromImageActions from '../actions/image.actions'


export const imageFeatureKey = 'image';

export interface State {
  image: Blob | null
}

export const initialState: State = {
  image: null
};

export const reducer = createReducer(
  initialState,
  on(fromImageActions.addImage, (state, { data }) => {
    return { state, image: data };
  }),
  on(fromImageActions.removeImage, (state) => {
    return { ...state, image: null };
  })
);
