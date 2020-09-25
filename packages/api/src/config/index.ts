export interface AppConfiguration {
  IS_PROD: boolean
  API_URL: string
  APP_URL: string
  DATABASE_URL: string
  TYPEORM_SYNCHRONIZE: boolean
  GITHUB_CLIENT_ID: string
  GITHUB_CLIENT_SECRET: string
  SESSION_SECRET: string
  HOST: string
  PORT: number
  COOKIE_SESSION_DOMAIN: string | undefined
  COOKIE_SESSION_SECURE: boolean
}

const CURRENT_NODE_ENV = process.env.NODE_ENV || 'development'

const environments: { [node_env: string]: Partial<AppConfiguration> } = {
  test: {},
  development: {},
  production: {
    IS_PROD: true,
    TYPEORM_SYNCHRONIZE: false,
    API_URL: 'https://taurus.alfon.io',
    APP_URL: 'https://taurus-client.alfon.io',
    GITHUB_CLIENT_ID: '0808ca53520d2e896209',
    COOKIE_SESSION_DOMAIN: 'alfon.io',
    COOKIE_SESSION_SECURE: true,
  },
}

export default (): AppConfiguration => ({
  IS_PROD: false,
  API_URL: 'http://127.0.0.1:3001',
  APP_URL: 'http://127.0.0.1:3002',
  SESSION_SECRET: process.env.SESSION_SECRET || 'foo',
  DATABASE_URL:
    process.env.DATABASE_URL || 'postgres://root:root@localhost/taurus',
  TYPEORM_SYNCHRONIZE: true,
  GITHUB_CLIENT_ID: '933257f5fc333bcb9486',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
  HOST: process.env.HOST || '0.0.0.0',
  PORT: Number(process.env.PORT) || 3001,
  COOKIE_SESSION_DOMAIN: undefined,
  COOKIE_SESSION_SECURE: false,
  ...environments[CURRENT_NODE_ENV],
})
