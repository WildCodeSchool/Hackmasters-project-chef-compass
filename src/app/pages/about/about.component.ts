import { Component } from '@angular/core';
import { Teams } from 'src/app/models/Team.model';
import { TeamService } from 'src/app/services/Team/team.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  teams:Teams[]
  
  constructor(private teamService: TeamService) { 
    this.teams = this.teamService.getAllTeams()
  }

  }

