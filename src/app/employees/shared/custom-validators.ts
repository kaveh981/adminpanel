import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordConfirmationMatcher(c: AbstractControl): ValidationErrors {
    if (c.parent) {
        console.log(c.parent.controls['passwordConfirmation'].value);
        return c.parent.get('password').value ===
            c.parent.get('passwordConfirmation').value
            ? null : { nomatch: true };
    } else {
        return null;
    }
}
