import { Component, Input } from '@angular/core';
import { Post,Like,Comment } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';

@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent { 
    @Input() post: Post;
    visible: boolean=false;
    constructor(
        private postSocket: PostSocketService, 
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) {}

    ngOnInit() {
        let res = this.parser.parse(this.post)
        this.postSocket.onLike(this.OnLike);
        this.postSocket.onComment(this.OnComment);
        this.post.content = res==null?this.post.content:res;
    }
    DoLike(){
        this.postService.like(this.post);
    }
     OnLike = (like:Like) => {
         if(like.user.id===this.user.id && like.post.id===this.post.id) this.post.liked=true;
    }
    OnComment = (comment:Comment) => {
         if(comment.post.id===this.post.id) this.post.comments.push(comment);
    }
    DoAnswer(){
        this.visible= !this.visible;
    }
    callParent(action: string){
       if(action=="close")this.visible=false;
    }
}
