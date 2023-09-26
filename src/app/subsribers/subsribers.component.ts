import { Component } from '@angular/core';
import { SubscriberService } from '../services/subscriber.service';

@Component({
  selector: 'app-subsribers',
  templateUrl: './subsribers.component.html',
  styleUrls: ['./subsribers.component.scss']
})
export class SubsribersComponent {

  subArray : any[] = [];

  constructor (private subSev: SubscriberService) {

    this.subSev.loadData().subscribe(e => {
    this.subArray = e;
    })
  }
   
  onDel(id: any) {
    this.subSev.deleteData(id);
  }


}
