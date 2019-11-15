import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {
  constructor() { }

  @Input() ponyModel: PonyModel;
  @Input() isRunning: boolean;
  @Output() readonly ponyClicked = new EventEmitter<PonyModel>();

  getPonyImageUrl() {
    return `assets/images/pony-${this.ponyModel.color.toLowerCase()}${this.isRunning ? '-running' : ''}.gif`;
  }

  ngOnInit() { }
  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }
}
