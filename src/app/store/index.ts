import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromImage from './reducers/image.reducer';
import * as fromForm from './reducers/form-reducer';
import * as fromPersonList from './reducers/person-list-reducer';


export interface State {
  [fromImage.imageFeatureKey]: fromImage.State;
  [fromForm.formFeatureKey]: fromForm.State;
  [fromPersonList.personListFeatureKey]: fromPersonList.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromImage.imageFeatureKey]: fromImage.reducer,
  [fromForm.formFeatureKey]: fromForm.reducer,
  [fromPersonList.personListFeatureKey]: fromPersonList.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
