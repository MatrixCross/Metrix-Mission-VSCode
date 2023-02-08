import { baseUrl } from './base';
import { post, get } from '../../utils/request';

const moduleUrl = baseUrl + 'mission/';

export async function CreateMission(missionname: string, deadline: string) {
    let info = {
        userId: 0,
        email: '',
        phone: '',
        username: '',
        roleIds: '',
    };
    if (typeof localStorage.getItem('info') === 'string') {
        info = JSON.parse(localStorage.getItem('info') as string);
    }
    const res = await post<{ id: number }>(moduleUrl + 'create', {
        userId: info.userId,
        missionname: missionname,
        deadline: deadline,
    });

    const mark = {
        isSuccess: res[1] && res[1].code === 0,
    };

    var lastRes = Object.assign({}, mark, res[1]);

    return lastRes;
}

export async function QueryMission(userId: number) {
    const res = await get<{
        list: Array<Mission>;
        page: number;
        size: number;
        total: number;
    }>(moduleUrl + 'queryByUser', {
        userId: userId,
    });

    const mark = {
        isSuccess: res[1] && res[1].code === 0,
    };

    var lastRes = Object.assign({}, mark, res[1]);

    return lastRes;
}

export async function UpdateMission(
    missionId: number,
    missionname: string,
    deadline: string,
) {
    const res = await post<{ id: number }>(moduleUrl + 'update', {
        missionId: missionId,
        missionName: missionname,
        deadline: deadline,
    });

    const mark = {
        isSuccess: res[1] && res[1].code === 0,
    };

    var lastRes = Object.assign({}, mark, res[1]);

    return lastRes;
}

export async function deleteMission(missionId: number) {
    const res = await post<{ id: number }>(moduleUrl + 'delete', {
        missionId: missionId,
    });

    const mark = {
        isSuccess: res[1] && res[1].code === 0,
    };

    var lastRes = Object.assign({}, mark, res[1]);

    return lastRes;
}
