<!-- 创建考试 -->
<template>
  <el-dialog v-model="addVisible" title="新增" :before-close="close">
    <el-form label-width="100px">
      <el-form-item label="专业分类">
        <el-select v-model="state.typeid">
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目内容">
        <el-input type="textarea" v-model="state.qscontent" rows="2"></el-input>
      </el-form-item>
      <el-form-item label="选项">
        <div
          style="width: 100%; margin: 10px"
          v-for="item in state.qsoption"
          :key="item.questionStem"
        >
          <span>{{ item.questionStem }} : </span>
          <el-input v-model="item.questionAnswer"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="正确答案">
        <el-select v-model="state.qsanswer">
          <el-option
            v-for="item in state.qsoption"
            :key="item.questionStem"
            :label="item.questionStem"
            :value="item.questionStem"
          ></el-option>
        </el-select>
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
import { reactive, ref, toRefs, onMounted, toRaw } from 'vue';
import { getalltagApi } from '../../api/qsBank';
import { ElMessage } from 'element-plus';

const props = defineProps({
  addVisible: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['close', 'sure']);

let state = reactive({
  typeid: '',
  qscontent: '',
  qsoption: [
    {
      questionOrder: 1,
      questionStem: 'A',
      questionAnswer: '',
      questionAnalysis: null
    },
    {
      questionOrder: 2,
      questionStem: 'B',
      questionAnswer: '',
      questionAnalysis: null
    },
    {
      questionOrder: 3,
      questionStem: 'C',
      questionAnswer: '',
      questionAnalysis: null
    },
    {
      questionOrder: 4,
      questionStem: 'D',
      questionAnswer: '',
      questionAnalysis: null
    }
  ],
  qsanswer: '',
  typeList: []
});

let { addVisible } = toRefs(props);
let { typeList } = toRefs(state);
const getAllTag = () => {
  getalltagApi().then((res) => {
    if (res.code == '200') {
      state.typeList = res.data;
    } else {
      ElMessage.error(res.message);
    }
  });
};

const close = () => {
  emits('close');
};

const sure = () => {
  let data = {
    typeid: state.typeid,
    qscontent: state.qscontent,
    qsoption: JSON.stringify(toRaw(state.qsoption)),
    qsanswer: state.qsanswer
  };
  emits('sure', data);
};

onMounted(() => {
  getAllTag();
});
</script>
<style lang="less" scoped></style>
