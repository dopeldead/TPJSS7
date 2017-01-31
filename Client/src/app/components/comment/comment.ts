import { Component, Input } from '@angular/core';
import { Comment,Like } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';

@Component({
  selector: 'comment',
  templateUrl: 'comment.html'
})
export class CommentComponent { 
    @Input() comment: Comment;
    constructor(
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) {}

    ngOnInit() {
        let res = this.parser.parse(this.comment)
        this.comment.content = res== null ? this.comment.content : res;
    }
}
