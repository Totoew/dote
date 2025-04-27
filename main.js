import { TaskView } from './view/TaskView.js';
import { TaskModel } from './model/Taskmodel.js';
import { TaskPresenter } from './presenter/TaskPresenter.js';

document.addEventListener('DOMContentLoaded', () => {
    const view = new TaskView();
    const model = new TaskModel();
    new TaskPresenter(view, model);
});