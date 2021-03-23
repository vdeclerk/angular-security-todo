import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Task } from './task';
import { EmptyTask } from './task';
import { TaskService } from './task.service'

@Component({
  selector: 'create-task-modal-form',
  templateUrl: './createTask.component.html'
})

export class CreateTaskModalForm {
  @ViewChild('cancelBtn') cancelBtnRef!: ElementRef; 

  constructor(private fb: FormBuilder, 
              private taskService: TaskService, 
              private appComponent: AppComponent) {}

  createTaskForm = this.fb.group({
    taskId: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    creationDate: [new Date(), Validators.required],
    expiryDate: ['', Validators.required],
    done: [false, Validators.required],
    progress: ['']
  });

  onSubmit() {
    let emptyTask: Task = new EmptyTask();
    let task: Task = this.createTaskForm.value;
    const button: HTMLElement = this.cancelBtnRef.nativeElement as HTMLElement;
    button.click();
    this.taskService.addTask(task).subscribe(
      (response: Task) => {
        this.createTaskForm.setValue(emptyTask);
        this.appComponent.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}