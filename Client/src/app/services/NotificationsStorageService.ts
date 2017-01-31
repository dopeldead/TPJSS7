import { Injectable } from '@angular/core';
import { AuthenticatedUser,Notification } from 'models';
@Injectable()
export class NotificationsStorageService {
       private itemKey = "$notifications";

    constructor() { }

    readAll():Notification[]{
        let serializeduser = localStorage.getItem(this.itemKey);
        if( serializeduser ) {
            return JSON.parse(serializeduser);
        }
        return [];
    }
    write(arr:Notification[]) {
        localStorage.setItem(this.itemKey, JSON.stringify(arr));
    }
    clean() {
        localStorage.removeItem(this.itemKey);
    }
}
