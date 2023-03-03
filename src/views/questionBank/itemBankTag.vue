<!-- 试题标签管理 -->
<template>
  <div class="btns mb20">
    <el-button type="primary" @click="add()">新增</el-button>
  </div>
  <TestTable
    ref="tagTable"
    :api="getalltagApi"
    :table-header="tableHeader"
    listPath="data"
    total-path="data.length"
    :filter-data="{}"
    @edit="edit"
    @del="del"
  >
  </TestTable>
  <TestTableEdit
    :row-data="state.rowData"
    :title="'编辑'"
    @close="close()"
    @sure="sure"
    :visible="state.visible"
  >
    <template #formSlot>
      <el-form-item label="标签名称">
        <el-input v-model="state.name"></el-input>
      </el-form-item>
    </template>
  </TestTableEdit>
  <TestTableEdit
    :row-data="state.addRowData"
    :title="'新增'"
    @close="closeAdd()"
    @sure="sureAdd"
    :visible="state.visibleAdd"
  >
    <template #formSlot>
      <el-form-item label="标签名称">
        <el-input v-model="state.addName"></el-input>
      </el-form-item>
    </template>
  </TestTableEdit>
</template>

<script setup>
import { reactive, ref } from 'vue';
import TestTable from '../components/TestTable.vue';
import TestTableEdit from '../components/TestTableEdit.vue';
import {
  getalltagApi,
  updateTagApi,
  deleteTagApi,
  addTagApi
} from '../../api/qsBank.js';
import { ElMessage } from 'element-plus';

const tagTable = ref();

let state = reactive({
  visible: false,
  name: '',
  rowData: {},
  addRowData: {},
  visibleAdd: false,
  addName: ''
});

const tableHeader = [
  {
    title: '标签名称',
    prop: 'name'
  },
  {
    title: '创建时间',
    prop: 'createtime'
  }
];

const add = () => {
  state.visibleAdd = true;
};

const edit = (row) => {
  state.visible = true;
  state.name = row.name;
  state.rowData = { ...row };
};

const del = (row) => {
  deleteTagApi({
    id: row.id
  }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      tagTable.value.getData();
      close();
    } else {
      ElMessage.error(res.message);
    }
  });
};

const close = () => {
  state.visible = false;
};

const sure = (rowData) => {
  updateTagApi({
    id: rowData.value.id,
    name: state.name
  }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      tagTable.value.getData();
      close();
    } else {
      ElMessage.error(res.message);
    }
  });
};

const closeAdd = () => {
  state.visibleAdd = false;
};

const sureAdd = () => {
  addTagApi({
    name: state.addName
  }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      tagTable.value.getData();
      close();
    } else {
      ElMessage.error(res.message);
    }
  });
};
</script>
<style lang="less" scoped></style>
