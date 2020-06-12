import { Subject } from 'rxjs';

const events = {};

export const rxjsCreateEvent = () => new Subject();

export const rxjsExportEvent = (name, subject) => events[name] = subject;

export const rxjsGetEvent = (name) => events[name];

export const rxjsRemoveEvent = (name) => {
  events[name].unsubscribe();
  delete events[name];
};
