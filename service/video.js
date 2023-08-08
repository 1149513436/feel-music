import {oyhRequest} from '../service/index'

export function getTopMv(offset=0,limit=20){
	return oyhRequest.get({
		url:'/top/mv',
		data:{
			limit,
			offset
		}
	})
}

export function getMvUrl(id){
	return oyhRequest.get({
		url:'/mv/url',
		data:{
			id
		}})
}

export function getMvInfo(mvid){
	return oyhRequest.get({
		url:'/mv/detail',
		data:{
			mvid
		}
	})
}
export function getRelativeVideo(id){
		return oyhRequest.get({
			url:'/related/allvideo',
			data:{
					id
			}
		})
}