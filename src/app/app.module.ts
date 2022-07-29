import { environment } from './../environments/environment.prod';
import { DailyBalanceComponent } from './daily-balance/daily-balance.component';
import { TreasuryOutComponent } from './treasury-out/treasury-out.component';
import { TreasuryInComponent } from './treasury-in/treasury-in.component';
import { TransactionInComponent } from './transaction-in/transaction-in.component';
import { MyshipmentsComponent } from './myshipments/myshipments.component';
import { MessagingService } from './services/messaging.service';
import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from './loader.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { JobsComponent } from './jobs/jobs.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { TableModule } from 'primeng/table';
import { ShowJobComponent } from './jobs/show-job/show-job.component';
import { ShowEmpsComponent } from './employees/show-emps/show-emps.component';
import { EditAddEmpComponent } from './employees/edit-add-emp/edit-add-emp.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EditAddJobComponent } from './jobs/edit-add-job/edit-add-job.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
//tostar
import { ToastrModule } from 'ngx-toastr';
import { SectionsComponent } from './sections/sections.component';
import { ShowSecComponent } from './sections/show-sec/show-sec.component';
import { EditAddSecComponent } from './sections/edit-add-sec/edit-add-sec.component';
import { BranchesComponent } from './branches/branches.component';
import { EditAddBranchComponent } from './branches/edit-add-branch/edit-add-branch.component';
import { ShowBranchComponent } from './branches/show-branch/show-branch.component';
import { InterestLevelsComponent } from './interest-levels/interest-levels.component';
import { EditAddIntComponent } from './interest-levels/edit-add-int/edit-add-int.component';
import { ShowIntComponent } from './interest-levels/show-int/show-int.component';
import { WaysComponent } from './ways/ways.component';
import { EditAddWayComponent } from './ways/edit-add-way/edit-add-way.component';
import { ShowWayComponent } from './ways/show-way/show-way.component';
import { TransportTypesComponent } from './transport-types/transport-types.component';
import { EditAddTransportComponent } from './transport-types/edit-add-transport/edit-add-transport.component';
import { ShowTransportComponent } from './transport-types/show-transport/show-transport.component';
import { ProvincesComponent } from './provinces/provinces.component';
import { EditAddProvComponent } from './provinces/edit-add-prov/edit-add-prov.component';
import { ShowProvComponent } from './provinces/show-prov/show-prov.component';
import { CountriesComponent } from './countries/countries.component';
import { EditAddCountryComponent } from './countries/edit-add-country/edit-add-country.component';
import { ShowCountryComponent } from './countries/show-country/show-country.component';
import { AreasComponent } from './areas/areas.component';
import { ShowAreaComponent } from './areas/show-area/show-area.component';
import { EditAddAreaComponent } from './areas/edit-add-area/edit-add-area.component';
import { PaymentTypesComponent } from './payment-types/payment-types.component';
import { ShowPaymentComponent } from './payment-types/show-payment/show-payment.component';
import { EditAddPaymentComponent } from './payment-types/edit-add-payment/edit-add-payment.component';
import { ProductStatusesComponent } from './product-statuses/product-statuses.component';
import { ShowProductStatComponent } from './product-statuses/show-product-stat/show-product-stat.component';
import { EditAddProductStatComponent } from './product-statuses/edit-add-product-stat/edit-add-product-stat.component';
import { StateComponent } from './state/state.component';
import { ShowStateComponent } from './state/show-state/show-state.component';
import { EditAddStateComponent } from './state/edit-add-state/edit-add-state.component';
import { ClientsComponent } from './clients/clients.component';
import { ShowClientComponent } from './clients/show-client/show-client.component';
import { EditAddClientComponent } from './clients/edit-add-client/edit-add-client.component';
import { CouponsComponent } from './coupons/coupons.component';
import { ShowCouponComponent } from './coupons/show-coupon/show-coupon.component';
import { EditAddCouponComponent } from './coupons/edit-add-coupon/edit-add-coupon.component';
import { StoragesComponent } from './storages/storages.component';
import { ShowStorageComponent } from './storages/show-storage/show-storage.component';
import { EditAddStorageComponent } from './storages/edit-add-storage/edit-add-storage.component';
import { TargetsComponent } from './targets/targets.component';
import { ShowTargetComponent } from './targets/show-target/show-target.component';
import { EditAddTargetComponent } from './targets/edit-add-target/edit-add-target.component';
import { ShipmentPlacesComponent } from './shipment-places/shipment-places.component';
import { ShowShipmentComponent } from './shipment-places/show-shipment/show-shipment.component';
import { EditAddShipmentComponent } from './shipment-places/edit-add-shipment/edit-add-shipment.component';
import { ShipmentTypesComponent } from './shipment-types/shipment-types.component';
import { EditAddShipComponent } from './shipment-types/edit-add-ship/edit-add-ship.component';
import { ShowShipComponent } from './shipment-types/show-ship/show-ship.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { ShowShipsComponent } from './shipments/show-ships/show-ships.component';
import { EditAddShipsComponent } from './shipments/edit-add-ships/edit-add-ships.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ShowTransactionComponent } from './transactions/show-transaction/show-transaction.component';
import { EditAddTransactionComponent } from './transactions/edit-add-transaction/edit-add-transaction.component';
import { ReceiveStatusesComponent } from './receive-statuses/receive-statuses.component';
import { ShowReceiveStatusComponent } from './receive-statuses/show-receive-status/show-receive-status.component';
import { EditAddReceiveStatusComponent } from './receive-statuses/edit-add-receive-status/edit-add-receive-status.component';
import { SubStatesComponent } from './sub-states/sub-states.component';
import { ShowSubStateComponent } from './sub-states/show-sub-state/show-sub-state.component';
import { EditAddSubStateComponent } from './sub-states/edit-add-sub-state/edit-add-sub-state.component';
import { MovementsComponent } from './movements/movements.component';
import { ShowMovementComponent } from './movements/show-movement/show-movement.component';
import { EditAddMovementComponent } from './movements/edit-add-movement/edit-add-movement.component';
import {ToastModule} from 'primeng/toast';



