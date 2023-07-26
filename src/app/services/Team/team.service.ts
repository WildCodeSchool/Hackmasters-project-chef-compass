import { Injectable } from '@angular/core';
import { Teams } from '../../models/Team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private Teams: Teams[];

  constructor() {
    this.Teams = [
      new Teams(
        '/assets/arturo.jpg',
        'Arturo',
        'https://github.com/ArPimentel',
        'https://www.linkedin.com/in/arturo-pimentel-developpeur-web/'
      ),
      new Teams(
        'https://avatars.githubusercontent.com/u/107479269?v=4',
        'Tyler',
        'https://github.com/td6904',
        'https://www.linkedin.com/in/tylerdurnion/'
      ),
      new Teams(
        'https://avatars.githubusercontent.com/u/114175213?s=400&u=f996977d4fd12a2b289fc9eb39f9d3299b52da01&v=4',
        'Rémy',
        'https://github.com/remy-rm',
        'https://www.linkedin.com/in/remy-marquis-38b114278/'
      ),
    ];
  }

  getAllTeams(): Teams[] {
    return this.Teams;
  }
}
