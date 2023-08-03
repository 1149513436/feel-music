import {getMusicBanner,getSongMenuList} from '../../service/music'
import querySelect from "../../utils/query-select"
import throttle from "../../utils/throttle"
import recommendStore from '../../store/recommendStore'
import rankingStore from '../../store/rankingStore'
const querySelectThrottle=throttle(querySelect)

Page({
	data:{
		iptValue:'',
		bannerList:[],
		imageHeight:150,
		recommendSongs:[],
		hotMenuList:[],
		recMenuList:[],
		  // 巅峰榜数据
			isRankingData: false,
			rankingInfos: {}
	},

onLoad(){
	this.fetchMusicBanner()
	// this.fetchRecommendSongs()
	recommendStore.dispatch("fetchRecommendSongsAction")
	recommendStore.onState("recommendSongsInfo",this.handleRecomendSongs)
	recommendStore.dispatch("fetchRecommendSongsAction")
	//监听排行版相关数据
	// rankingStore.onState("newRanking", this.handleNewRanking)
	// rankingStore.onState("originRanking", this.handleOriginRanking)
	// rankingStore.onState("upRanking", this.handleUpRanking)
	rankingStore.onState("newRanking", this.getRankingHandler("newRanking"))
	rankingStore.onState("originRanking", this.getRankingHandler("originRanking"))
	rankingStore.onState("upRanking", this.getRankingHandler("upRanking"))
//触发请求获取巅峰版数据
rankingStore.dispatch("fetchRankingDataAction")


	this.fetchSongMenuList()
},
onUnload(){
	recommendStore.offState("recommendSongsInfo",this,this.handleRecomendSongs)
	rankingStore.offState("newRanking", this.handleNewRanking)
	rankingStore.offState("originRanking", this.handleOriginRanking)
	rankingStore.offState("upRanking", this.handleUpRanking)
},
handleRecomendSongs(value){
	if(value.tracks){
		const recommendSongs=value.tracks.slice(0,6)
		this.setData({recommendSongs})
	}
	
},
async fetchMusicBanner(){
	const res=await 	getMusicBanner(2);
	this.setData({bannerList:res.banners})
},
// async fetchRecommendSongs(id){
// 	const res=await getPlayListDetail(3778678);
// 	const playlist=res.playlist.tracks;
// 	this.setData({recommendSongs:playlist.slice(0,6)})
// },
async fetchSongMenuList() {//小细节，在这里没有使用await，因为使用await会阻塞后面的请求，但是我们希望它们同时发生
	getSongMenuList().then(res => {
		this.setData({ hotMenuList: res.playlists })
	})
	getSongMenuList("华语").then(res => {
		this.setData({ recMenuList: res.playlists })
	})
},
	onSearchClick(){
		wx.navigateTo({
			url: '/pages/detail-search/detail-search',
		})
	},
	imageLoad(){
		querySelectThrottle(".banner-image").then(res=>{
		console.log(res);
			this.setData({imageHeight:res[0].height})
		});
		
	},
	onRecommendMoreClick(){
	    	wx.navigateTo({
					url: '/pages/detail-song/detail-song?type=recommend',
				})
	},
	// handleNewRanking(value) {
  //   console.log("新歌榜:", value);
  //   if (!value.name) return
  //   this.setData({ isRankingData: true })
  //   const newRankingInfos = { ...this.data.rankingInfos, newRanking: value }
  //   this.setData({ rankingInfos: newRankingInfos })
  // },
  // handleOriginRanking(value) {
  //   console.log("原创榜:", value);
  //   if (!value.name) return
  //   this.setData({ isRankingData: true })
  //   const newRankingInfos = { ...this.data.rankingInfos, originRanking: value }
  //   this.setData({ rankingInfos: newRankingInfos })
  // },
  // handleUpRanking(value) {
  //   console.log("飙升榜:", value);
  //   if (!value.name) return
  //   this.setData({ isRankingData: true })
  //   const newRankingInfos = { ...this.data.rankingInfos, upRanking: value }
  //   this.setData({ rankingInfos: newRankingInfos })
	// },
	getRankingHandler(ranking){
		return (value)=>{
			this.setData({ isRankingData: true })
			const newRankingInfos = { ...this.data.rankingInfos, [ranking]: value }
			this.setData({ rankingInfos: newRankingInfos })
		}
	}
})