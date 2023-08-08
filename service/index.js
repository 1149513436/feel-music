// 封装成函数
// export function oyhRequest(options) {
//   return new Promise((resolve, reject) => {
//     wx.request({ 
//       ...options, 
//       success: (res) => {
//         resolve(res.data)
//       },
//       fail: reject
//     })
//   })
// }

// 封装成类 -> 实例
class OYHRequest {
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  request(options) {
    const { url } = options
    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        url: this.baseURL + url,
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          console.log("err:", err);
        }
      })
    })
  }
  get(options) {
    return this.request({ ...options, method: "get" })
  }
  post(options) {
    return this.request({ ...options, method: "post" })
  }
}

export const oyhRequest = new OYHRequest("http://codercba.com:9002")
// export const oyhRequest = new OYHRequest("https://coderwhy-music.vercel.app")
// export const oyhLoginReqInstance = new OYHRequest("http://123.207.32.32:3000")

