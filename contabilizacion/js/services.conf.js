/**
 * Established all roots to consult any service and define default message's modals.
 * @returns {string} Root path
 */
var SCONFIG = (function() {
    var SROOT_PATH = window.location.origin.indexOf("localhost:3000") !=-1? 'http://127.0.0.1:3004/':'/mgbf_mult_web_fundacionbancomerextranetwebfront_01/';
    var services = {
        'GET_STATES': 'list/state',
        'GET_MUNICIPALITY': 'list/municipality',
        'TERMINATE_SESSION': 'terminate/session',
        'LIST_CATALOGS': 'catalogs/{{catalog}}'
    };
    return {
        get: function(rest) {
            var urlResponse = SROOT_PATH + services[rest.service];
            return  rest.hasUrlParam? Mustache.render(urlResponse, rest.urlParam) : urlResponse;
        }
    };
})();

