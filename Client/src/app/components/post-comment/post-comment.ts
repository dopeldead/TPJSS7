import { Component, Input,ViewChild, EventEmitter, Output } from '@angular/core';
import { PostService, MessageParser } from '../../services/index';
import { Post } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'post-comment',
    templateUrl: 'post-comment.html'
})
export class PostCommentComponent {
    @ViewChild(NgForm)
    ngForm: NgForm;

    @Input() post: Post;
    message:string;
    @Output() callParent = new EventEmitter<string>();

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
            this.postervice.comment(this.post,this.message);
            this.ngForm.reset();
            this.callParent.emit("close");
        }
    }
}
