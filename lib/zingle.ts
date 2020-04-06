// defaults
const DEFAULT = {
  USERNAME: '',
  PASSWORD: '',
  HOST: 'api.zingle.me',
  PORT: '443',
  BASE_PATH: '/v1/',
  SERVICE_ID: ''
}

// Zingle instance config object
export interface ZingleConfig {
  username: string;
  password: string;
  host?: string;
  port?: string;
  basePath?: string;
  defaultServiceId?: string;
}

// Zingle instance config enum
export const ZingleConfigEnum: string[] = ['username', 'password', 'host', 'port', 'basePath', 'defaultServiceId']

/**
 * Main Zingle API entrypoint for app. Configure connection settings and
 * override defaults when creating a new instance.
 *
 * @param config.username {string}: Zingle username
 * @param config.password {string}: Zingle password
 * @param config.host {string}: Zingle API URL
 * @param config.port {string}: port to connect to Zingle API
 * @param config.basePath {string}: base path on top of host URL
 * @param config.defaultServiceId {string}: service id from which to interact with when non is specified
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
      defaultServiceId: DEFAULT.SERVICE_ID,
      ...config
    }

    return cleanConfig
  }

  /**
   * Adds and instantiates all resources onto Zingle object
   */
  private instantiateResources (): void {
    //
  }
}
