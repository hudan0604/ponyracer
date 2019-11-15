import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { RaceModel } from '../models/race.model';
import { Subscription } from 'rxjs';
import { PonyWithPositionModel } from '../models/pony.model';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel: RaceModel;
  positionSubscription: Subscription;
  poniesWithPosition: Array<PonyWithPositionModel>;
  constructor(private raceService: RaceService, private route: ActivatedRoute) { }

  ngOnInit() {
    const raceId = +this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(raceId).subscribe(race => (this.raceModel = race));
    this.positionSubscription = this.raceService.live(raceId).subscribe(positions => this.poniesWithPosition = positions);
  }
  ngOnDestroy() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }


}
