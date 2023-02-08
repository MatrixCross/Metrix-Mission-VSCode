<template>
    <div
        class="w-screen h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 absolute left-0 top-0 flex justify-center items-center"
    >
        <n-card class="w-300px sm:w-360px" embedded :bordered="true">
            <template #header>
                <i-line-md:coffee-loop
                    class="w-30px h-30px bg-black text-white rounded-full p-5px box-border"
                />
            </template>
            <template #header-extra>
                <n-gradient-text
                    :size="80"
                    :gradient="{
                        deg: 270,
                        from: 'rgb(192, 132, 252)',
                        to: 'rgb(239, 68, 68)',
                    }"
                >
                    Metu
                </n-gradient-text>
            </template>
            <template #default>
                <n-gradient-text
                    class="pb-5px"
                    :size="30"
                    :gradient="{
                        deg: 270,
                        from: 'rgb(236, 72, 153)',
                        to: 'rgb(239, 68, 68)',
                    }"
                >
                    {{ activeModule.label }}
                </n-gradient-text>

                <component
                    :is="activeModule.component"
                    @activeChange="activeChange"
                />
            </template>
        </n-card>
    </div>
</template>

<script lang="ts" setup>
import type { Component, Ref } from 'vue';
import { EnumLoginModule } from '../../enum';
import PwdLogin from './pwdLogin.vue';
import Register from './register.vue';

interface LoginModule {
    key: EnumType.LoginModuleKey;
    label: EnumLoginModule;
    component: Component;
}

let activeKey: Ref<EnumType.LoginModuleKey> = ref('pwd-login');

const modules: LoginModule[] = [
    {
        key: 'pwd-login',
        label: EnumLoginModule['pwd-login'],
        component: PwdLogin,
    },
    {
        key: 'register',
        label: EnumLoginModule['register'],
        component: Register,
    },
];

const activeModule = computed(() => {
    // 默认使用账密登录
    const active: LoginModule = { ...modules[0] };
    const findItem = modules.find((item) => item.key === activeKey.value);
    if (findItem) {
        Object.assign(active, findItem);
    }
    return active;
});

function activeChange(key: EnumType.LoginModuleKey) {
    activeKey.value = key;
}
</script>
