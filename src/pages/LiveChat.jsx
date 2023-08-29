import React, { useState } from "react";
import io from "socket.io-client";

import "./LiveChat.css";

//Components
import Chat from "../components/Chat";

// const socket = io.connect("http://localhost:3001");

// For Hosted API
const socket = io.connect("https://socket-api-ym7a.onrender.com");

function LiveChat() {

  const [clientID, setClientID] = useState("");
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");

  const [showChat, setShowChat] = useState(false);

  socket.on("connect", () => {
    setClientID(socket.id);
    console.log("Client Socket ID : ", socket.id);
  });


  const joinRoom = () => {
    if (clientID && username && roomID) {
      socket.emit("join_room", { userID: socket.id, username, roomID });
      socket.username = username;
      setShowChat(true);
    }
    else {
      alert("Fill the complete details");
    }
  }

  return (
    <>


      {
        !showChat ? (
          <div className="livechat_main">
            <div className="joinchat_box">
              <h1 className="joinchat_h1">Join a Chat</h1>
              <input className="joinchat_input" type="text" placeholder="Username..." onChange={(e) => { setUsername(e.target.value) }} />
              <input className="joinchat_input" type="text" placeholder="RoomID..." onChange={(e) => { setRoomID(e.target.value) }} />
              <button className="joinchat_btn" onClick={joinRoom}>Join a Room</button>
            </div>
          </div>

        ) : (
          <Chat socket={socket} username={username} roomID={roomID} setShowChat={setShowChat} />
        )
      }

    </>
  );
}

export default LiveChat;