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
    userExists : boolean;
    badAvatar : boolean;
    badPass : boolean;
    badEmail : boolean;

    constructor(
        private registrationService: RegistrationService,
        private router : Router
    ) { }

    register() {
        this.userExists = false; this.badPass = false; 
        this.badAvatar = false; this.badEmail = false;
        var badUser = false;
        if (this.ngForm.form.invalid) {
            return;
        }
        else{
            this.registrationService.usernameExists(this.model.userName) 
                    .then( 
                    () => {badUser = true; 
                        
                });
            if(this.model.password.length < 6)  {
                this.badPass = true; 
            }
            if(this.model.pictureUrl.startsWith("http://images.google") ) {
                this.badAvatar = true;
            }
            if(!this.model.email.includes('@')) { this.badEmail = true;}
              
            if(badUser) { this.userExists = true; }
            if(this.badPass || this.badAvatar || this.badEmail || this.userExists){
                return;

            } else {
                
                this.registrationService.register(this.model)
                    .then(
                        
                        ()=>{console.log("ok"); this.router.navigateByUrl("/login");},
                        
                        e =>{console.log("KO : "+e);
                        this.userExists = true;
                    });
            }
            
        }
    }
}
