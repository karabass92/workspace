import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { AdminComponent } from './pages/admin/admin.component'
import { SchedulerComponent } from './pages/scheduler/scheduler.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'


@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		CommonModule, 
		RouterOutlet, 
		LoginComponent,
		AdminComponent,
		SchedulerComponent,
		NotFoundComponent
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'workspace'
}