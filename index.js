/**
 * @fileoverview NotLocalStorage (NLS) client library for handling remote data storage operations.
 * @requires jquery
 */
import $ from 'jquery';

/**
 * @namespace nls
 * @description NotLocalStorage client library namespace containing all operations and configurations
 */
let nls={};

/**
 * @memberof nls
 * @type {string}
 * @description Base endpoint URL for the NotLocalStorage API
 */
nls.endpoint='https://stg001.notlocalstorage.io/api/data/';

/**
 * @memberof nls
 * @type {string}
 * @description API key for authentication
 */
nls.API_KEY="";

/**
 * @memberof nls
 * @type {string}
 * @description Application key for identifying the app instance
 */
nls.APP_KEY="";

/**
 * @memberof nls
 * @function load
 * @description Retrieves data from NotLocalStorage using the provided index key
 * @param {string} index_key - The unique identifier for the data
 * @param {function(NLSResponse): void} $success - Callback function executed on successful data retrieval
 * @param {function(JQueryXHR, string, string): void} $fail - Callback function executed on failed data retrieval
 * @example
 * nls.load('user-preferences', 
 *   (data) => console.log('Data loaded:', data),
 *   (xhr, status, error) => console.error('Load failed:', status)
 * );
 */
nls.load=function(index_key, $success, $fail){
    $.ajax(nls.endpoint+"get/"+nls.API_KEY+"/"+nls.APP_KEY+"/"+index_key, {
        method: "get",
        success: function(data){
            $success(data);
        },
        error: function (jqXHR, textStatus, errorThrown){
            $fail(jqXHR, textStatus, errorThrown);
        }
    });
}

/**
 * @memberof nls
 * @function save
 * @description Stores data in NotLocalStorage using the provided index key
 * @param {string} index_key - The unique identifier for the data
 * @param {*} $data - The data to be stored
 * @param {function(NLSResponse): void} $success - Callback function executed on successful data storage
 * @param {function(JQueryXHR, string, string): void} $fail - Callback function executed on failed data storage
 * @example
 * nls.save('user-preferences',
 *   { theme: 'dark', language: 'en' },
 *   (data) => console.log('Data saved:', data),
 *   (xhr, status, error) => console.error('Save failed:', status)
 * );
 */
nls.save=function(index_key, $data, $success, $fail){
    $.ajax(nls.endpoint+"store/"+nls.API_KEY+"/"+nls.APP_KEY+"/"+index_key, {
        method: "post",
        data: $data,
        success: function(data){
            $success(data);
        },
        error: function (jqXHR, textStatus, errorThrown){
            $fail(jqXHR, textStatus, errorThrown);
        }
    });
}

/**
 * @memberof nls
 * @function init
 * @description Initializes the NotLocalStorage client with API and application keys
 * @param {?string} api_key - The API key for authentication. If null, uses process.env.NLS_API_KEY
 * @param {?string} app_key - The application key. If null, uses process.env.NLS_APP_KEY
 * @throws {Error} Will throw an error if environment variables are not set when using null parameters
 * @example
 * // Initialize with explicit keys
 * nls.init('your-api-key', 'your-app-key');
 * 
 * // Initialize using environment variables
 * nls.init();
 */
nls.init=function(api_key=null, app_key=null){
    nls.API_KEY=(api_key===null)?process.env.NLS_API_KEY:api_key;
    nls.APP_KEY=(app_key===null)?process.env.NLS_APP_KEY:app_key;
}

export default nls;