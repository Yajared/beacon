import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'beacon';
  security = '';

  constructor(private router: Router){
  }

  ngOnInit() {
  }

  navigate() {
    console.log('Passed security', this.security, 'to navigate!');
    this.router.navigate(['optionChains', this.security]);
  }
}