//angualr material
import {MatSelectModule} from '@angular/material/select';
import { StorageBranchesComponent } from './storage-branches/storage-branches.component';
import { ClientTypesComponent } from './client-types/client-types.component';
import { ShowClientTypesComponent } from './client-types/show-client-types/show-client-types.component';
import { EditAddClientTypeComponent } from './client-types/edit-add-client-type/edit-add-client-type.component';
import { StorageShipmentsComponent } from './storage-shipments/storage-shipments.component';
import { ShipmentProductComponent } from './shipment-product/shipment-product.component';
import { QualificationsComponent } from './qualifications/qualifications.component';
import { ShowQualificationComponent } from './qualifications/show-qualification/show-qualification.component';
import { EditAddQualificationComponent } from './qualifications/edit-add-qualification/edit-add-qualification.component';
import { EducationGradesComponent } from './education-grades/education-grades.component';
import { ShowGradComponent } from './education-grades/show-grad/show-grad.component';
import { EditAddGradComponent } from './education-grades/edit-add-grad/edit-add-grad.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { ShowExperComponent } from './experiences/show-exper/show-exper.component';
import { EditAddExperComponent } from './experiences/edit-add-exper/edit-add-exper.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { EditAddSupplierComponent } from './suppliers/edit-add-supplier/edit-add-supplier.component';
import { ShowSupplierComponent } from './suppliers/show-supplier/show-supplier.component';
import { InCategoriesComponent } from './in-categories/in-categories.component';
import { ShowInCateComponent } from './in-categories/show-in-cate/show-in-cate.component';
import { EditAddInCateComponent } from './in-categories/edit-add-in-cate/edit-add-in-cate.component';
import { OutCategoriesComponent } from './out-categories/out-categories.component';
import { ShowOutCateComponent } from './out-categories/show-out-cate/show-out-cate.component';
import { EditAddCateComponent } from './out-categories/edit-add-cate/edit-add-cate.component';
import {AccordionModule} from 'primeng/accordion';
import { ViewChildComponent } from './in-categories/view-child/view-child.component';
import { EditAddChildComponent } from './in-categories/edit-add-child/edit-add-child.component';
import { EditAddOutChildComponent } from './out-categories/edit-add-out-child/edit-add-out-child.component';
import { ShowOutChildComponent } from './out-categories/show-out-child/show-out-child.component';
import { LoginComponent } from './login/login.component';
import { PowersComponent } from './powers/powers.component';
import { EditAddPowerComponent } from './powers/edit-add-power/edit-add-power.component';
import { ShowPowerComponent } from './powers/show-power/show-power.component';
import { AccountsComponent } from './accounts/accounts.component';
import {TabViewModule} from 'primeng/tabview';
import { ClientReportsComponent } from './client-reports/client-reports.component';
import { UsersComponent } from './users/users.component';
import { EditAddUsersComponent } from './users/edit-add-users/edit-add-users.component';
import { ShowUsersComponent } from './users/show-users/show-users.component';
import { RepresentativeReportComponent } from './representative-report/representative-report.component';
import { NgxPrintModule } from 'ngx-print';
import { CustomersRecReportComponent } from './customers-rec-report/customers-rec-report.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import { StoreReportComponent } from './store-report/store-report.component';
import { ShipmentsNewComponent } from './shipments-new/shipments-new.component';
import { StorageComponent } from './storage/storage.component';
import { PendingShipmentsComponent } from './pending-shipments/pending-shipments.component';
import { SupervisorsComponent } from './supervisors/supervisors.component';
import { EmpsSupervisorComponent } from './services/emps-supervisor/emps-supervisor.component';
import { RateTypesComponent } from './rate-types/rate-types.component';
import { EditAddRateComponent } from './rate-types/edit-add-rate/edit-add-rate.component';
import { ShowRateComponent } from './rate-types/show-rate/show-rate.component';
import { SupervisorReportComponent } from './supervisor-report/supervisor-report.component';
import { EmployeesReportComponent } from './employees-report/employees-report.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SalesComponent } from './sales/sales.component';
import { ClientSalesComponent } from './client-sales/client-sales.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {CheckboxModule} from 'primeng/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewChildOutComponent } from './view-child-out/view-child-out.component';
import { CompanyComponent } from './company/company.component';
import { EditAddCompanyComponent } from './company/edit-add-company/edit-add-company.component';
import { ShowCompanyComponent } from './company/show-company/show-company.component';
import { ShipmentsCompanyComponent } from './shipments-company/shipments-company.component';
import { EditAddShipComComponent } from './shipments-company/edit-add-ship-com/edit-add-ship-com.component';
import { ShowShipComComponent } from './shipments-company/show-ship-com/show-ship-com.component';
import {CalendarModule} from 'primeng/calendar';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import {ChipsModule} from 'primeng/chips';
import { SlideImgsComponent } from './slide-imgs/slide-imgs.component';
import { EditAddSliderComponent } from './slide-imgs/edit-add-slider/edit-add-slider.component';
import { ShowSlidetrComponent } from './slide-imgs/show-slidetr/show-slidetr.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ShowShipmentDetailsComponent } from './show-shipment-details/show-shipment-details.component';


