<!-- 用户编辑 -->
<template>
  <div class="userEdit">
    <el-dialog v-model="visible" title="编辑" :before-close="close">
      <el-form label-width="100px">
        <el-form-item label="用户id">
          <el-input disabled v-model="rowData.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="rowData.username"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="rowData.role">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="rowData.password"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="rowData.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="rowData.email"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="rowData.nickname"></el-input>
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
  visible: Boolean
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
