import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { MY_CONVERSATIONS, ONE_CONVERSATION } from '../../utils/queries';
import { SEND_MESSAGE } from '../../utils/mutations';

const Chat = () => {
  const myConversations = useQuery(MY_CONVERSATIONS)
  const [sendMessage] = useMutation(SEND_MESSAGE)
  const messageData = myConversations.data?.myConversations || myConversations.data
  console.log(messageData)

  // set state for active button
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    scrollToBottom();
  }, [])

  // Toggle the chat window when you click a button
  const toggleChat = async () => {
    setActive(!active);
    await scrollToBottom();
    // Call it again or it won't scroll to bottom on start-up. . .
    await scrollToBottom();
  }

  // Make the text go to the bottom of the form 
  const scrollToBottom = async () => {
    console.log("Scroll to bottom!");
    const chatWindow = document.querySelector('.scrollable');
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return chatWindow;
  }

  const handleInputChange = (event) => {
    console.log(event.target.value)
    const keystroke = event.target.value;
    setMessage(keystroke);
  }


  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(message);
    scrollToBottom();
    setMessage('');
  }

  // Make chat window movable


  // const dragElement = (element) => {
  //   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  //   if (document.querySelector('.movable')) {
  //     // If present, the header is where you move the DIV from
  //     document.querySelector('.movable').mousedown = dragMouseDown;
  //   } else {
  //     // Otherwise, move the DIV from anywhere inside the DIV
  //     element.mousedown = dragMouseDown
  //   }
  // }
  // const dragMouseDown = () => {
  //   console.log('Drag on Mouse Down')
  // }

  // dragElement(document.querySelector('.movable'));


  


  return (
    <>
      {/* Make chat pop-up button */}
      <div 
        className={`delete ${ !active ? '' : 'is-hidden' } `} 
        onClick={toggleChat}
      />
      {/* Make chat pop-up window */}
      <div 
        className={`chat-container has-background-info-light ${ active ? '' : 'is-hidden' }`}
      >
        <article className="message is-info">
          <header className="message-header movable" draggable>
            <p>
              MovieMate Chat <i className='far fa-comment'></i> 
            </p>
            <div>
              <button 
                className="back-button has-background-info-dark has-text-info-light mr-2 is-size-7" 
                aria-label="go back"
              >
                <p className='px-1'>
                  <i className='fas fa-arrow-left'></i>
                </p>
              </button>
              <button 
                className="delete" 
                aria-label="delete"
                onClick={toggleChat}

              />
            </div>
            
          </header>
            <div className='columns'>
              <div className="column is-4 message-body ">
                <div className='columns is-multiline'>
                  { !messageData
                    ? 
                      <div>Loading. . .</div>
                    : 
                      
                      (
                        messageData.map((conversation) => {
                          return (
                            <div key={conversation._id} className='column is-three-fifths chat-bubble-left has-background-warning has-text-warning-dark py-1 px-2 my-2'>
                            {conversation.participants[1].username}
                          </div>
                          )
                        })
                      ) 
                      
                  }
                  <div className='column is-three-fifths chat-bubble-left has-background-warning has-text-warning-dark py-1 px-2 my-2'>
                    Friend 1
                  </div>
                  <div className='column is-three-fifths chat-bubble-left has-background-warning has-text-warning-dark py-1 px-2 my-2'>
                    Friend 2
                  </div>
                  <div className='column is-three-fifths chat-bubble-left has-background-warning has-text-warning-dark py-1 px-2 my-2'>
                    Friend 3
                  </div>
                  
                </div>
              </div>

              {/* Messages */}
              <div className="column is-8 message-body scrollable">
                <div className='columns is-multiline'>
                  <div className='column is-three-fifths chat-bubble-left has-background-warning has-text-warning-dark py-1 px-2 my-2'>
                    Yo what's up buddy?
                  </div>
                  <div className='column is-three-fifths is-offset-two-fifths chat-bubble-right has-background-info has-text-info-light py-1 px-2 my-2'>
                    Nothin' much - just killin time.
                  </div>
                  <div className='column is-three-fifths chat-bubble-left has-background-warning has-text-warning-dark py-1 px-2 my-2'>
                    Does this thing look ok?
                  </div>
                  <div className='column is-three-fifths is-offset-two-fifths chat-bubble-right has-background-info has-text-info-light py-1 px-2 my-2'>
                    Idunno man, it's just a chat window. It doesn't even work...
                  </div>
                  <div className='column is-three-fifths chat-bubble-left has-background-warning has-text-warning-dark py-1 px-2 my-2'>
                    But like - it's ok looking?
                  </div>
                  <div className='column is-three-fifths is-offset-two-fifths chat-bubble-right has-background-info has-text-info-light py-1 px-2 my-2'>
                    Uuuh. Sure. It's fine.
                  </div>
                  <div className='column is-three-fifths is-offset-two-fifths chat-bubble-right has-background-info has-text-info-light py-1 px-2 my-2'>
                    Uuuh. Sure. It's fine.
                  </div><div className='column is-three-fifths is-offset-two-fifths chat-bubble-right has-background-info has-text-info-light py-1 px-2 my-2'>
                    Uuuh. Sure. It's fine.
                  </div><div className='column is-three-fifths is-offset-two-fifths chat-bubble-right has-background-info has-text-info-light py-1 px-2 my-2'>
                    Uuuh. Sure. It's fine.
                  </div><div className='column is-three-fifths is-offset-two-fifths chat-bubble-right has-background-info has-text-info-light py-1 px-2 my-2'>
                    Uuuh. Sure. It's fine.
                  </div><div className='column is-three-fifths is-offset-two-fifths chat-bubble-right has-background-info has-text-info-light py-1 px-2 my-2'>
                    Uuuh. Sure. It's fine.
                  </div><div className='column is-three-fifths is-offset-two-fifths chat-bubble-right has-background-info has-text-info-light py-1 px-2 my-2'>
                    Uuuh. Sure. It's fine.
                  </div>
                </div>
              </div>
            </div>
              
            
          <div className='chat-footer-container p-3'>
            <div className="control has-icons-left has-icons-right">
              <form className='is-flex flex-direction-row' type='submit' onSubmit={handleFormSubmit}>
                <input 
                  name='message'
                  value={message}
                  onChange={handleInputChange}
                  type="text" 
                  className="input is-small" 
                  id='message'
                  placeholder="Message"
                  autoComplete='off'
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-comment"></i>
                </span>
                <span 
                  className=" is-right is-centered" 
                  type="submit"
                  onClick={handleFormSubmit}
                >
                  <i className="fas fa-arrow-right button is-small"></i>
                </span>
              </form>
            
            </div>
          </div>
          
        </article>
      </div>
    </>
  );
};

export default Chat;