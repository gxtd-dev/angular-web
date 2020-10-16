import { Injectable } from '@angular/core';
import { LocalStoreService } from '../services/local-store.service';
import { IApplicationUser, createNewApplicationUser } from './application-user.model';

const STORAGE_KEY = 'sm_';
const TOKEN_KEY = 'sm_token';
const LOGIN_KEY = 'sm_login';

@Injectable()
export class ApplicationUserService {
    private _userToken: string;
    private _login: string;
    private _userSetting: IApplicationUser;
    constructor(private store: LocalStoreService) { }

    getUserSetting(): IApplicationUser {
        return this._userSetting;
    }

    loadUserSetting(username: string) {
        const setting = this.store.getItem(this._getKey(username));
        if (!!setting) {
            this._userSetting = setting;
        } else {
            this._userSetting = createNewApplicationUser(username);
        }
    }

    saveUserSetting(setting) {
        if (this._userSetting) {
            const username = this._userSetting.username;
            this._userSetting = {
                ...this._userSetting,
                ...setting,
                username
            };
            this.store.setItem(this._getKey(username), this._userSetting);
        }
    }

    setToken(token: string) {
        this.store.setItem(TOKEN_KEY, token);
        this._userToken = token;
    }

    getToken(): string {
        return this._userToken ? this._userToken : this.store.getItem(TOKEN_KEY);
    }

    setLogin(login: string) {
        this.store.setItem(LOGIN_KEY, login);
        this._login = login;
    }

    getLogin(): string {
        return this._login ? this._login : this.store.getItem(LOGIN_KEY);
    }

    clearSession() {
        this._userSetting = null;
        this._userToken = null;
        this._login = null;
        this.store.setItem(TOKEN_KEY, null);
        this.store.setItem(LOGIN_KEY, null);
    }

    private _getKey(username: string): string {
        return `${STORAGE_KEY}_${username}`;
    }
}
