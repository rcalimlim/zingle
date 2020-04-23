const ZINGLE_DEFAULTS = {
  apiVersion: 'v1',
  maxNetworkRetries: 0,
  timeout: 80000,
  host: 'api.zingle.me',
  port: 443,
  defaultServiceId: null
}

/**
 * Main object that contains configuration settings and gives access to
 * Zingle resources.
 * @param {string} config.username - Zingle username
 * @param {string} config.password - Zingle password
 * @param {string} [config.apiVersion='v1'] - API version string
 * @param {int} [config.maxNetworkRetries=0] - number of times to retry a failed network request
 * @param {int} [config.timeout=80000] - milliseconds to wait before timing out a network req
 * @param {string} [config.host='api.zingle.me'] - api host URL
 * @param {int} [config.port=443] - api host port
 * @param {string} [config.defaultServiceId=null] - default all requests to be for a specific
 *  Zingle service, otherwise requests will be made for resources from across all services
 */
export default class Zingle {
  constructor (config: ZingleParams) {
    this._apiVersion = config.apiVersion || ZINGLE_DEFAULTS.apiVersion
    this._maxNetworkRetries = config.maxNetworkRetries || ZINGLE_DEFAULTS.maxNetworkRetries
    this._timeout = config.timeout || ZINGLE_DEFAULTS.timeout || 80000
    this._host = config.host || ZINGLE_DEFAULTS.host
    this._port = config.port || ZINGLE_DEFAULTS.port || ZINGLE_DEFAULTS.port
    this._defaultServiceId = config.defaultServiceId || ZINGLE_DEFAULTS.defaultServiceId
  }

  private _apiVersion: string
  private _maxNetworkRetries: number
  private _timeout: number
  private _host: string
  private _port: number
  private _defaultServiceId: string|null

  // TODO: getters/setters for all zingle settings
  public get apiVersion (): string {
    return this._apiVersion
  }

  public set apiVersion (version: string) {
    const validVersion = /^v[1-9]+$/
    if (validVersion.test(version)) {
      this._apiVersion = version
    } else {
      throw new Error(`Zingle: API version is invalid (${version})`)
    }
  }
}

export interface ZingleParams {
  username: string;
  password: string;
  apiVersion?: string; // 'v1'
  maxNetworkRetries?: number; // 0 (can be overriden per req)
  timeout?: number; // 80000 (can be overriden per req)
  host?: string; // 'api.zingle.me'
  port?: number; // string
  defaultServiceId?: string|null; // null
}
