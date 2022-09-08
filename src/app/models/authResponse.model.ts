export class AuthResponse {
  constructor(
    public email: string,
    public expiresIn: string,
    public idToken: string,
    public localId: string,
    public refreshToken: string,
    public registered?: string,
    public kind?: string,
  ) {
  }
}
