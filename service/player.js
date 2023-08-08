import { oyhRequest } from "./index"

export function getSongDetail(ids) {
  return oyhRequest.get({
    url: "/song/detail",
    data: {
      ids
    }
  })
}

export function getSongLyric(id) {
  return oyhRequest.get({
    url: "/lyric",
    data: {
      id
    }
  })
}
