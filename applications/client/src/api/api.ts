/* tslint:disable */
/* eslint-disable */
/**
 * Estates API
 * API for estates
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface Estate
 */
export interface Estate {
    /**
     * 
     * @type {number}
     * @memberof Estate
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof Estate
     */
    'address'?: string;
    /**
     * 
     * @type {string}
     * @memberof Estate
     */
    'city'?: string;
    /**
     * 
     * @type {string}
     * @memberof Estate
     */
    'type'?: string;
    /**
     * 
     * @type {number}
     * @memberof Estate
     */
    'price'?: number;
    /**
     * 
     * @type {string}
     * @memberof Estate
     */
    'currency'?: string;
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Returns a list of estates with optional query parameters for filtering.
         * @summary Retrieve a list of estates
         * @param {string} [city] Filter estates by city
         * @param {string} [type] Filter estates by type (e.g., apartment, house)
         * @param {string} [search] Search estates by a keyword (e.g., part of the address or city name)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEstates: async (city?: string, type?: string, search?: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/estates`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (city !== undefined) {
                localVarQueryParameter['city'] = city;
            }

            if (type !== undefined) {
                localVarQueryParameter['type'] = type;
            }

            if (search !== undefined) {
                localVarQueryParameter['search'] = search;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * Returns a list of estates with optional query parameters for filtering.
         * @summary Retrieve a list of estates
         * @param {string} [city] Filter estates by city
         * @param {string} [type] Filter estates by type (e.g., apartment, house)
         * @param {string} [search] Search estates by a keyword (e.g., part of the address or city name)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getEstates(city?: string, type?: string, search?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Estate>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getEstates(city, type, search, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.getEstates']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * Returns a list of estates with optional query parameters for filtering.
         * @summary Retrieve a list of estates
         * @param {string} [city] Filter estates by city
         * @param {string} [type] Filter estates by type (e.g., apartment, house)
         * @param {string} [search] Search estates by a keyword (e.g., part of the address or city name)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEstates(city?: string, type?: string, search?: string, options?: RawAxiosRequestConfig): AxiosPromise<Array<Estate>> {
            return localVarFp.getEstates(city, type, search, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * Returns a list of estates with optional query parameters for filtering.
     * @summary Retrieve a list of estates
     * @param {string} [city] Filter estates by city
     * @param {string} [type] Filter estates by type (e.g., apartment, house)
     * @param {string} [search] Search estates by a keyword (e.g., part of the address or city name)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getEstates(city?: string, type?: string, search?: string, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).getEstates(city, type, search, options).then((request) => request(this.axios, this.basePath));
    }
}



