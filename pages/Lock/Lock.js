// pages/Lock/Lock.js
Page({

  fn2Input( e ){
    if( e.detail.value == '806' )
    {
      wx.navigateTo({
        url: '/pages/QA_Manage/QA_Manage'
      })
      return;
    }
 
    if( e.detail.value.length >= 8 )
    {
      wx.showToast({ title: '请输入正确的密码！', icon: 'none' })
    }
  }
  
})