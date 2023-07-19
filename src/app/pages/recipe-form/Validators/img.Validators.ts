import { AbstractControl, ValidationErrors } from '@angular/forms';

export function imgValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const regex = /^https?:\/\/.*\.(jpg|jpeg|png)$/;
  let valid;

  if (regex.test(value)) {
    valid = true;
  } else {
    valid = false;
  }

  const errors = {
    img: {
      rules: "URL must begin with 'http://' or 'https://' and extension must be jpg, jpeg or png",
    },
  };
  return !valid ? errors : null;
}
