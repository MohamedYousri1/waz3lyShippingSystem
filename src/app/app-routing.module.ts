import { OfferStaorageCompanyComponent } from './offer-staorage-company/offer-staorage-company.component';
import { ShowOfferCompanyComponent } from './show-offer-company/show-offer-company.component';
import { RepresentativeTreasuryComponent } from './representative-treasury/representative-treasury.component';
import { OffersComponent } from './offers/offers.component';
import { HomeCompaniesComponent } from './home-companies/home-companies.component';
import { TreasuryOutComponent } from './treasury-out/treasury-out.component';
import { TransactionInComponent } from './transaction-in/transaction-in.component';
import MoneyTransferComponent from './money-transfer/money-transfer.component';
import { ExpenseAndIncomesComponent } from './expense-and-incomes/expense-and-incomes.component';
import { TreasuryComponent } from './treasury/treasury.component';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { CompanyAccountsDetailsComponent } from './company-accounts-details/company-accounts-details.component';
import { PickUpComponent } from './pick-up/pick-up.component';
import { FinshedShipmentsComponent } from './finshed-shipments/finshed-shipments.component';
import { SendingShipmentsComponent } from './sending-shipments/sending-shipments.component';
import { MyshipmentsComponent } from './myshipments/myshipments.component';
import { GlobalWeightComponent } from './global-weight/global-weight.component';
import { AdditionalServicesComponent } from './additional-services/additional-services.component';
import { BackshipmentsComponent } from './backshipments/backshipments.component';
import { RefusalStatusesComponent } from './refusal-statuses/refusal-statuses.component';
import { ShowShipmentDetailsComponent } from './show-shipment-details/show-shipment-details.component';
import { ShipmentsCompanyComponent } from './shipments-company/shipments-company.component';
import { CompanyComponent } from './company/company.component';
import { ViewChildOutComponent } from './view-child-out/view-child-out.component';
import { AuthBackGuard } from './services/auth-back.guard';
import { ClientSalesComponent } from './client-sales/client-sales.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeesReportComponent } from './employees-report/employees-report.component';
import { SupervisorReportComponent } from './supervisor-report/supervisor-report.component';
import { EmpsSupervisorComponent } from './services/emps-supervisor/emps-supervisor.component';
import { SupervisorsComponent } from './supervisors/supervisors.component';
import { PendingShipmentsComponent } from './pending-shipments/pending-shipments.component';
import { StorageComponent } from './storage/storage.component';
import { ShipmentsNewComponent } from './shipments-new/shipments-new.component';
import { CustomersRecReportComponent } from './customers-rec-report/customers-rec-report.component';
import { RepresentativeReportComponent } from './representative-report/representative-report.component';
import { UsersComponent } from './users/users.component';
import { ClientReportsComponent } from './client-reports/client-reports.component';
import { AccountsComponent } from './accounts/accounts.component';
import { PowersComponent } from './powers/powers.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreasComponent } from './areas/areas.component';
import { BranchesComponent } from './branches/branches.component';
import { ClientTypesComponent } from './client-types/client-types.component';
import { ClientsComponent } from './clients/clients.component';
import { CountriesComponent } from './countries/countries.component';
import { CouponsComponent } from './coupons/coupons.component';
import { EducationGradesComponent } from './education-grades/education-grades.component';
import { EmployeesComponent } from './employees/employees.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { HomeComponent } from './home/home.component';
import { InCategoriesComponent } from './in-categories/in-categories.component';
import { ViewChildComponent } from './in-categories/view-child/view-child.component';
import { InterestLevelsComponent } from './interest-levels/interest-levels.component';
import { JobsComponent } from './jobs/jobs.component';
import { MovementsComponent } from './movements/movements.component';
import { OutCategoriesComponent } from './out-categories/out-categories.component';
import { PaymentTypesComponent } from './payment-types/payment-types.component';
import { ProductStatusesComponent } from './product-statuses/product-statuses.component';
import { ProvincesComponent } from './provinces/provinces.component';
import { QualificationsComponent } from './qualifications/qualifications.component';
import { ReceiveStatusesComponent } from './receive-statuses/receive-statuses.component';
import { SectionsComponent } from './sections/sections.component';
import { ShipmentPlacesComponent } from './shipment-places/shipment-places.component';
import { ShipmentProductComponent } from './shipment-product/shipment-product.component';
import { ShipmentTypesComponent } from './shipment-types/shipment-types.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { StateComponent } from './state/state.component';
import { StorageBranchesComponent } from './storage-branches/storage-branches.component';
import { StorageShipmentsComponent } from './storage-shipments/storage-shipments.component';
import { StoragesComponent } from './storages/storages.component';
import { SubStatesComponent } from './sub-states/sub-states.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { TargetsComponent } from './targets/targets.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransportTypesComponent } from './transport-types/transport-types.component';
import { WaysComponent } from './ways/ways.component';
import { AuthGuard  } from './auth.guard';
import { RateTypesComponent } from './rate-types/rate-types.component';
import { SalesComponent } from './sales/sales.component';
import { SlideImgsComponent } from './slide-imgs/slide-imgs.component';
import { RepresentativesDetailsComponent } from './representatives-details/representatives-details.component';

