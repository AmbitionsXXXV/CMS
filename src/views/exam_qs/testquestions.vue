<!-- 试题管理 -->
<template>
  <TestTable
    ref="examQsTable"
    :api="getExListbyexamidApi"
    listPath="data"
    totalPath="data.length"
    :isShowRelease="false"
    :table-header="tableHeader"
    :filter-data="{ examid: route.query.id }"
    @edit="edit"
    @del="del"
  >
  </TestTable>
  <ItemBankEdit
    :rowData="state.rowData"
    @close="closeDiaLog()"
    @sure="sureEdit"
    :visible="visible"
  ></ItemBankEdit>
</template>

<script setup>
import { reactive, ref, toRaw } from 'vue';
import TestTable from '../components/TestTable.vue';
import { getExListbyexamidApi, deleteQsApi } from '../../api/exam_qs';
import { useRoute, useRouter } from 'vue-router';
import ItemBankEdit from '../questionBank/itemBankEdit.vue';
import { updateQsApi } from '../../api/qsBank';
import { ElMessage } from 'element-plus';
import Cooikes from 'js-cookie';

const route = useRoute();

const state = reactive({
  rowData: {},
  qscontent: ''
});

let visible = ref(false);

let tableHeader = [
  {
    title: '试题id',
    prop: 'examid'
  },
  {
    title: '试题题干',
    prop: 'qsContent'
  },
  {
    title: '试题描述',
    prop: 'qsAnalysis'
  },
  {
    title: '正确答案',
    prop: 'qsAnswer'
  },
  {
    title: '试题类型',
    prop: 'qsType'
  }
];

const id = Cooikes.get('userId');

const examQsTable = ref();

const add = () => {};

const edit = (tableRow) => {
  let row = JSON.parse(JSON.stringify(tableRow));
  visible.value = true;
  state.qscontent = row.qsContent;
  console.log(row);
  let d = document.createElement('div');
  d.innerHTML = state.qscontent;
  row.qscontent = d.innerText;
  row.qsoption = JSON.parse(toRaw(row.qsOption));
  row.qsanswer = row.qsAnswer;
  state.rowData = { ...row };
};

const closeDiaLog = () => {
  visible.value = false;
};

const sureEdit = (rowData) => {
  let row = JSON.parse(JSON.stringify(toRaw(rowData.value)));
  row.qsoption = JSON.stringify(row.qsoption);
  updateQsApi({
    id,
    ...row
  }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      closeDiaLog();
      examQsTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
};

const del = (row) => {
  deleteQsApi({ id: row.examid }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      examQsTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
};
</script>
<style lang="less" scoped>
.el-input {
  width: 208px;
}
</style>
