import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-child',
  templateUrl: './todo-child.component.html',
  styleUrls: ['./todo-child.component.css'],
})
export class TodoChildComponent implements OnInit {
  constructor(private todoService: TodoService) {}
  @Input()
  todo!: Todo;
  @Output() fetchRequest = new EventEmitter<void>();
  ngOnInit(): void {}
  checkUnchekTodo(): void {
    this.todoService
      .checkUncheck(this.todo._id, !this.todo.isDone)
      .subscribe(() => {
        this.fetchRequest.emit();
      });
  }
  
}
