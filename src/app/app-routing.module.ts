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
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import {
  DxDataGridModule,
  DxFormModule,
  DxMapModule,
} from 'devextreme-angular';
import { ViewNameComponent } from './pages/view-name/view-name.component';
import { CongregacaoComponent } from './pages/congregacao/congregacao.component';
import { EventoComponent } from './pages/evento/evento.component';
import { PassageiroComponent } from './pages/passageiro/passageiro.component';
import { PassagemComponent } from './pages/passagem/passagem.component';

const routes: Routes = [
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
    path: 'pages/view-name',
    component: ViewNameComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
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
    DxMapModule,
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    ViewNameComponent,
    CongregacaoComponent,
    EventoComponent,
    PassageiroComponent,
    PassagemComponent,
  ],
})
export class AppRoutingModule {}
