import { Component, OnInit, Output,EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap';
import { ChannelService } from 'services';

@Component({
    selector: 'add-channel',
    templateUrl: 'add-channel.html'
})
export class AddChannelComponent {
    @ViewChild(ModalDirective) 
    modal:ModalDirective;
    @ViewChild(NgForm) 
    ngForm:NgForm;

    model =  {name: ''};
    
    constructor(
    ) {
    }
  @Output() callParent = new EventEmitter<string>();

    save() {
        if (this.ngForm.valid) {
            console.log("T2");
            this.callParent.emit(this.model.name);
        }
    }
}