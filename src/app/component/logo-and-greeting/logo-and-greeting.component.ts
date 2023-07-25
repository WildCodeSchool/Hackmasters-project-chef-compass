import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { Router } from '@angular/router';
import {AnimationHomepageService} from "../../services/animationHomePages/animation-homepage.service";

@Component({
  selector: 'app-logo-and-greeting',
  templateUrl: './logo-and-greeting.component.html',
  styleUrls: ['./logo-and-greeting.component.scss'],
})
export class LogoAndGreetingComponent implements AfterViewInit {
  @Output() animationComplete = new EventEmitter<void>();

  constructor(private router: Router,
              private animation: AnimationHomepageService) {}

  ngAfterViewInit() {
    this.animation.create_animation()
  }

}
