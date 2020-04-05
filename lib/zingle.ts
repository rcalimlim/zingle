// defaults
const DEFAULT = {
  USERNAME: '',
  PASSWORD: '',
  HOST: 'api.zingle.me',
  PORT: '443',
  BASE_PATH: '/v1/'
}

// Zingle instance config object
export interface ZingleConfig {
  username: string;
  password: string;
  host?: string;
  port?: string;
  basePath?: string;
}

// Zingle instance config enum
export const ZingleConfigEnum: string[] = ['username', 'password', 'host', 'port', 'basePath']

/**
 * Main Zingle API entrypoint for app. Configure connection settings and
 * override defaults when creating a new instance.
 *
 * @constructor
 *
 */
export class Zingle {
  constructor (config: ZingleConfig) {
    this.settings = this.validateConfig(config)
  }

  // zingle instance settings
  private settings: ZingleConfig

  /**
   * Validates supplied config object by throwing an error when passed an
   * invalid config.
   *
   * @param config {object}: config options for this Zingle instance
   */
  private validateConfig (config: ZingleConfig): ZingleConfig {
    // throw immediately if config is missing or not an object
    const isObject = typeof config === 'object' && !Array.isArray(config)
    if (!config || !isObject) {
      throw new Error('Config must be an object.')
    }

    // check for missing username and/or password
    if (!config.username || !config.password) {
      throw new Error('Zingle username and password must be supplied.')
    }

    // check config options against allowed ones
    const badOptions = Object.keys(config).filter((key: string) => {
      return !ZingleConfigEnum.includes(key)
    })
    if (badOptions.length > 0) {
      throw new Error(`Config must only have these options: ${ZingleConfigEnum.join(', ')}.`)
    }

    // check values are strings
    const badValues = Object.values(config).filter((key: string) => {
      return typeof key !== 'string'
    })
    if (badValues.length > 0) {
      throw new Error('Config may only have string values.')
    }

    const cleanConfig = {
      username: DEFAULT.USERNAME,
      password: DEFAULT.PASSWORD,
      host: DEFAULT.HOST,
      port: DEFAULT.PORT,
      basePath: DEFAULT.BASE_PATH,
      ...config
    }

    return cleanConfig
  }
}
