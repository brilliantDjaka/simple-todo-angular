import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Array<Todo> = [];
  isLoading: number = 0;
  @Input() 
  inputValue: any;
  constructor(
    private todoService: TodoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.redirectIfJWTNotExist();
    this.isLoading++;
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      this.isLoading--;
    });
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }
  removeComplete(): void {
    this.isLoading++;
    this.todos = this.todos.reduce((hol,curr)=>(curr.isDone ? hol : [...hol,curr] ),[] as Todo[])
    this.todoService
      .removeCompleted()
      .subscribe(() => this.isLoading--, ()=>this.getTodos());
    
  }
  addTodo(title: string): void {
    let index = this.todos?.length;
    this.todos?.push({
      _id: `${index}`,
      title: title,
      description: '',
      isDone: false,
      isPending: true,
    });
    this.todoService.addTodos(title).subscribe((todo) => {
      this.todos[index] = { ...todo, isPending: false };
    }, ()=>this.getTodos());
  }
  checkUnchekTodo(id:string): void {
    this.isLoading++;
    let index = this.todos.findIndex((todo)=>todo._id == id)
    this.todos[index].isDone = !this.todos[index].isDone
    this.todoService
      .checkUncheck(id,this.todos[index].isDone)
      .subscribe(() => {
        this.isLoading--;
      },()=>this.getTodos());
  }
}
