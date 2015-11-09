/**
* @class Ajax
* @classdesc ajax helper module IE7+
* ajax helper module IE7+
* @global
*/
class Ajax {
    /**
     * @constructor
     */
    constructor() {}

    _xhr() {
        try {
            return new XMLHttpRequest();
            }catch (e){}try {
            return new ActiveXObject('Msxml3.XMLHTTP');
            }catch (e){}try {
            return new ActiveXObject('Msxml2.XMLHTTP.6.0');
            }catch (e){}try {
            return new ActiveXObject('Msxml2.XMLHTTP.3.0');
            }catch (e){}try {
            return new ActiveXObject('Msxml2.XMLHTTP');
            }catch (e){}try {
            return new ActiveXObject('Microsoft.XMLHTTP');
            }catch (e){}return null;
    };

    _sendRequest(url, success, fail, progress, postData) {
        var xhr = _xhr();
        if (!xhr) {
            return false;
        }

        var hashitem = (url.indexOf('#')!==-1) ? url.split('#')[1] : null;
        if (hashitem) {
            url = url.split('#')[0];
        }

        var method = (postData) ? 'POST' : 'GET';
        xhr.open(method, url, true);

        if (postData) {
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        }

        if (!args){
            args = url;
        }
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 304) {
                    if (success) {
                        if (xhr.responseURL) { 
                            url = xhr.responseURL;
                        }
                        success(xhr.responseText, url, args, hashitem);
                    }
                } else {
                    if (fail) {
                        fail(xhr);
                    }
                }   
            }
        };

        xhr.onprogress = progress;

        xhr.send(postData);
    }

    /**
     * GET request for returning ajax data
     * @memberOf Ajax
     * @param {string} url Connection url
     * @param {function} success Success callback
     * @param {function} fail Failure callback
     * @param {function} progress onProgress callback
     */
    get(url, success, fail, progress) { 
        _sendRequest(url, success, fail, progress)
    }
    /**
     * POST request for returning ajax data
     * @memberOf Ajax
     * @param {string} url Connection url
     * @param {function} success Success callback
     * @param {function} fail Failure callback
     * @param {function} progress onProgress callback
     * @param {Object} postData form post data
     */
    post(url, success, fail, progress, postData) { 
        _sendRequest(url, success, fail, progress, postData);
    }
}
export { Ajax };
