import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo:'todo', pathMatch:'full' },
  { path: 'todo', component: TodoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}