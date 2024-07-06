export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

export default class EventBus<
    Event extends string = string,
    T extends { [K in Event]: unknown[] } = Record<Event, any[]>
> {
    private listeners: { [key in Event]?: Listener<T[Event]>[] }= {};
  
    on(event: Event, callback: Listener<T[Event]>) {
      if(!this.listeners[event]) {
        this.listeners[event] = []
      }
  
      this.listeners[event]?.push(callback);
    }
  
    off(event: Event, callback: Listener<T[Event]>) {
        if(!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`)
        }

        this.listeners[event] = this.listeners[event]?.filter(cb => cb !== callback)
    }
  
    emit(event: Event, ...args: T[Event]) {
      if(!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`)
      }
  
      this.listeners[event]?.forEach((callback) => {
        callback(...args)
      })
    }
  }