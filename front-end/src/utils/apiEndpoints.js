const HOST = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const REGISTER_API = `${HOST}/auth/register`;
export const LOGIN_API = `${HOST}/auth/login`;
export const LOGOUT_API = `${HOST}/auth/logout`;

export const GET_USER_API = `${HOST}/app/users/user-data`;
export const UPDATE_PASSWORD_API = `${HOST}/app/users/update-password`;
export const ADD_TASK_API = `${HOST}/app/users/create-task`;
export const GET_TASKS_API = `${HOST}/app/users/tasks`;
export const UPDATE_TASK_API = `${HOST}/app/users/update-task`;
export const DELETE_TASK_API = `${HOST}/app/users/delete-task`;

export const GET_ALL_USERS_API = `${HOST}/app/admin/get-users`;
export const DELETE_USER_API = `${HOST}/app/admin/delete-user`;
export const UPDATE_USER_API = `${HOST}/app/admin/update-user`;