import { DefaultSeoProps } from 'next-seo'

const CURRENT_NODE_ENV = process.env.NODE_ENV || 'development'

interface AppConfiguration {
  IS_PROD: boolean
  API_URL: string
  SEO: DefaultSeoProps
}

const environments = {
  test: {},
  development: {},
  production: {
    IS_PROD: true,
    API_URL: 'https://taurus.alfon.io',
  },
}

export default Object.freeze<AppConfiguration>({
  IS_PROD: false,
  API_URL: 'http://127.0.0.1:3001',
  SEO: {
    title: 'Demo',
    titleTemplate: '%s - Taurus',
  },
  ...environments[CURRENT_NODE_ENV],
})
