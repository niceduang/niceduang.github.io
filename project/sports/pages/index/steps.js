// pages/index/steps.js
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    daily: [{
      'date': '06/06',
      'steps': 5000
    }, {
      'date': '06/07',
      'steps': 300
    }, {
      'date': '06/08',
      'steps': 4000
    }, {
      'date': '06/09',
      'steps': 5000
    }, {
      'date': '06/10',
      'steps': 5000
    }, {
      'date': '06/11',
      'steps': 8000
    }, {
      'date': '06/12',
      'steps': 12345
    }],
    todaySteps: 0,
    userList: [{
      'photo': '',
      'name': '用户名',
      'steps': '123456'
    }, {
      'photo': '',
      'name': '用户名',
      'steps': '123456'
    }, {
      'photo': '',
      'name': '用户名',
      'steps': '123456'
    }, {
      'photo': '',
      'name': '用户名',
      'steps': '123456'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this;
    var daily = this.data.daily;
    this.setData({
      todaySteps: daily[daily.length-1].steps
    });
    console.log(daily);
    var simulationData = this.formatData();
    console.log(simulationData.categories)
    console.log(simulationData.data)
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      // x轴日期
      categories: simulationData.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: '步数',
        data: simulationData.data,
        format: function (val, name) {
          return val;
        }
      }],
      xAxis: {
        disableGrid: true,
        fontColor:'#ffffff'
      },
      yAxis: {
        // title: '成交金额 (万元)',
        // format: function (val) {
        //   return val.toFixed(2);
        // },
        // min: 0
        disabled:true,
        title: '',
        min: 0,
        gridColor: '#ffad70',
        fontColor:'#ffffff',
        format: function (val) {
          return val;
        }
      },
      width: 350,
      height: 148,
      dataLabel: false,
      dataPointShape: true,
      // curve
      extra: {
        lineStyle: 'straight'
      }
    });
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#ffffff',
      format: function (item, category) {
        // return category + ' ' + item.name + ':' + item.data
        return item.name + ':' + item.data
      }
    });
  },
  formatData: function () {
    var daily = this.data.daily;
    var categories = [];
    var data = [];
    for (var i = 0; i < daily.length; i++) {
      categories.push(daily[i].date);
      data.push(daily[i].steps);
    }
    return {
      categories: categories,
      data: data
    }
  },
  loadData: function (e) {
    console.log('触底...');
  }
})