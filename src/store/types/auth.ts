import { Collection } from './collection';
import { Image } from './image';

export const GET_USER = 'GET_USER';
export const GET_PUBLIC_USER = 'GET_PUBLIC_USER';
export const SET_PUBLIC_USER = 'SET_PUBLIC_USER';
export const SET_USER_IMAGE = 'SET_USER_IMAGE';
export const SET_USER_COUNT = 'SET_USER_COUNT';
export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

interface ProfileImage {
	uuid: Image['uuid'];
	image: Image['image'];
}

interface Profile {
	id: number;
	user?: number;
	bio: string;
	interests: Collection[];
	image: ProfileImage | null;
	location: string;
	following: User[];
	followers: User[];
}

interface ProfilePatch {
	bio?: string;
	image?: string;
	location?: string;
}

export interface UserLogin {
	username: string;
	password: string;
	email?: string;
}

interface UserCounts {
	public: number;
	private: number;
	liked: number;
}

export interface PublicUser {
	id: number;
	username: string;
	profile: Profile;
	date_joined: string;
	counts: UserCounts;
}

export interface User extends PublicUser {
	last_login: string;
	first_name: string;
	last_name: string;
	email: string;
}

export interface UserPatch {
	profile?: ProfilePatch;
	first_name?: string;
	last_name?: string;
	email?: string;
	following_ids?: User['id'][];
	interest_ids?: Collection['id'][];
}

// initial state
export type AuthState = {
	token: string | null;
	isAuthenticated: boolean | null;
	user: User | null;
	publicUser: PublicUser | null;
};

// actions
interface GetUserAction {
	type: typeof GET_USER;
	payload: User;
}

interface GetPublicUserAction {
	type: typeof GET_PUBLIC_USER;
	payload: PublicUser;
}

interface SetPublicUserAction {
	type: typeof SET_PUBLIC_USER;
	payload: PublicUser;
}

interface SetUserImageAction {
	type: typeof SET_USER_IMAGE;
	payload: ProfileImage;
}

interface SetUserCountAction {
	type: typeof SET_USER_COUNT;
	payload: UserCounts;
}

interface LoginUserAction {
	type: typeof LOGIN_USER;
	payload: {
		user: User;
		token: string;
	};
}

interface RegisterUserAction {
	type: typeof REGISTER_USER;
	payload: {
		user: User;
		token: string;
	};
}

interface LogoutUserAction {
	type: typeof LOGOUT_USER;
}

interface UpdateUserAction {
	type: typeof UPDATE_USER;
	payload: User;
}

interface RemoveUserAction {
	type: typeof REMOVE_USER;
}

interface AuthErrorAction {
	type: typeof AUTH_ERROR;
}

export type AuthActionTypes =
	| GetUserAction
	| LoginUserAction
	| RegisterUserAction
	| UpdateUserAction
	| RemoveUserAction
	| LogoutUserAction
	| AuthErrorAction
	| GetPublicUserAction
	| SetPublicUserAction
	| SetUserImageAction
	| SetUserCountAction;
