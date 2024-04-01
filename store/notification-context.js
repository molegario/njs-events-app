import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext(
  {
    notification: null,
    showNotification: (notificationData) => {},
    hideNotification: () => {}
  }
);

export function NotificationContextProvider({children}) {
  const [activeNotification, setActiveNotification] = useState();

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  useEffect(
    ()=>{
      if(activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
        const timeOutID = setTimeout(
          ()=>{
            hideNotificationHandler();
          },
          3000
        );
        return ()=>{ clearTimeout(timeOutID); };
      }
    },
    [activeNotification]
  );

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return <NotificationContext.Provider value={context}>
    {
      children
    }
  </NotificationContext.Provider>;
}

export default NotificationContext;