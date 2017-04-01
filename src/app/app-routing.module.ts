import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContainersComponent } from './pages/containers/containers.component'
import { ImagesComponent } from './pages/images/images.component';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'containers', component: ContainersComponent },
    { path: 'images', component: ImagesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }