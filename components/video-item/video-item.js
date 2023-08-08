Component({
	properties:{
		itemData:{
			type:Object,
			value:{}
		}
	},
	methods:{
		clickItem(){
			wx.navigateTo({
				url: `/pages/detail-video/detail-video?id=${this.properties.itemData.id}`,
			  })
		}
	}
})