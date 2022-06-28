import { createAction, props } from '@ngrx/store';

export const addImage = createAction(
  '[Image] Add Image',
  props<{ data: any }>()
);

export const addImageSuccess = createAction(
  '[Image] Add Image Success',
  props<{ data: any }>()
);

export const addImageFailure = createAction(
  '[Image] Add Image Failure',
  props<{ error: any }>()
);


export const removeImage = createAction(
  '[Image] Remove Image'
);