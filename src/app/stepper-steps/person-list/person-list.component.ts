import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { State } from '../../store';
import PersonModel from '../../models/PersonModel';
import { Subject, takeUntil } from 'rxjs';
import { selectSelectedPerson } from '../../store/selectors/person-list.selectors';
import * as personListSelectors from '../../store/actions/person-list.actions';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  constructor(private router: Router, private store: Store<State>) { }

  ngDestroyed$ = new Subject();

  @Input()
  viewMode: boolean = false; // view mode for showing in summary part

  personList: PersonModel[] = [
    { id: "1", firstName: "John", lastName: "Luck", age: 50, phone: "+1266558899" },
    { id: "2", firstName: "Jack", lastName: "Bufallo", age: 40, phone: "+5688997744" },
    { id: "3", firstName: "Marina", lastName: "Millano", age: 30, phone: "+8544775522" },
    { id: "4", firstName: "Mary", lastName: "Sasi", age: 30, phone: "+1422445566" },
  ];

  selectedPerson: PersonModel | null = null;

  ngOnInit(): void {
    if (this.viewMode) {
      this.personList = [];
    }
    this.store.pipe(select(selectSelectedPerson)).pipe(takeUntil(this.ngDestroyed$)).subscribe(res => {
      this.selectedPerson = res;
      if (this.viewMode && this.selectedPerson) {
        this.personList = [this.selectedPerson!];
      }
    });
  }


  prevPage() {
    this.router.navigate(["fill-form"]);
  }

  /** Select a person from the list and go to next step */
  selectPersonFromList(item: PersonModel) {
    this.store.dispatch(personListSelectors.selectPerson({ data: item }));
  }

  nextPage() {
    if (this.selectedPerson) {
      this.router.navigate(["summary"]);
    }
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next(0);
    this.ngDestroyed$.unsubscribe();
  }
}
