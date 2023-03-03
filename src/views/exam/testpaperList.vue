<!-- 试卷列表 -->
<template>
  <div class="btns mb20">
    <el-button type="primary" @click="add()">新增</el-button>
  </div>
  <TestTable
    ref="examTable"
    :api="getallexamlistApi"
    :isShowRelease="true"
    :table-header="tableHeader"
    :filter-data="{ userId: id }"
    @edit="edit"
    @del="del"
    @release="release"
  >
    <template #tableColumn>
      <el-table-column label="是否发布" width="100">
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
      <el-button @click="lookExam(scope.row)">查看</el-button>
    </template>
  </TestTable>
  <testpaperListEdit
    :visible="state.visible"
    @close="closeDiaLog()"
    @sure="sureDialog"
    :row-data="state.rowData"
  >
  </testpaperListEdit>
  <testpaperListAdd
    :add-visible="state.addVisible"
    @close="closeAdd()"
    @sure="sureAdd"
  ></testpaperListAdd>
</template>

<script setup>
import { reactive, ref, toRaw } from 'vue';
import {
  getallexamlistApi,
  updateexam,
  addexam,
  releaseexam
} from '../../api/exam';
import Cookies from 'js-cookie';
import TestTable from '../components/TestTable.vue';
import testpaperListEdit from './testpaperListEdit.vue';
import testpaperListAdd from './testpaperListAdd.vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

let tableHeader = [
  {
    title: '试卷id',
    prop: 'id',
    width: '80'
  },
  {
    title: '试卷名称',
    prop: 'name'
  },
  {
    title: '答题时间(/m)',
    prop: 'duration',
    width: '120'
  },
  {
    title: '创建时间',
    prop: 'createtime'
  },
  {
    title: '考试时间',
    prop: 'examtime'
  }
];

const id = Cookies.get('userId');

const state = reactive({
  visible: false,
  rowData: {},
  addVisible: false
});

const add = () => {
  state.addVisible = true;
};

const edit = (row) => {
  state.rowData = row;
  state.visible = true;
};

const del = (row) => {
  row.isdelete = true;
  updateexam({ id, ...row }).then((res) => {
    if (res.code == '200') {
      ElMessage.success('删除成功');
      examTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
};

const release = (row) => {
  releaseexam({ id: row.id }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      examTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
};

const closeDiaLog = () => {
  state.visible = false;
};

const closeAdd = () => {
  state.addVisible = false;
};

const sureAdd = (state) => {
  addexam({
    creatorid: id,
    ...toRaw(state)
  }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      closeAdd();
      examTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
  state.addVisible = false;
};

const examTable = ref();

const sureDialog = (rowData) => {
  updateexam({ id, ...toRaw(rowData.value) }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      closeDiaLog();
      examTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
  state.visible = false;
};

const lookExam = (row) => {
  router.push({
    path: '/testquestions',
    query: {
      id: row.id
    }
  });
};
</script>
<style lang="less" scoped></style>
