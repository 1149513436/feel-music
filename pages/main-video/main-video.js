// pages/main-video/main-video.js
import {getTopMv} from '../../service/video'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		videoList:[],
		offset:0,
		hasMore:true
	},

	/**
	 * 生命周期函数--监听页面加
	 */
	onLoad(options) {
	 	this.fetchTopMV()
	},

	//获取
   async fetchTopMV(){
		const res=await getTopMv(this.data.offset);
		const newVideoList=[...this.data.videoList,...res.data]
		this.setData({
			videoList:newVideoList		
		})
		this.data.hasMore=res.hasMore
		this.data.offset=this.data.videoList.length;//与ui交互无关，不用setdata
		
	},
	onReachBottom(){
		if(!this.data.hasMore) return;
		this.fetchTopMV(this.data.offset)
	},
	//下拉刷新事件
   async onPullDownRefresh(){
		this.setData({videoList:[]})
		this.data.offset=0;
		await this.fetchTopMV(this.data.offset);
		wx.stopPullDownRefresh()
		
		
		
	},
//事件监听


})