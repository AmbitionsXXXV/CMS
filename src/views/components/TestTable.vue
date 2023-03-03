<!-- 表格组件封装 -->
<template>
  <div class="tableBox">
    <el-table
      :data="tableData"
      stripe
      border
      ref="tableInstance"
      :max-height="props.tableHeight"
    >
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column
        v-for="(item, index) in props.tableHeader"
        :key="index"
        :prop="item.prop"
        :label="item.title"
        :width="item?.width"
      ></el-table-column>
      <slot name="tableColumn"></slot>
      <el-table-column label="编辑">
        <template #default="scope">
          <slot name="buttonSlot" :row="scope.row"></slot>
          <el-button
            type="primary"
            @click="edit(scope.row)"
            v-if="props.isShowEdit"
            >编辑</el-button
          >
          <el-button type="warning" @click="del(scope.row)">删除</el-button>
          <el-button
            type="success"
            @click="release(scope.row)"
            v-if="props.isShowRelease"
            >发布</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt20 fr"
      background
      layout="prev, pager, next"
      :current-page="current"
      :total="total"
      @current-change="changeCurent"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs, onMounted } from 'vue';

const props = defineProps({
  // 请求表格数据接口
  api: {
    required: true,
    type: Function
  },
  // 后端接口返回数据对象中，列表数据和总条数对应的数据路径
  listPath: {
    type: String,
    default: 'data.list'
  },
  totalPath: {
    type: String,
    default: 'data.total'
  },
  // 筛选参数
  filterData: {
    type: Object,
    default: function () {
      return {};
    }
  },
  //表格表头
  tableHeader: {
    type: Array,
    default: () => []
  },
  // 分页参数
  pageData: {
    type: Object,
    default: function () {
      return {
        count: 10,
        start: 1
      };
    }
  },
  // 是否分页
  paging: {
    type: Boolean,
    default: true
  },
  //是否展示发布
  isShowRelease: {
    type: Boolean,
    default: false
  },
  tableHeight: {
    type: String,
    default: '100%'
  },
  //是否展示编辑
  isShowEdit: {
    type: Boolean,
    default: true
  }
});

const emits = defineEmits(['edit', 'del', 'release']);

let state = reactive({
  tableData: [], //表格数据
  total: 0, //表格总条数
  current: 1
});

let { tableData, total, current } = toRefs(state);

// 获取表格数据
const getData = () => {
  state.tableData = [];
  const params = getParams(props.paging);
  props.api(params).then((res) => {
    // 如果有分页
    if (props.paging) {
      state.tableData = getValueByPath(res, props.listPath);
      state.total = getValueByPath(res, props.totalPath);
    } else {
      state.tableData = getValueByPath(res, props.listPath);
    }
  });
};

/**
 * @description 根据对象的数据路径获取值,
 * @param {Object} obj
 * @param {String} path
 */
const getValueByPath = (obj, path) => {
  let value = { ...obj };
  path.split('.').forEach((item) => {
    if (isObj(value) && value[item] !== undefined) {
      value = value[item];
    } else {
      throw new Error(`在数据路径${path}中，${item}不存在`);
    }
  });
  return value;
};

/**
 * @description 属性表格数据，如果需要则可以获取ref实例调用这个方法
 * @param {number} e 前往第几页，不传当前页刷新
 */
const reload = (e) => {
  if (e && !/(^[1-9]\d*$)/.test(e)) {
    e = 1;
  }
  e && (props.pageData.start = e);
  getData();
};

const getParams = (e) => {
  let data = { ...props.filterData };
  if (e) {
    Object.assign(data, {
      start:
        current.value == 1 ? 0 : (current.value - 1) * props.pageData.count,
      count: props.pageData.count
    });
  }
  return data;
};

const isObj = (obj) => {
  return obj !== null && typeof obj === 'object' ? true : false;
};

let tableInstance = ref(null);

const changeCurent = (val) => {
  current.value = val;
  getData();
};

const edit = (row) => {
  emits('edit', row);
};

const del = (row) => {
  emits('del', row);
};

const release = (row) => {
  emits('release', row);
};

defineExpose({ getData });

onMounted(() => {
  getData();
});
</script>
<style lang="less" scoped></style>
