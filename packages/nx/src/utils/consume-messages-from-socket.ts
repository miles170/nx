export function consumeMessagesFromSocket(
  callback: (message: string) => Promise<any>
) {
  let message = '';
  return async (data) => {
    const chunk = data.toString();
    let messagePartStartIndex = 0;
    for (let i = 0; i < chunk.length; ++i) {
      if (chunk.codePointAt(i) === 4) {
        message += chunk.substring(messagePartStartIndex, i);
        await callback(message);
        message = '';
        messagePartStartIndex = i + 1;
      }
    }
    message += chunk.substring(messagePartStartIndex);
  };
}
