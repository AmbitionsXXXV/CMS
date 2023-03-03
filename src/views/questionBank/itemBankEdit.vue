<!-- 试题库编辑 -->
<template>
  <div>
    <el-dialog v-model="visible" title="编辑" :before-close="close">
      <el-form label-width="100px">
        <el-form-item label="试题id">
          <el-input v-model="rowData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="专业分类">
          <el-select v-model="rowData.typeid">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试题题干">
          <el-input type="textarea" v-model="rowData.qscontent" row="2" />
        </el-form-item>
        <el-form-item label="选项">
          <div
            style="width: 100%; margin: 10px"
            v-for="item in rowData.qsoption"
            :key="item.questionStem"
          >
            <span>{{ item.questionStem }} : </span>
            <el-input v-model="item.questionAnswer"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="正确答案">
          <el-select v-model="rowData.qsanswer">
            <el-option
              v-for="item in rowData.qsoption"
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
  </div>
</template>

<script setup>
import { reactive, ref, toRefs, onMounted } from 'vue';
import { getalltagApi } from '../../api/qsBank';
import { ElMessage } from 'element-plus';

const props = defineProps({
  rowData: {},
  visible: Boolean
});

let state = reactive({
  typeList: [],
  qsContent: ''
});

let { typeList } = toRefs(state);

let { rowData, visible } = toRefs(props);

const emits = defineEmits(['close', 'sure']);

const sure = () => {
  emits('sure', rowData);
};

const close = () => {
  emits('close');
};

const getAllTag = () => {
  getalltagApi().then((res) => {
    if (res.code == '200') {
      state.typeList = res.data;
    } else {
      ElMessage.error(res.message);
    }
  });
};

onMounted(() => {
  getAllTag();
});
</script>
<style lang="less" scoped>
.el-input {
  width: 208px;
}
</style>
