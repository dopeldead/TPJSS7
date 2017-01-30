import { Component, Input,OnInit, EventEmitter } from '@angular/core';
import { Channel } from 'models';
import { ChannelService, PostSocketService } from '../../services/index';
import { Router } from '@angular/router';


@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuComponent implements OnInit { 
    model = new Channel();

    constructor(private channelService: ChannelService,
            private router : Router,
            private postSocket: PostSocketService
    ) {
        this.postSocket.onNewChannel(this.addChannel)
    }
    async ngOnInit() { 
        this.channels = (await this.channelService.getAll()).sort(this.sortChannels);
        if(this.channels.length>0)
        this.router.navigateByUrl("/channel/"+this.channels[0].id);
    }
    async save() {
         if(this.channels.findIndex(x=>x.name===this.model.name)===-1){
            await this.channelService.add(this.model.name);
            this.channels = await this.channelService.getAll();
            this.channels.sort(this.sortChannels);
         }
         else{
             //chan name already exist
         }
    }
    callParent(chanName: string){
        this.model.name=chanName;
        this.save();
    }
    sortChannels(n1: Channel,n2: Channel){
    if (n1.name > n2.name) {
        return 1;
    }
    if (n1.name < n2.name) {
        return -1;
    }
    return 0;
    }
   addChannel = (chan:Channel) => {
        this.channels.unshift(chan);
    }
    @Input() channels: Channel[]; 
   
}