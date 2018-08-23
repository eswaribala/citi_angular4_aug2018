import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {Attribute, Directive, forwardRef} from "@angular/core";

@Directive({
    selector:'[passwordChecker][formControlName],' +
    '[passwordChecker][formControl],[passwordChecker][ngModel]',
    providers: [
        { provide: NG_VALIDATORS,
            useExisting: forwardRef(() => PasswordValidator),
            multi: true }
    ]
})
export class PasswordValidator implements Validator
{
    constructor(@Attribute('passwordChecker') public passwordChecker:string)
    {

    }
    validate(c: AbstractControl): ValidationErrors | null {

        //current input control
        var confirmPwdValue=c.value;

        //read the value from password
        var passwordValue=c.root.get(this.passwordChecker);

        if(passwordValue && confirmPwdValue!==passwordValue)
        return {
           passwordChecker:false
        }


        return null;
    }

}