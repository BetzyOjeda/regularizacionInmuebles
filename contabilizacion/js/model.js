/**
 * @file Contains the main dinamic function to execute ajax requests, also contains the success and error result functions for every service
 */

 /**
  * Sync service simulator, it executes services in order
  * @namespace
  * @property {Object[]} LIST_SERVICES.services all services to execute
  * @property {Object[]} LIST_SERVICES.errors if error occurred, is added to this array
  * @property {function} LIST_SERVICES.callback the callback function when all services was executed
  * @property {boolean} LIST_SERVICES.inProgress indicates if the service request has started
  * @property {function} LIST_SERVICES.listRestExec add services to execute
  * @property {function} LIST_SERVICES.verifyServices starts the service requests
  * @property {function} LIST_SERVICES.loopServices loop function to execute each service
  */
 var LIST_SERVICES = {
    services: [],
    errors: [],
    callback: function () {  },
    inProgress: false,
    /**
     *Add a service to execute
     *
     * @param {string} service service alias to execute
     * @param {function} callback callback function, it is replaced if the function is executed again
     */
    listRestExec: function (service,callback) {
        service.ignoreError = service.ignoreError || false;
        LIST_SERVICES.services.push(service);
        if (typeof callback === "function") {
            LIST_SERVICES.callback = callback;
        }
        LIST_SERVICES.verifyServices();
    },
    verifyServices: function () {
        if (LIST_SERVICES.inProgress) return;
        LIST_SERVICES.inProgress = true;
        showWait();
        LIST_SERVICES.loopServices();
    },
    loopServices: function () {
        if (LIST_SERVICES.services.length) {
            _restToExe = LIST_SERVICES.services[0];
            _restToExe.showWait = false;
            _restToExe.async = true;
            _restToExe.error = _restToExe.error || rest_fnNothig;
            if (typeof _restToExe.finallyError === "undefined") {
                _restToExe.finallyError = [];
            }else if (typeof _restToExe.finallyError === "function") {
                _restToExe.finallyError = [_restToExe.finallyError];
            }
            if (typeof _restToExe.finallySuccess === "undefined") {
                _restToExe.finallySuccess = [];
            }else if (typeof _restToExe.finallySuccess === "function") {
                _restToExe.finallySuccess = [_restToExe.finallySuccess];
            }
            if (!_restToExe.ignoreError) {
                _restToExe.finallyError.push(function (error) {
                    LIST_SERVICES.errors.push(error);
                });
            }
            _fnLoop = function () {
                LIST_SERVICES.services.shift();
                LIST_SERVICES.loopServices();
            };
            _restToExe.finallySuccess.push(_fnLoop);
            _restToExe.finallyError.push(_fnLoop);
            restExec(_restToExe);
        }else {
            if (LIST_SERVICES.errors.length) {
                loadTemplate($("#modal_generic .body"), miniTemplates.error, {
                    title: "Se presentaron algunos errores al realizar operación",
                    message: "Es posible que tu información no se muestre de forma completa"
                });
                LIST_SERVICES.errors = [];
            }
            hideWait();
            LIST_SERVICES.inProgress = false;
            LIST_SERVICES.callback();
        }
    }
};

/**
 * Function to execute services with post method.
 * @param {object} restToExe Object that contains the service's name to be executed, data to be sent, asyncronusly(it's false byr default),and what it does when finally correctly or with error(show modal), and if you want to show a wait modal.
 */
