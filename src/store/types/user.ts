export const GET_USER = 'GET_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const REMOVE_USER = 'REMOVE_USER';

interface Profile {
	id: number;
	user?: number;
	bio: string;
	liked_categories: User[];
};

export interface User {
	id: number;
	username: string;
	profile?: Profile;
	password?: string;
	last_login?: Date;
	is_superuser?: boolean;
	first_name?: string;
	last_name?: string;
	email?: string;
	is_staff?: boolean;
	is_active?: boolean;
	date_joined?: Date;
	groups?: string[];
	user_permissions?: string[];
};


// initial state
export type UserState = {
  user: User | null;
};


// actions
interface GetUserAction {
  type: typeof GET_USER;
  payload: User;
};

interface CreateUserAction {
	type: typeof CREATE_USER;
	payload: User;
};

interface UpdateUserAction {
	type: typeof UPDATE_USER;
	payload: User;
};

interface RemoveUserAction {
	type: typeof REMOVE_USER;
};

export type UserActionTypes = GetUserAction | CreateUserAction | UpdateUserAction | RemoveUserAction;
