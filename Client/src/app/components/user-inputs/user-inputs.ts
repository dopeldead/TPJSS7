import { Component, Input,ViewChild, EventEmitter, Output } from '@angular/core';
import { PostService, MessageParser } from '../../services/index';
import { Post } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'user-inputs',
    templateUrl: 'user-inputs.html'
})
export class UserInputsComponent {
    @ViewChild(NgForm)
    ngForm: NgForm;

    @Input() channelId: string;
    message:string;

    constructor(
        private postervice: PostService
    ) {
    }

    send() 
    {
        if (this.ngForm.form.invalid) {
            return;
        }
        else{
            this.postervice.post(this.channelId,this.message);
            this.ngForm.reset();
        }
    }
}
