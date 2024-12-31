import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent {
  Title: string = "ToDo App";
  imgSrc: string = "./assets/ToDoLogo.jpeg";

  tasks: { name: string; isEditMode: boolean }[] = [];
  newTask: string = "";
  isAvailable: boolean = false;

  /**
   * Adds a new task to the tasks list.
   * Ensures the input is not empty and resets the input field.
   * Updates the isAvailable flag to indicate the presence of tasks.
   */
  addTask() {
    if (this.newTask.trim() !== "") {
      this.tasks.push({ name: this.newTask.trim(), isEditMode: false });
      this.newTask = "";
      this.isAvailable = true;
    }
  }

  /**
   * Toggles edit mode for a specific task.
   * If in edit mode, saves the edited task name.
   * If not in edit mode, pre-fills the input with the task's current name for editing.
   * Clears the input field after toggling edit mode.
   * 
   * @param index - The index of the task to edit.
   * @param taskEdit - The new name for the task (if being edited).
   */
  editTask(index: number, taskEdit: string): void {
    const task = this.tasks[index];

    if (task.isEditMode) {
      // Save the edited task
      const trimmedTask = taskEdit.trim();
      if (trimmedTask !== "") {
        task.name = trimmedTask;
      }
    } else {
      // Enter edit mode and prefill the input with the task's current name
      this.newTask = task.name;
    }

    // Toggle edit mode for this task
    task.isEditMode = !task.isEditMode;
    this.newTask = '';
  }

  /**
   * Removes a task from the tasks list by its index.
   * Updates the isAvailable flag to reflect if tasks remain.
   * 
   * @param index - The index of the task to remove.
   */
  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.isAvailable = this.tasks.length > 0;
  }
}
