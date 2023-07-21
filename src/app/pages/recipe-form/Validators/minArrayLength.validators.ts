import {AbstractControl, ValidatorFn} from "@angular/forms";

export function minArrayLength(min: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.value.length >= min) {
      return null;
    } else {
      return { 'minArrayLength': { value: control.value } };
    }
  };
}
