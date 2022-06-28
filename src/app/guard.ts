import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from './store';

@Injectable({ providedIn: 'root' })
export class MyGuard implements CanActivate, OnDestroy {

    state!: State;
    storeSubsription?: Subscription;
    constructor(private router: Router, private store: Store<State>) {
        this.storeSubsription = store.pipe(select(state => state)).subscribe(res => this.state = res);
    }
    ngOnDestroy(): void {
        debugger;
        this.storeSubsription?.unsubscribe();
    }

    async canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
        //return false;
        let rt = location.pathname;
        if (rt === "/fill-form" || route.routeConfig?.path === "fill-form") {
            if (this.state?.image.image) {
                return true;
            }
        }
        else if (rt === "/person-list" || route.routeConfig?.path === "person-list") {
            if (!this.state?.image.image) {
                this.router.navigate(['upload-image']);
                return false;
            }
            if (!this.state?.form || !this.state?.form?.date) {
                this.router.navigate(['fill-form']);
                return false;
            }
            return true;
        }

        else if (rt === "/summary" || route.routeConfig?.path === "summary") {
            if (!this.state?.image.image) {
                this.router.navigate(['upload-image']);
                return false;
            }
            if (!this.state?.form?.date) {
                this.router.navigate(['fill-form']);
                return false;
            }

            if (!this.state?.personList?.selectedPerson) {
                this.router.navigate(['person-list']);
                return false;
            }
            return true;
        }


        this.router.navigate(['upload-image']);
        return false;
    }
}