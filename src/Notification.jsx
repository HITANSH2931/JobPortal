import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addAllMessages, addAllNotifcation, addMessages, addNotification, addTypingMessage } from "./redux/UserRedux";


export default function Notification() {
 
  const userId = useSelector((state) => state.authlogin.user?.id);
  const token = useSelector((state) => state.authlogin.user?.token);
 

  const clientRef = useRef(null); 

  const dispatch = useDispatch();

  const fetchAllNotifications = async () =>{

     try{

      const response = await axios.get("http://localhost:8080/api/notifications",{

        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      dispatch(addAllNotifcation(response.data));

     }

     catch(error){

      console.log(error);
     }
  }

  useEffect(() => {

     if (clientRef.current) return;

     fetchAllNotifications();
  

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      onConnect: () => {
        console.log("WebSocket connected");

        console.log("clientRef",clientRef);
        console.log("current",clientRef.current);

      if (clientRef.current?.subscribed) return; // prevent double subscribe

        clientRef.current.subscribed = true;

          client.subscribe(`/topic/notifications/${userId}`, (message) => {
          const notification = JSON.parse(message.body);

         
          dispatch(addNotification(notification));

          toast.info("A New Notification has come", {
           style: {
           backgroundColor: "#1447e6",
          color: "#ffffff",
          fontSize:"13px"         
           }
          });
       });

       client.subscribe("/topic/notifications/", (message) => {
          const notification = JSON.parse(message.body);

          if(notification.userId == userId) return;

         
          dispatch(addNotification(notification));

          toast.info("A New Notification has come", {
           style: {
           backgroundColor: "#1447e6",
          color: "#ffffff",
          fontSize:"13px"         
           }
          });
       });

          client.subscribe(`/topic/receiveMessage/${userId}`, (message) => {
          const mess = JSON.parse(message.body);

          console.log(mess);
          dispatch(addMessages(mess));

         })


          client.subscribe(`/topic/setTyping/${userId}`, (message) => {
          const status = message.body;

          console.log(status);
          dispatch(addTypingMessage(status));

         })

      },

      onStompError: (frame) => console.error("STOMP error:", frame),
     
    });

    client.activate();
     clientRef.current = client;

  return () => {
    clientRef.current?.deactivate();
    clientRef.current = null;
    console.log("web socket disconnected");
  };
  
  }, []);

  return (
    <div></div>
  );

}




