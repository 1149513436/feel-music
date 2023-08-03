import {HYEventStore} from 'hy-event-store'
import {getPlayListDetail} from '../service/music'
const recommendStore = new HYEventStore({
	state:{
		recommendSongsInfo:[]
	},
	actions:{
		fetchRecommendSongsAction(ctx){
			getPlayListDetail(3778678).then(res=>{
				console.log("res",res);
				ctx.recommendSongsInfo=res.playlist;
			})
		}
	}
})

export default recommendStore;