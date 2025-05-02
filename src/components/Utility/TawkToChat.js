import React, { useLayoutEffect } from "react";

function TawkToChat() {
  useLayoutEffect(() => {
    // Load the Tawk.to script dynamically
    const s1 = document.createElement("script");

    s1.async = true;
    s1.src = "https://embed.tawk.to/64ec6664b2d3e13950ec7df4/1h8tmvuq4";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    // Append the Tawk.to script to the document's head
    document.head.appendChild(s1);
  }, []);

  return (
    <div id="tawk-chat-widget">
      {/* The Tawk.to widget will be inserted here */}
    </div>
  );
}

export default TawkToChat;
