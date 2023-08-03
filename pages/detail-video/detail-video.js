// pages/detail-video/detail-videp.js
import {getMvUrl,getMvInfo,getRelativeVideo} from '../../service/video'
Page({
	data:{
		id:'',
		url:'',
		danmuList:[
			{
				text:'测试弹幕，你好呀',
				color:'#ff0000',
				time:3
			},
			{
				text:'不错哟',
				color:'#ff0000',
				time:10
			}
		],
		mvInfo:{},
		relatedVideo:[]
	},
	onLoad(options){
		this.setData({id:options.id})
		//获取mvurl
		this.fetchMvUrl(this.data.id);
		// 获取信息
		this.fetchInfo(this.data.id);
		this.getRelativeVideoInfo(this.data.id)
	},

   async fetchMvUrl(id){
		let res=await getMvUrl(id);
	
		this.setData({url:res.data.url})
	},
	async fetchInfo(id){
		let res=await getMvInfo(id);
		console.log('信息res',res);
		this.setData({
			mvInfo:res.data
		})
	},
	async getRelativeVideoInfo(id){
		let res=await getRelativeVideo(id);
		console.log('relateVideoInfo',res);
	}

})