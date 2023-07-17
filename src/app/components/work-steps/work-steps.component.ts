import { Component } from '@angular/core';
import { WorkSteps } from 'src/app/models/work-steps';
import { WorkStepsList } from 'src/app/models/workStepsList';

@Component({
  selector: 'app-work-steps',
  templateUrl: './work-steps.component.html',
  styleUrls: ['./work-steps.component.css'],
})
export class WorkStepsComponent {
  workStepsList: WorkSteps[] = WorkStepsList;
}
