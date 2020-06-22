import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'tdc-todo-item',
  templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {
  @Input() todo: Todo;
  @Output() onCompleted = new EventEmitter<Todo>();
  @Output() onDeleted = new EventEmitter<Todo>();

  completeTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.onCompleted.emit(todo);
  }

  deleteTodo(todo: Todo) {
    this.onDeleted.emit(todo);
  }
}
