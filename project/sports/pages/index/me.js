// pages/index/me.js
Page({
  data: {
    diaData: {
      modalHidden: true,
      targetModal: ''
    },
    userInfo: {
      total: '￥178.00',//参与基金
      hasGet: '￥178.00'//获得奖金
    },
    tableData:{},
    tabDataList:[{
      tableData: {
        title: ['日期', '当日目标/完成情况', '获得奖金'],
        todayData: [{
          "date": "2018/05/24",
          "total": "5000/5242",
          "average": "￥2.50"
        }, {
          "date": "2018/05/24",
          "total": "5000/5378",
          "average": "￥2.50"
        }, {
          "date": "2018/05/24",
          "total": "未参与",
          "average": "￥2.50"
        }]
      }
    },{
        tableData: {
          title: ['日期', '当日奖金总额', '人均奖金'],
          todayData: [{
            "date": "2018/05/25",
            "total": "￥123,456,000",
            "average": "￥1.50"
          }, {
            "date": "2018/05/25",
            "total": "￥123,456,000",
            "average": "￥1.50"
          }, {
            "date": "2018/05/25",
            "total": "￥123,456,000",
            "average": "￥1.50"
          }]
        }
    }],
    curIndex: 1
  },
  onLoad:function(){
    var index = this.data.curIndex;
    this.initTabCont(index);
  },
  changeTabbar:function(e){
    var index = e.currentTarget.dataset.cur;
    console.log(index);
    this.setData({
      curIndex: index
    });
    this.initTabCont(index);
  },
  initTabCont: function (m) {
    var data = this.data.tabDataList[m-1].tableData;
    this.setData({
      tableData: data
    });
  },
  loadData: function (e) {
    console.log('触底...');
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