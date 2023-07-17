import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/home/landing/landing.component';
import { IntroComponent } from './pages/home/intro/intro.component';
import { AboutComponent } from './components/about/about.component';
import { AboutContentComponent } from './components/about/about-content/about-content.component';
import { AboutImagesComponent } from './components/about/about-images/about-images.component';
import { FeaturesComponent } from './pages/home/features/features.component';
import { FeaturesContentComponent } from './pages/home/features/features-content/features-content.component';
import { StatsComponent } from './components/stats/stats.component';
import { ServicesComponent } from './components/services/services.component';
import { WorkStepsComponent } from './components/work-steps/work-steps.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TeamComponent } from './components/team/team.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { FindUsComponent } from './pages/home/find-us/find-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { EndFooterComponent } from './components/end-footer/end-footer.component';
import { ContactUSComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { OurPortfolioComponent } from './pages/our-portfolio/our-portfolio.component';
import { CustomerDashboardComponent } from './pages/Customer/customer-dashboard/customer-dashboard.component';
import { CutomersComponent } from './pages/Admin/cutomers/cutomers.component';
import { CustomerFormComponent } from './pages/Admin/cutomers/customer-form/customer-form.component';
import { EmployeesComponent } from './pages/Admin/employees/employees.component';
import { BranchesComponent } from './pages/Admin/branches/branches.component';
import { GovernroatesComponent } from './pages/Admin/governroates/governroates.component';
import { CitiesComponent } from './pages/Admin/cities/cities.component';
import { EmployeesFormComponent } from './pages/Admin/employees/employees-form/employees-form.component';
import { BranchesFormComponent } from './pages/Admin/branches/branches-form/branches-form.component';
import { GovernroatesFormComponent } from './pages/Admin/governroates/governroates-form/governroates-form.component';
import { CitiesFormComponent } from './pages/Admin/cities/cities-form/cities-form.component';
import { DeliveriesComponent } from './pages/Admin/deliveries/deliveries.component';
import { DeliveriesFormComponent } from './pages/Admin/deliveries/deliveries-form/deliveries-form.component';
import { AddOrderComponent } from './pages/Customer/add-order/add-order.component';
import { EmployeeDashboardComponent } from './pages/employee/employee-dashboard/employee-dashboard.component';
import { EmployeeOrderComponent } from './pages/employee/employee-order/employee-order.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { AdminDasboardComponent } from './pages/Admin/admin-dasboard/admin-dasboard.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DeliveryDashboardComponent } from './pages/delivery/delivery-dashboard/delivery-dashboard.component';
import { DeliveryOrderComponent } from './pages/delivery/delivery-order/delivery-order.component';
import { OrdersReportComponent } from './pages/Admin/orders-report/orders-report.component';
import { WeightSettingComponent } from './pages/Admin/weight-setting/weight-setting.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptor } from 'token.interceptor';
import { TokenService } from './services/token.service';
import { AdminGuardsService } from './guards/admin-guards.service';
import { CustomerGudarsService } from './guards/customer-gudars.service';
import { DeliveryGuardsService } from './guards/delivery-guards.service';
import { EmployeeGuardsService } from './guards/employee-guards.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LandingComponent,
    IntroComponent,
    AboutComponent,
    AboutContentComponent,
    AboutImagesComponent,
    FeaturesComponent,
    FeaturesContentComponent,
    StatsComponent,
    ServicesComponent,
    WorkStepsComponent,
    PortfolioComponent,
    TeamComponent,
    FaqComponent,
    ContactComponent,
    ContactFormComponent,
    FindUsComponent,
    FooterComponent,
    EndFooterComponent,
    ContactUSComponent,
    AboutUsComponent,
    OurServicesComponent,
    OurPortfolioComponent,
    CustomerDashboardComponent,
    CutomersComponent,
    CustomerFormComponent,
    EmployeesComponent,
    BranchesComponent,
    GovernroatesComponent,
    CitiesComponent,
    EmployeesFormComponent,
    BranchesFormComponent,
    GovernroatesFormComponent,
    CitiesFormComponent,
    DeliveriesComponent,
    DeliveriesFormComponent,
    AddOrderComponent,
    EmployeeDashboardComponent,
    EmployeeOrderComponent,
    LoginComponent,
    AdminDasboardComponent,
    OrdersListComponent,
    OrderDetailsComponent,
    DashboardCardComponent,
    NotFoundComponent,
    DeliveryDashboardComponent,
    DeliveryOrderComponent,
    OrdersReportComponent,
    WeightSettingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true,
    },
  AdminGuardsService,CustomerGudarsService,DeliveryGuardsService,EmployeeGuardsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
