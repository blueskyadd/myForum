// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    imgUrls: ['http://img.taopic.com/uploads/allimg/140720/240467-140H00K62786.jpg','http://img01.taopic.com/160919/240411-16091ZGP271.jpg'],
    channel_list: [{ 'name': '游戏', 'id': '0', 'type': 'logo-game-controller-b', 'color': 'orangered' }, { 'name': '数码', 'id': '1', 'type': 'ios-tablet-portrait', 'color': '#119dfc' }, { 'name': '户外', 'id': '2', 'type': 'ios-airplane', 'color': '#fdb65a' }, { 'name': '二手', 'id': '3', 'type': 'ios-gift', 'color': '#60bf93' }, { 'name': '动漫', 'id': '4', 'type': 'ios-outlet', 'color': '#ec844f' }, { 'name': '电影', 'id': '5', 'type': 'ios-film', 'color': '#62b0f0' }, { 'name': '书籍', 'id': '6', 'type': 'ios-school', 'color': '#11e88c' }, { 'name': '资源', 'id': '7', 'type': 'ios-folder', 'color': '#f37d4f' }, { 'name': '旅行', 'id': '8', 'type': 'ios-airplane', 'color': '#00be99' }, { 'name': '摄影', 'id': '9', 'type': 'ios-aperture', 'color': '#60bf44'  }],
    isShow:true,
    openid:'',
    postList:[]
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      isShow: false
    })
    this.getPosiList()
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
  getPosiList(){
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('counters').where({
      channelName: '0'
    }).get({
      success: res => {
        this.setData({
          postList:res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  /**跳转发帖页面 */
  goPostMessageDetail(e) {
    wx.navigateTo({
      url: '/pages/post_messageDetail/post_messageDetail?blogID=' + e.currentTarget.dataset.id
    })
  }
})