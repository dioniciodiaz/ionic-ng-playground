import { Directive, Input, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormControlValidationService } from '@services/form-control-validation.service'
@Directive({
  selector: '[appFormControlValidation]'
})
export class FormControlValidationDirective implements OnInit, OnDestroy {

  constructor(private elRef: ElementRef, private control: NgControl, private validationMsgService: FormControlValidationService
  ) { }

  @Input() validationField = 'field';
  @Input() validationStyle = 'form-text text-danger';
  @Input() validationElement = 'small';
  statusChangeSubscription: Subscription;

  errorElementId = '';

  ngOnInit(): void {
    this.errorElementId = this.validationField + new Date() + '-error-msg';
    this.statusChangeSubscription = this.control.statusChanges.subscribe(
      (status) => {
        if (status === 'INVALID') {
          this.showError();
        } else {
          this.removeError();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.statusChangeSubscription.unsubscribe();
  }

  @HostListener('blur', ['$event'])
  handleBlurEvent(event) {
    // This is needed to handle the case of clicking a required field and moving out.
    // Rest all are handled by status change subscription
    if (this.control.value == null || this.control.value === '') {
      if (this.control.errors) {
        this.showError();
      } else {
        this.removeError();
      }
    }
  }

  private showError() {
    this.removeError();
    const fieldErrors: ValidationErrors = this.control.errors;
    const firstFieldError: string = Object.keys(fieldErrors)[0];
    const validationField = this.validationField !== "field" ? this.validationField : this.control.name;

    if (firstFieldError.length > 1) {
      const errorMsg = this.validationMsgService.getValidationMsg(firstFieldError, validationField, fieldErrors);
      // tslint:disable-next-line:max-line-length
      const errorElement = `
      <${this.validationElement} class="${this.validationStyle}" id="${this.errorElementId}">${errorMsg}</${this.validationElement}>`;
      this.elRef.nativeElement.parentElement.insertAdjacentHTML('beforeend', errorElement);
    }
  }

  private removeError(): void {
    const errorElement = document.getElementById(this.errorElementId);
    if (errorElement) {
      errorElement.remove();
    }
  }
}