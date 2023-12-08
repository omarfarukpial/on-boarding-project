import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DocShowComponent } from './components/doc-show/doc-show.component';
import { ResultsComponent } from './components/results/results.component';
import { HomeComponent } from './components/home/home.component';
import { DocPrintComponent } from './components/doc-print/doc-print.component';
import { DocTopicComponent } from './components/doc-topic/doc-topic.component';
import { DocOutlineComponent } from './components/doc-outline/doc-outline.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { reuse: true } },
  { path: 'search', component: HomeComponent, data: { reuse: true } },
  {
    path: 'document', component: DocShowComponent, children: [
      { path: '', component: DocTopicComponent },
      { path: 'doc-topic', component: DocTopicComponent },
      { path: 'doc-outline', component: DocOutlineComponent }
    ]
  },
  { path: 'print', component: DocPrintComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
