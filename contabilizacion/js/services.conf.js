/**
 * Established all roots to consult any service and define default message's modals.
 * @returns {string} Root path
 */
var SCONFIG = (function() {
    var SROOT_PATH = window.location.origin.indexOf("localhost:3000") !=-1? 'http://127.0.0.1:3004/':'/mgbf_mult_web_fundacionbancomerextranetwebfront_01/';
    var services = {
        'CONSULT_PARAMETERS': 'consult/parameters',
        'SCHOLAR_DETAIL': 'details/scholar',
        'MODIF_UPLOADSCHOLAR': 'modif/uploadSchoolar',
        'GET_STATES': 'list/state',
        'GET_MUNICIPALITY': 'list/municipality',
        'TERMINATE_SESSION': 'terminate/session',
        'LIST_CATALOGS': 'catalogs/{{catalog}}',
        'UPDATE_HOMEINF': 'updateHomeInformation/{{scholarId}}',
        'GET_HOMEINF': 'getHomeInformation/{{scholarId}}/?programScholarshipId={{programScholarshipId}}',
        'GET_SCHOLARINF': 'getScholarInformation/{{scholarId}}/?programScholarshipId={{programScholarshipId}}',
        'UPDATE_SCHOLARINF': 'updateScholarInformation',
        'UPDATE_LEGAL': 'updateStatusLegalDisclaimer',
        'GET_LEGAL': 'listLegalDisclaimers/?scholarshipProgramId={{scholarshipProgramId}}&scholarId={{scholarId}}&moduleId={{moduleId}}',
        'GET_ANNOUNCEMENT': 'getScholarshipAnnouncement/?registerType={{registerType}}&scholarId={{scholarId}}',
        'UPDATE_ANNOUNCEMENT': 'updateScholarshipAnnouncement',
        'GET_SOCINF': 'getSocioeconomicSummary/{{scholarId}}/?programScholarshipId={{scholarshipProgramId}}',
        'CREATE_SOCINF': 'createRelatedPersons/{{scholarId}}',
        'UPDATE_SOCINF': 'updateRelatedPersons/{{scholarId}}',
        'GET_SCHOOLS': 'listSchools',
        "SEND_NOTIFICATION": 'sendNotification'
    };
    return {
        get: function(rest) {
            var urlResponse = SROOT_PATH + services[rest.service];
            return  rest.hasUrlParam? Mustache.render(urlResponse, rest.urlParam) : urlResponse;
        }
    };
})();