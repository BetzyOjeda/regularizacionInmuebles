/**
 * @file Contents all global variables, these variables can be accessed in any module
 */

 /**
  * Contains the municipalities allready loaded, it helps to execute the municipalities service just once for every state.
  * @type {Object}
  */
 var municipalityTransactions= {};
 /**
  * Contains the states
  */
 var stateTransactions=[];
 
 
 /**
  * Indicates if the birthday date has no error
  * @type {boolean}
  */
 var fbdate=true;
 /**
  * Indicates if the start class date has no error
  */
 var fcdate=true;
 
 /**
  * Indicates if the module "datos generales" has a complete status
  * @type {boolean}
  */
 var firstModuleComplete = false;
 
 /**
  * Contains the gender catalog
  * @type {Object[]}
  */
 var genders = [{
         id: '0',
         description: 'Hombre'
     },
     {
         id: '1',
         description: 'Mujer'
     }
 ];
 
 /**
  * It contails all the catalogs allready loaded, when a new catalog is get this variable is updated
  * @type {Object}
  */
 var catalogs = {};
 /**
  * When a module informatios is get, the response is saved in this variable, it is used to fill the save all modal.
  * @type {Object}
  */
 var moduleInitData = {};
 
/**
 * @file Contains the main operational functions for the web page
*/

//Shows a warning to prevent the student to use the browser console
console.log("%cRealizar alguna modificación en esta sección puede provocar la pérdida de tu información\n", "color:#a90c0c;font-size:22px;");
/**
 * Save the server domain, it is use to know the server enviroment
 * @type {string}
 */
var servOrigin = window.location.origin;
/**
 * Indicates if the current server is a local server
 * @type {boolean}
 */
var isLocal = (servOrigin.indexOf("localhost") != -1);

//The enviroment is validate to enable logs
if (!isLocal) {
    window.oldconsole = {};
    window.oldconsole.log = console.log;
    console.log = function() {};
    window.console.log = console.log;
}
/**
 * Function to redirect to login validating the enviroment.
 */
