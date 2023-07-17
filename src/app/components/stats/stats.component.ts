import { Component } from '@angular/core';
import { Stats } from 'src/app/models/stats';
import { StatsList } from 'src/app/models/statsList';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent {
  statsList: Stats[] = StatsList;
}
