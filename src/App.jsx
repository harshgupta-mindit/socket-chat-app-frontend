
import LandingPage from "./pages/LandingPage";


import React, { useState } from "react";
// import io from "socket.io-client";

//Components
// import Chat from "./components/Chat";

// const socket = io.connect("http://localhost:3001");

function App() {

  // const [clientID, setClientID] = useState("");
  // const [username, setUsername] = useState("");
  // const [roomID, setRoomID] = useState("");

  // const [showChat, setShowChat] = useState(false);

  // socket.on("connect", () => {
  //   setClientID(socket.id);
  //   console.log("Client Socket ID : ", socket.id);
  // });


  // const joinRoom = () => {
  //   if (clientID && username && roomID) {
  //     socket.emit("join_room", { userID: socket.id, username, roomID });
  //     socket.username = username;
  //     setShowChat(true);
  //   }
  //   else {
  //     alert("Fill the complete details");
  //   }
  // }

  return (
    <>
    <LandingPage/>
      {/* {
        !showChat ? (
          <div>
            <h1>Join a Chat</h1>
            <input type="text" placeholder="Username..." onChange={(e) => { setUsername(e.target.value) }} />
            <input type="text" placeholder="RoomID..." onChange={(e) => { setRoomID(e.target.value) }} />
            <button onClick={joinRoom}>Join a Room</button>
          </div>

        ) : (
          <Chat socket={socket} username={username} roomID={roomID} setShowChat={setShowChat} />
        )
      } */}

    </>
  );
}

export default App;