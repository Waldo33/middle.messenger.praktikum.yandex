import EventBus from './EventBus';
import { InitialStateType, StoreEvents } from '../types';


export const initialState: InitialStateType = {
  chats: [
    {
      avatar: null,
      created_by: 0,
      id: 0,
      last_message: {
        content: '',
        id: 0,
        time: '',
        user: {
          avatar: '',
          display_name: '',
          email: '',
          first_name: '',
          login: '',
          phone: '',
          second_name: '',
          id: 0,
        },
      },
      title: '',
      unread_count: 0,
    },
  ],
  userInfo: {
    avatar: '',
    display_name: '',
    email: '',
    first_name: '',
    login: '',
    phone: '',
    second_name: '',
    id: 0,
  },
  usersFromChats: '',
  users: '',
  messages: [],
};


export class Store<T> extends EventBus {
  state: T | null;

  constructor(initialData: T | null = null) {
    super();
    this.state = initialData;
  }

  getState() {
    return this.state;
  }

  setState(newData: Partial<T>, action?: string) {
    this.state = { ...this.state, ...newData } as T;
    this.emit(action ? action : StoreEvents.UPDATE);
  }
}

export default new Store(initialState);
