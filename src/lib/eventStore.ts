import { DEPARTMENT_EVENTS, DepartmentEvent } from "@/data/departmentData";

declare global {
  var inMemoryEvents: DepartmentEvent[] | undefined;
}

if (!global.inMemoryEvents) {
  global.inMemoryEvents = [...DEPARTMENT_EVENTS];
}

export function getLocalEvents(): DepartmentEvent[] {
  return global.inMemoryEvents || DEPARTMENT_EVENTS;
}

export function addLocalEvent(event: DepartmentEvent): void {
  if (!global.inMemoryEvents) {
    global.inMemoryEvents = [...DEPARTMENT_EVENTS];
  }
  // Check for duplicate ID
  const existingIdx = global.inMemoryEvents.findIndex((e) => e.id === event.id);
  if (existingIdx >= 0) {
    global.inMemoryEvents[existingIdx] = event;
  } else {
    global.inMemoryEvents.unshift(event);
  }
}

export function removeLocalEvent(id: string): void {
  if (!global.inMemoryEvents) {
    global.inMemoryEvents = [...DEPARTMENT_EVENTS];
  }
  global.inMemoryEvents = global.inMemoryEvents.filter((e) => e.id !== id);
}
