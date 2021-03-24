import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from './tasks/task.service';
import { Task } from './tasks/task';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { EditTaskModalForm } from './tasks/editTask.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: "todo-angular" | undefined;

  public tasks: Task[] | undefined;

  @ViewChild('editor') editor!: EditTaskModalForm;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  public getTasks() {
    this.taskService.getTasks().subscribe(
      (response: Task[]) => {
        this.tasks = response;
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  public onWeek() {
    this.taskService.getNextWeekTasks().subscribe(
      (response: Task[]) => {
        this.tasks = response;
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  public onMonth() {
    this.taskService.getNextMonthTasks().subscribe(
      (response: Task[]) => {
        this.tasks = response;
      },
      (error) => {
        alert(error.message);
      }
    );
  }  

  public onCreateTask(createForm: NgForm): void {
    let task = createForm.value;
    task.creationDate = new Date();
    console.log(task);
    this.taskService.addTask(task).subscribe(
      (response: Task) => { document.getElementById("cancelCreateBtn")?.click},
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEditTask(editForm: NgForm): void {
    this.taskService.saveTask(editForm.value).subscribe(
      (response: void) => {},
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTask(taskId: number | null) {
    if(taskId === null) return;
    if(confirm("Are you sure to delete the task")) { 
      this.taskService.deleteTask(taskId).subscribe(
        (reaponse: void) => { this.getTasks(); },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public onCompleteTask(task: Task) {
    if(confirm("Are you sure to mark as completed")) {
      task.done = true;
      this.taskService.saveTask(task).subscribe(
        (reaponse: void) => { this.getTasks(); },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public openModal(task: Task | null, mode: string) {
    const container = document.getElementById("mainContainer");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#createTaskModal');
    }
    if(mode === 'edit') {
      if(task) this.editor.loadTask(task);
      button.setAttribute('data-target', '#editTaskModal');
    }
    container?.appendChild(button);
    button.click();
    container?.removeChild(button);
  }
}
