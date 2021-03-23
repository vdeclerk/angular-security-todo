import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateTaskModalForm } from './tasks/createTask.component';
import { EditTaskModalForm } from './tasks/editTask.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskModalForm,
    EditTaskModalForm
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
