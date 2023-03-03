<!-- 表格新增编辑组件 -->
<template>
  <div>
    <el-dialog v-model="visible" :title="title" :before-close="close">
      <el-form>
        <slot name="formSlot"></slot>
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
  visible: Boolean,
  title: String,
  rowData: {}
});

const emits = defineEmits(['close', 'sure']);

let { visible, rowData, title } = toRefs(props);

const sure = () => {
  emits('sure', rowData);
};

const close = () => {
  emits('close');
};
</script>
<style lang="less" scoped></style>
