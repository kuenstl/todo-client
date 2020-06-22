import { By } from '@angular/platform-browser';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { Todo } from '../todo.model';

describe('TodoItemComponent', () => {
  let comp: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  const testTodo = new Todo('Write unit tests');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    comp = fixture.componentInstance;

    comp.todo = testTodo;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(comp).toBeTruthy();
  });

  it('should show the text of the todo item', () => {
    const label = fixture.debugElement.query(By.css('label'));
    expect(label.nativeElement.textContent).toBe('Write unit tests');
  });

  it('should raise complete event when checkbox was clicked', () => {
    let selectedTodo: Todo;
    comp.onCompleted.subscribe((todo: Todo) => (selectedTodo = todo));

    const inputEl = fixture.debugElement.query(By.css('input'));
    inputEl.triggerEventHandler('click', null);

    testTodo.completed = true;
    expect(selectedTodo).toBe(testTodo);
  });

  it('should raise delete event when button was clicked', () => {
    let selectedTodo: Todo;
    comp.onDeleted.subscribe((todo: Todo) => (selectedTodo = todo));

    const buttonEl = fixture.debugElement.query(By.css('button'));
    buttonEl.triggerEventHandler('click', null);
    expect(selectedTodo).toBe(testTodo);
  });
});
