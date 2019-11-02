import { UpdateV } from "../api/api";

export async function isAndroidV(current, _type) {

  const { data } = await UpdateV();
  const { v, type, link, msg } = data;

  if (type === _type) {
    const vs = v.split('.');
    console.warn(current.split('.'), vs);
    const end = current.split('.').filter((item, index) => {
      return parseInt(item) < parseInt(vs[index]);
    });
    console.warn(end);
    if (end.length >= 1) {
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