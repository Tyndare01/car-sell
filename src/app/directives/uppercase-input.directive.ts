import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercaseInput]'
})
export class UppercaseInputDirective {

  constructor(

    private control: NgControl
    // permet de récupérer le contrôle du formulaire sur lequel on applique la directive
  ) { }

  @HostListener('input', ['$event']) onInputChange($event: any) {

    if (this.control){

      const uppervalue = this.control.control?.setValue($event.target.value.toUpperCase());

    }
  }
}
