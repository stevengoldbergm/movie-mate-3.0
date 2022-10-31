import React from 'react';
import '../components/Chat/style.css'

function FriendList() {
  return (
    <div className='chat-container has-background-white'>
      <article class="message is-info">
        <header class="message-header">
          <p>
            MovieMate Chat <i className='far fa-comment'></i> 
          </p>
          <button class="delete" aria-label="delete"></button>
        </header>
        <div class="message-body scrollable">
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
          <div class="control has-icons-left has-icons-right">
            <input class="input is-small" type="text" placeholder="Message"/>
            <span class="icon is-small is-left">
              <i class="fas fa-comment"></i>
            </span>
            <span class="icon is-right is-centered">
              <i class="fas fa-arrow-right"></i>
            </span>
          </div>
        </div>
        
      </article>
    </div>



    // <div>FriendList</div>
  );
};

export default FriendList;