<!-- 文章列表 -->
<!-- 试卷列表 -->
<template>
  <div class="btns mb20">
    <el-button type="primary" @click="add()">新增</el-button>
  </div>
  <TestTable ref="examTable" :api="getArticleApi" :table-height="'700px'" :isShowRelease="false"
    :table-header="tableHeader" :filter-data="{ userId: id }" @edit="edit" @del="del">
    <template #tableColumn>
      <el-table-column label="文章封面" width="100">
        <template #default="scope">
          <!-- <img :src="scope.row.articleCover" class="tableImg" /> -->
          <el-image :src="scope.row.articleCover" class="tableImg">
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="文章链接">
        <template #default="scope">
          <span class="spanUrl" @click="toHref(scope.row.articleUrl)">{{ scope.row.articleUrl }}</span>
        </template>
      </el-table-column>
    </template>
  </TestTable>
  <articleListEdit :visible="state.visible" @close="closeDiaLog()" @sure="sureDialog" :row-data="state.rowData">
  </articleListEdit>
  <articleListAdd :add-visible="state.addVisible" @close="closeAdd()" @sure="sureAdd"></articleListAdd>
</template>

<script setup>
import { reactive, ref, toRaw } from 'vue';
import {
  getArticleApi,
  addarticle,
  updatearticle,
  deletearticle
} from '../../api/article';
import Cookies from 'js-cookie';
import TestTable from '../components/TestTable.vue';
import articleListEdit from './articleListEdit.vue';
import articleListAdd from './articleListAdd.vue';
import { ElMessage } from 'element-plus';
import { Picture as IconPicture } from '@element-plus/icons-vue';
let tableHeader = [
  {
    title: '文章id',
    prop: 'id'
  },
  {
    title: '文章种类',
    prop: 'articleType'
  },
  {
    title: '文章名称',
    prop: 'articleName'
  },
  // {
  //   title: '文章链接',
  //   prop: 'articleUrl'
  // },
  {
    title: '创建人',
    prop: 'creator'
  }
];

const id = Cookies.get('userId');

const state = reactive({
  visible: false,
  rowData: {},
  addVisible: false
});
//添加
const add = () => {
  state.addVisible = true;
};
//修改
const edit = (row) => {
  console.log(row, 'row');
  state.rowData = row;
  state.visible = true;
};
//删除
const del = (row) => {
  row.isdelete = true;
  deletearticle({ id: row.id }).then((res) => {
    if (res.code == '200') {
      ElMessage.success('删除成功');
      examTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  });
};

//关闭更改
const closeDiaLog = () => {
  state.visible = false;
};
//关闭新增
const closeAdd = () => {
  state.addVisible = false;
};
//添加
const sureAdd = (state) => {
  addarticle({
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
//更改
const sureDialog = (rowData) => {
  updatearticle({ ...toRaw(rowData.value) }).then((res) => {
    if (res.code == '200') {
      ElMessage.success(res.message);
      closeDiaLog();
      examTable.value.getData();
    } else {
      ElMessage.error(res.message);
    }
  })
  state.visible = false
}

const toHref = (url) => {
  window.location = url
}
</script>
<style lang="less" scoped>
.tableImg {
  width: 50px;
  height: 50px;
}

.el-icon {
  font-size: 50px;
}

.spanUrl {
  cursor: pointer;
}

.spanUrl:hover {
  color: #06f;
  text-decoration: dashed;
}
</style>
