import { Component, Input,OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostSocketService, PostService } from 'services';
import { Post, PostContent,Channel } from 'models';

@Component({
  selector: 'social-feed', 
  templateUrl: 'social-feed.html'
})
export class SocialFeedComponent implements OnInit { 
    channelId: string;
    items: Post[];

    constructor(
        private postService: PostService, 
        private postSocket: PostSocketService,
        private route: ActivatedRoute
    ) {}

   ngOnInit() {
        this.route.params
            .subscribe((params) => {
                this.channelId = params['id'];
                 this.postService.getAll(this.channelId).then((e)=>this.items=e);
            } );
           
        this.postSocket.onPost(this.addPost);
    }

    addPost = (post:Post) => {
        this.items.unshift(post);
    }
   
}