function restExec(restToExe) {
    var secRestToExe = {
        "type": restToExe.type || 'POST',
        "service": restToExe.service,
        "headers": restToExe.headers || {},
        "data": restToExe.data || {},
        "async": restToExe.async || true,
        "success": restToExe.success || rest_fnNothig,
        "error": restToExe.error || rest_fnShowError,
        "showWait": restToExe.showWait || false,
        "finallySuccess": restToExe.finallySuccess || rest_fnNothig,
        "finallyError": restToExe.finallyError || rest_fnNothig,
        "hasUrlParam": restToExe.hasUrlParam || false,
        "urlParam" : restToExe.urlParam || {}
    };
    console.log("datos a enviar: ", secRestToExe.data);
    console.log("string ", JSON.stringify(secRestToExe.data));
    /**
     * Function to execute AJAX service with POST as default method.
     */
    rest_execute = function() {
        $.ajax({
            type: secRestToExe.type,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            url: SCONFIG.get(secRestToExe),
            data: JSON.stringify(secRestToExe.data),
            async: secRestToExe.async,
            cache: false,
            success: function(data) {
                initCountSession();
                console.log("RESPUESTA " + secRestToExe.service, data);
                if (secRestToExe.showWait) { hideWait(); }
                secRestToExe.success(data);
                if (secRestToExe.finallySuccess.constructor === Array) {
                    secRestToExe.finallySuccess.forEach(function(_fun) {
                        _fun(data);
                    });
                }else{
                    secRestToExe.finallySuccess(data);
                }
            },
            error: function(error) {
                initCountSession();
                console.log("ERROR EN SERVICIO " + secRestToExe.service, error);
                if (typeof error.responseText != "undefined" && error.responseText.indexOf("<title>Login</title>") != -1) {
                    showLogOut();
                    hideWait();
                    return;
                }
                if (typeof error.responseJSON != "undefined") {
                    error.responseJSON.code = error.responseJSON.code || error.responseJSON.errorcode;
                    error.responseJSON.message = error.responseJSON.message || error.responseJSON.errormessage;
                }

                if (secRestToExe.showWait) { hideWait(); }
                secRestToExe.error(error);
                if (secRestToExe.finallyError.constructor === Array) {
                    secRestToExe.finallyError.forEach(function(_fun) {
                        _fun(error);
                    });
                }else{
                    secRestToExe.finallyError(error);
                }
            }
        });
    };
    if (secRestToExe.showWait) { showWait(); }
    rest_execute();
}

/**
 * Function doesn't do anything.
 * @param {object} obj Return nothing.
 */
var rest_fnNothig = function() { console.log("nothing"); };

/**
 * Function to show error modal.
 * @param {object} error error data
 */
var rest_fnShowError = function(error) {
    if (typeof error.responseJSON == "undefined" || typeof error.responseJSON.message == "undefined") {
        error.responseJSON = { "message": "SIN DETALLE DEL ERROR" };
    }
    loadTemplate($("#modal_generic .body"), miniTemplates.error, {
        title: "Ocurrió un error al realizar la operación",
        message: error.responseJSON.message,
        redirectToLogin: error.responseJSON.message == "No tienes privilegios para accesar"?true:false
    });
    return;
};



/**
 * function that receives the service data (LIST_CATALOGS)
 * @param {string} cat specify the catalog position
 * @param {object} data that contains the response service
 */
var rest_fnGetSchoolCatalog = function (cat, data) {
     console.log("rest_fnGetSchoolCatalog");
	  console.log("cat:",cat);
	 console.log("data:",data);
	 
	// if(cat.indexOf("CAT_OCUPACION")==0){
        // for (i = 0; i < data.data.length; i++) {
            // if (data.data[i].id == "10") {
                // data.data.splice(i, 1);
                // break;
            // }
        // }
    // }
    console.log(" data.data || []",  data.data || []);
    catalogs[cat] = data.data || [];
};



/**
 *Is executed when the get states service is successfully executed, save the response data in stateTransactions variable.
 *
 * @param {Object} data service response data object
 */
var rest_fnGetStates= function (data) {
    stateTransactions= __.get(data,'stateTransactions',[]);
    var states=[];
    for(i=0;i<stateTransactions.length;i++){
        states.push({"id": stateTransactions[i].state.code,"description": stateTransactions[i].state.name});
    }
    stateTransactions=states;
};

/**
 *Is executed when the get municipalities service is successfully executed, save the response data in municipalityTransactions variable.
 *
 * @param {string|number} id the state id
 * @param {Object} data service response data object
 */
var rest_fnGetMunicipalities = function (id, data) {
    var aux= __.get(data,'municipalityTransactions',[]);
    var arrayMun=[];
    for(i=0;i<aux.length;i++){
        arrayMun.push({"id": aux[i].municipality.code,"description": aux[i].municipality.name});
    }
    municipalityTransactions[id] = arrayMun || [];
};


var validateGeneralStatus = function () {
    if(__.get(moduleInitData.general,'moduleStatus','') == "COMPLETO"){//si el módulo es completo
        $(".page-container .i-form.accordion").not("#wf0").show();
        if (!firstModuleComplete) {
            firstModuleComplete = true;
            loadNextModules(function () {
                loadModule.checkStatus();
                changeModuleSatus($("#general-data"), "complete");
            });
        }else{
            loadModule.legalDisclaimer(function () {
                loadModule.checkStatus();
                changeModuleSatus($("#general-data"), "complete");
            });
        }
    }else{
        $(".page-container .i-form.accordion").not("#wf0").hide();
    }
};
