import { createAction, props } from '@ngrx/store';
import PersonModel from '../../models/PersonModel';

export const selectPerson = createAction(
  '[Pseron List] Select Person',
  props<{ data: PersonModel }>()
);

