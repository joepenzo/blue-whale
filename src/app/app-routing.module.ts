import { HomeComponent } from './pages/home/home.component';
import { ContainerOptionsComponent } from './pages/container-options/container-options.component';
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContainersComponent } from './pages/containers/containers.component'
import { ContainerLogsComponent } from './pages/container-logs/container-logs.component'
import { ImagesComponent } from './pages/images/images.component';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'containers', component: ContainersComponent },
    { path: 'containerOptions', component: ContainerOptionsComponent },
    { path: 'containerLogs/:id', component: ContainerLogsComponent },
    { path: 'images', component: ImagesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }