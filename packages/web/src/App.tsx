import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SocketContext } from "./context/socket-io";
import { BaseLayout } from "./layouts/BaseLayout";
import Overview from "./pages/Overview";
import Room from "./pages/Room";
import Preference from "./pages/Preference";
import { lazy, Suspense, useEffect } from "react";
import { io } from "socket.io-client";

const Manage = lazy(() => import("./pages/Manage"));

export function App() {
  const socket = io({ autoConnect: false });

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Overview />} />
            <Route path="room/:id" element={<Room />} />
            <Route
              path="manage"
              element={
                <Suspense>
                  <Manage />
                </Suspense>
              }
            />
            <Route path="preference" element={<Preference />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}