import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
// import { environment } from '../environments/environment';
import { RefusalStatusesComponent } from './refusal-statuses/refusal-statuses.component';
import { EditAddRefusalStatusesComponent } from './refusal-statuses/edit-add-refusal-statuses/edit-add-refusal-statuses.component';
import { ShowRefusalStatusesComponent } from './refusal-statuses/show-refusal-statuses/show-refusal-statuses.component';
import { RepresentativesDetailsComponent } from './representatives-details/representatives-details.component';
import { BackshipmentsComponent } from './backshipments/backshipments.component';
import { EditAddSalesComponent } from './sales/edit-add-sales/edit-add-sales.component';
import { FilterPipe } from './filter.pipe';
import { RepresentativeComponent } from './representative/representative.component';
import { EditAddResComponent } from './representative/edit-add-res/edit-add-res.component';
import { ShowResComponent } from './representative/show-res/show-res.component';
import { ShowSalesComponent } from './sales/show-sales/show-sales.component';
import { FinancialTransactComponent } from './financial-transact/financial-transact.component';
import { ShowTransactComponent } from './financial-transact/show-transact/show-transact.component';
import { EditAddTransactComponent } from './financial-transact/edit-add-transact/edit-add-transact.component';
import { DailyKeeperComponent } from './daily-keeper/daily-keeper.component';
import { ClientTransactComponent } from './client-transact/client-transact.component';
import { RepresTransactComponent } from './repres-transact/repres-transact.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import {ConfirmationService} from 'primeng/api';
import { EditAddSuperComponent } from './supervisors/edit-add-super/edit-add-super.component';
import { ShowSuperComponent } from './supervisors/show-super/show-super.component';
import { ExpressrepComponent } from './expressrep/expressrep.component';
import { ExpressclientComponent } from './expressclient/expressclient.component';
import { AdditionalServicesComponent } from './additional-services/additional-services.component';
import { ShowAdditionalServicesComponent } from './additional-services/show-additional-services/show-additional-services.component';
import { EditAddAdditionalServicesComponent } from './additional-services/edit-add-additional-services/edit-add-additional-services.component';
import {PasswordModule} from 'primeng/password';
import {InputMaskModule} from 'primeng/inputmask';

