<!-- 用户编辑 -->
<template>
  <div class="userEdit">
    <el-dialog v-model="visible" title="编辑" :before-close="close">
      <el-form label-width="100px">
        <el-form-item label="试卷id">
          <el-input disabled v-model="rowData.id"></el-input>
        </el-form-item>
        <el-form-item label="试卷名称">
          <el-input v-model="rowData.name"></el-input>
        </el-form-item>
        <el-form-item label="答题时间">
          <el-input v-model="rowData.duration"></el-input>
        </el-form-item>
        <el-form-item label="考试时间">
          <el-input v-model="rowData.examtime"></el-input>
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
