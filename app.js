//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
        env: '',
        traceUser: true,
      })
//云存储目录
      this.globalData.cloudRoot=''
    }
    // 获取系统状态栏信息
    var _this=this
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
         	this.globalData.Custom = capsule;
        	this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
        	this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
    //云函数
    wx.cloud.callFunction({
      // 云函数名称
      name: 'loadMarkers',
      // 传给云函数的参数
      data: {
        base: 'markers',
        orderby:'itemId'
      },
    })
    .then(res => {
      //console.log(res) // 3
      _this.globalData.markers= res.result.data
    })
    .catch(console.error)	
  },
  globalData: {
    userInfo: null,
    markers:[],
    cloudRoot:'',
    panoramaUrl:'https://720yun.com/t/64729wakmls?scene_id='
  }
})