<template>
    <n-form>
        <n-form-item label="任务名称">
            <n-input v-model:value="formValue.missionname" clearable />
        </n-form-item>
        <n-form-item label="最后期限">
            <n-date-picker v-model:value="formValue.deadline" type="datetime" />
        </n-form-item>
        <n-form-item label="任务详情">
            <n-input
                v-model:value="formValue.detail"
                placeholder="Textarea"
                type="textarea"
                :autosize="{
                    minRows: 3,
                    maxRows: 5,
                }"
            />
        </n-form-item>
    </n-form>
    <div class="w-full flex justify-center items-center">
        <n-button :circle="true" class="w-50% h-10px mt-5px" @click="submit">
            提交
        </n-button>
    </div>
</template>

<script lang="ts" setup>
import { CreateMission } from '../../api/mission';

const notification = useNotification();
const router = useRouter();

const formValue = ref({
    missionname: '',
    deadline: null,
    detail: '',
});

async function submit() {
    const res = await CreateMission(
        formValue.value.missionname,
        formValue.value.deadline || '',
    );
    if (res.isSuccess) {
        notification['success']({
            content: '创建成功',
            meta: '任务创建',
            duration: 2500,
            keepAliveOnHover: true,
        });
        formValue.value = {
            missionname: '',
            deadline: null,
            detail: '',
        };
    }
}
</script>
