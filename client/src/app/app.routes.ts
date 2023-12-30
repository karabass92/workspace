import { Routes } from '@angular/router'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { LoginComponent } from './pages/login/login.component'
import { AdminComponent } from './pages/admin/admin.component'
import { SchedulerComponent } from './pages/scheduler/scheduler.component'



export const routes: Routes = [
    { path: '', component: SchedulerComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent },
    { path: '**', component: NotFoundComponent }
]