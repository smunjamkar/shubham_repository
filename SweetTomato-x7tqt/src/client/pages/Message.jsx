import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import sendMessage from '@wasp/actions/sendMessage';
import getUserMessages from '@wasp/queries/getUserMessages';

export function Message() {
  const { userId } = useParams();
  const { data: messages, isLoading, error } = useQuery(getUserMessages, { userId });
  const sendMessageFn = useAction(sendMessage);
  const [newMessage, setNewMessage] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleSendMessage = () => {
    sendMessageFn({ content: newMessage, receiverId: userId });
    setNewMessage('');
  };

  return (
    <div className=''>
      {messages.map((message) => (
        <div key={message.id} className=''>
          <p>{message.content}</p>
        </div>
      ))}
      <div className=''>
        <input
          type='text'
          placeholder='New Message'
          className=''
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className=''
        >
          Send
        </button>
      </div>
    </div>
  );
}