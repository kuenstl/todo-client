import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  private todosUrl = 'http://localhost:3031/todos';

  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo);
  }

  getTodos() {
    return this.http
      .get<any>(this.todosUrl)
      .pipe(
        map(resp => resp.data),
        map(todos => todos.sort(TodoService.compareFn))
      );
  }

  updateTodo(todo: Todo): Observable<any> {
    const id = typeof todo === 'string' ? todo : todo._id;
    const url = `${this.todosUrl}/${id}`;

    return this.http.put(url, todo);
  }

  deleteTodo(todo: Todo | string): Observable<Todo> {
    const id = typeof todo === 'string' ? todo : todo._id;
    const url = `${this.todosUrl}/${id}`;

    return this.http.delete<Todo>(url);
  }

  static compareFn(a, b) {
    if (a.createdAt < b.createdAt) return -1;
    if (a.createdAt > b.createdAt) return 1;
    return 0;
  }
}
