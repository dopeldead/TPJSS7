import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'models';
import { AuthenticationService } from '../../services/index';


@Component({
    selector: 'login',
    templateUrl: 'login.html',
})
export class LoginComponent  {
    model = new UserLogin();
    loginFailed : boolean;
    constructor(
            private authService: AuthenticationService,
            private router : Router
                ) { }

    login() {
        this.authService.authenticate(this.model).then(
                    
                    ()=>{console.log("ok"); 
                        this.router.navigateByUrl("/");
                    },
                    //here do the handle of rrors liek already used userName
                    ()=> {console.log("KO");
                    this.loginFailed = true;    
                    }
                );
    }
}
