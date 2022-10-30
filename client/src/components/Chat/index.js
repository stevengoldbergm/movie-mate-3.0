import React, { useEffect, useState } from 'react';

const Chat = () => {
  // set state for active button
  const [active, setActive] = useState(false)

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


  const handleFormSubmit = (event) => {
    event.preventDefault();
    scrollToBottom();
  }


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
          <header className="message-header">
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
          <div className="message-body scrollable">
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
            </div>
          </div>
          <div className='chat-footer-container p-3'>
            <div className="control has-icons-left has-icons-right">
              <form className='is-flex flex-direction-row' type='submit' onSubmit={handleFormSubmit}>
                <input className="input is-small" type="text" placeholder="Message"/>
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