import { Component, OnInit, Input } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TodosProvider } from '../../providers/todos/todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  todos = [];
  prompt;

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public todosService: TodosProvider) { }

  ngOnInit(): void {
    this.todosService.getTodos()
      .then((result) => {
        this.todos = result;
        console.log(this.todos)
      })
  }

  createTodo() {
    this.prompt = this.alertController.create({
      title: 'Nova tarefa!',
      message: 'O que você precisa fazer?',
      inputs: [
        { name: 'title' }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Salvar',
          handler: data => {
            this.todosService.createTodo({ title: data.title });
            this.todos.push({ title: data.title });

          }
        }
      ]
    });
    this.prompt.present();
  }

  updateTodo(todo) {
    let prompt = this.alertController.create({
      title: 'Editar',
      message: 'Mudou de ideia?',
      inputs: [
        { name: 'title' }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Salvar',
          handler: data => {
            this.todosService.updateTodo({
              _id: todo._id,
              _rev: todo._rev,
              title: data.title
            })
            let index = this.todos.indexOf(todo);
            this.todos.splice(index, 1, data);
          }
        }
      ]
    })
    prompt.present()
  }

  deleteTodo(todo) {
    this.todosService.deleteTodo(todo);
    let index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

}
