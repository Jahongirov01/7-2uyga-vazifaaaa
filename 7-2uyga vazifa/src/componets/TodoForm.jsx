import React, { useState, useEffect, useRef } from 'react';
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  
};

function TodoForm(props) {
    const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const handleStart = () => {
    recognition.start();
  };
  useEffect(() => {
    recognition.addEventListener("result", (e) =>
      setText(e.results[0][0].transcript)
    );
    recognition.addEventListener("start", (e) => setListening(true));
    recognition.addEventListener("end", (e) => setListening(false));
  }, []);
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'  
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input 
            placeholder='Add a todo'
            value={input}  
            onChange={handleChange}
            name='text' 
                       className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;