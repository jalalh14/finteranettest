import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataFormComponent } from './stepper-steps/data-form/data-form.component';
import { MyGuard } from './guard';
import { PersonListComponent } from './stepper-steps/person-list/person-list.component';
import { SummaryComponent } from './stepper-steps/summary/summary.component';
import { UploadImageComponent } from './stepper-steps/upload-image/upload-image.component';

const routes: Routes = [
  { path: "", redirectTo: "upload-image", pathMatch: "full" },
  { path: "upload-image", component: UploadImageComponent },
  { path: "fill-form", component: DataFormComponent, canActivate: [MyGuard] },
  { path: "person-list", component: PersonListComponent, canActivate: [MyGuard] },
  { path: "summary", component: SummaryComponent, canActivate: [MyGuard] },
  { path: "**", redirectTo: "upload-image" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
