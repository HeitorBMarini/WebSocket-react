
import './App.css';
import {useEffect, useState} from "react";
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001");


function App() {

  //states da Sala
  const[room, setRoom] = useState("");


  //states de Mesnagem
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", {message, room});
  };

  const joinRoom = () =>{
    if(room !== ""){
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) =>{
     setMessageReceived(data.message);
    })
  }, [socket]);

  return (
    <div className="App">

      <h1 className='title'>Web Socket Na Prática</h1>

      <input placeholder='Numero da sala..' onChange={(event) => {
        setRoom(event.target.value);
      }}>
        

      </input>
      <button onClick={joinRoom} className='button'>Entrar</button>
      <br></br>
      <input placeholder='Mensagem' onChange={(event) => {
        setMessage(event.target.value);
      }}>

      </input>
      <button onClick={sendMessage} className='button'> Enviar mensagem</button>
      <h1> Mensagem:</h1>
      {messageReceived}

    </div>
  );
}

export default App;
