import {FormGroup} from '@angular/forms';

export function passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordAgain').value
        ? null : {'passwordMismatch': true};
}