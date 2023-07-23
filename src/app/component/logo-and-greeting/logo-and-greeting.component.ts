import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo-and-greeting',
  templateUrl: './logo-and-greeting.component.html',
  styleUrls: ['./logo-and-greeting.component.scss'],
})
export class LogoAndGreetingComponent implements AfterViewInit {
  @Output() animationComplete = new EventEmitter<void>();

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.create_animation();
  }

  create_animation() {
    const countdownTimer = anime.timeline({
      duration: 3000, // 3 seconds countdown timer
      update: () => {
        const countdownText = document.getElementById('countdown-text');
        if (countdownText) {
          countdownText.textContent = (countdownTimer.duration - countdownTimer.currentTime) / 5000 + 's';
        }
      },
    });

    countdownTimer.add({
      targets: '.countdown',
      opacity: 5,
      duration: 1, // Instantly make the countdown visible
      fill: '#f96b11',
    });

    countdownTimer.add({
      targets: '.countdown',
      opacity: 100,
      duration: 6000, // Fade out the countdown in 1 second
      delay: 300, // Wait for 2 seconds before fading out
      fill: '#f96b11',
    });

    const timeline2 = anime.timeline({
      direction: 'linear',
      duration: 3000,
      transformOrigin: '50% 50%',
      loop: false,
    });

    timeline2.add({
      targets: '.path',
      fill: '#181a1b',
      translateX: [0, 0],
      opacity: {
        value: 1,
        duration: 50,
        easing: 'linear',
      },
      duration: 2000,
      easing: 'linear',
      offset: 100,
    });

    timeline2.add({
      targets: '.path_s',
      fill: '#e9e9e9',
      translateX: [0, 0],
      opacity: {
        value: 1,
        duration: 50,
        easing: 'linear',
      },
      duration: 2000,
      easing: 'linear',
      offset: 100,
    });

    timeline2.add({
      targets: '.path2',
      fill: '#f96b11',
      fillOpacity: 0.9,
      translateY: [0, 0],
      opacity: {
        value: 1,
        duration: 5,
        easing: 'linear',
      },
      duration: 600 * 3,
      easing: 'linear',
    });

    timeline2.add({
      targets: '.path3',
      translateY: [50, 5],
      translateX: [-5, -5],
      rotate: -10,
      opacity: {
        value: 1,
        duration: 200,
        easing: 'linear',
      },
      fill: '#eeeeee',
    });

    const svgPath = document.querySelectorAll('.path');

    const svgText = anime({
      targets: svgPath,
      loop: false,
      direction: 'normal',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1000 * 5,
      fill: '#181a1b',

      delay: (el, i) => {
        return i * 200;
      },
    });

    const svgPath_s = document.querySelectorAll('.path_s');

    const svgText_s = anime({
      targets: svgPath_s,
      loop: false,
      direction: 'normal',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1000 * 5,
      fill: '#e9e9e9',

      delay: (el, i) => {
        return i * 200;
      },
    });

    const svgPath2 = document.querySelectorAll('.path2');

    const svgText2 = anime({
      targets: svgPath2,
      loop: false,
      direction: 'static',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1000 * 5,
      fill: '#181a1b',
      delay: (el, i) => {
        return i * 200;
      },
    });

    const svgPath3 = document.querySelectorAll('.path3');

    const svgText3 = anime({
      targets: svgPath3,
      loop: false,
      direction: 'normal',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 400 * 5 + 500 * 5,
      fill: '#eeeeee',
      delay: (el, i) => {
        return i * 600 * 5;
      },
    });

    timeline2.finished.then(() => {
      setTimeout(() => {
        this.router.navigate(['/recipes']);
      }, 500); // Adjust the delay as needed
    });
  }
}
