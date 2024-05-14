"use client";

import { GamingRoom } from "components/omok/GamingRoom";
import { WatingRoom } from "components/omok/WaitingRoom";
import { useEffect, useState } from "react";
import { SocketContext, socket } from "services/socket";
import { OmokRoom, OMOK_EVENT } from "type/omok.types";

export const OmokMain = () => {
  const [publicRoom, setPublicRoom] = useState<OmokRoom>();

  useEffect(() => {
    socket.on(OMOK_EVENT.ROOM_ENTER, (room: OmokRoom) => {
      console.log(`Enter room ${room.name}`);
      setPublicRoom(room);
    });

    socket.on(OMOK_EVENT.ROOM_LEAVE, () => {
      setPublicRoom(null);
    });
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      <div id="omokWrapper">
        <h1 className="title">오목 게임</h1>
        {publicRoom?.name === undefined ? <WatingRoom /> : <GamingRoom publicRoom={publicRoom} />}
      </div>
    </SocketContext.Provider>
  );
};
