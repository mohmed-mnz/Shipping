import { Component } from '@angular/core';
import { Social } from 'src/app/models/social';
import { SocialList } from 'src/app/models/socialList';
import { Team } from 'src/app/models/team';
import { TeamList } from 'src/app/models/teamList';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent {
  teamList: Team[] = TeamList;
  socialList: Social[] = SocialList;
}
