const host =  'http://192.168.31.158/API/New/';
// const host = 'https://www.fredwheels.com/backend/API/';

const alert = title =>{
  wx.showToast({
    title: title,
    icon: 'none'
  })
}
const getRequestOptions = options => {
  const url = host + options.url
  const header = {
    "Content-Type": "application/json" 
  }
  options.url = host + options.url
//loading 传false表示不展现请求弹窗，传文字展示所传文字，不传展示默认
  options.loading === false ? null : typeof options.loading === 'string' ? wx.showLoading({
    title: loading,
  }): wx.showLoading({
      title: '请稍后...',
    })
  return Object.assign(options, { url, header });
}

const get = options => {
  options.method = 'get'
  return new Promise((resolve, reject)=>{
    request(getRequestOptions(options), resolve, reject)
  })
}

const post = options => {
  options.method = 'post'
  return new Promise((resolve, reject)=>{
    request(getRequestOptions(options), resolve, reject)
  })
}

const request = (options, resolve, reject) => {
  options.data = options.data || {}
    wx.request({
      ...options,
      success: (res) => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        const data = res.data

        resolve(data)
        
      },
      fail: (error) => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        alert(JSON.stringify(error))
        reject(error)
      }
    })
}

// 这里比较懒，直接挂到wx上了
wx.$get = get
wx.$post = post
wx.$alert = alert