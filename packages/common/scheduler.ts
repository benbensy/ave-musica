interface Task<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: any) => void;
}

export class Scheduler {
  queue: Task<any>[];

  schedule<T>(promise: Promise<T>) {

  }
}
