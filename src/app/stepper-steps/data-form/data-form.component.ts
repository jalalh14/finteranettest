import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { State } from '../../store';
import * as fromFormActions from '../../store/actions/form.actions';
import { selectFormData } from '../../store/selectors/form.selectors';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private _fb: FormBuilder, private store: Store<State>) { }

  form!: FormGroup;
  formSubmitted: boolean = false;
  ngDestroyed$ = new Subject();

  @Input()
  viewMode: boolean = false; // view mode for showing in summary part

  statusOptions = ["Status1", "Status2", "Status3", "Status4"];


  ngOnInit(): void {
    this.form = this._fb.nonNullable.group({
      amount: [null, [Validators.required, Validators.pattern(/^\d+$/)]],  //numbers only
      date: [null, Validators.required],
      status: [null, Validators.required],
      sourceOfFund: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]]  //letters only
    });
    this.setMinMaxSelectableDates();

    this.store.pipe(select(selectFormData)).pipe(takeUntil(this.ngDestroyed$)).subscribe(res => {
      if (res) {
        this.form.patchValue(res);
      }
    });
  }


  minDate: Date = new Date();
  maxDate: Date = new Date();

  /** set min and max date for calendar - only 5 next days can be selectable */
  setMinMaxSelectableDates() {
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 5);
  }


  prevPage() {
    this.router.navigate(["upload-image"]);
  }

  nextPage() {
    this.formSubmitted = true;
    if (!this.form.valid) {
      return;
    }

    this.store.dispatch(fromFormActions.saveFormData({ data: this.form.value }));

    //notice(written by Jalal.H): here we do not wait, but in a real project we use effects for calling service and http api to save for data and then dispatch a success or error action.
    this.router.navigate(["person-list"]);
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next(0);
    this.ngDestroyed$.unsubscribe();
  }

}
