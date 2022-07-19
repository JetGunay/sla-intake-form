import { HTTP } from "./http";

export const mixin = {
    //GET
    async getGroupMembers(groupId) {
        try {
            const r = await HTTP.get(`groups/${groupId}`);
            return r.data.data;
        } catch (e) {
            console.error(e);
        }
    },
    async getUsers(userIds) {
        try {
            const r = await HTTP.get(`contacts/${userIds}`);
            return r.data.data;
        } catch (e) {
            console.error(e);
        }
    },
    //POST
    async addFolder(folderId, data) {
        try {
            const r = await HTTP.post(`folders/${folderId}/folders`, data);
            return r.data.data;
        } catch (e) {
            console.error(e);
        }
    },
    async addTaskToProject(projectId, data) {
        try {
            const r = await HTTP.post(`folders/${projectId}/tasks`, data);
            return r.data.data;
        } catch (e) {
            console.error(e);
        }
    },
    //PUT
    async updateProject(projectId, data) {
        try {
            const r = await HTTP.put(`folders/${projectId}`, data);
            return r.data.data;
        } catch (e) {
            console.error(e);
        }
    },
};
