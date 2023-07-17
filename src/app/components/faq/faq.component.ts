import { Component } from '@angular/core';
import { Faq } from 'src/app/models/faq';
import { FaqList } from 'src/app/models/faqList';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent {
  faqList: Faq[] = FaqList;
}
