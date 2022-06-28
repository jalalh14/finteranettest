import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { ControlContainer, FormGroup } from "@angular/forms";

@Component({
  selector: "my-form-field",
  templateUrl: "./form-field.component.html",
  styleUrls: ["./form-field.component.scss"],
})
export class FormFieldComponent implements OnInit {
  constructor(private controlContainer: ControlContainer) { }

  @Input()
  myFormGroup!: FormGroup; //form group element.w  1
  @Input()
  myFormControlName!: string; //name of property in form group'.

  @Input()
  title!: string;

  @Input()
  placeholder: string = "";

  @Input()
  customPatternErrorMessage: string = "";

  @Input()
  type!: "text" | "textarea" | "password" | "select" | "date"; //type of the form field.

  @Input()
  minLength: number | null = null;

  @Input()
  maxLength: number | null = null;

  @Input()
  htmlElementId!: string; //"id" of html element.

  @Input()
  isDisabled: boolean = false;

  @Input()
  isReadonly: boolean = false;

  @Input()
  isRequired: boolean = false;

  @Input()
  minDate?: Date;
  
  @Input()
  maxDate?: Date;

  @Input()
  items: any[] = []; // items of a select or dropdown element.

  @Input()
  optionLabel: string = ""; //Label of a select item.

  @Input()
  optionValue: string = ""; //value of a select item.

  @Input()
  multiSelect: boolean = false; //select is multi or single value.

  @Input()
  showSelectFilter: boolean = false;

  @Input()
  setSelectedValue: boolean = true; //if false then the control value would not been set in the form and should be handled by user.

  @Output()
  onValChange: EventEmitter<any> = new EventEmitter<any>(); // if extra function may be required to run on value changes in elements.

  /** form submitted of not */
  _formSubmitted: boolean = false;
  @Input()
  set formSubmitted(val: boolean) {
    this._formSubmitted = val;
  }

  get formSubmitted() {
    return this._formSubmitted;
  }
  /*******************/

  private _defaultValue: any = null; //defalut value of an element. It can be an array or string or object or boolean.
  @Input()
  set defaultValue(val: any) {
    this._defaultValue = val;
  }

  get defaultValue() {
    return this._defaultValue;
  }

  ngOnInit(): void {
    // console.log(this.myFormControlName);
  }

  /** set form control value of select element */
  setSelectFormControlValue(selectedItems: any[]) {
    if (!this.myFormGroup) return;

    if (this.setSelectedValue) {
      if (this.multiSelect) {
        if (selectedItems.length) {
          this.myFormGroup.get(this.myFormControlName)?.patchValue(selectedItems);
        } else {
          this.myFormGroup.get(this.myFormControlName)?.patchValue([]);
        }
      } else {
        if (selectedItems.length) {
        }
      }
    }

    this.onValChange.emit(selectedItems);
  }


  /** Reset field in form, also clear its value */
  resetField() {
    if (!this.myFormGroup) return;
    switch (this.type) {
      case "text":
      case "textarea":
        this.myFormGroup.get(this.myFormControlName)?.patchValue("");
        break;
      case "select":
        this.defaultValue = [];
        this.myFormGroup.get(this.myFormControlName)?.patchValue([]);
        break;
    }
  }
}
