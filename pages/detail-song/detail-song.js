// pages/detail-song/detail-song.js
import recommendStore from "../../store/recommendStore"
import rankingStore from "../../store/rankingStore"
import { getPlayListDetail } from "../../service/music"
import playerStore from "../../store/playerStore"
Page({
  data: {
    type: "ranking",
    key: "newRanking",
    id: "",

    songInfo: {}
  },
  onLoad(options) {
    // 1.确定获取数据的类型
    // type: ranking -> 榜单数据
		// type: recommend -> 推荐数据
		console.log('========detail-songs- options=====',options);
    const type = options.type
    // this.data.type = type
    this.setData({ type })

    // 获取store中榜单数据
    if (type === "ranking") {
      const key = options.key
      this.data.key = key
      rankingStore.onState(key, this.handleRanking)
    } else if (type === "recommend") {
			console.log('=====');
      recommendStore.onState("recommendSongsInfo", this.handleRanking)
    } else if (type === "menu") {
      const id = options.id
      this.data.id = id
      this.fetchMenuSongInfo()
    }
  },

  async fetchMenuSongInfo() {
    const res = await getPlayListDetail(this.data.id)
    this.setData({ songInfo: res.playlist })
  },

  handleRanking(value) {
    // if (this.data.type === "recommend") {
    //   value.name = "推荐歌曲"
		// }
		console.log('========热歌榜',value);
    this.setData({ songInfo: value })
    wx.setNavigationBarTitle({
      title: value.name,
    })
  },
	onSongItemTap(){
		playerStore.setState("playSongList", this.data.songInfo.tracks)
	},
	// ================== store共享数据 ==================

  onUnload() {
    if (this.data.type === "ranking") {
      rankingStore.offState(this.data.key, this.handleRanking)
    } else if (this.data.type === "recommend") {
      recommendStore.offState("recommendSongsInfo", this.handleRanking)
    }
  }
})