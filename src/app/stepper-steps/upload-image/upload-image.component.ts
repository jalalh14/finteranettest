import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { State } from '../../store';
import { select, Store } from '@ngrx/store';
import { selectImage } from '../../store/selectors/image.selectors';
import * as imageActions from '../../store/actions/image.actions';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit, OnDestroy {

  constructor(private store: Store<State>, private messageService: MessageService, private router: Router) { }

  image: any;
  ngDestroyed$ = new Subject();

  @Input()
  viewMode: boolean = false; // view mode for showing in summary part

  ngOnInit(): void {
    this.store.pipe(select(selectImage)).pipe(takeUntil(this.ngDestroyed$)).subscribe(i => {
      this.image = i.image;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.filePath = reader.result as string;
      }
      if (i.image) {
        reader.readAsDataURL(i.image);
      }

    });
  }
  filePath: string = "";

  /** upload image file */
  uploadImage(ev: any) {
    for (let file of ev.files) {
      console.log("FILE TO BE UPLOADED: ", file);
      this.store.dispatch(imageActions.addImage({ data: file }));

      //this way is only for showing success here, not in a real project.
      this.messageService.add({ severity: 'success', summary: 'Upload file success', detail: 'File uploaded successfully' });

    }
  }


  removeImage() {
    this.store.dispatch(imageActions.removeImage());
    this.messageService.add({ severity: 'success', summary: 'Remove File', detail: 'File removed successfully' });
  }

  nextPage() {
    if (this.image) {
      this.router.navigate(["fill-form"]);
    }
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next(0);
    this.ngDestroyed$.unsubscribe();
  }

}
