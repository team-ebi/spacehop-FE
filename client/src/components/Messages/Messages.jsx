import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../useContext/UserContext";
import "../Inbox/Inbox.css";

export default function Messages({ selectedThread }) {
  const { user } = useContext(UserContext);
  const [ updatedThread, setUpdatedThread ] = useState([]);
  const [ newMessage, setNewMessage ] = useState("");

  useEffect(() => {
    setUpdatedThread(selectedThread.message);
  }, [selectedThread]);

  async function sendMessage() {
    const newThread = [ ...updatedThread, newMessage];
    setUpdatedThread(newThread);
    setNewMessage({user_message: ""});
  }
 

  return (
    <>
      {/* <h1 id="selected-message-header">Message</h1> */}
      <div id="message-box">
        <div className="inbox-header">
          <p className="biz-name-message"><span className="to">To: </span>{selectedThread.business_name}</p>
        </div>
        <hr className="divider" />

        <div className="message-body-container">
          {updatedThread && updatedThread.map((msg) => {
            if (msg.user_message) {
              return (
                <div className="msg right">
                  <div className="msg-name">You</div>
                  <span className="recipient">{msg.user_message}</span>
                </div>
              );
            } else {
              return (
                <div className="msg left">
                  <div className="msg-name">{selectedThread.business_name}</div>
                  <span className="other-messenger">
                    {msg.business_message}
                  </span>
                </div>
              );
            }
          })}
        </div>
        <div className="msg-input-area">
          <textarea name="message-input" id="send-message-input" type="text" value={newMessage.user_message}
          onInput={(e) => setNewMessage({user_message: e.target.value})}
          />
          <div id="send-input-icon">
          <FontAwesomeIcon
            id="send-message-button"
            icon={faPaperPlane}
            size="2x"
            color="darkslategrey"
            onClick={sendMessage}
          />
          </div>
        </div>
      </div>
    </>
  );
}
