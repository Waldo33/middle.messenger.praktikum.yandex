import { getDate } from './getDate';
import { MessageDTO } from '../../types';

function getUniqDateFromMessages(messages: MessageDTO[]) {
  if(!messages) {
    return [];
  }

  return Array.from(
    new Set(
      messages.map((message) => {
        const date = getDate(message.time);
        return date.day;
      })
    )
  );
}

export function getIdUniqDates(messages: MessageDTO[]) {
  const uniqDates = getUniqDateFromMessages(messages);

  if(!uniqDates) {
    return [];
  }

  return uniqDates.map((uniqDate) => {
    return messages.find((message) => {
      const date = getDate(message.time);

      if (date.day === uniqDate) {
        return message;
      }

      return false;
    });
  });
}
