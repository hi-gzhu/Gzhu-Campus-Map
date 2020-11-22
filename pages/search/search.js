// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    markers:[],
    showData:[],
    isDelete:0,
    cloudRoot:app.globalData.cloudRoot+'/images'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      markers:app.globalData.markers
    })
  },
  bindSearchInput(e) {
    this.setData({
      keyword: e.detail.value,
    })
    var showData = new Array()
    var keyword = e.detail.value.replace(/(^\s*)|(\s*$)/g, "")
    const searchdata = this.data.markers
    var reg =  new RegExp(keyword,'i')
    //console.log(e.detail.cursor)
    if(e.detail.cursor>=this.data.isDelete&&keyword.length>0)
    {
      searchdata.forEach(item => {
       // console.log(item.data)
        for (var i = 0; i < item.data.length; i++) {
          if (reg.test(item.data[i].name)) {
            showData.push(item.data[i])
            //console.log("查询成功")
          }
        }
      });
      if(showData.length>0){
        this.setData({
          showData
        })
      }else{
        wx.showToast({
          title: '找不到地点哦',
          icon:"none",
          duration:1000
        })
        this.setData({
          showData:null  
        })
      }
    }else{
     // console.log('删除')
      this.setData({
        showData: null
      });
    }
    this.data.isDelete = e.detail.cursor

  },
  SendKeySearch() {
    var showData = new Array()
    var keyword = this.data.keyword.replace(/(^\s*)|(\s*$)/g, "")
    const searchdata = this.data.markers
    var reg =  new RegExp(keyword,'i')
    searchdata.forEach(item => {
      // console.log(item.data)
       for (var i = 0; i < item.data.length; i++) {
         if (reg.test(item.data[i].name)) {
           showData.push(item.data[i])
           //console.log("查询成功")
         }
       }
      this.setData({
        showData
      })
    });
  
  },
  NavGoToDetail(e){
  //  console.log(e.currentTarget.dataset.id)
    const Detaildatas=this.data.showData[e.currentTarget.dataset.id]
    wx.navigateTo({
       url: '/pages/gmapdetail/gmapdetail?Detaildatas='+ JSON.stringify(Detaildatas),
     })
  }
})