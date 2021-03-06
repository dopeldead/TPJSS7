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
        var badLogin = false;
        this.authService.authenticate(this.model).then(
                    
                    ()=>{console.log("ok"); 
                        this.router.navigateByUrl("/");
                    },
                    //here do the handle of rrors liek already used userName
                    e => {console.log("KO : "+JSON.stringify(e));
                    console.log(this.model.userName+ " : " + this.model.password);
                    this.loginFailed = true;
                    }
                );
    }
}
