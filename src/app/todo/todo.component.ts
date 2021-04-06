import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];

  @Input()
  inputValue: any;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }
  checkUnchekTodo(id: string): void {
    const index = this.todos.findIndex((todo) => todo._id == id);
    console.log(index);

    if (index > -1) {
      this.todos[index].isDone = !this.todos[index].isDone;
    }
  }
  removeComplete(): void {
    const todos: Todo[] = [];
    this.todos = this.todos.reduce(
      (hol, curr) => (curr.isDone ? hol : [...hol, curr]),
      todos
    );
  }
  addTodo(title: string): void {
    this.todos.push({
      _id: uuidv4(),
      isDone: false,
      title: title,
      description: '',
    });
  }
}
