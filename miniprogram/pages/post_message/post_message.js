// miniprogram/pages/post_message/post_message.js
import data from './data';
import { $wuxSelect } from '../../dist/index';
import { $wuxToptips } from '../../dist/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    options1: data,
    fileList:[],
    filePath:'',
    visible1:false,
    value1:[],
    contentText:'',
    cityData:'',
    channel:'',
    channelName:'',
    isLoading:false,
    avatarUrl: '',
    nickName:''
  },
  changeContentText(e){
    console.log('onChange', e.detail.value)
    this.setData({
      contentText: e.detail.value,
    })
  },
  onLoad: function(){
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
  /**大图浏览 */
  onPreview(e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: e.currentTarget.dataset.filelist.map((n) => n.url),
    })
  },
  /**图片上传 */
  doUpload: function () {
    let _this = this;
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            _this.data.fileList.push({ uid: filePath, url: filePath, status: 'done'})
            _this.setData({
              filePath: filePath,
              fileList: _this.data.fileList
            })
            console.log(_this.data.fileList)
          },
          fail: e => {
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  /**图片删除 */
  onRemove(e) {
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            fileList: e.currentTarget.dataset.filelist.filter((n) => n.uid !== e.currentTarget.dataset.file.uid),
          })
        }
      },
    })
  },
  onOpen1() {
    this.setData({ visible1: true })
  },
  onClose1() {
    this.setData({ visible1: false })
  },
  onChange1(e) {
    this.setData({ cityData: e.detail.options.map((n) => n.label).join('/') })
    console.log('onChange1', e.detail)
  },
  /**发布频道 */
  channelChange(){
    $wuxSelect('#wux-channel').open({
      value: this.data.channel,
      options: [{
        title: '游戏',
        value: '0',
      },
      {
        title: '数码',
        value: '1',
      },
      {
        title: '户外',
        value: '2',
      },
      {
        title: '二手',
        value: '3',
      },
      {
        title: '动漫',
        value: '4',
      },
      {
        title: '电影',
        value: '5',
      },
      {
        title: '书籍',
        value: '6',
      },
      {
        title: '资源',
        value: '7',
      },
      {
        title: '旅行',
        value: '8',
      },
        {
          title: '摄影',
          value: '9',
        },
      ],
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          this.setData({
            channel: value,
            channelName: options[index].value,
          })
        }
      },
    })
  },
  /**发布 */
  submitMain(){
    if (this.data.contentText && this.data.fileList.length && this.data.channelName && this.data.cityData){
      const db = wx.cloud.database()
      db.collection('counters').add({
        data: {
          contentText: this.data.contentText,
          fileList: this.data.fileList,
          channelName: this.data.channelName,
          cityData: this.data.cityData,
          nickName: this.data.nickName,
          avatarUrl: this.data.avatarUrl,
          createTime: db.serverDate()
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          console.log(res)
          wx.showToast({
            title: '发布成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '发布失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }else{
      wx.showToast({
        icon: 'none',
        title: '请完善您的信息'
      })
    }
    console.log(this.data.contentText)
  },
})