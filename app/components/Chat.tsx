'use client'
import { useChat , Message} from 'ai/react';

const Chat = () => {
  
  const { messages, input, handleInputChange, handleSubmit, isLoading} = useChat()
  return (
    <div>
      {messages.map((message: Message)=>{
          return(
            <div key={message.id}>
              {
                message.role === 'assistant'?
                <h3 className='text-lg font-semibold mt-2'>GPT-4</h3>:
                <h3 className='text-lg font-semibold mt-2'>User</h3>
              }

              {message.content.split('\n').map((currentTextBlock: string, index:number)=>{
                if(currentTextBlock === '')
                  return <p key={message.id + index}>&nbsp;</p>
                else return <p key={message.id + index}>{currentTextBlock}</p>
              })}
            </div>
          )
      })}
     
        <form className='mt-12' onSubmit={handleSubmit}>
          <p>User message</p>
          <textarea className='mt-2 w-full  bg-slate-600 p-2'
          placeholder={'How to learn web development'}
          value={input}
          onChange={handleInputChange}
          />
          <button className='rounded-md bg-blue-600 p-2 m-2'>
            Send message
          </button>
        </form>

    </div>
  );
}

export default Chat
