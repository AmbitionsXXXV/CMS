<!-- 个人中心 -->
<template>
  <TestTable
    ref="userTable"
    :api="getUserListApi"
    :table-header="tableHeader"
    :filter-data="{ id }"
    @edit="edit"
    @del="del"
  >
  </TestTable>
  <UserEdit
    :visible="state.visible"
    @close="closeDiaLog()"
    @sure="sureDialog"
    :row-data="state.rowData"
  >
  </UserEdit>
</template>

<script setup>
import { reactive, ref, toRaw } from 'vue';
import TestTable from '../components/TestTable.vue';
import { getUserListApi, updateUserApi } from '../../api/userApi';
import Cookies from 'js-cookie';
import UserEdit from './userEdit.vue';
import { ElMessage } from 'element-plus';

let tableHeader = [
  {
    title: '用户名',
    prop: 'username'
  },
  {
    title: '角色',
    prop: 'role'
  },
  {
    title: '邮箱',
    prop: 'email'
  },
  {
    title: '昵称',
    prop: 'nickname'
  },
  {
    title: '是否启用',
    prop: 'status',
    showStatus: true
  },
  {
    title: '创建时间',
    prop: 'createtime'
  }
];

let state = reactive({
  visible: false,
  rowData: {}
});

let id = Cookies.get('userId');

const userTable = ref();

const edit = (row) => {
  state.rowData = { ...row };
  state.visible = true;
};

const del = (row) => {
  row.isdelete = 1;
  updateUserApi({ id, ...row }).then((res) => {
    if (res.code == '200') {
      ElMessage.success('删除成功');
      userTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
};

const closeDiaLog = () => {
  state.visible = false;
};

const sureDialog = (rowData) => {
  updateUserApi({ id, ...toRaw(rowData.value) }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      closeDiaLog();
      userTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
};
</script>
<style lang="less" scoped></style>
