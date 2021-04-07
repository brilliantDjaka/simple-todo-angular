import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos$?: Observable<Todo[]>;

  @Input()
  inputValue: any;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todos$ = this.todoService.getTodos();
  }
  removeComplete(): void {
    this.todoService.removeCompleted().subscribe(() => this.getTodos());
  }
  addTodo(title: string): void {
    this.todoService.addTodos(title).subscribe(() => {
      this.getTodos();
    });
  }
}
