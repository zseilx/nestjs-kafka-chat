import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * OAuth2 제공자 인스턴스를 생성하고 관리하는 팩토리 클래스
 *
 * @description
 * 다양한 OAuth2 제공자(Google, Kakao 등)의 인스턴스를 생성하고 관리합니다.
 * 각 제공자별로 필요한 설정과 인스턴스를 캡슐화하여 제공합니다.
 */
@Injectable()
export class Oauth2Factory {
  private readonly providers: Map<Oauth2Provider, Oauth2> = new Map();

  constructor(private readonly configService: ConfigService) {
    const providerClasses = {
      [Oauth2Provider.GOOGLE]: GoogleOauth2,
      [Oauth2Provider.KAKAO]: KakaoOauth2,
    };

    Object.entries(providerClasses).forEach(([provider, ProviderClass]) => {
      this.providers.set(provider as Oauth2Provider, new ProviderClass(this.configService));
    });
  }

  /**
   * 지정된 OAuth2 제공자의 인스턴스를 반환합니다.
   *
   * @param provider - OAuth2 제공자 타입 (예: GOOGLE, KAKAO)
   * @returns 해당 제공자의 OAuth2 인스턴스
   * @throws {BadRequestException} 지원하지 않는 제공자가 요청된 경우
   */
  getProvider(provider: Oauth2Provider): Oauth2 {
    const instance = this.providers.get(provider);
    if (!instance) {
      throw new BadRequestException(`Unsupported provider: ${provider}`);
    }
    return instance;
  }
}

/**
 * 지원되는 OAuth2 제공자 목록
 */
export enum Oauth2Provider {
  GOOGLE = 'google',
  KAKAO = 'kakao',
  // NAVER = 'naver', // TODO: v0.2.0 추가 예정
  // APPLE = 'apple', // TODO: v0.2.0 추가 예정
}

/**
 * OAuth2 제공자로부터 받아오는 사용자 정보 인터페이스
 */
interface UserInfo {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

/**
 * OAuth2 제공자의 기본 구현을 위한 추상 클래스
 *
 * @description
 * 모든 OAuth2 제공자가 공통적으로 구현해야 하는 메서드와 속성을 정의합니다.
 */
abstract class Oauth2 {
  protected readonly provider: Oauth2Provider;
  protected readonly clientId: string;
  protected readonly clientSecret: string;
  protected readonly userInfoEndpoint: string;
  protected readonly scope: string;

  constructor(private readonly configService: ConfigService) {
    const config = this.getConfigValues();

    this.clientId = this.configService.get<string>(config.clientIdEnv, '');
    this.clientSecret = this.configService.get<string>(config.clientSecretEnv, '');
    this.userInfoEndpoint = this.configService.get<string>(config.userInfoUrlEnv, '');
    this.scope = this.configService.get<string>(config.scopeEnv, '');
  }

  /**
   * OAuth2 제공자별 설정값을 반환합니다.
   */
  abstract getConfigValues(): {
    clientIdEnv: string;
    clientSecretEnv: string;
    userInfoUrlEnv: string;
    scopeEnv: string;
  };

  /**
   * 액세스 토큰의 유효성을 검증합니다.
   * @param accessToken - 검증할 액세스 토큰
   * @returns accessToken의 sub값 (ProviderId)
   * @throws {UnauthorizedException} 토큰 검증에 실패할 경우
   */
  abstract verifyToken(accessToken: string): Promise<string>;

  /**
   * 액세스 토큰을 사용하여 사용자 정보를 조회합니다.
   * @param accessToken - 사용자 정보 조회에 사용할 액세스 토큰
   */
  abstract getUserInfo(accessToken: string): Promise<UserInfo>;
}

/**
 * Google OAuth2 제공자 구현 클래스
 */
class GoogleOauth2 extends Oauth2 {
  protected provider: Oauth2Provider = Oauth2Provider.GOOGLE;
  constructor(configService: ConfigService) {
    super(configService);
  }

  getConfigValues(): {
    clientIdEnv: string;
    clientSecretEnv: string;
    userInfoUrlEnv: string;
    scopeEnv: string;
  } {
    return {
      clientIdEnv: 'OAUTH_GOOGLE_CLIENT_ID',
      clientSecretEnv: 'OAUTH_GOOGLE_CLIENT_SECRET',
      userInfoUrlEnv: 'OAUTH_GOOGLE_USERINFO_URL',
      scopeEnv: 'OAUTH_GOOGLE_SCOPE',
    };
  }

  async verifyToken(accessToken: string): Promise<string> {
    // TODO: Implement token verification
    console.log('verifyToken', accessToken);
    return 'test';
  }
  async getUserInfo(accessToken: string): Promise<UserInfo> {
    // TODO: Implement user info retrieval
    console.log('getUserInfo', accessToken);
    return {
      id: 'test',
      name: 'test',
      email: 'test',
      profileImage: 'test',
    };
  }
}

/**
 * Kakao OAuth2 제공자 구현 클래스
 */
class KakaoOauth2 extends Oauth2 {
  protected provider: Oauth2Provider = Oauth2Provider.KAKAO;
  constructor(configService: ConfigService) {
    super(configService);
  }

  getConfigValues(): {
    clientIdEnv: string;
    clientSecretEnv: string;
    userInfoUrlEnv: string;
    scopeEnv: string;
  } {
    return {
      clientIdEnv: 'OAUTH_KAKAO_CLIENT_ID',
      clientSecretEnv: 'OAUTH_KAKAO_CLIENT_SECRET',
      userInfoUrlEnv: 'OAUTH_KAKAO_USERINFO_URL',
      scopeEnv: 'OAUTH_KAKAO_SCOPE',
    };
  }

  verifyToken(accessToken: string): Promise<string> {
    console.log('verifyToken', accessToken);
    throw new Error('Method not implemented.');
  }

  async getUserInfo(accessToken: string): Promise<UserInfo> {
    console.log('getUserInfo', accessToken);
    throw new Error('Method not implemented.');
  }
}
