import { AbstractControl } from '@angular/forms';

export function ValidatePassword(control: AbstractControl) {
    const value = control.value
    const regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
    if (value && value.length > 6 && !value.match(regex)) {
        return { passwordField: true };
    }
    return null;
}