import {ButtonModule} from 'primeng/button';
import { GlobalWeightComponent } from './global-weight/global-weight.component';
import { PaginatorModule } from 'primeng/paginator';
import {CardModule} from 'primeng/card';
import { StepsModule } from "primeng/steps";
import {InputTextModule} from 'primeng/inputtext';
import { SendingShipmentsComponent } from './sending-shipments/sending-shipments.component';
import { FinshedShipmentsComponent } from './finshed-shipments/finshed-shipments.component';
import { PickUpComponent } from './pick-up/pick-up.component';
import { ShowPickUpComponent } from './pick-up/show-pick-up/show-pick-up.component';
import { EditAddPickUpComponent } from './pick-up/edit-add-pick-up/edit-add-pick-up.component';
import { CompanyAccountsDetailsComponent } from './company-accounts-details/company-accounts-details.component';
import { IncomeComponent } from './income/income.component';

import {TreeModule} from 'primeng/tree';
import {TreeNode} from 'primeng/api';
import {ContextMenuModule} from 'primeng/contextmenu';
import { ExpenseComponent } from './expense/expense.component';
import { TreasuryComponent } from './treasury/treasury.component';
import { ExpenseAndIncomesComponent } from './expense-and-incomes/expense-and-incomes.component';
import {ToggleButtonModule} from 'primeng/togglebutton';
import MoneyTransferComponent from './money-transfer/money-transfer.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { HomeCompaniesComponent } from './home-companies/home-companies.component';


import {CarouselModule} from 'primeng/carousel';
import { OffersComponent } from './offers/offers.component';
import { EditAddOfferComponent } from './offers/edit-add-offer/edit-add-offer.component';
import { ShowOfferComponent } from './offers/show-offer/show-offer.component';
import { RepresentativeTreasuryComponent } from './representative-treasury/representative-treasury.component';
import { ShowOfferCompanyComponent } from './show-offer-company/show-offer-company.component';
import { StorageSystemComponent } from './storage-system/storage-system.component';
import { EditAddStoregeSystemComponent } from './storage-system/edit-add-storege-system/edit-add-storege-system.component';
import { ShowStoregeSystemComponent } from './storage-system/show-storege-system/show-storege-system.component';
import { OfferStaorageCompanyComponent } from './offer-staorage-company/offer-staorage-company.component';

