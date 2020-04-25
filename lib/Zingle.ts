/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios'
import Resources from './Resources'
import Utils from './Utils'
import path = require('path')

export const ZINGLE_DEFAULTS = {
  maxNetworkRetries: 0,
  timeout: 80000,
  host: 'https://api.zingle.me',
  port: 443,
  basePath: 'v1',
  serviceId: null
}

/**
 * Main object that contains configuration settings and has access to Zingle resources.
 *
 * @param {string} config.username - Zingle username
 * @param {string} config.password - Zingle password
 * @param {string} [config.apiVersion='v1'] - API version string
 * @param {int} [config.maxNetworkRetries=0] - number of times to retry a failed network request
 * @param {int} [config.timeout=80000] - milliseconds to wait before timing out a network req
 * @param {string} [config.host='api.zingle.me'] - api host URL
 * @param {int} [config.port=443] - api host port
 * @param {string} [config.basePath='v1'] - api base url
 * @param {string} [config.serviceId=null] - default all requests to be for a specific
 *  Zingle service, otherwise requests will be made for resources from across all services
 */
export default class Zingle {
  constructor (config: ZingleParams) {
    // username and password are required
    if (!config || !config.username || !config.password) {
      throw new Error('Zingle: Config must be an object containing a username and password')
    }

    this._username = config.username
    this._password = config.password
    this._maxNetworkRetries = config.maxNetworkRetries || ZINGLE_DEFAULTS.maxNetworkRetries
    this._timeout = config.timeout || ZINGLE_DEFAULTS.timeout || 80000
    this._host = config.host || ZINGLE_DEFAULTS.host
    this._port = config.port || ZINGLE_DEFAULTS.port
    this._basePath = config.basePath || ZINGLE_DEFAULTS.basePath
    this._serviceId = config.serviceId || ZINGLE_DEFAULTS.serviceId

    // attach all resources
    this.attachResources()
  }

  private _username: string
  private _password: string
  private _maxNetworkRetries: number
  private _timeout: number
  private _host: string
  private _port: number
  private _basePath: string
  private _serviceId: string|null

  private attachResources (): void {
    for (const name in Resources) {
      (this as Record<string, any>)[Utils.pascalToCamelCase(name)] = new Resources[name](this)
    }
  }

  public defaultRequestInstance (): AxiosInstance {
    const hasDefaultServiceId = !!this._serviceId
    const baseURL = path.join(
      this._host,
      this._basePath,
      hasDefaultServiceId
        ? `/services/${this._serviceId}`
        : ''
    )
    const configuredInstance = axios.create({
      baseURL,
      timeout: this._timeout,
      auth: {
        username: this._username,
        password: this._password
      }
    })

    // TODO: add response interceptor

    return configuredInstance
  }

  // maxNetworkRetries get/set
  public get maxNetworkRetries (): number {
    return this._maxNetworkRetries
  }

  public set maxNetworkRetries (retries) {
    if (typeof retries !== 'number') {
      throw new Error(`Zingle: must specify number for maxNetworkRetries, got ${retries}`)
    }
  }
}

export interface ZingleParams {
  username: string;
  password: string;
  maxNetworkRetries?: number; // 0 (can be overriden per req)
  timeout?: number; // 80000 (can be overriden per req)
  host?: string; // 'api.zingle.me' (can be overriden per req)
  port?: number; // (can be overriden per req)
  basePath?: string; // (can be overriden per req)
  serviceId?: string|null; // null (can be overriden per req)
}

export const OPTIONS_KEYS = ['maxNetworkRetries', 'timeout', 'host', 'port', 'serviceId']
