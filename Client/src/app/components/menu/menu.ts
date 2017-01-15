import { Component, Input } from '@angular/core';
import { Channel } from 'models';
import { ChannelService } from '../../services/index';
require('Promise');
@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuComponent { 
   model = new Channel();
   data = new Promise<Channel[]>((e)=>{return e;})
    constructor( private channelService: ChannelService ) {
        this.data = this.channelService.getAll().then((e)=> { return e;});
    }
     save() {
        this.channelService.add(this.model.name)
    }
    @Input() channels: Channel[] = Promise.resolve<Channel[]>(this.channelService.getAll());
   
}