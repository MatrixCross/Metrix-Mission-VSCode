<template>
    <n-empty
        description="当前没有任何成功部署的任务"
        v-if="missionList.length === 0"
    >
        <template #extra> </template>
    </n-empty>
    <div v-else class="w-full h-full flex justify-around">
        <n-card
            class="max-w-100px relative"
            v-for="item in missionList"
            :key="item.id"
        >
            <template #header>
                <div class="flex justify-between">
                    <span>{{ item.name }}</span>
                    <n-countdown
                        :render="renderCountdown"
                        class="absolute right-0"
                        :duration="getS(item.dealline)"
                        :active="true"
                    />
                </div>
            </template>

            <n-empty description="不知道是什么情况" v-if="!item.detail">
                <template #extra> </template>
            </n-empty>
            <p v-else>{{ item.detail }}</p>
        </n-card>
    </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';
import { QueryMission } from '../../api/mission';
import router from '../../router';

const missionList: Ref<Array<Mission>> = ref([]);

const info = JSON.parse(
    localStorage.getItem('info') ||
        '{"email":"","phone":"","roleIds":"","userId":0,"username":"未登录"}',
);

onBeforeMount(async () => {
    const res = await QueryMission(info.userId);
    missionList.value = res.data.list;
});

function goToAdd() {
    router.push('addMission');
}

function getS(time: string) {
    var nowTime = +new Date();
    var inputTime = +new Date(time);
    // 得到秒数
    var remain = inputTime - nowTime;

    return remain;
}

function renderCountdown(e: {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}) {
    console.log(e);
    // 计算天数
    const day = Math.floor(e.hours / 24);
    const hourLast = e.hours % 24;
    return `${day}天${hourLast}:${e.minutes}:${e.seconds}`;
}
</script>
