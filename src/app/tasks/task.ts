export interface Task {
  taskId: number | null;
  title: string;
  description: string;
  creationDate: Date;
  expiryDate: Date | null;
  done: Boolean;
  progress: number;
}

export class EmptyTask implements Task {
  taskId       = null;
  title        = '';
  description  = '';
  creationDate = new Date();
  expiryDate   = null;
  done         = false;
  progress     = 0;
}