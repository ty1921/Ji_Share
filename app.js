// app.js
import './utils/api.js';

const host =  'https://joytour-tyre.com/backend/';
// const host = 'https://www.fredwheels.com/backend/API/';
 
App({
  onLaunch() {
 
    // 登录
    var openid = wx.getStorageSync('openid');
    // var openid = '';

    if( !openid ) 
    {
      wx.login({  
        success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(' wx.login=')
            console.log(res) 

            // wx.$get({ 
            //   url: 'wx.php?action=openid&code=' + res.code, 
            // }).then(res2 => { 
            //   console.log(res2);
            //   wx.setStorageSync('openid',res2.openid); 
            //   wx.setStorageSync('session_key',res2.session_key);
            // })
        }
      })
    }

  },
  globalData: {
    host: host,
    userInfo: null,
    age: 10,
    total: 0,
    tips : "您好，暂未查询到质保卡。如有疑问或需要帮助，敬请联系您的销售顾问或致电人工客服400-650-7855。",
    tips2 : "您的质保卡正在申请中。质保卡生效后将会为您推送消息通知，感谢您的耐心等待。",
    src: '../../images/logo2.png',
    img_header: '../../images/header.png',
    img_logo0: '../../images/logo0.png'
  },
  debug: true
})

