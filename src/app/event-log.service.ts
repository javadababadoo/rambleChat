import { Injectable } from '@angular/core';

@Injectable()
export class EventLogService {

  log: string[] = [];

  constructor() { }

  appendLog(log: string): void {
    this.log.unshift(log);
  }

}
