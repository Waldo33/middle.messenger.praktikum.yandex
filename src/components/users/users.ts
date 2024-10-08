import { Block } from '../../core';
import './users.scss';
import { UserType } from '../../types';

export interface UsersProps {
  onClick: () => void;
  users: any;
  type: 'delete' | 'add';
}

export class Users extends Block {
  static componentName = 'Users';

  constructor({ ...rest }: UsersProps) {
    super({ ...rest });
  }

  protected getStateFromProps(props: UsersProps): void {
    this.state = {
      users:
        props.users !== 'undefined' && props.users.length > 0
          ? JSON.parse(props.users)
          : [],
      type: props.type,
      onClick: props.onClick,
    };
  }

  protected render(): string {
    const { users, type } = this.state;

    // language=hbs
    return `
      <ul class="users ${users?.length !== 0 ? 'users_is-margin' : ''}">
        ${
          users &&
          users
            .map(
              (user: UserType) =>
                `{{{UserItem
                  onClick=onClick
                  id=${user.id}
                  avatar="${user.avatar}"
                  login="${user.login}"
                  email="${user.email}"
                  type="${type}"
                  role="${user.role}"
                }}}`
            )
            .join('')
        }
      </ul>
    `;
  }
}
