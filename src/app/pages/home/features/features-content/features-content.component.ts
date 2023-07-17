import { Component } from '@angular/core';
import { Features } from 'src/app/models/features';
import { FeaturesList } from 'src/app/models/featuresList';

@Component({
  selector: 'app-features-content',
  templateUrl: './features-content.component.html',
  styleUrls: ['./features-content.component.css'],
})
export class FeaturesContentComponent {
  featuresList: Features[] = FeaturesList;
}