PaginatorModule
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JobsComponent,
    EmployeesComponent,
    HomeComponent,
    ShowJobComponent,
    ShowEmpsComponent,
    EditAddEmpComponent,
    EditAddJobComponent,
    SectionsComponent,
    ShowSecComponent,
    EditAddSecComponent,
    BranchesComponent,
    EditAddBranchComponent,
    ShowBranchComponent,
    InterestLevelsComponent,
    EditAddIntComponent,
    ShowIntComponent,
    WaysComponent,
    EditAddWayComponent,
    ShowWayComponent,
    TransportTypesComponent,
    EditAddTransportComponent,
    ShowTransportComponent,
    ProvincesComponent,
    EditAddProvComponent,
    ShowProvComponent,
    CountriesComponent,
    EditAddCountryComponent,
    ShowCountryComponent,
    AreasComponent,
    ShowAreaComponent,
    EditAddAreaComponent,
    PaymentTypesComponent,
    ShowPaymentComponent,
    EditAddPaymentComponent,
    ProductStatusesComponent,
    ShowProductStatComponent,
    EditAddProductStatComponent,
    StateComponent,
    ShowStateComponent,
    EditAddStateComponent,
    ClientsComponent,
    ShowClientComponent,
    EditAddClientComponent,
    CouponsComponent,
    ShowCouponComponent,
    EditAddCouponComponent,
    StoragesComponent,
    ShowStorageComponent,
    EditAddStorageComponent,
    TargetsComponent,
    ShowTargetComponent,
    EditAddTargetComponent,
    ShipmentPlacesComponent,
    ShowShipmentComponent,
    EditAddShipmentComponent,
    ShipmentTypesComponent,
    EditAddShipComponent,
    ShowShipComponent,
    ShipmentsComponent,
    ShowShipsComponent,
    EditAddShipsComponent,
    TransactionsComponent,
    ShowTransactionComponent,
    EditAddTransactionComponent,
    ReceiveStatusesComponent,
    ShowReceiveStatusComponent,
    EditAddReceiveStatusComponent,
    SubStatesComponent,
    ShowSubStateComponent,
    EditAddSubStateComponent,
    MovementsComponent,
    ShowMovementComponent,
    EditAddMovementComponent,
    StorageBranchesComponent,
    ClientTypesComponent,
    ShowClientTypesComponent,
    EditAddClientTypeComponent,
    StorageShipmentsComponent,
    ShipmentProductComponent,
    QualificationsComponent,
    ShowQualificationComponent,
    EditAddQualificationComponent,
    EducationGradesComponent,
    ShowGradComponent,
    EditAddGradComponent,
    ExperiencesComponent,
    ShowExperComponent,
    EditAddExperComponent,
    SuppliersComponent,
    EditAddSupplierComponent,
    ShowSupplierComponent,
    InCategoriesComponent,
    ShowInCateComponent,
    EditAddInCateComponent,
    OutCategoriesComponent,
    ShowOutCateComponent,
    EditAddCateComponent,
    ViewChildComponent,
    EditAddChildComponent,
    EditAddOutChildComponent,
    ShowOutChildComponent,
    LoginComponent,
    PowersComponent,
    EditAddPowerComponent,
    ShowPowerComponent,
    AccountsComponent,
    ClientReportsComponent,
    UsersComponent,
    EditAddUsersComponent,
    ShowUsersComponent,
    RepresentativeReportComponent,
    CustomersRecReportComponent,
    StoreReportComponent,
    ShipmentsNewComponent,
    StorageComponent,
    PendingShipmentsComponent,
    SupervisorsComponent,
    EmpsSupervisorComponent,
    RateTypesComponent,
    EditAddRateComponent,
    ShowRateComponent,
    SupervisorReportComponent,
    EmployeesReportComponent,
    LoaderComponent,
    NotFoundComponent,
    SalesComponent,
    ClientSalesComponent,
    ViewChildOutComponent,
    CompanyComponent,
    EditAddCompanyComponent,
    ShowCompanyComponent,
    ShipmentsCompanyComponent,
    EditAddShipComComponent,
    ShowShipComComponent,
    SlideImgsComponent,
    EditAddSliderComponent,
    ShowSlidetrComponent,
    ShowShipmentDetailsComponent,
    RefusalStatusesComponent,
    EditAddRefusalStatusesComponent,
    ShowRefusalStatusesComponent,
    RepresentativesDetailsComponent,
    BackshipmentsComponent,
    EditAddSalesComponent,
    FilterPipe,
    RepresentativeComponent,
    EditAddResComponent,
    ShowResComponent,
    ShowSalesComponent,
    FinancialTransactComponent,
    ShowTransactComponent,
    EditAddTransactComponent,
    DailyKeeperComponent,
    ClientTransactComponent,
    RepresTransactComponent,
    EditAddSuperComponent,
    ShowSuperComponent,
    ExpressrepComponent,
    ExpressclientComponent,
    AdditionalServicesComponent,
    ShowAdditionalServicesComponent,
    EditAddAdditionalServicesComponent,
    GlobalWeightComponent,
    MyshipmentsComponent,
    SendingShipmentsComponent,
    FinshedShipmentsComponent,
    PickUpComponent,
    ShowPickUpComponent,
    EditAddPickUpComponent,
    CompanyAccountsDetailsComponent,
    IncomeComponent,
    ExpenseComponent,
    TreasuryComponent,
    ExpenseAndIncomesComponent ,
    MoneyTransferComponent ,
    TransactionInComponent ,
    TreasuryInComponent ,
    TreasuryOutComponent ,
    DailyBalanceComponent,
    HomeCompaniesComponent,
    OffersComponent,
    EditAddOfferComponent,
    ShowOfferComponent,
    RepresentativeTreasuryComponent,
    ShowOfferCompanyComponent,
    StorageSystemComponent,
    EditAddStoregeSystemComponent,
    ShowStoregeSystemComponent,
    OfferStaorageCompanyComponent

  ],

  imports: [
    AccordionModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CheckboxModule,
    FormsModule,
    ConfirmDialogModule,
    TableModule,
    MatSlideToggleModule,
    PasswordModule ,
    InputMaskModule ,
    ButtonModule,
    ToastrModule.forRoot(),
    TabViewModule,
    NgxPrintModule,
    InputSwitchModule,
    MatProgressSpinnerModule,
    MultiSelectModule,
    NgSelectModule,
    MatSelectModule,
    ToastModule ,
    MatStepperModule,
    CalendarModule,
    ChipsModule,
    NgxQRCodeModule,
    NgxBarcodeModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    CommonModule,
    PaginatorModule,
    CardModule ,
    StepsModule,
    InputTextModule,
    TreeModule ,
    TreeModule ,
    ContextMenuModule ,
    ToggleButtonModule  ,
    AngularFileUploaderModule ,
    CarouselModule ,

    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [MessagingService,
    AsyncPipe ,
     LoaderService,
     ConfirmationService,

    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
