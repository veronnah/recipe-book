export class SignupResponse {
  constructor(
    public email: string,
    public expiresIn: string,
    public idToken: string,
    public kind: string,
    public localId: string,
    public refreshToken: string,
  ) {
  }
}
