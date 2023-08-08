export default function querySelect(selector){
	return new Promise(resolve=>{
		const query=wx.createSelectorQuery();
		query.select(selector).boundingClientRect();
		query.exec(res=>{
				// console.log(res.width);
				// this.setData({imageHeight:res.width})
				resolve(res)
		})
	})

}