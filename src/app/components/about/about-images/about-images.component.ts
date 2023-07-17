import { Component } from '@angular/core';

@Component({
  selector: 'app-about-images',
  templateUrl: './about-images.component.html',
  styleUrls: ['./about-images.component.css'],
})
export class AboutImagesComponent {
  stopVideo(video: any) {
    video.pause();
  }
}
