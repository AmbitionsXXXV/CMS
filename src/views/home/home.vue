<!-- home主页面 -->
<template>
  <div class="home">
    <div class="header">
      <div class="header-left">{{ $t('messages.title') }}</div>
      <ul class="header-right">
      <!-- <el-avatar :size="60" src="https://empty">
                                          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                                                                      </el-avatar> -->
        <!-- 放大全屏 -->
        <li @click="full">
          <FullScreenOne theme="outline" size="24" fill="#fff">
            <FullScreen />
          </FullScreenOne>
        <!-- <el-icon class="bigHome">
            <FullScreen />
                                    </el-icon> -->
        </li>
        <!-- 中英文切换 -->
        <li>
          <el-popover :width="60"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
            <template #reference>
              <International theme="outline" size="24" fill="#fff" />
            </template>
            <template #default>
              <el-button class="theme-all1" @click="switchClick('zhCN')">{{
                $t('messages.btnZh')
              }}</el-button>
              <el-button class="theme-all" @click="switchClick('en')">{{
                $t('messages.btnEn')
              }}</el-button>
            </template>
          </el-popover>
        </li>
        <!-- 更换主题 -->
        <li>
          <el-popover :width="150"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
            <template #reference>
              <Theme theme="outline" size="24" fill="#fff" />
            </template>
            <template #default>
              <el-button class="theme-all1" @click="dan()">浅色主题</el-button>
              <el-button class="theme-all" @click="shen()">深色主题</el-button>
            </template>
          </el-popover>

        </li>
        <!-- 退出登录 -->
        <li>
          <el-popover :width="60"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
            <template #reference>
              <el-icon class="bigHome">
                <UserFilled />
              </el-icon>
            </template>
            <template #default>
              <el-button text @click="loginOut">退出登录</el-button>
            </template>
          </el-popover>
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="main_left">
        <el-menu class="el-menu-vertical-demo" default-active="2" router>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>{{ $t('messages.menuList1') }}</span>
            </template>
            <el-menu-item index="/user">{{
              $t('messages.menuList11')
            }}</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <Promotion />
              </el-icon>
              <span>{{ $t('messages.menuList2') }}</span>
            </template>
            <el-menu-item index="/itemBank">{{
              $t('messages.menuList21')
            }}</el-menu-item>
            <el-menu-item index="/itemBankTag">{{
              $t('messages.menuList22')
            }}</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <List />
              </el-icon>
              <span>{{ $t('messages.menuList3') }}</span>
            </template>
            <el-menu-item index="/testpaperList">{{
              $t('messages.menuList31')
            }}</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon>
                <Document />
              </el-icon>
              <span>{{ $t('messages.menuList4') }}</span>
            </template>
            <el-menu-item index="/articleList">{{
              $t('messages.menuList41')
            }}</el-menu-item>
            <el-menu-item index="/articleTag">{{
              $t('messages.menuList42')
            }}</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="6">
            <template #title>
              <el-icon>
                <Comment />
              </el-icon>
              <span>{{ $t('messages.menuList43') }}</span>
            </template>
            <el-menu-item index="/feedback">{{
              $t('messages.menuList43')
            }}</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="main_content">
        <div class="breadcrumbBox">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in routers" :key="item.path" :to="{ path: item?.path }">
              {{ item?.meta?.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content_bd">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed, onBeforeMount, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import screenfull from 'screenfull';
import { useI18n } from 'vue-i18n';
import {
  UserFilled,
  Promotion,
  List,
  Document,
  ArrowDown,
  Comment
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie';
import themes from '../../utils/themes';
import { colorMix } from '../../utils/tool';

let state = {
  themeColorObj: [
    {
      value: 'defaultTheme',
      title: '浅色主题'
    },
    {
      value: 'darkTheme',
      title: '深色主题'
    }
  ],
  themeObj: {}
};

let currentSkinName = ref(Cookies.get('currentSkinName') ?? 'defaultTheme');

const dan = () => {
  currentSkinName.value = 'defaultTheme'
  switchTheme()
}

const shen = () => {
  currentSkinName.value = 'darkTheme'
  switchTheme()
}

const switchTheme = (type) => {
  // themes 对象包含 defaultTheme、darkTheme 两个属性即默认主题与深色主题
  state.currentSkinName = type || 'defaultTheme';
  state.themeObj = themes[currentSkinName.value];
  Cookies.set('currentSkinName', toRaw(currentSkinName.value), { expires: 7 });
  getsTheColorScale();
  // 设置css 变量
  Object.keys(state.themeObj).map((item) => {
    document.documentElement.style.setProperty(item, state.themeObj[item]);
  });
};
//  // 获取色阶
const getsTheColorScale = () => {
  const colorList = [
    'primary',
    'success',
    'warning',
    'danger',
    'error',
    'info'
  ];
  const prefix = '--el-color-';
  colorList.map((colorItem) => {
    for (let i = 1; i < 10; i += 1) {
      if (i === 2) {
        // todo 深色变量生成未完成 以基本色设置
        state.themeObj[`${prefix}${colorItem}-dark-${2}`] = colorMix(
          state.themeObj[`${prefix}black`],
          state.themeObj[`${prefix}${colorItem}`],
          1
        );
      } else {
        state.themeObj[`${prefix}${colorItem}-light-${10 - i}`] = colorMix(
          state.themeObj[`${prefix}white`],
          state.themeObj[`${prefix}${colorItem}`],
          i * 0.1
        );
      }
    }
  });
};

const router = useRouter();
// 监听当前路由
const routers = computed(() => {
  // 过滤掉没有meta的
  return router.currentRoute.value.matched.filter((item) => item.meta.title);
});
//全屏
let full = () => {
  screenfull.isEnabled && screenfull.toggle();
};
//换成英文
const { locale } = useI18n();
function switchClick (lang) {
  locale.value = lang;
  localStorage.setItem('lang', lang);
}
//退出
let loginOut = () => {
  Cookies.remove('token');
  router.replace({ path: '/login' });
};
//更换主题
// const defaultTheme = ref('#405DFF')

onMounted(() => {
  switchTheme();
});
</script>
<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
}

.header {
  height: 60px;
  background-color: #09f;
  font-size: 24px;
  line-height: 60px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
}

.main {
  display: flex;
  height: calc(100% - 60px);

  .main_left {
    width: 280px;
    height: 100%;

    .el-menu {
      height: 100%;
    }
  }

  .main_content {
    flex: 1;

    .breadcrumbBox {
      height: 40px;
      border-bottom: 1px solid #ccc;
      padding-left: 15px;

      .el-breadcrumb {
        line-height: 40px;
      }
    }

    .content_bd {
      margin: 15px;
    }
  }
}

.header-right {
  list-style: none;
  // width: 310px;
}

.header-right li {
  height: 40px;
  margin-left: 10px;
  float: left;
  margin-top: 8px;
  //  line-height: 70px;
}

// .bigHome {
//   color: #fff;
//   padding-top: 21px;
// }

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.theme-all1 {
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>
