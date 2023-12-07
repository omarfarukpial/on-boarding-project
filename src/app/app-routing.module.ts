import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DocShowComponent } from './components/doc-show/doc-show.component';
import { ResultsComponent } from './components/results/results.component';
import { HomeComponent } from './components/home/home.component';
import { DocPrintComponent } from './components/doc-print/doc-print.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { reuse: true } },
  { path: 'search', component: HomeComponent, data: { reuse: true } },
  { path: 'document', component: DocShowComponent },
  { path: 'print', component: DocPrintComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
