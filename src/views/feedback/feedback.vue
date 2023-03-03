<!-- 反馈管理 -->
<template>
  <TestTable
    ref="feedTable"
    :api="getAllFeedbackApi"
    :table-header="tableHeader"
    :isShowEdit="false"
    :filter-data="{}"
    @edit="edit"
    @del="del"
  >
    <template #tableColumn>
      <el-table-column label="是否处理" width="100">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            class="ml-2"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            disabled
            :active-value="2"
            :inactive-value="1"
          />
        </template>
      </el-table-column>
    </template>
    <template #buttonSlot="scope">
      <el-button
        v-if="scope.row.status == 1"
        type="primary"
        @click="dispose(scope.row)"
        >处理反馈</el-button
      >
    </template>
  </TestTable>
</template>

<script setup>
import { reactive, ref } from 'vue';
import TestTable from '../components/TestTable.vue';
import {
  getAllFeedbackApi,
  solveFeedbackApi,
  deleteFeedback
} from '../../api/feedback';
import { ElMessage } from 'element-plus';
let state = reactive({});

const feedTable = ref();

const tableHeader = [
  {
    title: '反馈名称',
    prop: 'name'
  },
  {
    title: '反馈人',
    prop: 'createname'
  },
  {
    title: '反馈时间',
    prop: 'createtime'
  },
  {
    title: '问题类型',
    prop: 'type'
  }
];

const edit = () => {};

const del = (row) => {
  deleteFeedback({ id: row.id }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      feedTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
};

const dispose = (row) => {
  solveFeedbackApi({
    id: row.id,
    feedbackcontent: row.name
  }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      feedTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
};
</script>
<style lang="less" scoped></style>
