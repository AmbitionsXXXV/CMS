<!-- 创建考试 -->
<template>
  <el-dialog v-model="addVisible" title="新增" :before-close="close">
    <el-form :inline="true" label-width="100px">
      <el-form-item label="试卷名称">
        <el-input v-model="state.name"></el-input>
      </el-form-item>
      <el-form-item label="考试时间">
        <el-date-picker v-model="state.examtime" type="datetime" />
      </el-form-item>
      <el-form-item label="试卷总分数">
        <el-input v-model="state.score"></el-input>
      </el-form-item>
      <el-form-item label="持续时间">
        <el-input v-model="state.duration"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="sure()" type="primary">确定</el-button>
        <el-button @click="close()"> 取消 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue';

const state = reactive({
  name: '',
  examtime: '',
  score: '',
  duration: ''
});

const props = defineProps({
  addVisible: {
    type: Boolean,
    default: () => false
  }
});
let { addVisible } = toRefs(props);

const emits = defineEmits(['close', 'sure']);

const sure = () => {
  state.examtime = filterTime(state.examtime);
  emits('sure', state);
};

const close = () => {
  emits('close');
};

const filterTime = (time) => {
  var date = new Date(time);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? '0' + d : d;
  var h = date.getHours();
  h = h < 10 ? '0' + h : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  var s = date.getSeconds();
  s = s < 10 ? '0' + s : s;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + s;
};
</script>
<style lang="less" scoped></style>
