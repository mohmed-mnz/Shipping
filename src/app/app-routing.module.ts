import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { OurPortfolioComponent } from './pages/our-portfolio/our-portfolio.component';
import { ContactUSComponent } from './pages/contact-us/contact-us.component';
import { CutomersComponent } from './pages/Admin/cutomers/cutomers.component';
import { CustomerFormComponent } from './pages/Admin/cutomers/customer-form/customer-form.component';
import { EmployeesComponent } from './pages/Admin/employees/employees.component';
import { EmployeesFormComponent } from './pages/Admin/employees/employees-form/employees-form.component';
import { BranchesComponent } from './pages/Admin/branches/branches.component';
import { BranchesFormComponent } from './pages/Admin/branches/branches-form/branches-form.component';
import { GovernroatesComponent } from './pages/Admin/governroates/governroates.component';
import { GovernroatesFormComponent } from './pages/Admin/governroates/governroates-form/governroates-form.component';
import { CitiesComponent } from './pages/Admin/cities/cities.component';
import { CitiesFormComponent } from './pages/Admin/cities/cities-form/cities-form.component';
import { DeliveriesComponent } from './pages/Admin/deliveries/deliveries.component';
import { DeliveriesFormComponent } from './pages/Admin/deliveries/deliveries-form/deliveries-form.component';
import { AddOrderComponent } from './pages/Customer/add-order/add-order.component';
import { EmployeeOrderComponent } from './pages/employee/employee-order/employee-order.component';
import { CustomerDashboardComponent } from './pages/Customer/customer-dashboard/customer-dashboard.component';
import { EmployeeDashboardComponent } from './pages/employee/employee-dashboard/employee-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDasboardComponent } from './pages/Admin/admin-dasboard/admin-dasboard.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DeliveryOrderComponent } from './pages/delivery/delivery-order/delivery-order.component';
import { DeliveryDashboardComponent } from './pages/delivery/delivery-dashboard/delivery-dashboard.component';
import { OrdersReportComponent } from './pages/Admin/orders-report/orders-report.component';
import { WeightSettingComponent } from './pages/Admin/weight-setting/weight-setting.component';
import { AdminGuardsService } from './guards/admin-guards.service';
import { CustomerGudarsService } from './guards/customer-gudars.service';
import { EmployeeGuardsService } from './guards/employee-guards.service';
import { DeliveryGuardsService } from './guards/delivery-guards.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'services', component: OurServicesComponent },
  { path: 'portfolio', component: OurPortfolioComponent },
  { path: 'contact', component: ContactUSComponent },
  { path: 'admin/dashboard', component: AdminDasboardComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/report', component: OrdersReportComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/weight', component: WeightSettingComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/customers', component: CutomersComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/customers/form/:id', component: CustomerFormComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/Employees', component: EmployeesComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/Employees/form/:id', component: EmployeesFormComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/Deliveries', component: DeliveriesComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/Deliveries/form/:id', component: DeliveriesFormComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/Branches', component: BranchesComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/Branches/form/:id', component: BranchesFormComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/Governroates', component: GovernroatesComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/Governroates/form/:id', component: GovernroatesFormComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/Cities', component: CitiesComponent,canActivate:[AdminGuardsService] },
  { path: 'admin/Cities/form/:id', component: CitiesFormComponent,canActivate:[AdminGuardsService] },
  { path: 'order/form/:id', component: AddOrderComponent},
  { path: 'employee/orders', component: EmployeeOrderComponent,canActivate:[EmployeeGuardsService] },
  { path: 'employee/dashboard', component: EmployeeDashboardComponent,canActivate:[EmployeeGuardsService] },
  { path: 'customer/dashboard', component: CustomerDashboardComponent,canActivate:[CustomerGudarsService] },
  { path: 'delivery/orders', component: DeliveryOrderComponent,canActivate:[DeliveryGuardsService] },
  { path: 'delivery/dashboard', component: DeliveryDashboardComponent,canActivate:[DeliveryGuardsService] },
  { path: 'orders/:data', component: OrdersListComponent},
  { path: '**', component: NotFoundComponent },
  {path:'notfound',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
