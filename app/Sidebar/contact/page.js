'use client'
import React, { useEffect, useState } from 'react';
import { getFirestore, query, collection, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import useUserInfo from '@/hooks/useUser';
import { app } from '@/utils/firebase-config';
import ProtectedRoute from '@/utils/ProtectedRoute';
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import Sidebar from '../Sidebar';
import axios from 'axios';
import { IoSend } from 'react-icons/io5';

const db = getFirestore(app);

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userInfo = useUserInfo();
  const [isOpen, setIsOpen] = useState(false);
  const [dbessage, setStoreMessage] = useState('');
  // console.log(userInfo?.userName);

  useEffect(() => {
    const q = query(collection(db, "message"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (!userInfo) {
      console.error("User information not available.");
      return;
    }

    if (!userInfo?.userName) {
      console.error("User display name is undefined.");
      return;
    }

    try {
      await addDoc(collection(db, 'message'), {
        uid: userInfo?.uid,
        photoURL: userInfo?.photoURL,
        displayName: userInfo?.userName,
        text: newMessage,
        timestamp: serverTimestamp()
      });
      setNewMessage(""); // Clear the input field after sending the message
      await axios.post('https://endgame-team-server.vercel.app/messageData', {
        message: newMessage,
        user: userInfo?.userName,
        
        
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const storeMessage = async() =>{
      console.log('message');
  }



  return (
    <ProtectedRoute>
     <Sidebar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle}/>
    <MainNavbar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle}></MainNavbar>
   
<div className="bg-gray-900 max-h-[91vh]  h-screen flex flex-col max-w-lg mx-auto mt-12 md:mt-20 lg:mt-20 xl:mt-20 2xl:mt-20">
    <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <button id="login" className="hover:bg-blue-400 rounded-md ">
        <img className='w-10 h-10 rounded-full' src={userInfo?.photoURL} title={userInfo?.displayName}></img>
      </button>
      <span className='py-2'>Global ChatBox</span>
      <div className="relative inline-block text-left">
      
      </div>
    </div>

    <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-2">
            
           
        <div className="flex-1 overflow-y-auto p-4 pb-20">
        {messages.map(msg => (
              <div key={msg.id} className={`message flex ${msg.data.uid === userInfo?.uid ? 'justify-end' : 'justify-start'}`}>
                <div className={`message flex flex-row px-3 py-1 mt-3 gap-3 rounded-[20px] items-center ${msg.data.uid === userInfo?.uid ? 'text-white  flex-row-reverse' : 'm-2'}`}>
                  <img className='w-10 h-10 rounded-full' src={msg.data.photoURL} title={msg.data?.displayName} />
                  <p className={`${msg.data.uid === userInfo?.uid ? 'bg-blue-500 text-white px-2 py-1 rounded-lg' : 'bg-gray-800 text-white px-2 py-1 rounded-lg'}`}>{msg.data.text}</p>
                </div>
              </div>
            ))}
        </div>
        
        </div>
    </div>
    
    <div className="bg-gray-800 p-4 flex items-center">
        <input value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} type="text" placeholder="Type your message..." className="flex-1 border text-black rounded-full px-4 py-2 focus:outline-none"/>
        <button type='submit' onClick={sendMessage} className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none">
         <IoSend></IoSend>
        </button>
    </div>
    
  </div>
  
  </ProtectedRoute>
  
  
  );
};

export default ChatPage;



