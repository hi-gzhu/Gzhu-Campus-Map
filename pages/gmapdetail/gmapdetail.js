// pages/gmapdetail/gmapdetail.js
const app=getApp();
const plugin = requirePlugin('routePlan');
const key = 'RQ3BZ-LSIKP-DNBDV-LOK2A-5L3G5-DRBRZ';  //使用在腾讯位置服务申请的key
const referer = '广大校园导览';   //调用插件的app的名称
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Detaildatas:{},
    SwiperImgList:[],
    endPoint:'',
    CustomBar: app.globalData.CustomBar,
    cloudRoot:'',
    loadModal:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Detaildatas=JSON.parse(options.Detaildatas)
    //console.log(Detaildatas.image[0].img)
    this.setData({
      Detaildatas,
      cloudRoot:app.globalData.cloudRoot+'/images',
      SwiperImgList:Detaildatas.image,
      endPoint :JSON.stringify({  //终点
        'name': Detaildatas.name,
        'latitude':  Number(Detaildatas.latitude),
        'longitude':  Number(Detaildatas.longitude)
      }),
      loadModal:false
    })
  },
  navigateTo(){
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + this.data.endPoint
    });
  },
  GotoWebView(){
    wx.navigateTo({
      url: `/pages/web-view/web-view?id=${this.data.Detaildatas.panorama}`
    });
  },





  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})