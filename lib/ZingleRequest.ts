import axios, { AxiosResponse } from 'axios'

// Request namespace
const ZingleRequest = {
  // send axios request
  makeRequest: async (resource, requestArgs, spec, overrides): Promise<AxiosResponse> => {
    /**
     * first args could be
     *  - string representing resource id for retrieval/update/deletion
     *  - hash representing body data
     *  - hash representing query data
     *
     * second to last arg could be per request options:
     *  - hash with request opts
     */
  }
}

export default ZingleRequest
