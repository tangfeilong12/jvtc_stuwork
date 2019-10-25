import { UpdateV } from "../api/api";

export async function isAndroidV(current, _type) {

  const { data } = await UpdateV();
  const { v, type, link, msg } = data;

  if (type === _type) {
    if (current !== v) {
      return {
        flag: true,
        link,
        msg
      }
    }
  }

  return {
    flag: false,
  }
}