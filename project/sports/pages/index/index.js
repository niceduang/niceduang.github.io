//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    diaData:{
      modalHidden: true,
      targetModal: '',
      ruleItems: ['1、全民运动每天走起来！设定每日步数目标，支付2元参与基金。达标后则参与当天奖金平分，未达标则支出2元做为达标者奖金。每日坚持运动，每日坚持赚收益。', '2、我们鼓励的是运动，奖金只是大家互助的小小激励。（即每日如果达到自己的运动目标，则最低最低最低可收回2元奖金，不支出任何成本。如未能完成自己的运动目标，则需支'],
      labelStepsItems: [
        { id: '1', value: '5000步', checked: 'true' },
        { id: '2', value: '8000步' },
        { id: '3', value: '10000步以上' }
      ],
      labelDateItems: [
        { id: '1', value: '1天', checked: 'true' },
        { id: '2', value: '连续3天' }
      ]
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.showDialog('rule'); // 活动规则
    this.showDialog('tips'); // 恭喜提示弹窗
    // this.showDialog('alipay'); // 支付宝帐号
    // this.showDialog('payNum'); // 充值金额
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  pay: function () {
    console.log('支付6元');
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': '',
      'paySign': '',
      'success': function (res) {
        // success
      },
      'fail': function (res) {
        // fail
      }
    });
  },
  showDialog: function (e) {
    var id = e.currentTarget ? e.currentTarget.dataset.dia : e;
    if (!id) { return false; }
    var This = this;
    wx.hideTabBar({
      success: function () {
        var modalHidden = 'diaData.modalHidden';
        var targetModal = 'diaData.targetModal';
        This.setData({
          [modalHidden]: false,
          [targetModal]: id
        });
      }
    });
  },
  closeDialog: function (e) {
    var This = this;
    wx.showTabBar({
      success: function () {
        var modalHidden = 'diaData.modalHidden';
        This.setData({
          [modalHidden]: true
        });
      }
    });
  }
});