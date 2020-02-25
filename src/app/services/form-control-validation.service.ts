// based on https://github.com/dioniciodiaz/ng-playground/blob/development/src/app/services/form-control-validation-msg.service.ts
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class FormControlValidationService {

  constructor() { }

  private errorMessages = {
    required: (field: string) => `${field} is required`,
    maxlength: (field: string, { requiredLength, actualLength }: any) => {
      return `Max permited characters: ${requiredLength}, but you typed: ${actualLength} on ${field}`;
    },
    minlength: (field: string, { requiredLength, actualLength }: any) => {
      return `Min permited characters: ${requiredLength}, but you typed: ${actualLength} on ${field}`;
    },
    email: () => 'It must be a valid email.',
    passwordField: (field: string) => `${field}  must contain a capital letter, lowercase letter, a number and be at least 8 characters long`,
  };

  public getValidationMsg(validationId: string, field: string = 'field', errorsObject: ValidationErrors): string {
    if (this.errorMessages.hasOwnProperty(validationId)) {
      return this.errorMessages[validationId](field, errorsObject[validationId]);
    }
    return `${field} is invalid`;
  }
}
