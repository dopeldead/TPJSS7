import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/index';
import { UserRegistration } from 'models';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'register',
    templateUrl: 'register.html'
})
export class RegisterComponent {
    @ViewChild(NgForm)
    ngForm: NgForm;

    model = new UserRegistration();

    constructor(
        private registrationService: RegistrationService,
        private router : Router
    ) { }

    register() {
        console.log("test");
        if (this.ngForm.form.invalid) {
            return;
        }
        else{
            this.registrationService.register(this.model)
                .then(
                    ()=>{console.log("ok"); this.router.navigateByUrl("/login");},
                    ()=>{console.log("KO");}
                );
        }
    }
}
