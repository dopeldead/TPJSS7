import { Component, OnInit } from '@angular/core';
import { PostSocketService, LoggedUser } from 'services';

@Component({
    selector: 'user-list',
    templateUrl: 'user-list.html'
})
export class UserListComponent implements OnInit {
    constructor( private postSocket: PostSocketService,
            private user: LoggedUser
) { }

    ngOnInit() { }
}
