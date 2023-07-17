import { Component } from '@angular/core';
import { Social } from 'src/app/models/social';
import { SocialList } from 'src/app/models/socialList';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  socialList: Social[] = SocialList;
  galleryImgs = [
    {
      id: 1,
      image: 'assets/gallery-1.jpg',
    },
    {
      id: 2,
      image: 'assets/gallery-2.jpg',
    },
    {
      id: 3,
      image: 'assets/gallery-3.jpg',
    },
    {
      id: 4,
      image: 'assets/gallery-4.jpg',
    },
    {
      id: 5,
      image: 'assets/gallery-5.jpg',
    },
    {
      id: 6,
      image: 'assets/gallery-6.jpg',
    },
  ];
}
