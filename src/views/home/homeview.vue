<!--  -->
<template>
  <div class="head">
    <h3>统计总览</h3>
    <div class="box">
      <div>
        <h4>用户数量</h4>
        <p>3</p>
      </div>
      <div>
        <h4>试题总数</h4>
        <p>1017</p>
      </div>
      <div>
        <h4>试卷总数</h4>
        <p>3</p>
      </div>
      <div>
        <h4>文章总数</h4>
        <p>204</p>
      </div>
      <div>
        <h4>反馈总数</h4>
        <p>2</p>
      </div>
    </div>
  </div>
  <div class="head">
    <h3>用户总览</h3>
    <div id="user"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';

//***引入
import * as echarts from 'echarts';

const GetTime = () => {
  var date = new Date();
  var base = Date.parse(date); // 转换为时间戳
  var year = date.getFullYear(); //获取当前年份
  var mon = date.getMonth() + 1; //获取当前月份
  var day = date.getDate(); //获取当前日
  var oneDay = 24 * 3600 * 1000;
  //var daytime = `${year}${mon >= 10 ? mon : '0' + mon}${day >= 10 ? day : '0' + day}`; //今日时间
  //this.$data.daytime = daytime; // 今日时间赋值给变量

  var daytimeArr = [];
  for (var i = 1; i < 7; i++) {
    //前七天的时间
    var now = new Date((base -= oneDay));
    var myear = now.getFullYear();
    var month = now.getMonth() + 1;
    var mday = now.getDate();
    daytimeArr.push(
      [
        myear,
        month >= 10 ? month : '0' + month,
        mday >= 10 ? mday : '0' + mday
      ].join('-')
    );
  }
  return daytimeArr;
};

const user = () => {
  const charts = echarts.init(document.querySelector('#user'));
  let dateArr = GetTime();
  let option = {
    xAxis: {
      type: 'category',
      data: [...dateArr]
    },
    tooltip: {
      trigger: 'axis'
    },

    legend: {},
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [3, 4, 2, 1, 2, 1, 3],
        type: 'line',
        name: '新用户'
      },
      {
        data: [1, 2, 1, 3, 2, 2, 4],
        type: 'line',
        name: '活跃用户'
      }
    ]
  };

  option && charts.setOption(option);
};

//*** 挂载Echarts
onMounted(() => {
  user();
});
</script>
<style lang="less" scoped>
.head {
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 0 2px 0 #ccc;

  #user {
    width: 100%;
    height: 500px;
  }

  .box {
    display: flex;
    justify-content: space-between;
    height: 100px;
    margin-top: 15px;
    background: #0a84ff url('../../assets/bg2.png') no-repeat;

    div {
      width: 20%;
      text-align: center;
      padding-top: 20px;
      color: #afd5fa;
      line-height: 30px;

      p {
        font-size: 20px;
        color: #fff;
      }
    }
  }
}
</style>
