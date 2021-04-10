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
  todos$?: Observable<Todo[]>;

  @Input()
  inputValue: any;
  constructor(private todoService: TodoService,private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.redirectIfJWTNotExist()
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
