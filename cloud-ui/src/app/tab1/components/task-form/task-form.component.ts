import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Task } from '../../../models/task'
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: false,
})
export class TaskFormComponent {

  @Input() task: Task = new Task('', ''); 
  isNewTask = true;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (!this.task) {
      this.task = new Task('', ''); 
      this.isNewTask = true;
    } else {
      this.isNewTask = false;
      this.task = new Task(this.task.title, this.task.description);
  }
}

  dismissModal() {
    this.modalController.dismiss();
  }

  submitTask() {
    this.modalController.dismiss(this.task);
  }
}
