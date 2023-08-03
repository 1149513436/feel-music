import { HYEventStore } from "hy-event-store"
import {getPlayListDetail} from "../service/music"

export const rankingsMap = {
  newRanking: 3779629,
  originRanking: 2884035,
  upRanking: 19723756
}
const rankingStore = new HYEventStore({
  state: {
    newRanking: {},
    originRanking: {},
    upRanking: {}
  },
  actions: {
    fetchRankingDataAction(ctx) {
			// console.log('======cs====');
      for (const key in rankingsMap) {
				let id = rankingsMap[key];
				
        getPlayListDetail(id).then(res => {
          ctx[key] = res.playlist
				})
				
      }
    }
  }
})

export default rankingStore
