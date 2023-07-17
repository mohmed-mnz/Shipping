import { Component } from '@angular/core';
import { Services } from 'src/app/models/services';
import { ServicesList } from 'src/app/models/servicesList';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  servicesList: Services[] = ServicesList;
}
