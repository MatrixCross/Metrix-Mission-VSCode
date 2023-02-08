<template>
    <n-form>
        <n-form-item label="账号">
            <n-input v-model:value="username" clearable />
        </n-form-item>
        <n-form-item label="密码">
            <n-input v-model:value="password" clearable />
        </n-form-item>
    </n-form>
    <div class="flex justify-between items-center text-4px">
        <span @click="goToRegister">注册账号</span>
        <span>忘记密码？</span>
    </div>
    <n-button
        color="rgb(192, 132, 252)"
        :circle="true"
        class="w-full h-10px mt-5px"
        @click="submit"
    >
        登录
    </n-button>
</template>

<script lang="ts" setup>
import { Login } from '../../api/user';
let username = ref('');
let password = ref('');

const router = useRouter();
const notification = useNotification();

async function submit() {
    const loginRes = await Login(username.value, password.value);
    if (loginRes.isSuccess) {
        const token = loginRes.data.token;
        const info = loginRes.data.info;
        localStorage.setItem('token', token);
        localStorage.setItem('info', JSON.stringify(info));
        notification['success']({
            content: '登录成功',
            meta: '注册后自动登录',
            duration: 2500,
            keepAliveOnHover: true,
        });
        router.push('/');
    } else {
        notification['error']({
            content: '登录失败',
            meta: '注册后自动登录',
            duration: 2500,
            keepAliveOnHover: true,
        });
        router.push({ path: '/login' });
    }
}

const emit = defineEmits(['activeChange']);

function goToRegister() {
    emit('activeChange', 'register');
}
</script>
