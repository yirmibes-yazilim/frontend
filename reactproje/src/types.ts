export interface UserInfo {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AccessToken {
  accessToken: string;
  accessTokenExpTime: string;
}

export interface RefreshToken {
  refreshToken: string;
  refreshTokenExpTime: string;
}

export interface LoginResponseData {
  userInfo: UserInfo;
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}

export interface LoginResponse {
  data: LoginResponseData;
  statusCode: number;
  isSuccessful: boolean;
  error: string | null;
  message: string;
}

export interface RefreshTokenResponseData {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}

export interface RefreshTokenResponse {
  data: RefreshTokenResponseData;
  statusCode: number;
  isSuccessful: boolean;
  error: string | null;
  message: string;
} 