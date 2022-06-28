import { createAction, props } from '@ngrx/store';
import { FormModel } from '../../models/form-model';

export const saveFormData = createAction(
  '[Form] Save Form',
  props<{ data: FormModel }>()
);

export const saveFormSuccess = createAction(
  '[Form] Save Form Success',
  props<{ data: FormModel }>()
);

export const saveFormFailure = createAction(
  '[Form] Save Form Failure',
  props<{ error: any }>()
);


export const removeFormData = createAction(
  '[Form] Remove Form Data'
);