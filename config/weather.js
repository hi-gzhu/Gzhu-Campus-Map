//key为和风天气的key，可以自己去申请
export function NowWeather(location){
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      method: 'get',
      data:{
        key:'',
        location
      },
      success:resolve,
      fail:reject
    })
  })
}
export function SevenWeather(location){
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/7d',
      method: 'get',
      data:{
        key:'',
        location
      },
      success:resolve,
      fail:reject
    })
  })
}
export function Address(location){
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup',
      method: 'get',
      data:{
        key:'',
        location
      },
      success:resolve,
      fail:reject
    })
  })
}