<!-- 试题库 -->
<template>
  <div class="itemBank">
    <div class="btns mt15 mb20">
      <el-button type="primary" @click="add()">新增试题</el-button>
    </div>
    <TestTable
      ref="itemTable"
      :api="getallqslistApi"
      :table-height="'700px'"
      :table-header="tableHeader"
      :filter-data="{}"
      @edit="edit"
      @del="del"
    >
      <template #tableColumn>
        <el-table-column label="试题题干">
          <template #default="scope">
            <span v-html="scope.row.qscontent"></span>
          </template>
        </el-table-column>
      </template>
      <template #buttonSlot="scope">
        <el-button type="success" @click="addExam(scope.row)"
          >添加到试卷</el-button
        >
      </template>
    </TestTable>
    <ItemBankAdd
      :add-visible="state.addVisible"
      @close="closeAdd()"
      @sure="sureAdd"
    ></ItemBankAdd>
    <ItemBankEdit
      :rowData="state.rowData"
      @close="closeDiaLog()"
      @sure="sureEdit"
      :visible="visible"
    ></ItemBankEdit>
    <TestTableEdit
      :row-data="state.addRowData"
      :title="'添加到试卷'"
      @close="closeAddExam()"
      @sure="sureAddExam"
      :visible="state.visibleAddExam"
    >
      <template #formSlot>
        <el-form-item label="选择试卷">
          <el-select v-model="state.exam" placeholder="选择试卷">
            <el-option
              v-for="item in state.examList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </TestTableEdit>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, toRaw, toRefs } from 'vue';
import {
  getallqslistApi,
  addqslistApi,
  updateQsApi,
  getalltagApi,
  qsdeleteOrstatusApi
} from '../../api/qsBank';
import { insertExqsApi } from '../../api/exam_qs';
import { getallexamlistApi } from '../../api/exam';
import TestTable from '../components/TestTable.vue';
import Cookies from 'js-cookie';
import ItemBankEdit from './itemBankEdit.vue';
import ItemBankAdd from './ItemBankAdd.vue';
import { ElMessage } from 'element-plus';
import TestTableEdit from '../components/TestTableEdit.vue';

let tableHeader = [
  {
    title: '试题id',
    prop: 'id',
    width: '80'
  },
  {
    title: '专业分类',
    prop: 'typename'
  },
  {
    title: '试题类型',
    prop: 'qstype',
    width: '120'
  },
  {
    title: '正确答案',
    prop: 'qsanswer',
    width: '120'
  },
  {
    title: '创建时间',
    prop: 'createtime'
  }
];

let state = reactive({
  rowData: {},
  addVisible: false,
  qscontent: '',
  examList: [],
  typeId: '',
  visibleAddExam: false,
  addRowData: {},
  exam: ''
});

const id = Cookies.get('userId');

const itemTable = ref();

let visible = ref(false);

const add = () => {
  state.addVisible = true;
};

const edit = (tableRow) => {
  let row = JSON.parse(JSON.stringify(tableRow));
  visible.value = true;
  state.qscontent = row.qscontent;
  let d = document.createElement('div');
  d.innerHTML = state.qscontent;
  row.qscontent = d.innerText;
  row.qsoption = JSON.parse(toRaw(row.qsoption));
  state.rowData = { ...row };
};

const del = (row) => {
  qsdeleteOrstatusApi({
    creatorId: id,
    type: -1,
    id: row.id
  }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      itemTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
};

const closeDiaLog = () => {
  visible.value = false;
};

const closeAdd = () => {
  state.addVisible = false;
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
      itemTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
};

const sureAdd = (state) => {
  addqslistApi(id, {
    ...state
  }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      closeAdd();
      itemTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
};

const addExam = (row) => {
  state.visibleAddExam = true;
  state.addRowData = { ...row };
};

const closeAddExam = () => {
  state.visibleAddExam = false;
};

const getallexamlist = () => {
  getallexamlistApi({
    userId: id
  }).then((res) => {
    if (res.code == '200') {
      state.examList = res.data.list;
    }
  });
};

const role = Cookies.get('role');

const sureAddExam = (rowData) => {
  insertExqsApi({
    id: rowData.value.id,
    examid: state.exam,
    creator: role
  }).then((res) => {
    if (res.code == '200') {
      state.exam = '';
      ElMessage.success('添加成功');
      closeAddExam();
    } else {
      ElMessage.error(res.message);
    }
  });
};

onMounted(() => {
  getallexamlist();
});
</script>
<style lang="less">
.itemBank .el-input {
  width: 208px;
}
</style>