import { RepresentativeComponent } from './representative/representative.component';
import {FinancialTransactComponent} from './financial-transact/financial-transact.component';
import { DailyKeeperComponent } from './daily-keeper/daily-keeper.component';
import {ClientTransactComponent} from './client-transact/client-transact.component'
import {RepresTransactComponent} from './repres-transact/repres-transact.component'
import { ExpressrepComponent } from './expressrep/expressrep.component';
import { ExpressclientComponent } from './expressclient/expressclient.component';
import { TreasuryInComponent } from './treasury-in/treasury-in.component';
import { DailyBalanceComponent } from './daily-balance/daily-balance.component';
import { StorageSystemComponent } from './storage-system/storage-system.component';
const routes: Routes = [
  { path: '',      canActivate:[AuthBackGuard] ,    component: LoginComponent },
  { path: 'home',    canActivate:[AuthGuard] ,      component: HomeComponent },

  { path: 'login',    canActivate:[AuthBackGuard] ,      component :LoginComponent},
  { path: 'jobs',    canActivate:[AuthGuard] ,      component: JobsComponent },
  { path: 'employees-settings',canActivate:[AuthGuard] , component: EmployeesComponent },
  { path: 'express-representive' ,canActivate:[AuthGuard] , component: ExpressrepComponent },
  { path: 'express-client' ,canActivate:[AuthGuard] , component: ExpressclientComponent },
   { path: 'sections',       component: SectionsComponent },
  { path: 'branches',        canActivate:[AuthGuard] ,   component: BranchesComponent },
  { path: 'interest_levels',  canActivate:[AuthGuard] ,  component: InterestLevelsComponent },
  { path: 'ways',        canActivate:[AuthGuard] ,       component: WaysComponent },
  { path: 'representative',        canActivate:[AuthGuard] ,       component: RepresentativeComponent },
   {path:'financial-transact' , canActivate:[AuthGuard] , component:FinancialTransactComponent},
   {path:'client-transact' , canActivate:[AuthGuard] , component:ClientTransactComponent},
  //  { path: 'repres-transact',canActivate:[AuthGuard] , component: RepresTransactComponent },
  { path: 'transport_type',canActivate:[AuthGuard] , component: TransportTypesComponent },
  { path: 'countries',  canActivate:[AuthGuard] ,    component: CountriesComponent },
  {path:'daily-keeper' , canActivate:[AuthGuard] , component:DailyKeeperComponent},
  { path: 'provinces',   canActivate:[AuthGuard] ,   component: ProvincesComponent },
  { path: 'areas',      canActivate:[AuthGuard] ,    component: AreasComponent },
  { path: 'payment_type', canActivate:[AuthGuard] ,  component: PaymentTypesComponent },
  { path: 'product_statuses',canActivate:[AuthGuard] ,   component: ProductStatusesComponent },
  { path: 'state',      canActivate:[AuthGuard] ,        component: StateComponent },
  { path: 'clients',    canActivate:[AuthGuard] ,        component: ClientsComponent },
  { path: 'coupons',   canActivate:[AuthGuard] ,         component: CouponsComponent },
  { path: 'storage',  canActivate:[AuthGuard] ,          component: StoragesComponent },
  { path: 'targets',   canActivate:[AuthGuard] ,     component: TargetsComponent },
  { path: 'shipments',  canActivate:[AuthGuard] ,    component: ShipmentsComponent },
  { path: 'shipment_place',canActivate:[AuthGuard] , component: ShipmentPlacesComponent },
  { path: 'additional_services',canActivate:[AuthGuard] , component: AdditionalServicesComponent },
  { path: 'global_weight',canActivate:[AuthGuard] , component: GlobalWeightComponent },
  { path: 'shipment_type', canActivate:[AuthGuard] , component: ShipmentTypesComponent },
  { path: 'transactions', canActivate:[AuthGuard] ,  component: TransactionsComponent },
  { path: 'receive_statuses', canActivate:[AuthGuard] ,  component: ReceiveStatusesComponent },
  { path: 'rate_types', canActivate:[AuthGuard] ,  component: RateTypesComponent },
  { path: 'sub_states',     canActivate:[AuthGuard] ,    component: SubStatesComponent },
  { path: 'movements',   canActivate:[AuthGuard] ,       component: MovementsComponent },
  { path: 'storages-branches/:id',canActivate:[AuthGuard] ,   component :StorageBranchesComponent},
  { path: 'storages-shipments/:id',canActivate:[AuthGuard] ,  component :StorageShipmentsComponent},
  { path: 'supervisors/:id',canActivate:[AuthGuard] ,  component :EmpsSupervisorComponent},
  { path: 'shipmentDetails',  component :ShowShipmentDetailsComponent},
  { path: 'sales/:id',canActivate:[AuthGuard] ,  component :ClientSalesComponent},
  { path: 'shipment-product/:id', canActivate:[AuthGuard] ,   component :ShipmentProductComponent},
  { path: 'shipments/:id', canActivate:[AuthGuard] ,   component :ShipmentsNewComponent},
  { path: 'storage/:id', canActivate:[AuthGuard] ,   component :StorageComponent},
  { path: 'pending_shipments', canActivate:[AuthGuard] ,  component: PendingShipmentsComponent },
  { path: 'supervisor_report', canActivate:[AuthGuard] ,  component: SupervisorReportComponent},
  { path: 'employees_report', canActivate:[AuthGuard] ,  component: EmployeesReportComponent},
  { path: 'qualification',      canActivate:[AuthGuard] ,     component :QualificationsComponent},
  { path: 'education_grades',   canActivate:[AuthGuard] ,        component :EducationGradesComponent},
  { path: 'experiences',       canActivate:[AuthGuard] ,       component :ExperiencesComponent},
  { path: 'suppliers',       canActivate:[AuthGuard] ,       component :SuppliersComponent},
  { path: 'client_types',    canActivate:[AuthGuard] ,   component :ClientTypesComponent},
  { path: 'out_categories',  canActivate:[AuthGuard] ,     component :OutCategoriesComponent},
  { path: 'in_categories',   canActivate:[AuthGuard] ,    component :InCategoriesComponent},
  { path: 'in_child/:id', canActivate:[AuthGuard] ,     component :ViewChildComponent},
  // { path: 'out_child/:id', canActivate:[AuthGuard] ,     component :ViewChildOutComponent},

  { path: 'roles',   canActivate:[AuthGuard] ,    component :PowersComponent},
  { path: 'accounts', canActivate:[AuthGuard] ,    component :AccountsComponent},
  { path: 'client-reports',  canActivate:[AuthGuard] ,   component :ClientReportsComponent},
  { path: 'users',  canActivate:[AuthGuard] ,   component :UsersComponent},
  { path: 'supervisors', canActivate:[AuthGuard] ,    component :SupervisorsComponent},
  { path: 'sales', canActivate:[AuthGuard] ,   component :SalesComponent},
  { path: 'representative',  canActivate:[AuthGuard] ,   component :RepresentativeReportComponent},
  { path: 'customer_received', canActivate:[AuthGuard] ,    component :CustomersRecReportComponent},

  { path: 'income', canActivate:[AuthGuard] ,    component :IncomeComponent},
  { path: 'expense', canActivate:[AuthGuard] ,    component :ExpenseComponent},
  { path: 'treasury', canActivate:[AuthGuard] ,    component :TreasuryComponent},
  {path : 'IncomeExpenseManagement'  , component : ExpenseAndIncomesComponent},
  {path : 'money-transfer'  , component : MoneyTransferComponent},




    //companies
  { path: 'companies',  canActivate:[AuthGuard] ,   component :CompanyComponent},

  { path: 'home-companies', component: HomeCompaniesComponent },
  { path: 'shipment_company' ,     component :ShipmentsCompanyComponent},
  { path: 'myShipments' ,     component :MyshipmentsComponent},
  { path: 'sending-shipments' ,     component :SendingShipmentsComponent},
  { path: 'finshed-shipments' ,     component :FinshedShipmentsComponent},
  { path: 'pick-up' , component :PickUpComponent},
  { path: 'offer_company' , component :ShowOfferCompanyComponent},
  { path: 'storageSystem' , component : StorageSystemComponent},
  { path: 'offer_storage' , component : OfferStaorageCompanyComponent},








  { path: 'shipment_back',  canActivate:[AuthGuard] ,   component :BackshipmentsComponent},
  { path: 'advertisments',   canActivate:[AuthGuard] ,  component :SlideImgsComponent},
  { path: 'offers',   canActivate:[AuthGuard] ,  component :OffersComponent},

  { path: 'refusal_statuses', canActivate:[AuthGuard] ,    component :RefusalStatusesComponent},
  { path: 'representativeDetails', canActivate:[AuthGuard] ,    component :RepresentativesDetailsComponent},
  { path: 'companyAccounts', canActivate:[AuthGuard] ,    component :CompanyAccountsDetailsComponent},
  { path: 'transaction-in', canActivate:[AuthGuard] ,    component :TreasuryInComponent},
  { path: 'transaction-out', canActivate:[AuthGuard] ,    component :TreasuryOutComponent},
  { path: 'daily_balance', canActivate:[AuthGuard] ,    component :DailyBalanceComponent},
  { path: 'representative_treasury', canActivate:[AuthGuard] ,    component :RepresentativeTreasuryComponent},





  { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page
  //companies
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {onSameUrlNavigation:'reload' , useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
