import { useState } from "react";
import "./leftBar.css";

const LeftBar = () => {
  const [showMessages, setShowMessages] = useState(false);

  return (
    <div className="leftBar">
      <div className="menuIcons">
        <a href="/" className="menuIcon">
          <img src="/general/logo.png" alt="Logo" className="logo" />
        </a>
        <a href="/" className="menuIcon">
          <img src="/general/home.svg" alt="Home" />
        </a>
        <a href="/create" className="menuIcon">
          <img src="/general/create.svg" alt="Create" />
        </a>
        <a href="/" className="menuIcon">
          <img src="/general/updates.svg" alt="Updates" />
        </a>
        <div className="messageMenu">
          <button
            type="button"
            className="menuIcon messageButton"
            aria-label="Messages"
            aria-expanded={showMessages}
            onClick={() => setShowMessages((visible) => !visible)}
          >
            <img src="/general/messages.svg" alt="" />
          </button>
          {showMessages && (
            <div className="messageCard" role="status">
              No New Messages Available
            </div>
          )}
        </div>
      </div>
      <a href="/" className="menuIcon">
        <img src="/general/settings.svg" alt="Settings" />
      </a>
    </div>
  );
};

export default LeftBar;
