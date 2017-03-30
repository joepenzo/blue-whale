import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContainersComponent } from './pages/containers/containers.component'

const routes: Routes = [
    { path: '', redirectTo: '/containers', pathMatch: 'full' },
    { path: 'containers', component: ContainersComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }