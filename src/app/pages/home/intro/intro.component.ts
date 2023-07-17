import { Component } from '@angular/core';
import { Intro } from 'src/app/models/intro';
import { IntroList } from './../../../models/introList';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent {
  introList: Intro[] = IntroList;
}
