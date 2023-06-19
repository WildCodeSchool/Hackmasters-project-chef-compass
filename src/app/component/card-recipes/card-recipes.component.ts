import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ConverterRecipesService } from 'src/app/services/converter/converter-recipes.service';

@Component({
  selector: 'app-card-recipes',
  templateUrl: './card-recipes.component.html',
  styleUrls: ['./card-recipes.component.scss']
})
export class CardRecipesComponent {
  @Input() recipe: any;
  constructor( public converter : ConverterRecipesService) {}

}
