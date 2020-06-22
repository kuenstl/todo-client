import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoService } from './todo.service';

@NgModule({
  declarations: [TodoItemComponent, TodoListComponent],
  imports: [BrowserModule, CommonModule, FormsModule, HttpClientModule],
  providers: [TodoService],
  exports: [TodoListComponent]
})
export class TodoModule {}
