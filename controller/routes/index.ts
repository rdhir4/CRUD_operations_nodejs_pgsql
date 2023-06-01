import { createApi, getApi, updateUser } from '../src/userManagement/api';
import { createTask, fetchTask, fetchTaskAndUserByTaskId, updateTasks } from '../src/taskManagement/api';
import { Application } from 'express';
import { validateFetchTaskApiBody, validateUpdateTaskApiParams } from '../middllewares/validationMiddleware';

export const Routes = (app: Application) => {
  app.post('/', createApi); 
  app.post('/get_user', getApi);
  app.post('/update_user', updateUser);
  app.post('/create_task', createTask);
  app.post('/fetch_task', validateFetchTaskApiBody, fetchTask);
  app.post('/fetch_task_user', fetchTaskAndUserByTaskId);
  app.post('/update_task',validateUpdateTaskApiParams, updateTasks);
}