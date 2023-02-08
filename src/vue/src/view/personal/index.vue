<template>
    <div class="p-20px">
        <n-descriptions label-placement="left" title="个人信息">
            <n-descriptions-item>
                <template #label> 用户名 </template>
                {{ info.username }}
            </n-descriptions-item>
            <n-descriptions-item label="邮箱">
                {{ info.email }}
            </n-descriptions-item>
            <n-descriptions-item label="电话">
                {{ info.phone }}
            </n-descriptions-item>
        </n-descriptions>
    </div>
</template>

<script lang="ts" setup>
const info = JSON.parse(
    localStorage.getItem('info') ||
        '{"email":"","phone":"","roleIds":"","userId":0,"username":"未登录"}',
);
</script>
