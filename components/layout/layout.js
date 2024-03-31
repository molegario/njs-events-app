import { Fragment, useContext } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification/notification";
import NotificationContext from "../../store/notification-context";

export default function Layout({ children }) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  return <Fragment>
    <MainHeader />
    <main>
      { children }
    </main>
    {
      activeNotification && 
        <Notification {...activeNotification} />
    }
  </Fragment>
}