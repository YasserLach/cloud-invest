import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { AlertController, ModalController } from '@ionic/angular';
import { TaskFormComponent } from '../tab1/components/task-form/task-form.component';
import { Task } from '../models/task';
import { debounceTime, Subject } from 'rxjs';
@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: false,
})
export class ExploreContainerComponent implements OnInit {
  
  constructor(private service:TaskService,private alertController: AlertController,private modalController: ModalController) {

    this.searchSubject
      .pipe(debounceTime(500))
      .subscribe(searchTerm => this.filterTasks(searchTerm));
   }

  tasks:any;
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.service.getAllTasks().subscribe((res)=>{
      this.tasks = res;
    })
  }

  onSearchChange() {
    this.searchSubject.next(this.searchTerm)
  }

  filterTasks(searchTerm: string) {
    if (searchTerm) {
      const filteredTasks = this.tasks.filter((task:any) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.tasks = filteredTasks;
    } else {
      this.service.getAllTasks().subscribe((res)=>{
        this.tasks = res;
      })
    }
  }

  async openTaskModal() {
    const modal = await this.modalController.create({
      component: TaskFormComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.service.addNewTask(result.data).subscribe((res)=>{
          this.tasks.push(res);
        })
      }
    });

    await modal.present();
  }

  async presentAlert(id:string) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this task ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Deletion cancelled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteTask(id);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteTask(id: string) {
    this.service.deleteTask(id).subscribe(
      (res) => {
        this.tasks = this.tasks.filter((task: any) => task.id !== id);
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  async loadTaskForUpdate(taskId: string) {
    this.service.getTaskById(taskId).subscribe((task:any) => {
      const modal = this.modalController.create({
        component: TaskFormComponent,
        componentProps: { task } 
      });

      modal.then(modalElement => {
        modalElement.onDidDismiss().then((result) => {
          if (result.data) {
            this.service.updateTask(result.data,taskId).subscribe((updatedTask) => {
              const index = this.tasks.findIndex((t: any) => t.id === taskId);
              if (index !== -1) {
                this.tasks[index] = updatedTask;
              }
            });
          }
        });
        modalElement.present();
      });
    });
  }


}
