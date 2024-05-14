export type Takes = {
  x: number;
  y: number;
};
export type OmokRoom = {
  name: string;
  blackPlayer: string;
  whitePlayer: string;
  takes: Takes[];
};

export const OMOK_EVENT = {
  ROOM_LIST: "room_list",
  ROOM_NEW: "room_new",
  ROOM_ENTER: "room_enter",
  ROOM_LEAVE: "room_leave",
  PLAYER_CHANGE: "player_change",
  PLAYER_SELECT: "player_select",
  PLAYER_SELECTED: "player_selected",
  PLAYER_READY: "player_ready",
  MESSAGE: "message",
  SEND_MESSAGE: "send_message",
};
