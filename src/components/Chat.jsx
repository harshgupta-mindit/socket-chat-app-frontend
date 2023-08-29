import React, { useEffect, useState } from 'react';
import "./Chat.css";

// Auto scroll for chats
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, username, roomID, setShowChat }) => {

    const [message, setMessage] = useState("");
    const [allMessage, setAllMessage] = useState([]);

    const sendMessage = async () => {
        if (message) {
            const messageData = {
                room: roomID,
                author: username,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
            setAllMessage((list) => [...list, messageData]);

            setMessage("");
        } else {
            alert("can't be empty");
        }
    }

    const leaveRoom = () => {
        console.log("-ll");
        socket.emit("leave_room", { socket: socket.id, username, roomID });
        setShowChat(false);
    }


    useEffect(() => {
        socket.on("received_message", (data) => {
            console.log("callled");
            setAllMessage((list) => [...list, data]);
            console.log(data);
        })
    }, [socket])

    return (
        <>
            <div className='chat_main'>
                <div className='chat_userinfo'>
                    <span className='chat_room_info'><h1 className='chat_roomid'>Room ID : {roomID}</h1> <button className='chat_leave' onClick={leaveRoom}> Leave Room </button></span>
                    <p>Username : {username}</p>
                    <p>Socket ID : {socket.id}</p>
                </div>
                <div className='chat_board'>
                <ScrollToBottom className='for_auto_scroll'>
                    
                    {
                        allMessage.length != 0 ? allMessage.map((data, key) => {
                            return (
                                <>
                                    {
                                        socket.username == data.author ?
                                            <div className='chat_message_self'>
                                                <li className='li_chat self_chat' key={key}>{data.message}</li>
                                            </div>
                                            :
                                            <div className='chat_message_received'>
                                                <li className='li_chat received_chat' key={key}>{data.message}</li>
                                            </div>
                                    }
                                </>
                            )
                        }) : <div>No Chats Available 🤷‍♂️</div>
                    }
                    </ScrollToBottom>
                </div>
                <div className='input_field'>
                    <input className='message_input' type="text" name="" id="" placeholder='enter message...' value={message} onChange={(e) => { setMessage(e.target.value) }} />
                    <button className='send_button' onClick={sendMessage}>Send Message</button>
                </div>
            </div>
        </>
    )
}

export default Chat