function redirectToLogin() {
    var servOrigin = window.location.origin;
    if (servOrigin.indexOf("localhost") != -1) { //local
        return;
    } else if (servOrigin.indexOf("150.250.238.172") != -1) { //Desarrollo
        window.location = servOrigin + "/mgbfprv_des_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    } else if (servOrigin.indexOf("150.250.238.173") != -1) { //Test
        window.location = servOrigin + "/mgbfprv_test_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    } else if (servOrigin.indexOf("becasfmxt.mex.igrupobbva") != -1) { //Test
        window.location = servOrigin + "/mgbfprv_test_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    } else if (servOrigin.indexOf("calplataformabecas.fundacionbbvabancomer.com.mx") != -1) { //Calidad
        window.location = servOrigin + "/mgbfprv_qa_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    } else if (servOrigin.indexOf("plataformabecaslo.fundacionbbvabancomer.org") != -1) { //liga oculta
        window.location = servOrigin + "/mgbfprv_lo_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    } else if (servOrigin.indexOf("plataformabecas.fundacionbbvabancomer.org") != -1) { //Prod
        window.location = servOrigin + "/mgbfprv_pr_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    } else if (servOrigin.indexOf("plataformabecas.fundacionbbva.mx") != -1) { //Prod
        window.location = servOrigin + "/mgbfprv_pr_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    }
}

/**
 *Shows a logout message and when it is accepted the web page is reloaded
 *
 * @param {string} _msn optional title message
 */
var showLogOut = function(_msn) {
    if (_msn) {
        loadTemplate($("#modal_generic .body"), miniTemplates.success, {
            title: _msn,
            message: "",
            onAccept: function() {
                location.reload();
            }
        });
    }else{
        loadTemplate($("#modal_generic .body"), miniTemplates.error, {
            title: "Error",
            message: "Tu sesi\u00F3n ha terminado por inactividad",
            onAccept: function() {
                location.reload();
            }
        });
    }
};

var countSession, minutes, timer;
var initCountSession = function() {
    stopCountSession();
    minutes = 8;
    timer = minutes;
    countSession = setInterval(function () {
        console.log("## timer",timer);
        if (--timer == 0) {
            showTimeSession();
            stopCountSession();
        }
    }, 60000);
};
var stopCountSession = function() {
    if (countSession!=undefined) {
        clearInterval(countSession);
    }
};

var refreshSession = function() {
    $("#modal_timeout").removeAttr('open');
    $("#modal_timeout").find(".btn_acept span").text("Continuar con sesión");
    showWait();
    $.ajax({
        type: 'GET',
        contentType: 'image/png',
        url: "images/favicons/16x16.png",
        cache:false,
        async: true,
        success: function(data){
            initCountSession();
            if (typeof data != "undefined" && data.indexOf("<title>Login</title>") != -1) {
                hideWait();
                redirectToLogin();
                return;
            }
            hideWait();
        },
        error: function(){
            hideWait();
            redirectToLogin();
        }
    });
};
var _timer, _minutes, _seconds;
var showTimeSession = function() {
    var _timer = 60, _minutes, _seconds;
    var _intcd = setInterval(function () {
        _minutes = parseInt(_timer / 60, 10);
        _seconds = parseInt(_timer % 60, 10);
        _minutes = _minutes < 10 ? "0" + _minutes : _minutes;
        _seconds = _seconds < 10 ? "0" + _seconds : _seconds;
        $("#cdSession").text(_minutes+":"+_seconds);
        if (--_timer < 0) {
            $("#modal_timeout").find(".btn_acept span").text("Continuar");
            clearInterval(_intcd);
        }
    }, 1000);
    console.info("## showTimeSession");
    $("#modal_timeout").attr('open', '');
};
$("#modal_timeout").find(".btn_acept").click(refreshSession);


/**
 *Finishes the user session on spring server and web seal side.
 *
 */
var logout = function() {
    showWait();
    setTimeout(function() {
        restExec({
            service: 'TERMINATE_SESSION',
            async: false,
            data: {},
            success: function(resp) {
                console.log("se cerró sesión en back end");
            },
            error: function(error) {
                console.log("no se cerró sesión en back end");
            }
        });
        $.ajax({
            type: 'GET',
            dataType: 'html',
            url: window.location.origin + "/pkmslogout.form",
            async: true,
            success: function(){redirectToLogin();},
            error: function(){redirectToLogin();}
        });
    }, 400);
};

/**
 *Shows the wait animation modal
 *
 */
function showWait() {
    $("body").addClass("loading");
}

/**
 *Hides the wait animation modal
 *
 */
function hideWait() {
    $("body").removeClass("loading");
}

/**
 *It is executed when a modal is closed, it can be change to set the close modal behavior. 
 *
 */
var callbackCloseModal = function() {};

/**
 *Format the string or number to money format
 *
 * @param {string|number} n the value to format
 * @param {boolean} nosymb if true the $ symbol is not added
 * @returns {string}
 */
function formatMoney(n,nosymb) {
    n=n+"";
    n = n.replace(/,/g, '').replace(/\$/g, '');
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = ".",
        t = ",",
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (nosymb?"":"$ ")+(j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

/**
 * Contains the functions and flags to simulate an sync ajax request for catalogs
 * @namespace
 * @property {Object[]} verifyCatalogs.catToVerify contains the catalogs to get
 * @property {number} verifyCatalogs.catIndex contains the catToVerify array index
 * @property {function} verifyCatalogs.callback contains the callback function when all the catalogs is got
 * @property {function} verifyCatalogs.loopCatalogs is executed for each catalog, it execute the loadModule.getCatalog function
 */
var verifyCatalogs = {
    catToVerify: [],
    catIndex: -1,
    callback: function() {},
    loopCatalogs: function() {
        verifyCatalogs.catIndex++;
        if (verifyCatalogs.catIndex < verifyCatalogs.catToVerify.length) {
            showWait();
            if(verifyCatalogs.catToVerify[verifyCatalogs.catIndex]=="STATES"){
                loadModule.getStates();
            }else{
                loadModule.getCatalog(verifyCatalogs.catToVerify[verifyCatalogs.catIndex], verifyCatalogs.loopCatalogs);
            }
        }else{
            verifyCatalogs.catToVerify = [];
            verifyCatalogs.catIndex = -1;
            verifyCatalogs.callback();
            verifyCatalogs.callback = function() {};
            hideWait();
        }
    }
};

/**
 *Main function to get sync catalogs.
 *
 * @param {Object[]} _cat array of catalogs to get
 * @param {function} _callback callback function when all the catalogs is got
 */
var fn_verifyCatalogs= function(_cat, _callback){
    verifyCatalogs.catToVerify = _cat;
    verifyCatalogs.callback=_callback;
    verifyCatalogs.loopCatalogs();
};


/**
 * Concatenates spaces at the end of the string until it has the size indicated
 * @param {string} str the string to extend length
 * @param {number} size the final string size
 * @return {string} the final string in uppercase
 */
function concatSpace(str, size){
    str = str.toUpperCase().replace(/Á/gi, "A").replace(/É/gi, "E").replace(/Í/gi, "I").replace(/Ó/gi, "O").replace(/Ú/gi, "U");
    return str.concat(" ".repeat(size - str.length));
}

/**
 *Validate if the element has an empty option value, if not, the empty option is added and selected.
 *
 * @param {Object} $el DOM combo option
 */
function validateEmptyOption($el) {
    _tmpOpts = $el.data('options') || [];
    _hasEmptyOp = false;
    for (var _io = 0; _io < _tmpOpts.length; _io++) {
        if (_tmpOpts[_io].id==0 || _tmpOpts[_io].id=="0") {
            _hasEmptyOp=true;
            break;
        }
    }
    if (!_hasEmptyOp) {
        _descSt = dommySchools.getDommyDescription();
        _tmpOpts.push({id: 0, description: _descSt});
        $el.comboSelect(_tmpOpts);
    }
    $el.data('selected', {id: 0, description: _descSt});
    $el.removeComboError();
    $el.find(".option-text").removeClass("center");
    $el.find(".selected-option").text(_descSt);
}

//*** SCROLL ANIMATION ***

// Get the navbar
var navbar = document.getElementsByClassName("header");

/**
 * Get current browser viewpane heigtht
 */
function _get_window_height() {
  return window.innerHeight || 
         document.documentElement.clientHeight ||
         document.body.clientHeight || 0;
}

/**
* Get current absolute window scroll position
*/
function _get_window_Yscroll() {
  return window.pageYOffset || 
         document.body.scrollTop ||
         document.documentElement.scrollTop || 0;
}

/**
* Get current absolute document height
*/
function _get_doc_height() {
  return Math.max(
      document.body.scrollHeight || 0, 
      document.documentElement.scrollHeight || 0,
      document.body.offsetHeight || 0, 
      document.documentElement.offsetHeight || 0,
      document.body.clientHeight || 0, 
      document.documentElement.clientHeight || 0
  );
}


/**
* Get current vertical scroll percentage
*/
function _get_scroll_percentage() {
  return (
      (_get_window_Yscroll() + _get_window_height()) / _get_doc_height()
  ) * 100;
}



/**
 *When de page is scolling, it adds the sticky class to the navigation bar to keep it always on top
 *
 */
window.onscroll = function() {
  if (window.pageYOffset > 0) {
    if (_get_scroll_percentage() < 80) {
      navbar[0].classList.add("sticky");
    }
  } else {
    navbar[0].classList.remove("sticky");
  }
};

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


/**
 * @file Contains the functions that is executed when the templates are loaded into the web page, for each template exists a function to execute, those functions has two params, the first one is the DOM template and the second one is the JSON object sended to the template
 */

/**
 *Do nothing, it is used it a function is required
 *
 */
var fn_nothing = function () {
    return;
};

/**
 *Show the generic modal
 *
 */
var fn_showModal = function () {
    $("#modal_generic").attr('open', '');
};

/**
 *Hide the generic modal
 *
 */
var fn_hideModal = function () {
    $("#modal_generic").removeAttr("open");
};

/**
 *Accept modal loaded function
 *
 * @param {Object} _tmp the template DOM element
 * @param {Object} data the JSON object sended to the template
 */
var fn_aceptModal = function (_tmp,data) {
    fn_showModal();
    if (data.redirectToLogin) {
        $(".btn_acept").click(function (e) {
            e.preventDefault();
            redirectToLogin();
        });
    }else{
        if (typeof data.onAccept == 'function') {
            $(".btn_acept").click(function(){
                data.onAccept();
                fn_hideModal();
            });
        }else{
            $(".btn_acept").click(function (e) {
                e.preventDefault();
                fn_hideModal();
            });
        }
    }
};


/**
 *Confirm modal template function
 *
 * @param {Object} _temp the template DOM element
 * @param {Object} data the JSON object sended to the template
 */
var fn_confirmModal = function (_temp, data) {
    data.onDecline = typeof data.onDecline == "function" ? data.onDecline : fn_hideModal;
    fn_showModal();
    _temp.find(".btn_acept").click(data.onAccept.bind(data));
    _temp.find(".btn_decline").click(data.onDecline.bind(data));
};




/**
 *Notification card template function
 *
 * @param {Object} notif notification DOM element
 */
var fn_closeNotification = function (notif) {
    /**
     *When the close button is clicked the notification card is removed
     */
    notif.find(".close-button").click(function () {
        $(this).closest(".notification").slideUp("slow", function () {
            $(this).remove();
        });
    });
    notif.slideDown("slow");
};


var uploadFile = {
    index: 0,
    onFinish: function () {  }
};
var fn_uploadfilemodal = function () {
    var fileIdCont = 0;
    var allFiles = {};
    var myDropzone = new Dropzone("#dragndrop", {
        acceptedFiles: 'application/pdf,image/jpeg,image/png',
        dictFileTooBig: "El archivo supera el tama\u00F1o permitido de {{maxFilesize}} MB",
        dictMaxFilesExceeded: "N\u00FAmero m\u00E1ximo de archivos alcanzado",
        dictInvalidFileType: "S\u00F3lo se permiten archivos JPG, PNG y PDF",
        autoProcessQueue: false,
        dictDefaultMessage: '',
        maxFiles: 1,
        maxFilesize: 10,
        previewTemplate: miniTemplates.filepreview.html,
        previewsContainer: "#file-preview-wrapper",
        url: "/",
        init: function () {
            this.on("addedfile", function (file) {});
            this.on("drop", function () {});
        },
        accept: function (file, done) {
            document.getElementById("filecontainer").classList.remove('empty');
            $("#sbtmfiles").show();
            var _tthis = this;
            file.idFile = fileIdCont;
            var button = file.previewTemplate.querySelector('.btn-delete-file');
            var myFile = file;
            button.addEventListener('click', function () {
                _tthis.removeFile(myFile);
            });
            allFiles[fileIdCont] = {
                "active": true,
                "base64": ""
            };
            fileIdCont++;
            done();
        },
        removedfile: function (file) {
            file.previewTemplate.remove();
            if (this.getAcceptedFiles().length == 0) {
                document.getElementById("filecontainer").classList.add('empty');
                $("#sbtmfiles").hide();
            }
        },
        error: function (file, errorMEssage) {
            if (!file.accepted) {
                this.removeFile(file);
                _$form = $(".fileform");
                notifyElem = _$form.prev();
                if (notifyElem.length != 0 && notifyElem.hasClass("notification")) notifyElem.remove();
                loadTemplate(_$form, miniTemplates.notification, {
                    type: 'error',
                    title: errorMEssage
                }, 'before');
            }
        }
    });
    $("#btn_sbtmfiles").data("complete", function(formdata) {
        console.log(formdata);
        fn_hideModal();
        uploadFile.onFinish = function() {};
        uploadFile.index = 0;
        _fileDetails = myDropzone.getAcceptedFiles();
        function readIndexFile(iFile) {
            if (iFile == _fileDetails.length) {
                return;
            }
            currentFile = _fileDetails[iFile];
            var reader = new FileReader();
            reader.readAsDataURL(currentFile);
            reader.onload = function(e){
                if (iFile == _fileDetails.length) {
                    return;
                }
                var base64URL = e.target.result;
                fext = currentFile.name.split(".");
                fext = fext[fext.length - 1];
                uploadFile.onFinish = function(resp) {
                    console.log("resp", resp);
                };
                if (iFile == _fileDetails.length - 1) {
                    uploadFile.onFinish = function(data) {
                        console.log("_end_fn", data);
                        fn_sendDocument({
                            moduleIndicator: formdata.module,
                            typeDocument: formdata.document,
                            schoolGrade: formdata.grade,
                            schoolPeriod: formdata.period,
                            folio: data.referenceNumber,
                        });
                    };
                }
                /*fn_sendMultiDocumentArchiving({
                    ext: fext.toLowerCase(),
                    filename: currentFile.name,
                    typeDocument: formdata.document,
                    first: (iFile == 0) + "",
                    last: (iFile == _fileDetails.length - 1) + "",
                    base64: (base64URL.split(";base64,"))[1],
                    success: uploadFile.onFinish
                });*/
                uploadFile.index++;
                readIndexFile(uploadFile.index);
            };
        }
        readIndexFile(0);
    });
    fn_showModal();
};
/**
 * @file Contains the main function to load and inset templates, also contains the template configurations.
 */

/**
 * Represents the structure for loading a template
 * @namespace
 * @property {Object} templates[name] - Object that represents an success view template
 * @property {string} templates[name.path] - template root path
 * @property {function} templates[name.onload] - function that is executed once the template is inserted
 */
var templates = {
    "conf": {
        path: "./views/modal/confirm_m.html",
        onload: fn_confirmModal
    },
    "ufile": {
        path: "./views/modal/uploadfile.html",
        onload: fn_uploadfilemodal
    },
    "notify": {
        path: "./views/modal/notifications.html",
        onload: fn_opennotification
    }
};

/**
 * Load a template
 *
 * @param {Object} element Represent a DOM object
 * @param {Object} template  Represents a view template
 * @param {Object} data Info are passed to the template to render
 * @param {string} inserttype Template insertion Type with respect to the DOM object
 */
function loadTemplate(element,template,data,inserttype){
    function placeTemplate(templatetext) {
        var temp = $(Mustache.to_html(templatetext,data));
        element[inserttype](temp);
        if (inserttype=="html")window.validateControl(element);
        if (typeof template.html !== 'undefined') {
            template.html = templatetext;
        }
        template.onload(temp,data);
    }

    if (typeof inserttype === "undefined") inserttype="html";
    if(!template){console.error("loadTemplate: template is undefined ["+element+"]");return;}
    if(data){
        if (typeof template.html !== 'undefined') {
            placeTemplate(template.html);
        }else if (typeof template.path !== 'undefined') {
            $.get(template.path,placeTemplate);
        }
    }else{
        console.warn("loadTemplate: data is null ["+template+"]");
    }
}

/**
 * Represents a mini template view
 * @namespace
 * @property {Object} miniTemplates[name] - Object that represents a mini template
 * @property {function} miniTemplates[name.onload] - Function that is executed once the template is inserted
 * @property {string} miniTemplates[name.html]  - Represents the template and renders the variables passed to the template
 */
var miniTemplates = {
    success: {
        onload: fn_aceptModal,
        html: '<div class="title-gray">'+
                '{{title}}'+
            '</div>'+
            '<div class="step-container">'+
                '<div class="icon-m icon-s"></div>'+
                '<div class="grid-c">'+
                    '<div class="grid-item">'+
                        '<div class="message-modal">'+
                            '<div>{{message}}</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="actionsection">'+
                    '<div class="submtbtn">'+
                        '<span title="Enviar" aria-label="Enviar" class="btn__basic btn_acept">'+
                            '<span aria-hidden="true">Aceptar</span>'+
                        '</span>'+
                    '</div>'+
                '</div>'+
            '</div>'
    },
    error: {
        onload: fn_aceptModal,
        html: '<div class="title-gray">'+
                '{{title}}'+
            '</div>'+
            '<div class="step-container">'+
                '<div class="icon-m icon-e"></div>'+
                '<div class="grid-c">'+
                    '<div class="grid-item">'+
                        '<div class="message-modal">'+
                            '<div>{{message}}</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="actionsection">'+
                    '<div class="submtbtn">'+
                        '<span title="Enviar" aria-label="Enviar" class="btn__basic btn_acept">'+
                            '<span aria-hidden="true">Aceptar</span>'+
                        '</span>'+
                    '</div>'+
                '</div>'+
            '</div>'
    },
    notification: {
        onload: fn_closeNotification,
        html: '<div class="notification {{type}}" style="display: none;">'+
                    '<div class="wrapper">'+
                        '<div class="icon">'+
                            '<i class="bbva-icon"></i>'+
                        '</div>'+
                        '<div class="message">'+
                            '<div class="message__heading">'+
                                '{{title}}'+
                            '</div>'+
                            '<span class="message__body">'+
                                '{{message}}'+
                            '</span>'+
                        '</div>'+
                        '<div class="close-button">'+
                            '<i class="bbva-icon ui-x"></i>'+
                        '</div>'+
                    '</div>'+
                '</div>'
    },
    filepreview: {
        html: '<div class="uploadfile animated fadeInLeft">' +
            '<div class="wrapper">' +
            '<div class="message">' +
            '<div class="message__heading dz-filename"><span data-dz-name></span></div>' +
            '<span class="message__body">' +
            '<span class="remove btn-delete-file"><i class="ui-trash"></i> Eliminar</span>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>'
    },
    visorProfile: {
        onload: function(){},
        html: '<div id="profile-view">'+
                '<figure>'+
                    '<img src="{{photo}}" alt="">'+
                '</figure>'+
               '</div>'+
               '<div class="submtbtn">'+
                  '<span title="Continuar" aria-label="Continuar" class="help_section" id="btn_change_profile">' +
                     '<span aria-hidden="true" class="h_h1">Cambiar foto <i class="bbva-icon ui-camera"></i></span>' +
                  '</span>'+
                '</div>'
    },
    
};
(function($) {
    $.fn.inputable = function() {
        return $(this).each(function() {
            t = this;
            var e = document.createElement("span"),
                n = document.createElement("div");
            if (!t.hasAttribute("required")) {
                var o = document.createElement("span");
                $(o).addClass("is-optional");
                t.parentElement.appendChild(o);
            }
            $(n).addClass("placeholder-wrapper");
            t.parentElement.appendChild(n);
            e.appendChild(document.createTextNode(t.getAttribute("data-placeholder")));
            $(e).addClass("placeholder-simulator");
            n.appendChild(e);
            n.appendChild(t);
            n.appendChild(e);
            $t = $(t);
            ele_parent = $t.parents(".form-group");
            if (ele_parent.find('span.text-message').length === 0) {
                ele_parent.append("<p class='i-message'><span class='text-message'>&nbsp;</span></p>");
            }
            e.addEventListener("click", function() {
                $(this).siblings("input").focus();
            });
            t.addEventListener("keyup", function() {
                t = $(this);
                if (0 === t.val().length) {
                    t.removeClass("noempty");
                    t.removeClass("has-error");
                } else {
                    var _e = t.siblings("small");
                    $(_e).remove();
                    $(t).removeError();
                }
            });
            t.addEventListener("focus", function() {
                _t = {
                    top: "5px",
                    fontSize: "12px"
                };
                for (var el in _t) e.style[el] = _t[el];
            });
            t.addEventListener("blur", function() {
                t = $(this);
                if (0 === t.val().length) {
                    _t = {
                        top: "16px",
                        fontSize: "15px"
                    };
                    for (var el in _t) e.style[el] = _t[el];
                    t.removeClass("noempty");
                } else {
                    t.removeClass("has-error");
                    $(t).addClass("noempty");
                }
            });
            if (0 !== t.value.length) {
                _t = {
                    top: "5px",
                    fontSize: "12px"
                };
                for (var el in _t) e.style[el] = _t[el];
                $(t).addClass("noempty");
            }
        });
    };
    $.fn.showError = function(message) {
        return this.each(function() {
            element = $(this);
            ele_parent = element.parents(".form-group");
            ele_parent.addClass("hasError");
            if (message != "") {
                ele_parent.find('span.text-message').html("<i class='bbva-icon ui-warning'></i>" + message);
            }
        });
    };
    $.fn.removeError = function() {
        return this.each(function() {
            element = $(this);
            ele_parent = element.parents(".form-group");
            ele_parent.removeClass("hasError");
            ele_parent.find('span.text-message').html('<i class="bbva-icon ui-empty"></i>&nbsp;');
        });
    };
    $.fn.clearInput = function() {
        return this.each(function() {
            element = $(this);
            element.removeError();
            element.val("");
            element.siblings(".placeholder-simulator").css({
                "top": "16px",
                "font-size": "15px"
            });
        });
    };
    $.fn.setValue = function(_val) {
        return this.each(function() {
            if (_val!="") {
                element = $(this);
                element.val(_val);
                element.siblings(".placeholder-simulator").css({
                    "top": "5px",
                    "font-size": "12px"
                });
            }
        });
    };
}(jQuery));
(function ($) {

	$.fn.comboSelect = function (options, onSelectCallback) {
		return this.each(function () {
			var context = $(this);
			if (typeof onSelectCallback === 'function') {
				context.data('selectCallback', onSelectCallback);
			} else if (typeof context.data('selectCallback') !== 'function') {
				context.data('selectCallback', function () {});
			}
			context.data('options', options);
			context.data('selected', null);
			context.find('.list-result').html(Mustache.to_html($.fn.comboSelect.template, {
				items: options
			}));

			var _optionSelect = context.find(".option-select");
			_optionSelect.data('open', false);
			_optionSelect.removeAttr('open');

			_optionSelect.find("li").click(function () {
				var $liSelected = $(this);
				var _options = context.data('options');
				if(context.data('selected') == null || $liSelected.attr('data-id') != context.data('selected').id){
					for (var i = 0; i < _options.length; i++) {
						var element = _options[i];
						if (element.id == $liSelected.attr('data-id')) {
							context.data('selected', element);
							context.removeComboError();
							context.find(".option-text").removeClass("center");
							context.find(".selected-option").text(element.description);
							context.addClass("noempty");
							$.fn.hideOptions(_optionSelect);
							context.data('selectCallback')(element);
							break;
						}
					}
				}
			});

			if(context.data("inicializate") === true) return;
			_optionSelect.find(".select-title").click(function () {
				if (!_optionSelect.data('open')) {
					$.fn.showOptions(_optionSelect);
				} else {
					$.fn.hideOptions(_optionSelect);
				}
			});
			context.data("inicializate", true);
			if($(document).data("comboselectatached")==undefined){
				$(document).click(function(event) {
					if (!$(event.target).hasClass("sl")) {
						$formOpened = $(".form-group-select .option-select[open]");
						if ($formOpened.length != 0) {
							$.fn.hideOptions($formOpened);
						}
					}
				});
				$(document).data("comboselectatached", true);
			}
			if (typeof context.data("promess-select") !== "undefined") {
				context.selectOptionId(context.data("promess-select"));
				context.data("promess-select", undefined);
			}
			if (typeof context.data("promess-selectdesc") !== "undefined") {
				context.selectOptionDescription(context.data("promess-selectdesc"));
				context.data("promess-select", undefined);
			}
		});
	};

	$.fn.showOptions = function (_optionSelect) {
		if (_optionSelect.hasClass("disabled")) return;
		$.fn.hideOptions($(".form-group-select .option-select[open]").not(_optionSelect));
		_optionSelect.find("ul").slideDown();
		_optionSelect.data("open", true);
		_optionSelect.attr('open','');
		_optionSelect.find(".select-title .bbva-icon").css({
			'transform': 'rotate(180deg)'
		});
	};

	$.fn.selectOptionId = function(id){
		context = this;
		var _options = context.data('options');
		if (typeof _options == "undefined") {
			context.data("promess-select", id);
			return;
		}
		for (var i = 0; i < _options.length; i++) {
			var element = _options[i];
			if (element.id == id) {
				context.data('selected', element);
				context.removeComboError();
				context.find(".option-text").removeClass("center");
				context.find(".selected-option").text(element.description);
				context.data('selectCallback')(element);
				break;
			}
		}
	};

	$.fn.selectOptionDescription = function(desc){
		context = this;
		var _options = context.data('options');
		if (typeof _options == "undefined") {
			context.data("promess-selectdesc", desc);
			return;
		}
		for (var i = 0; i < _options.length; i++) {
			var element = _options[i];
			if (element.description == desc) {
				context.data('selected', element);
				context.removeComboError();
				context.find(".option-text").removeClass("center");
				context.find(".selected-option").text(element.description);
				context.data('selectCallback')(element);
				break;
			}
		}
	};

	$.fn.hideOptions = function (_optionSelect) {
		_optionSelect.find("ul").slideUp();
		_context = _optionSelect.closest(".form-group-select");
		if(_context.hasClass("required") && _context.getOptionSelected()==null) _context.showComboError();
		_optionSelect.data("open", false);
		_optionSelect.removeAttr('open');
		_optionSelect.find(".select-title .bbva-icon").css({
			'transform': 'rotate(0deg)'
		});
	};

	$.fn.getOptionSelected = function () {
		return this.data('selected') || null;
	};

	$.fn.onSelect = function (callback) {
		if (typeof callback === 'function') {
			this.data('selectCallback', callback);
		}
	};

	$.fn.reset = function () {
		this.find(".option-text").addClass("center");
		this.find(".selected-option").text("");
		this.find(".option-select").removeClass("disabled");
		this.removeComboError();
		this.removeClass("noempty");
		this.data('selected',null);
		return this;
	};

	$.fn.showComboError = function(message) {
		return this.each(function() {
			$(this).addClass("hasError");
			message = message?message:"Selecciona una opción";
			$(this).find("span.text-message").html('<i class="bbva-icon ui-warning"></i>'+message);
		});
	};

	$.fn.removeComboError = function() {
		return this.each(function() {
			$(this).removeClass("hasError");
			$(this).find("span.text-message").html('&nbsp;');
		});
	};

	$.fn.comboSelect.template = '<ul style="display:none">' +
		'{{#items}}' +
		'<li data-id="{{id}}">{{description}}</li>' +
		'{{/items}}' +
		'</ul>';

}(jQuery));

var day = [{
	id: '01',
	description: '01'
},
{
	id: '02',
	description: '02'
},
{
	id: '03',
	description: '03'
},
{
	id: '04',
	description: '04'
},
{
	id: '05',
	description: '05'
},
{
	id: '06',
	description: '06'
},
{
	id: '07',
	description: '07'
},
{
	id: '08',
	description: '08'
},
{
	id: '09',
	description: '09'
},
{
	id: '10',
	description: '10'
},
{
	id: '11',
	description: '11'
},
{
	id: '12',
	description: '12'
},
{
	id: '13',
	description: '13'
},
{
	id: '14',
	description: '14'
},
{
	id: '15',
	description: '15'
},
{
	id: '16',
	description: '16'
},
{
	id: '17',
	description: '17'
},
{
	id: '18',
	description: '18'
},
{
	id: '19',
	description: '19'
},
{
	id: '20',
	description: '20'
},
{
	id: '21',
	description: '21'
},
{
	id: '22',
	description: '22'
},
{
	id: '23',
	description: '23'
},
{
	id: '24',
	description: '24'
},
{
	id: '25',
	description: '25'
},
{
	id: '26',
	description: '26'
},
{
	id: '27',
	description: '27'
},
{
	id: '28',
	description: '28'
},
{
	id: '29',
	description: '29'
},
{
	id: '30',
	description: '30'
},
{
	id: '31',
	description: '31'
}
];

var month = [{
	id: '01',
	description: 'Ene',
	monthcomplete: "ENERO"
},
{
	id: '02',
	description: 'Feb',
	monthcomplete: "FEBRERO"
},
{
	id: '03',
	description: 'Mar',
	monthcomplete: "MARZO"
},
{
	id: '04',
	description: 'Abr',
	monthcomplete: "ABRIL"
},
{
	id: '05',
	description: 'May',
	monthcomplete: "MAYO"
},
{
	id: '06',
	description: 'Jun',
	monthcomplete: "JUNIO"
},
{
	id: '07',
	description: 'Jul',
	monthcomplete: "JULIO"
},
{
	id: '08',
	description: 'Ago',
	monthcomplete: "AGOSTO"
},
{
	id: '09',
	description: 'Sep',
	monthcomplete: "SEPTIEMBRE"
},
{
	id: '10',
	description: 'Oct',
	monthcomplete: "OCTUBRE"
},
{
	id: '11',
	description: 'Nov',
	monthcomplete: "NOVIEMBRE"
},
{
	id: '12',
	description: 'Dic',
	monthcomplete: "DICIEMBRE"
}
];


(function ($) {
    $.fn.radiobutton = function(callback){
        return this.each(function () {
            $rad = $(this);
            if ($rad.data("resetCallback") == undefined) {
                $rad.data("resetCallback", function () {});
            }
            if(callback != undefined){
                $rad.data("checkedCallback",callback);
            }
            $button = $rad.find('.radio');
            $rad.append("<p class='i-message'><span class='text-message'>&nbsp;</span></p>");
            $button.click(function () {
                if($(this).parents(".radio-buttons").hasClass("disabled")) return;
                $.fn.selectRadio($(this));
            });
        });
    };
    $.fn.getButtonSelected = function(){
        return {
            id: $(this).attr('data-selectedid'),
            description: $(this).attr('data-selected')
        };
    };
    $.fn.onChecked = function (_callback) {
        if (typeof _callback === 'function') {
            this.data('checkedCallback', _callback);
        }
        return this;
    };
    $.fn.onRadioReset = function (_onresetcallback) {
        if (typeof _onresetcallback === 'function') {
            this.data('resetCallback', _onresetcallback);
        }
        return this;
    };
    $.fn.clearRadio = function () {
        this.removeRadioError();
        this.find(".radio.checked").removeClass("checked");
        this.removeAttr('data-selectedid');
        this.removeAttr('data-selected');
        this.data('resetCallback')();
        return this;
    };
    $.fn.showRadioError = function(message){
        $(this).addClass("hasError");
        $(this).find("span.text-message").html('<i class="hasError bbva-icon ui-warning"></i>' + message);
        return this;
    };
    $.fn.removeRadioError = function(){
        $(this).removeClass("hasError");
        $(this).find('span.text-message').html("&nbsp;");
        return this;
    };

    $.fn.selectRadioId = function(id){
        $.fn.selectRadio($(this).find("[data-id='" + id + "']"));
        return this;
    };

    $.fn.selectRadio = function($radio){
        if (!$radio.hasClass('checked')) {
            $rad_p=$radio.closest(".radio-section");
            $buttons = $rad_p.find(".radio");
            $buttons.removeClass('checked');
            $radio.addClass('checked');
            var selected = {
                id: $radio.attr('data-id'),
                description: $radio.closest(".radio-button").find(".radio-label").text()
            };
            $rad_p.attr('data-selectedid',selected.id);
            $rad_p.attr('data-selected',selected.description);
            $rad_p.removeRadioError();
           if($rad_p.data("checkedCallback") != undefined){
                $rad_p.data("checkedCallback")(selected);                    
            }
        }
        return this;
    };
}(jQuery));

(function ($) {
	$.fn.checkeable = function (onCheckCallback, onUncheckCallback) {
		return this.each(function () {
            if (typeof onCheckCallback != "function") onCheckCallback=function(){}
            if (typeof onUncheckCallback != "function") onUncheckCallback=function(){}
            $(this).data("checkcallback",onCheckCallback);
            $(this).data("uncheckcallback",onUncheckCallback);
            $(this).click(function () {
                if($(this).hasClass("disabled")) return;
                if ($(this).hasClass("checked")) {
                    $(this).removeClass("checked");
                    $(this).data("uncheckcallback")($(this));
                }else{
                    $(this).removeCheckboxError();
                    $(this).addClass("checked");
                    $(this).data("checkcallback")($(this));
                }
            });
		});
	};

	$.fn.isChecked = function () {
		return $(this).hasClass("checked");
    };

    $.fn.doCheck = function () {
        return this.each(function(){
            $(this).addClass("checked");
            $(this).data("checkcallback")($(this));
        });
    };
    $.fn.unCheck = function () {
        return this.each(function(){
            $(this).removeClass("checked");
        });
    };
    $.fn.showCheckBoxError= function(){
        $(this).addClass("error");
    }
    $.fn.removeCheckboxError=function(){
        $(this).removeClass("error");
    }
	$.fn.ckeckCallback = function (onCheckCallback, onUncheckCallback) {
		return this.each(function () {
            if (typeof onCheckCallback != "function") onCheckCallback=function(){}
            if (typeof onUncheckCallback != "function") onUncheckCallback=function(){}
            $(this).data("checkcallback",onCheckCallback);
            $(this).data("uncheckcallback",onUncheckCallback);
		});
    };

}(jQuery));
(function ($) {
    $.fn.applyList = function (context, items) {
        context.find('.list-result').html(Mustache.to_html($.fn.searchList.templates[context.attr('data-template')], items));
        context.find('.list-result')[0].scrollTo(0, 0);
        context.find(".result-item").click(function (e) {
            context.find(".result-item").not(this).removeClass('selected');

            var _items = context.data('items');
            for (var i = 0; i < _items.items.length; i++) {
                var element = _items.items[i];
                if (element[_items.filterid] == $(this).attr('data-id')) {
                    context.data('selected', element);
                    context.find(".placeholder-simulator").attr("style", "top: 5px; font-size: 12px;");
                    context.find("input[name='filter']").val(element[_items.filtertext]).removeError();
                    context.find(".list-result").slideUp();
                    context.data('selectCallback')(element);
                    break;
                }
            }
            $(this).addClass('selected');
        });
    };
    $.fn.searchList = function (items, onSelectCallback) {
        return this.each(function () {
            var context = $(this);

            if (typeof onSelectCallback === 'function') {
                context.data('selectCallback', onSelectCallback);
            } else if (typeof context.data('selectCallback') !== 'function') {
                context.data('selectCallback', function () {});
            }
            context.data('items', items);
            context.data('selected', null);
            $.fn.applyList(context, items);

            var inputfilter = context.find("input[name='filter']");
            inputfilter.clearInput();
            context.find(".list-result").slideDown();
            if (context.data("search-atached") == undefined) {
                inputfilter.focus(function (e) {
                    e.preventDefault();
                    context.find(".list-result").slideDown();
                    $.fn.filterList(context, $(this).val());
                });
                inputfilter.blur(function (e) {
                    if (context.data('selected') != null) {
                        context.find(".placeholder-simulator").attr("style", "top: 5px; font-size: 12px;");
                        context.find("input[name='filter']").val(context.data('selected')[context.data('items').filtertext]).removeError();
                        context.find(".list-result").slideUp();
                    }
                });
                inputfilter.keyup(function (e) {
                    $.fn.filterList(context, inputfilter.val());
                });
            }
            context.data("search-atached",true);
            if (typeof context.data("promess-select") !== "undefined") {
				context.selectFromList(context.data("promess-select"));
				context.data("promess-select", undefined);
			}
        });
    };

    $.fn.selectFromList = function (_listid) {
        return this.each(function () {
            var context = $(this);
            _allitems = context.data('items');
            if (typeof _allitems == "undefined") {
                context.data("promess-select", _listid);
			    return;
            }else{
                for (var i = 0; i < _allitems.items.length; i++) {
                    var element = _allitems.items[i];
                    if (element[_allitems.filterid] == _listid) {
                        context.data('selected', element);
                        context.find(".placeholder-simulator").attr("style", "top: 5px; font-size: 12px;");
                        context.find("input[name='filter']").val(element[_allitems.filtertext]).removeError();
                        context.find(".list-result").slideUp();
                        context.data('selectCallback')(element);
                        break;
                    }
                }
            }
        });
    };

    $.fn.unselect = function () {
        return this.each(function () {
            var context = $(this);
            context.data('selected', null);
            context.find("input[name='filter']").clearInput();
        });
    };

    $.fn.filterList = function (context, filter) {
        var filtereditems = {
            "items": []
        };
        var regExFilter = new RegExp($.fn.escapeRegExp($.fn.removeAcute(filter)), 'i');
        var _items = context.data('items');
        filtereditems.items = $.map(_items.items, function (element) {
            if (regExFilter.test($.fn.removeAcute(element[_items.filtertext]))) return element;
        });
        $.fn.applyList(context, filtereditems);
    };
    $.fn.getSelected = function () {
        context = this;
        return this.data("selected") || null;
    };

    $.fn.escapeRegExp = function (string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    $.fn.removeAcute = function (in_string) {
        var acutelist = [{
                    i: "á",
                    o: "a"
                },
                {
                    i: "é",
                    o: "e"
                },
                {
                    i: "í",
                    o: "i"
                },
                {
                    i: "ó",
                    o: "o"
                },
                {
                    i: "ú",
                    o: "u"
                }
            ],
            out_string = in_string.toLowerCase();

        for (var i = 0; i < acutelist.length; i++) {
            var char = acutelist[i];
            out_string = out_string.replace(char.i, char.o);
        }
        return out_string;
    };
    $.fn.searchList.templates = {
        simple: '{{#items}}' +
            '<div class="result-item" data-id="{{description}}">' +
            '<div class="item-title"><i class="bbva-icon bbva-icon__2_027_place"></i>{{description}}</div>' +
            '</div>' +
            '{{/items}}',
        fulldetail: '{{#items}}' +
            '<div class="result-item" data-id="{{keyWorkplace}}">' +
            '<div class="item-title"><i class="bbva-icon bbva-icon__5_002_build"></i>{{schoolOficialName}}</div>' +
            '<div class="item-details">' +
            '<p><span class="tagname">Tipo:</span> {{schoolAcronym}}</p>' +
            '<p><span class="tagname">CCT:</span> {{keyWorkplace}}</p>' +
            '<p><span class="tagname">Dirección:</span> {{schoolAddress}}</p>' +
            '<p><span class="tagname">Localidad:</span></i> {{location}}</p>' +
            '</div>' +
            '</div>' +
            '{{/items}}'
    };
}(jQuery));
/**
 * @file Contains all validation variables and functions
 */


/**
 * Regular expressions
 * @namespace
 * @property {Object} expRegs.[EXP].regEx the regular expression or object that contents the custom test function
 * @property {string} expRegs.[EXP].error Error message when regular expression does not match
 */
var expRegs = {
    CURP: {
        regEx: /^[A-Z]{1}[AEIOUX]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/,
        error: "Ingresa una CURP válida"
    },
    EMAIL: {
        regEx: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
        error: "Ingresa un email válido"
    },
    ZIPCODE: {
        regEx: /^\d{5}/,
        error: "Por favor ingresa un código postal válido"
    }
};

/**
 * Contains the form element validations
 * @namespace
 * @property {string} formvalidations[].selector the jquery element selector string
 * @property {function} formvalidations[].invalid return true if the element validation is invalid
 * @property {function} formvalidations[].saveValue save the 'ele' element value into the 'obj' object setting the element id as the object key
 * @property {function} formvalidations[].resetValue clean the element value
 * @property {function} formvalidations[].showError show the custom error on the element
 */
var formvalidations = [
    {
        selector: "input.form-control,textarea.form-control",
        invalid: function(ele) {
            return (ele.prop('required') && (ele.val().trim() == "" || ele.parents(".form-group").hasClass("hasError")));
        },
        saveValue: function(ele, obj) {
            _id = ele.attr("id");
            obj[_id] = (typeof ele.inputmask !== "undefined") ? ele.inputmask('unmaskedvalue') : ele.val();
        },
        resetValue: function (ele) {
            ele.clearInput();
        },
        showError: function(ele) {
            if (!ele.parents(".form-group").hasClass("hasError")) {
                ele.showError("Campo obligatorio");
            }
        }
    },
    {
        selector: ".form-group-select",
        invalid: function(ele) {
            return (ele.hasClass("required") && ele.getOptionSelected() == null);
        },
        saveValue: function(ele, obj) {
            _id = ele.attr("id");
            obj[_id] = ele.getOptionSelected();
        },
        resetValue: function (ele) {
            ele.reset();
        },
        showError: function(ele) {
            ele.showComboError("Selecciona una opción");
        }
    },
    {
        selector: ".radio-section",
        invalid: function(ele) {
            return (ele.hasClass("required") && ele.getButtonSelected().id == undefined);
        },
        saveValue: function(ele, obj) {
            _id = ele.attr("id");
            obj[_id] = ele.getButtonSelected();
        },
        resetValue: function (ele) {
            ele.clearRadio();
        },
        showError: function(ele) {
            ele.showRadioError("Selecciona una opción");
        }
    },
    {
        selector: ".checkbox",
        invalid: function(ele) {
            return (ele.hasClass("required") && !ele.isChecked());
        },
        saveValue: function(ele, obj) {
            _id = ele.attr("id");
            obj[_id] = ele.isChecked();
        },
        resetValue: function (ele) {
            ele.unCheck();
        },
        showError: function(ele) {
            ele.showCheckBoxError("");
        }
    },
    {
        selector: ".list-filter-result",
        invalid: function(ele) {
            return false;
        },
        saveValue: function(ele, obj) {
            _id = ele.attr("id");
            obj[_id] = ele.getSelected();
        },
        resetValue: function (ele) {
            ele.unselect();
        },
        showError: function(ele) {
            return;
        }
    }
];

/**
 *Validate if an element has an attribute
 *
 * @param {Object} element DOM element
 * @param {string} attrib attribute to validate
 * @returns {boolean}
 */
function hasAttr(element, attrib) {
    var _attr = element.attr(attrib);
    return (typeof _attr !== typeof undefined && _attr !== false);
}

(function(el, win) {

    /**
     *Validate the form elements
     *
     * @param {Object} formItem form element, it could be the submit button
     * @returns {Object} the form element values and the isValid flag
     */
    function validateForm(formItem) {
        var formvalues = {
            isValid: true
        };
        _$form = $(formItem).closest("form");
        for (var _i in formvalidations) {
            _$form.find(formvalidations[_i].selector).each(function() {
                formvalidations[_i].saveValue($(this), formvalues);
                if (formvalidations[_i].invalid($(this))) {
                    formvalues.isValid = !1;
                    formvalidations[_i].showError($(this));
                }
            });
        }
        return formvalues;
    }

    /**
     * Add the basic validations to each element inside indicated element
     *
     * @param {Object} $el the DOM element
     */
    win.validateControl = function($el) {
        $el.find(".openuploadfile").click(function() {
            loadTemplate($("#modal_generic .body"), templates.ufile, {
            });
        });
        $el.find("input[type='text']").inputable();
        $el.find("textarea").inputable();
        $el.find(".radio-section").radiobutton();
        $el.find(".uppercase").keyup(function(e) {
            $(this).val($(this).val().replace(/á/gi, "A").replace(/é/gi, "E").replace(/í/gi, "I").replace(/ó/gi, "O").replace(/ú/gi, "U").toUpperCase());
        });
        $el.find(".letters").keypress(function(key) {
            if ((key.charCode >= 97 && key.charCode <= 122) || //Mayusculas
                (key.charCode >= 65 && key.charCode <= 90) || //Minusculas
                (key.charCode == 0) || //Borrar
                (key.charCode == 32) || //Espacio
                (key.charCode == 45) || //guion
                (key.charCode == 46) || //punto
                (key.charCode == 209) || //enhe may
                (key.charCode == 241) || //enhe min
                (key.charCode == 225) || //á
                (key.charCode == 233) || //é
                (key.charCode == 237) || //í
                (key.charCode == 243) || //ó
                (key.charCode == 250) || //ú
                (key.charCode == 193) || //Á
                (key.charCode == 201) || //É
                (key.charCode == 205) || //Í
                (key.charCode == 211) || //Ó
                (key.charCode == 218) || //Ú
                (key.charCode == 220) || //Ü
                (key.charCode == 252) //ü
            ) return true;
            return false;
        });
        //Ñ not included
        $el.find(".alphanumeric").keypress(function(key) {
            if ((key.charCode >= 97 && key.charCode <= 122) || //Mayusculas
                (key.charCode >= 65 && key.charCode <= 90) || //Minusculas
                (key.charCode >= 48 && key.charCode <= 57) || //nums
                (key.charCode == 0) || //Borrar
                (key.charCode == 32)
            ) return true;
            return false;
        });
        $el.find(".letnum").keypress(function(key) {
            if ((key.charCode >= 97 && key.charCode <= 122) || //Mayusculas
                (key.charCode >= 65 && key.charCode <= 90) || //Minusculas
                (key.charCode == 0) || //Borrar
                (key.charCode == 32) || //Espacio
                (key.charCode == 45) || //guion
                (key.charCode == 46) || //punto
                (key.charCode == 209) || //enhe may
                (key.charCode == 241) || //enhe min
                (key.charCode == 225) || //á
                (key.charCode == 233) || //é
                (key.charCode == 237) || //í
                (key.charCode == 243) || //ó
                (key.charCode == 250) || //ú
                (key.charCode == 193) || //Á
                (key.charCode == 201) || //É
                (key.charCode == 205) || //Í
                (key.charCode == 211) || //Ó
                (key.charCode == 218) || //Ú
                (key.charCode == 220) || //Ü
                (key.charCode == 252) || //ü
                (key.charCode >= 48 && key.charCode <= 57) //nums
            ) return true;
            return false;
        });
        $el.find(".decimals").keypress(function(key) {
            if ((key.charCode >= 48 && key.charCode <= 57) || //nums
                (key.charCode == 46) //dot
            ) return true;
            return false;
        });
        $el.find(".numbers").keypress(function(key) {
            if ((key.charCode >= 48 && key.charCode <= 57) //nums
            ) return true;
            return false;
        });
        $el.find(".numg").keypress(function(key) {
            if ((key.charCode >= 48 && key.charCode <= 57) || //nums
                (key.charCode == 45) || //dash
                (key.charCode >= 97 && key.charCode <= 122) || //Uppercase
                (key.charCode >= 65 && key.charCode <= 90) //lowercase
            ) return true;
            return false;
        });

        $el.find("input[data-regex]").not("input[data-confirm]").blur(function() {
            _$this = $(this);
            _regex = $(this).attr("data-regex");
            _thisval = $(this).val();
            if (_thisval != "" && !expRegs[_regex].regEx.test(_thisval)) {
                _$this.showError(expRegs[_regex].error);
            }else{
                _$this.removeError();
            }
        });
        $el.find("input[required]").attr("data-required", true);
        $el.find("input[data-confirm]").each(function() {
            confirm_element = $(this);
            main_element = $(confirm_element.attr("data-confirm"));
            main_element.keyup(function() {
                $confirm_element = $('[data-confirm="#'+$(this).attr("id")+'"]');
                if ($(this).val() != "") {
                    if (!hasAttr($(this), "data-required")) {
                        $(this).attr("required", "required");
                    }
                    if (!hasAttr($confirm_element, "data-required")) {
                        $confirm_element.parents(".grid-item").slideDown();
                        $confirm_element.attr("required", true);
                    }
                } else {
                    if (!hasAttr($confirm_element, "data-required")) {
                        $confirm_element.parents(".grid-item").slideUp();
                        $confirm_element.removeAttr("required");
                        $confirm_element.val("");
                        $confirm_element.removeError();
                    }
                }
            });
            confirm_element.add(main_element).blur(function() {
                var $confirm_element;
                var $main_element;
                if (hasAttr($(this),"data-confirm")) {
                    $confirm_element = $(this);
                    $main_element = $($confirm_element.attr("data-confirm"));
                }else {
                    $confirm_element = $('[data-confirm="#'+$(this).attr("id")+'"]');
                    $main_element = $(this);
                }
                if ($confirm_element.val() != "" && $confirm_element.val() != $main_element.val()) {
                    $confirm_element.showError("Los correos no coinciden");
                    $main_element.showError("");
                } else if ($main_element.val() == "" && !hasAttr($main_element, "data-required")) {
                    $main_element.removeAttr("required");
                    $main_element.removeError();
                    $confirm_element.removeError();
                    $confirm_element.removeAttr("required");
                }else if ($confirm_element.val() != "" && $confirm_element.val() == $main_element.val()) {
                    $confirm_element.removeError();
                    $main_element.removeError();
                    if (!expRegs.EMAIL.regEx.test($main_element.val())) {
                        $main_element.showError(expRegs.EMAIL.error);
                        $confirm_element.showError(expRegs.EMAIL.error);
                    }
                }
            });
        });
        $el.find("input.phonenumber").inputmask({
            mask: '(999) 999-9999',
            showMaskOnHover: false
        }).blur(function() {
            _phonen = $(this).inputmask('unmaskedvalue').length;
            if (_phonen > 0 && _phonen < 10) {
                $(this).showError("Ingresa el número completo");
            }
        });
        $el.find("input.no-repeat").each(function(){
            $(this).keyup(function(){
                var group=$('.no-repeat');
                var item="";
                var item2="";
                var v1= $().add($(this));
                var contador=0;

                $.each(group, function(key,val){

                    item=$().add(val);
                    if(!v1.is(item)){
                        if(v1.val()===item.val()){
                           v1.showError("No se permite número telefónico repetido");
                           v1.addClass("repeated");
                        }
                    }

                });
                for(var i=0;i<group.length;i++){
                    item=$().add(group[i]);
                    contador=0;
                    for(var j=0;j<group.length;j++){
                        item2=$().add(group[j]);
                        if(!item.is(item2)){
                             if(item.hasClass("repeated")&&item.val()!==item2.val()){
                                 contador++;
                             }
                        }
                    }
                    if(contador===2){
                        item.removeError();
                        item.removeClass("repeated");
                    }
                }
            });
        });
        $el.find("input.mxnamount").focus(function() {
            $(this).inputmask("currency", {
                rightAlign: false,
                autoUnmask: true,
                allowPlus: false,
                allowMinus: false,
                integerDigits:"13",
            });
        }).blur(function() {
            if ($(this).inputmask && $(this).inputmask('unmaskedvalue').length == 0) {
                $(this).inputmask('remove');
            }
        });
        $el.find(".lastnameb").each(function(){
            $(this).keyup(function(){
                var item=$().add($(this));
                var checkinp = item.closest(".grid-container").find( '[data-targetdisable="#' + item.attr('id') + '"]');
                checkinp.addClass("disabled");
                var checkapp = item.closest(".grid-container").find( '[data-targettoggle="#' + checkinp.attr('id') + '"]');
                if(item.val()==="" &&  !(checkapp.hasClass("checked"))){
                    checkinp.removeClass("disabled");
                }
            });
        });
        /*VALIDATION FORM (form-control)*/
        $el.find("form").each(function() {
            $form = $(this);
            $form.find("input.form-control").each(function() {
                $formelement = this;
                $formelement.addEventListener("blur", function() {
                    $(this).val($(this).val().trim());
                    if (this.required && $(this).val().length == 0) {
                        $(this).showError($(this).attr("data-emptymessage") || "Campo obligatorio");
                    }
                });
            });
            $form.find(".form-group-select").each(function() {
                $formcombo = $(this);
                $formcombo.find(".option-select").append("<p class='i-message'><span class='text-message'>&nbsp;</span></p>");
            });
            $form.find(".checkbox").checkeable();
            $form.find(".checkbox[data-targettoggle]").each(function() {
                $(this).ckeckCallback(
                    function() {
                        $($(this).attr("data-targetdisable")).clearInput().prop("disabled", true).prop("required", false);
                        $($(this).attr("data-targettoggle")).unCheck().addClass("disabled").data("uncheck",true);
                        $($(this).attr("data-targetdisable")).setValue("XXXXX");
                    }.bind(this),
                    function() {
                        $($(this).attr("data-targetdisable")).clearInput().prop("disabled", false).prop("required", true);
                        var checkinp=$($($(this).attr("data-targettoggle")).attr("data-targetdisable"));
                        if(checkinp.val()===""){
                            $($(this).attr("data-targettoggle")).removeClass("disabled").data("uncheck",false);
                        }

                    }.bind(this)
                );
            });
            $form.find(".e-tooltip-f").each(function() {
                $etooltip = $(this);
                new Tooltip($etooltip, {
                    placement: 'bottom',
                    trigger: 'focus',
                    html: true,
                    title: $etooltip.attr("data-tooltitle")
                });
            });
            $form.find(".e-tooltip").each(function() {
                $etooltip = $(this);
                new Tooltip($etooltip, {
                    placement: 'bottom',
                    html: true,
                    title: $etooltip.attr("data-tooltitle")
                });
            });

            $form.find("textarea.form-control").each(function() {
                $formelement = this;
                $formelement.addEventListener("blur", function() {
                    $(this).val($(this).val().trim());
                    if (this.required && $(this).val().length == 0) {
                        $(this).showError($(this).attr("data-emptymessage") || "Campo obligatorio");
                    }
                });
            });

            $form.find(".btn__submit").click(function() {
                if ($(this).hasClass("btn__disabled")) return;
                _$form = $(this).closest("form");
                allDataForm = validateForm(this);
                formValidations = typeof _$form.data("validations") === "function"? _$form.data("validations")(allDataForm):true;
                if (_$form.hasClass("notify-on-error") && (!allDataForm.isValid || !formValidations)) {
                    if (!_$form.parents(".modal").length) {
                        _scrollTo = hasAttr(_$form, 'data-notify') ? _$form.attr('data-notify') : BrowserDetect.browser=="Edge"?'body':'html';
                        $(_scrollTo).animate({
                            scrollTop: _$form.offset().top - 100
                        }, 2000, "swing", function() {
                            notifyElem = _$form.prev();
                            if (notifyElem.length != 0 && notifyElem.hasClass("notification")) notifyElem.remove();
                            loadTemplate(_$form, miniTemplates.notification, {
                                type: 'error',
                                title: 'Datos obligatorios incompletos',
                                message: 'Por favor ingresa todos campos obligatorios'
                            }, 'before');
                        });
                    }else{
                        notifyElem = _$form.find(".actionsection:last").prev();
                        if (notifyElem.length != 0 && notifyElem.hasClass("notification")) notifyElem.remove();
                        loadTemplate(_$form.find(".actionsection:last"), miniTemplates.notification, {
                            type: 'error',
                            title: 'Datos obligatorios incompletos',
                            message: 'Por favor ingresa todos campos obligatorios'
                        }, 'before');
                    }

                    if (hasAttr(_$form,"data-status")) {
                        $(_$form.attr("data-status")).removeClass("complete");
                        $(_$form.attr("data-status")).addClass("incomplete");
                        $(_$form.attr("data-status")).html('<i class="bbva-icon ui-warning"></i>Incompleto');
                    }
                }else{
                    if (_$form.prev().length != 0 && _$form.prev().hasClass("notification")) _$form.prev().remove();
                    if (typeof $(this).data("complete") === "function") {
                        $(this).data("complete")(allDataForm);
                    }
                }
            });
        });
    };
    win.validateControl(el);

    /**
     *Fill the form elements
     *
     * @param {Object} $frm form element
     * @param {Object} fdata the values to set on each element, the object key es considered as the element id
     */
    win.fillForm = function ($frm, fdata) {
        $.each( fdata, function( key, value ) {
            $3l = $frm.find("#"+key);
            if ($3l.is("input") || $3l.is("textarea")) {
                $3l.clearInput();
                $3l.setValue(value);
            }else if ($3l.hasClass("form-group-select")) {
                $3l.reset();
                if (value != null) {
                    $3l.selectOptionId(typeof value == 'object'?value.id:value);
                }
            }else if ($3l.hasClass("radio-section")) {
                $3l.clearRadio();
                $3l.selectRadioId(typeof value == 'object'?value.id:value);
            }else if ($3l.hasClass("list-filter-result")) {
                $3l.unselect();
                $3l.selectFromList(value);
            }else if ($3l.hasClass("checkbox")) {
                $3l.unCheck();
                if (value) {
                    $3l.doCheck();
                }
            }else{
                console.log("fillForm: Element "+key+" doesn't exists in form",$frm);
            }
        });
    };

    /**
     *Reset all form elements value
     *
     * @param {Object} $frm form element
     */
    win.resetForm = function ($frm) {
        for (var _i in formvalidations) {
            $frm.find(formvalidations[_i].selector).each(function() {
                formvalidations[_i].resetValue($(this));
            });
        }
    };
})($(document), window);

var __ = (function() {
    /**
     *Core function to get a json path into an object
     *
     * @param {Object} obj the JSON object
     * @param {string} path path to get
     * @returns {string|Object} the path value if it exists, otherwise, an undefined object
     */
    var baseGet = function(obj, path) {
        var args = path.split('.');
        for (var i = 0; i < args.length; i++) {
            wasArray = {
                flag: false,
                value: 0
            };
            if (args[i].indexOf('[')!=-1) {
                wasArray.flag = true;
                wasArray.value = args[i].substring(args[i].indexOf("[")+1, args[i].indexOf("]"));
                args[i] = args[i].split('[')[0];
            }
            if (!obj || !obj.hasOwnProperty(args[i])) {
                return undefined;
            }
            obj = wasArray.flag? obj[args[i]][wasArray.value] : obj[args[i]];
        }
        return typeof obj == "string"?obj.trim():obj;
    };
    return {
        /**
         *Get the path value into a JSON object
         *
         * @param {Object} object the JSON object
         * @param {string} path the path to get
         * @param {any} defaultValue default value if the path does not exist
         * @returns {any} the path value or the default value
         */
        get: function(object, path, defaultValue) {
            var result = object == null ? undefined : baseGet(object, path);
            return result === undefined ? defaultValue : result;
        }
    };
})();
/**
 * @file Contents all functions that is needed to show the container of the web page, including eventlisteners, asign options and execute services.
 */
$("#btn-exit").click(function () {
    logout();
});

var toggleModule = function ($head) {
    if (!$head.hasClass("animated")) {
        $content = $("#" + $head.attr("data-target"));
        $head.addClass("animated");
        if ($head.hasClass("is-open")) {
            $head.removeClass("is-open");
            $content.slideUp(400, function() {
                $head.removeClass("animated");
            });
        } else {
            for (var i = 0; i < $(".accordion .step-header").length; i++) {
                element = $(".accordion .step-header")[i];
                if ($(element).hasClass("is-open") &&
                    $(element).attr("data-target") != $head.attr("data-target")) {
                    $idTemp = $("#" + $(element).attr("data-target"));
                    $idTemp.slideUp();
                }
            }
            $(".accordion .step-header").not("data-target", $head.attr("data-target")).removeClass("is-open");
            $head.addClass("is-open");
            $content.slideDown(400, function() {
                $head.removeClass("animated");
            });
        }
    }
};
$(".accordion .step-header").click(function(e) {
    if (hasAttr($(this),"data-catalog") && $(this).attr("data-loaded")=="false") {
        _lcatalog=$(this).attr("data-catalog");
        fn_verifyCatalogs(loadModule.moduleCatalog[_lcatalog].list(),loadModule.moduleCatalog[_lcatalog].callback);
    }else{
        toggleModule($(this));
    }
});

$("#email, #email2, #email3").blur(function() {
    if($("#email").val() != "" && $("#email").val() == $("#email2").val()){
        $("#email2").showError("No se permiten correos duplicados");
    }
    if($("#email2").val() != "" && $("#email2").val() == $("#email3").val()){
        $("#email3").showError("No se permiten correos duplicados");
    }
    if($("#email").val() != "" && $("#email").val() == $("#email3").val()){
        $("#email3").showError("No se permiten correos duplicados");
    }
});


//Datos personales
$("#dbirthdate").comboSelect(day);

$("#mbirthdate").comboSelect(month);


/**
 *Function that fills the combos of catalogs
 *
 * @param {string} id the Element's id to apply the combo options
 * @param {Object[]} object contains the combo object to be list
 * @param {function} fn callback function when a option is selected
 */
var fnFillCatalogs =  function (id, object, fn) {
    object = object || [];
    $("#"+id).comboSelect(object, fn);
};

$("#dsclass").comboSelect(day);

$("#msclass").comboSelect(month);
//buttons

$("#btn_savegd").data("complete", function(_data) {
    alert("llenar info");
});




/**
 *This function is executed when the "Finalizar registro" button is pressed, it executes the service that confirm all student information
 *
 */
function saveglobal(){
    restExec({
        service: 'UPDATE_ANNOUNCEMENT',
        data: {
                "scholarshipProgram":{
                   "id": moduleInitData.announcement.scholarshipProgram.id
                },
                "scholar":{
                   "Id": ivUser
                }
        },
        showWait: true,
        success: rest_fnUpdateScholarshipAnnouncementStatus
    });
}

/**
 *Function that change a module status to complete and shows a success message as a result
 *
 * @param {Object} $idContent the header module element to change status
 * @param {?string} tit optional title message for the success message modal, default value: "Datos guardados"
 * @param {?string} msg optional message content for the success message modal, default value: "Tus datos se han almacenado correctamente, gracias"
 */
function changeStatusSel($idContent, tit, msg) {
    _title = tit ? tit : "Datos guardados";
    _message = msg ? msg : "Tus datos se han almacenado correctamente, gracias";
    $elstatus = $idContent.siblings(".step-header").find(".step-status");
    $idContent.siblings(".step-header").removeClass("is-open");
    $idContent.slideUp();
    loadTemplate($("#modal_generic .body"), miniTemplates.success, {
        title: _title,
        message: _message
    });
}

/**
 *Function that changes the module status, if the status value is "complete" then the module status is changed to "complete" otherwise the status is changed to "incomplete"
 *
 * @param {object} $idContent module content element to chance status
 * @param {string} status status to set
 */
function changeModuleSatus($idContent, status) {
    $elstatus = $idContent.siblings(".step-header").find(".step-status");
    if (status == "complete") {
        $elstatus.removeClass("incomplete");
        $elstatus.addClass("complete");
        $elstatus.html('<i class="bbva-icon ui-checkmark-filled"></i>Completo');
    } else {
        $elstatus.removeClass("complete");
        $elstatus.addClass("incomplete");
        $elstatus.html('<i class="bbva-icon ui-warning"></i>Incompleto');
    }
}
/*MODAL*/
$(".modal .icon-close").click(function() {
    $(this).parents(".modal").removeAttr("open");
    callbackCloseModal();
});






$(".o_two").comboSelect((function() {
    _arr_0_2 = [];
    for (var i = 0; i < 2; i++) {
        _arr_0_2.push({
            id: "" + i,
            description: "" + i
        });
    }
    _arr_0_2.push({
        id: "2",
        description: "2 o más"
    });
    return _arr_0_2;
})());

$('.r-options').onChecked();




/**
 *Returns true if the date is a valid date
 *
 * @param {string} date date with format mm/dd/yyyy
 * @returns {boolean}
 */
function vali_date(date) {
    var _month = date[0] + date[1];
    var newdate = new Date(date);
    if (parseInt(_month) != parseInt((newdate.getMonth() + 1))) {
        return false;
    } else {
        return true;
    }
}
$('#dbirthdate').onSelect(function() {
    if (!fbdate) {
        var dateto = $('#mbirthdate').getOptionSelected().id + '/' + $('#dbirthdate').getOptionSelected().description + '/' + $('#ybirthdate').val();
        if (vali_date(dateto)) {
            fbdate = true;
            $('#mbirthdate').removeComboError();
        } else {
            $(this).showComboError("Fecha inválida");
        }
    }
});
$('#mbirthdate').onSelect(function() {
    if (!fbdate) {
        var dateto = $('#mbirthdate').getOptionSelected().id + '/' + $('#dbirthdate').getOptionSelected().description + '/' + $('#ybirthdate').val();
        if (vali_date(dateto)) {
            fbdate = true;
            $('#dbirthdate').removeComboError();
        } else {
            $(this).showComboError("Fecha inválida");
        }
    }
});
$('#dsclass').onSelect(function() {
    if (!fcdate) {
        var dateto = $('#msclass').getOptionSelected().id + '/' + $('#dsclass').getOptionSelected().description + '/' + $('#ysclass').val();
        if (vali_date(dateto)) {
            fcdate = true;
            $('#msclass').removeComboError();
        } else {
            $(this).showComboError("Fecha inválida");
        }
    }
});
$('#msclass').onSelect(function() {
    if (!fcdate) {
        var dateto = $('#msclass').getOptionSelected().id + '/' + $('#dsclass').getOptionSelected().description + '/' + $('#ysclass').val();
        if (vali_date(dateto)) {
            fcdate = true;
            $('#dsclass').removeComboError();
        } else {
            $(this).showComboError("Fecha inválida");
        }
    }
});

$("#btn_save_all").click(function() {
    alert("salvar todo");
});

/**
 * Contains the module functions to get the module information
 * @type {Object}
 */
var loadModule = {
	
	/**
     *Executes the 'LIST_CATALOGS' service and saves the result on catalogs variable
     *
     * @param {string} cat the catalog to get
     * @param {function} finallySuccess callback function when the catalog is got
     */
    getCatalog: function (cat, finallySuccess) {
        if (catalogs[cat] == undefined || catalogs[cat].length == 0) {
            restExec({
                service: 'LIST_CATALOGS',
                type: 'GET',
                async: true,
                showWait:true,
                hasUrlParam: true,
                urlParam: {
                    catalog: cat,
                },
                data: {},
                finallyError: function () {
                    finallySuccess();
                },
                finallySuccess: [function (data) {
                    rest_fnGetSchoolCatalog(cat, data);
                },finallySuccess]
            });
        }else{
            finallySuccess(catalogs[cat]);
        }
    },

   /**
     *Has the catalog list by module, it execute those catalogs before the module is shown.
     *
     */
    moduleCatalog: {
        general:{
            list: function () {
                return ["CAT_BANK", "CAT_CREDITMORTGAGE", "CAT_CREDITCOMMERCIAL", "CAT_GRAVAMEN"];
            },
            callback: function () {
                fnFillCatalogs("sec1generatingbank", __.get(catalogs,"CAT_BANK",[]), function(el) {});
                fnFillCatalogs("sec1mortgagecredittype", __.get(catalogs,"CAT_CREDITMORTGAGE",[]), function(el) {});
                fnFillCatalogs("sec1commercialcredit", __.get(catalogs,"CAT_CREDITCOMMERCIAL",[]), function(el) {});
                fnFillCatalogs("sec1gravamen", __.get(catalogs,"CAT_GRAVAMEN",[]), function(el) {});
                $('[data-target="general-data"]').attr("data-loaded","true");
                if (typeof moduleInitData.general != "undefined") {
                    rest_fnGetGeneralData(moduleInitData.general);
                }
                toggleModule($('[data-target="general-data"]'));
            }
        },
        notarydata: {
            list: function () {
                return ["CAT_TYPEPROPERTY", "CAT_NOTARY", "NOTARY_DATA", "CAT_STATE"];
            },
            callback: function () {
                fnFillCatalogs("sec2typepropertie", __.get(catalogs,"CAT_TYPEPROPERTY",[]));
                fnFillCatalogs("sec2notarysquare", __.get(catalogs,"CAT_NOTARY",[]), function(el) {});
                fnFillCatalogs("sec2notarynumber", __.get(catalogs,"NOTARY_DATA",[]), function(el) {});
                fnFillCatalogs("sec2state", __.get(catalogs,"CAT_STATE",[]));
                fnFillCatalogs("sec2municipality", __.get(catalogs,"CAT_STATE",[]));
                $('[data-target="schoolar-data"]').attr("data-loaded","true");
                if (typeof moduleInitData.notarydata != "undefined"){
                    rest_fnGetScholarInf(moduleInitData.notarydata);
                }
                                
                toggleModule($('[data-target="schoolar-data"]'));
            }
        },
        dataInmueble: {
            list: function () {
                return ["CAT_TYPEPROPERTY","CAT_SUBTYPEPROPERTY","CAT_STATE"];
            },
            callback: function () {
                fnFillCatalogs("sec2typepropertie", __.get(catalogs,"CAT_TYPEPROPERTY",[]));
                fnFillCatalogs("subtypeproperty", __.get(catalogs,"CAT_SUBTYPEPROPERTY",[]));
                fnFillCatalogs("propertystate", __.get(catalogs,"CAT_STATE",[]));
                fnFillCatalogs("sec3state", __.get(catalogs,"CAT_STATE",[]),function(ele) {
                    var otraClaseElems = $("#municipalities").find(".disabled").removeClass('disabled');
                    console.log("otraClaseElems",otraClaseElems);
                });

                
                $('[data-target="inmueble-data"]').attr("data-loaded","true");
                if (typeof moduleInitData.dataInmueble != "undefined"){
                    rest_fnGetHomeServices(moduleInitData.dataInmueble);
                }
                toggleModule($('[data-target="inmueble-data"]'));
            }
        }
    },
    /**
     *Verify if the student info is allready confirmed and if there is no incomplete modules, if so it hides the confirm button
     *
     */
    checkStatus: function() {
        setTimeout(function () {
            if ($(".step-header .step-status.incomplete").length == 0 && __.get(moduleInitData,"announcement.globalStatus","0") == '0') {//no hay módulos incompletos
                $(".submtbtn.send").removeAttr("style");
            }else{
                $(".submtbtn.send").attr("style","display: none");
            }
        },450);
    },
    /**
     *Returns true if the parameter is a function
     *
     * @param {?Object} funct the object to validate
     * @returns {boolean}
     */
    ensureFun: function(funct) {
        return typeof funct == "function"?funct:rest_fnNothig;
    },
    /**
     *Gets the states
     *
     * @param {function} finallySuccess optional callback function
     */
    getStates: function (finallySuccess) {
        if (stateTransactions == undefined || stateTransactions.length == 0) {
            restExec({
                showWait:true,
                service: 'GET_STATES',
                type: 'POST',
                data: {},
                asyn: false,
                finallySuccess: [function (data) {
                    rest_fnGetStates(data);
                },finallySuccess],
                finallyError: [function (data) {
                    rest_fnGetStates(data);
                },finallySuccess]
            });
        }else{
            finallySuccess(stateTransactions);
        }
    },
    /**
     *Gets the municipalities of a state
     *
     * @param {string|number} id the state id
     * @param {function} finallySuccess optional callback function
     */
    getMunicipalities: function (id, finallySuccess) {
        if (municipalityTransactions[id] == undefined || municipalityTransactions[id].length == 0) {
            restExec({
                showWait:true,
                service: 'GET_MUNICIPALITY',
                type: 'POST',
                asyn: false,
                data: {
                    state:id
                },
                finallySuccess: [function (data) {
                    rest_fnGetMunicipalities(id, data);
                },finallySuccess],
                finallyError: [function (data) {
                    rest_fnGetMunicipalities(id, data);
                },finallySuccess]
            });
        }else{
            finallySuccess(municipalityTransactions[id]);
        }
    }
};


/**
 *Executes the services needed to load tha main module "datos generales"
 *
 */
var loadMainModules = function () {
alert("loadMainModules");
};

/**
 *Execute services to show the next modules
 *
 * @param {function} _cllback callback function
 */
var loadNextModules = function (_cllback) {
    if (typeof _cllback !== 'function') {
        _cllback = loadModule.checkStatus;
    }
    // LIST_SERVICES.listRestExec({
        // service: 'GET_LEGAL',
        // type: 'GET',
        // hasUrlParam: true,
        // urlParam: {
            // scholarId: ivUser,
            // scholarshipProgramId: moduleInitData.announcement.scholarshipProgram.id,
            // moduleID: 31
        // },
        // data: {},
        // success: rest_fnGetLegalDisclaimers,
    // },_cllback);
};

/**
 * Validates if the user is a FUN type, if so 'SCHOLAR_DETAIL' is executed to detect if the user is allready registered
*/

//pre-load templates
Object.keys(templates).forEach(function(_template) {
    $.get(templates[_template].path,function (templatetext) {
        templates[_template].html = templatetext;
    });
});

var fn_opennotification = function () {
    fn_showModal();
 };

$("#currentYear").text(new Date().getFullYear());

var fn_opennotification = function () {
    fn_showModal();
};
