import React from 'react'

import '../styles/chat-bot.css';
import Newsletter from'../shared/Newsletter'

import chatBotImg from '../assets/images/chatbot.png'

const ChatBot = () => {
  return (<>
    <div className='chatbot-container'>
    <iframe width="500" height="450" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/44ea578a-6ed0-49d4-ac33-b3c09475f034"></iframe>
          {/* <img className='imgDiv' src={chatBotImg} alt=""/>
          <h4 className='text'>Coming Soon..........</h4> */}
    </div>
    <Newsletter/>
    </>
  )
}

export default ChatBot