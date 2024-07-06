enum InputType {
    'text',
    'email',
    'password',
    'tel',
    'number',
  }

  enum ButtonType {
    'button',
    'submit',
  }

  type ChatType = {
    countNotReadMessage: number;
    lastMessage: string;
    srcAvatar: string;
    time: string;
    userName: string;
  };

  interface MessageProps {
    isRead?: boolean;
    owner: boolean;
    srcImg?: string;
    text?: string;
    time: string;
  }

export {
  InputType, ButtonType, type ChatType, type MessageProps,
};
