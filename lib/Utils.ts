/* eslint-disable @typescript-eslint/no-explicit-any */
export type Hash = {
  [k: string]: any;
}

export class Utils {
  /**
   * Extract url params from a path string with param symbols.
   */
  private static extractUrlParams = (path: string): string[] => {
    const params = path.match(/\{\w+\}/g)
    if (!params) {
      return []
    }

    return params.map((param) => param.replace(/[{}]/g, ''))
  }
}
