import { Component, Input,OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostSocketService, PostService } from 'services';
import { Post, PostContent } from 'models';

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

   async ngOnInit() {
        this.route.params
            .subscribe((params) => {
                this.channelId = params['id'];
            } );
            this.items = await this.postService.getAll(this.channelId);
            console.log(this.items);
    }    
}
