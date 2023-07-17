import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
// import { Component, ElementRef } from '@angular/core';
import { Fancybox } from '@fancyapps/ui';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfoioList } from 'src/app/models/portfolioList';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit, OnDestroy {
  portfolioList: Portfolio[] = PortfoioList;
  constructor(private elRef: ElementRef) {}
  ngOnInit() {
    Fancybox.bind(this.elRef.nativeElement, '[data-fancybox]', {
      // Custom options
    });
  }

  ngOnDestroy() {
    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();
  }
}
