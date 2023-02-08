<template>
    <n-layout has-sider>
        <div class="flex flex-col min-h-screen justify-between">
            <n-layout-header bordered>
                <div class="w-screen flex h-22px justify-between items-center">
                    <div class="flex items-center ml-10px">
                        <img :src="mainIcon" class="w-20px h-20px" />
                        <n-gradient-text
                            class="text-8px"
                            gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
                        >
                            MatrixCross
                        </n-gradient-text>
                    </div>
                    <identity></identity>
                </div>
            </n-layout-header>
            <div class="flex flex-1">
                <n-layout-sider
                    bordered
                    collapse-mode="width"
                    :collapsed-width="2"
                    :width="240"
                    :collapsed="collapsed"
                    show-trigger
                    @collapse="collapsed = true"
                    @expand="collapsed = false"
                >
                    <n-menu
                        v-model:value="activeMenuKey"
                        :collapsed="collapsed"
                        :collapsed-width="64"
                        :collapsed-icon-size="22"
                        :options="menuOptions"
                    />
                </n-layout-sider>
                <n-layout-content>
                    <div class="p-10px">
                        <RouterView></RouterView>
                    </div>
                </n-layout-content>
            </div>

            <n-layout-footer bordered>
                <div class="w-screen h-12px flex justify-center items-center">
                    {{ footer }}
                </div>
            </n-layout-footer>
        </div>
    </n-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MenuOption } from 'naive-ui';
import identity from './identity.vue';
import mainIcon from '../../assets/images/main_icon.png';

const footer = import.meta.env.VITE_APP_FOOTER;
const router = useRouter();

const activeMenuKey = ref<string>('personal');
const collapsed = ref(true);

const menuOptions: MenuOption[] = [
    {
        label: '主页',
        key: 'personal',
    },
    {
        label: '任务',
        key: 'mission',
        children: [
            {
                label: '查询任务',
                key: 'mission',
            },
            {
                label: '新增任务',
                key: 'addMission',
            },
        ],
    },
];

watchEffect(() => {
    router.push(activeMenuKey.value);
});
</script>
