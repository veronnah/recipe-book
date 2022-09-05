export class User {
  constructor(
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    public gender?: string,
    public id?: string,
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
