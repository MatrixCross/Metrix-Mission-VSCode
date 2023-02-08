<template>
    <n-form :model="formValue">
        <n-form-item label="账号" path="username">
            <n-input v-model:value="formValue.username" clearable />
        </n-form-item>
        <n-form-item label="密码" path="password">
            <n-input v-model:value="formValue.password" clearable />
        </n-form-item>
        <n-form-item label="电子邮箱" path="email">
            <n-input v-model:value="formValue.email" clearable />
        </n-form-item>
        <n-form-item label="电话号码" path="phone">
            <n-input v-model:value="formValue.phone" clearable />
        </n-form-item>
    </n-form>
    <n-button
        color="rgb(192, 132, 252)"
        :circle="true"
        class="w-full h-10px mt-5px"
        @click="goToPwdLogin"
    >
        已有账号，马上登录
    </n-button>
    <n-button
        color="rgb(192, 132, 252)"
        :circle="true"
        class="w-full h-10px mt-5px"
        @click="submit"
    >
        注册
    </n-button>
</template>

<script lang="ts" setup>
import { Login, Register, GetInfo } from '../../api/user';

const router = useRouter();
const notification = useNotification();

let formValue = ref({
    username: '',
    password: '',
    email: '',
    phone: '',
});

async function submit() {
    const res = await Register(
        formValue.value.username,
        formValue.value.password,
        formValue.value.email,
        formValue.value.phone,
    );

    if (res.isSuccess) {
        const loginRes = await Login(
            formValue.value.username,
            formValue.value.password,
        );
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
}

const emit = defineEmits(['activeChange']);

function goToPwdLogin() {
    emit('activeChange', 'pwd-login');
}
</script>
