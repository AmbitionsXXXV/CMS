<!-- 用户编辑 -->
<template>
  <div class="userEdit">
    <el-dialog v-model="visible" title="编辑" :before-close="close">
      <el-form label-width="100px">
        <el-form-item label="文章种类">
          <el-input v-model="rowData.articleType"></el-input>
        </el-form-item>
        <el-form-item label="文章名称">
          <el-input v-model="rowData.articleName"></el-input>
        </el-form-item>
        <el-form-item label="文章封面">
          <el-input v-model="rowData.articleCover"></el-input>
        </el-form-item>
        <el-form-item label="文章链接">
          <el-input v-model="rowData.articleUrl"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="rowData.creator"></el-input>
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
import { reactive, ref, toRefs } from 'vue';

const props = defineProps({
  rowData: {},
  visible: {
    type: Boolean,
    default: () => false
  }
});

let { rowData, visible } = toRefs(props);

const emits = defineEmits(['close', 'sure']);

const sure = () => {
  emits('sure', rowData);
};

const close = () => {
  emits('close');
};
</script>
<style lang="less" scoped>
.userEdit .el-input {
  width: 400px;
}
</style>
