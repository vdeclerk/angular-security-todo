import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Task } from './task';
import { TaskService } from './task.service'

@Component({
  selector: 'edit-task-modal-form',
  templateUrl: './editTask.component.html'
})

export class EditTaskModalForm {
  @ViewChild('cancelBtn') cancelBtnRef!: ElementRef; 

  public editTask!: Task;

  constructor(private fb: FormBuilder, 
              private taskService: TaskService, 
              private appComponent: AppComponent) {}

  editTaskForm = this.fb.group({
    taskId: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    creationDate: ['', Validators.required],
    expiryDate: ['', Validators.required],
    done: ['', Validators.required],
    progress: ['']
  });

  loadTask(task: Task) {
    this.editTaskForm.setValue(task);
  }

  onSubmit() {
    let task: Task = this.editTaskForm.value;
    const button: HTMLElement = this.cancelBtnRef.nativeElement as HTMLElement;
    button.click();
    this.taskService.addTask(task).subscribe(
      (response: Task) => {
        this.appComponent.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.taskService.saveTask(task).subscribe(
      (response: void) => { },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}