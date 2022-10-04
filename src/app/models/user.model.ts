export class User {
  constructor(
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    public id?: string,
    public gender?: string,
    public password?: string,
  ) {
  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }

  get tokenExpirationDate() {
    return this._tokenExpirationDate;
  }
}

export interface UserDetails {
  email: string;
  gender?: string;
  userName?: string;
}
