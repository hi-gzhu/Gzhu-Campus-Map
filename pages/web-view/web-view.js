// pages/web-view/web-view.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    panoramaUrl: app.globalData.panoramaUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      panoramaUrl: this.data.panoramaUrl += options.id
    });
  },

})