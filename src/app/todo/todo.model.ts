export class Todo {
  _id?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(public text: string) {
    this.completed = false;
    this.text = text.trim();
  }
}
