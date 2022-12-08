import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
} from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFileUploaderModule,
  DxFormModule,
  DxMapModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTagBoxModule,
  DxTemplateModule,
  DxToolbarModule,
  DxResponsiveBoxModule,
  DxBoxModule,
} from 'devextreme-angular';
import { CongregacaoComponent } from './pages/congregacao/congregacao.component';
import { EventoComponent } from './pages/evento/evento.component';
import { PassageiroComponent } from './pages/passageiro/passageiro.component';
import { PassagemComponent } from './pages/passagem/passagem.component';
import { HelpComponent } from './pages/help/help.component';
import { PrivicyComponent } from './pages/privicy/privicy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'pages/terms',
    component: TermsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'pages/privicy',
    component: PrivicyComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'pages/help',
    component: HelpComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'pages/passagem',
    component: PassagemComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'pages/passageiro',
    component: PassageiroComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'pages/evento',
    component: EventoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'pages/congregacao',
    component: CongregacaoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    DxDataGridModule,
    DxFormModule,
    DxTemplateModule,
    DxMapModule,
    DxButtonModule,
    DxPopupModule,
    DxTagBoxModule,
    DxSelectBoxModule,
    DxFileUploaderModule,
    DxToolbarModule,
    DxResponsiveBoxModule,
    DxBoxModule,
    CommonModule
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    TasksComponent,
    CongregacaoComponent,
    EventoComponent,
    PassageiroComponent,
    PassagemComponent,
    HelpComponent,
    PrivicyComponent,
    TermsComponent,
  ],
})
export class AppRoutingModule {}
