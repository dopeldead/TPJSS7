import { Component, OnInit } from '@angular/core';
import { PostSocketService, LoggedUser } from 'services';
import { Post,Comment,Like,Channel,User,Notification } from '../../models';

@Component({
    selector: 'user-list',
    templateUrl: 'user-list.html'
})
export class UserListComponent implements OnInit {
    notifications: Array<Notification> = [];
    constructor( private postSocket: PostSocketService,
            private user: LoggedUser
) { }

    ngOnInit() {
        this.postSocket.onComment(this.OnComment);
        this.postSocket.onLike(this.OnLike);
        this.postSocket.onNewChannel(this.OnNewChannel);
        this.postSocket.onPost(this.OnPost);        
     }
     OnComment=(comment: Comment)=>{
         console.log(comment);
         if(comment.user.id==this.user.id) return;
         if(comment.post.user.id==this.user.id){
             let n = new Notification();
             n.title = "Nouveau commentaire sur un de vos Post";
             n.text = comment.user.username+" a commenté un de vos post dans le channel "+comment.channel.name;
             this.notifications.unshift(n);
         }
         else{
             let n = new Notification();
             n.title = "Nouveau commentaire sur un post";
             n.text = comment.user.username+" a commenté un post de "+comment.post.user.username+" dans le channel "+comment.channel.name;
             this.notifications.unshift(n);
         }
     }
     OnLike=(like:Like)=>{
        if(like.user.id==this.user.id) return;
        if(like.post.user.id==this.user.id){
             let n = new Notification();
             n.title = "Nouveau like sur un de vos Post";
             n.text = like.user.username+" a liké un de vos post dans le channel "+like.post.channel.name;
             this.notifications.unshift(n);
         }
         else{
             let n = new Notification();
             n.title = "Nouveau commentaire sur un post";
             n.text = like.user.username+" a liké un post de "+like.post.user.username+" dans le channel "+like.post.channel.name;
             this.notifications.unshift(n);
         }
     }
     OnNewChannel=(channel:Channel)=>{
        let n = new Notification();
        n.title = "Nouveau channel créé";
        n.text = "Le channel "+ channel.name+" vient d'être créé";
        this.notifications.unshift(n);
     }
     OnPost=(post:Post)=>{
        if(post.user.id==this.user.id) return;
         else{
             let n = new Notification();
             n.title = "Nouveau post";
             n.text = post.user.username+" a posté dans le channel "+post.channel.name;
             this.notifications.unshift(n);
         }
     }
}
