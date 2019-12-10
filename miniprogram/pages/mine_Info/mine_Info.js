// miniprogram/pages/mine_Info/mine_Info.js
import { $wuxCountUp } from '../../dist/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    nickName:'',
    blogNumber:0,
    information:0,
    likeNumber:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setNumber()
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.setData({
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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

  },
  setNumber(){
    this.blogNumber = new $wuxCountUp(1, 104, 0, 2, {
      printValue(value) {
        this.setData({
          blogNumber: value,
        })
      }
    })
    this.information = new $wuxCountUp(1, 145, 0, 2, {
      printValue(value) {
        this.setData({
          information: value,
        })
      }
    })
    this.likeNumber = new $wuxCountUp(1, 185, 0, 2, {
      printValue(value) {
        this.setData({
          likeNumber: value,
        })
      }
    })
    this.blogNumber.start()
    this.information.start()
    this.likeNumber.start()
  },
  /**跳转发帖页面 */
  goPostMessage(){
    wx.navigateTo({
      url: '/pages/post_message/post_message'
    })
  }
})