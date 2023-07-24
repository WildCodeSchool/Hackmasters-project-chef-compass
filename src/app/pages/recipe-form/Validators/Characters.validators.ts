import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenCharactersValidator(forbiddenChars: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const containsForbiddenChars = forbiddenChars.test(control.value);
    return containsForbiddenChars ? { forbiddenCharacters: { value: control.value } } : null;
  };
}
