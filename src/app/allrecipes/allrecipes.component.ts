import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-allrecipes',
  templateUrl: './allrecipes.component.html',
  styleUrls: ['./allrecipes.component.scss'],
})
export class AllrecipesComponent implements OnInit {
  recipes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/recipes.json').subscribe((data) => {
      this.recipes = data.recipes;
    });
  }
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  scrollLeft() {
    this.carouselContainer.nativeElement.scrollBy({
      left: -200, // Définissez la valeur appropriée pour le défilement à gauche
      behavior: 'smooth', // Pour une animation fluide
    });
  }

  scrollRight() {
    this.carouselContainer.nativeElement.scrollBy({
      left: 200, // Définissez la valeur appropriée pour le défilement à droite
      behavior: 'smooth', // Pour une animation fluide
    });
  }
}
