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
 * Contains the dommy schools and functions
 * @property {Array} cct List of dommy schools, it has an order: [0] Program 1 dommy school, [1] Program 2 dommy school, [2] Program 7 dommy school.
 * @property {function} isDommy Returns true if a CCT is a dommy school CCT.
 * @property {function} getDommyCCT Returns the dommy school CCT acording to the program.
 * @property {function} getDommyDescription Returns the dommy school description acording to the program.
 */
var dommySchools = {
    cct: ["11AAA1111A","11BBB1111B","11CCC1111C"],
    isDommy: function (_cctVal) {
        _isD = false;
        for (var _icct = 0; _icct < dommySchools.cct.length; _icct++) {
            if (_cctVal == dommySchools.cct[_icct]) {
                _isD=true;
                break;
            }
        }
        return _isD;
    },
    getDommyCCT: function(){
        _programID=moduleInitData.announcement.scholarshipProgram.id;
        return _programID=="1"?dommySchools.cct[0]:_programID=="2"?dommySchools.cct[1]:_programID=="7"?dommySchools.cct[2]:"";
    },
    getDommyDescription: function(){
        _descSt = "";
        switch (moduleInitData.announcement.scholarshipProgram.id) {
            case "1":
                _descSt = "PENDIENTE SECUNDARIA";
                break;
            case "2":
                _descSt = "PENDIENTE BACHILLERATO";
                break;
            case "7":
                _descSt = "PENDIENTE UNIVERSIDAD";
                break;
            default:
                break;
        }
        return _descSt;
    }
};
/**
 * Contains the student information, it is use only if a student with a FUN user enter the first time.
 * @type {Object}
 */
var dataStudent = {};
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
 * Contains all families by type.
 * @property {Object} fromhome              - all fromhome family type.
 * @property {number} fromhome.total        - total fromhome family type selected.
 * @property {Object[]} fromhome.members    - all fromhome family type.
 * @property {function} fromhome.index      - gets the current index of fromhome family type.
 * @property {function} fromhome.getTotal   - gets the total fromhome family type members excluding the deleted members.
 * @property {function} fromhome.getMembers - gets all fromhome family type members excluding the deleted members.
 * @property {Object} awayfromhome              - all awayfromhome family type.
 * @property {number} awayfromhome.total        - total awayfromhome family type selected.
 * @property {Object[]} awayfromhome.members    - all awayfromhome family type.
 * @property {function} awayfromhome.index      - gets the current index of awayfromhome family type.
 * @property {function} awayfromhome.getTotal   - gets the total awayfromhome family type members excluding the deleted members.
 * @property {function} awayfromhome.getMembers - gets all awayfromhome family type members excluding the deleted members.
 * @property {Object} bbva.member               - contains the bbva family member.
 * @property {boolean} unregistered             - indicates if the families are unregistered.
 */
var family = {
    fromhome: {
        total: 0,
        members: [],
        index: function() {
            return family.fromhome.getTotal() + 1;
        },
        getTotal: function () {
            _t = 0;
            for (_p = 0; _p < family.fromhome.members.length; _p++) {
                _fam0 = family.fromhome.members[_p];
                if (_fam0.statusRelated != "Delete") {
                    _t++;
                }
            }
            return _t;
        },
        getMembers: function () {
            _tMem = [];
            for (_p = 0; _p < family.fromhome.members.length; _p++) {
                _fam0 = family.fromhome.members[_p];
                if (_fam0.statusRelated != "Delete") {
                    _tMem.push(_fam0);
                }
            }
            return _tMem;
        }
    },
    awayfromhome: {
        total: 0,
        members: [],
        index: function() {
            return family.awayfromhome.getTotal() + 1;
        },
        getTotal: function () {
            _t = 0;
            for (_p = 0; _p < family.awayfromhome.members.length; _p++) {
                _fam0 = family.awayfromhome.members[_p];
                if (_fam0.statusRelated != "Delete") {
                    _t++;
                }
            }
            return _t;
        },
        getMembers: function () {
            _tMem = [];
            for (_p = 0; _p < family.awayfromhome.members.length; _p++) {
                _fam0 = family.awayfromhome.members[_p];
                if (_fam0.statusRelated != "Delete") {
                    _tMem.push(_fam0);
                }
            }
            return _tMem;
        }
    },
    bbva: {
        member: {}
    },
    unregistered: true
};
/**
 * Indicates if the module "datos generales" has a complete status
 * @type {boolean}
 */
var firstModuleComplete = false;
/**
 * Contains the email by state, it is used to report a new school
 * @type {Object}
 */
var scholsEmail = {
    "1": "becas_aguascalientes.mx@bbva.com",
    "2": "becas_bc.mx@bbva.com",
    "3": "becas_bcs.mx@bbva.com",
    "4": "becas_campeche.mx@bbva.com",
    "5": "becas_coahuila.mx@bbva.com",
    "6": "becas_colima.mx@bbva.com",
    "7": "becas_chiapas.mx@bbva.com",
    "8": "becas_chihuahua.mx@bbva.com",
    "9": "becas_cdmx.mx@bbva.com",
    "10": "becas_durango.mx@bbva.com",
    "11": "becas_guanajuato.mx@bbva.com",
    "12": "becas_guerrero.mx@bbva.com",
    "13": "becas_hidalgo.mx@bbva.com",
    "14": "becas_jalisco.mx@bbva.com",
    "15": "becas_edomex.mx@bbva.com",
    "16": "becas_michoacan.mx@bbva.com",
    "17": "becas_morelos.mx@bbva.com",
    "18": "becas_nayarit.mx@bbva.com",
    "19": "becas_nuevol.mx@bbva.com",
    "20": "becas_oaxaca.mx@bbva.com",
    "21": "becas_puebla.mx@bbva.com",
    "22": "becas_queretaro.mx@bbva.com",
    "23": "becas_quintanaroo.mx@bbva.com",
    "24": "becas_slp.mx@bbva.com",
    "25": "becas_sinaloa.mx@bbva.com",
    "26": "becas_sonora.mx@bbva.com",
    "27": "becas_tabasco.mx@bbva.com",
    "28": "becas_tamaulipas.mx@bbva.com",
    "29": "becas_tlaxcala.mx@bbva.com",
    "30": "becas_veracruz.mx@bbva.com",
    "31": "becas_yucatan.mx@bbva.com",
    "32": "becas_zacatecas.mx@bbva.com"
};
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
 * Contains the school list
 * @type {Object[]}
 */
var schools = [];
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
 * Support contact information
 * @namespace
 * @property {string} contact.phone support phone number
 * @property {string} contact.email support email
 */
var contact = {
    phone: "",
    email: ""
};

/**
 * Save the help Tooltip to report a new school
 * @type {Tooltip}
 */
var helpScoolTooltip;
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
 *Creates the sticky float buttons
 *
 */
function fillHelpSticky() {
    var helpStickyConfig = {
        placement: 'left',
        trigger: "click",
        html: true,
        closeOnClickOutside: true,
        title: '',
        tooltiptitle: {
            contactPhone: contact.phonetext,
            contactEmail: contact.email
        }
    };
    if (isMobile.any()) {
        $("body").addClass("mobile");
        $(".fig-username").find(".username").remove();
        $(".btn-menu").find(".action-exit").remove();
        btn-exit
        helpStickyConfig.placement = 'top';
        helpStickyConfig.tooltiptitle.contactPhone = '<a href="tel:+52'+contact.phone+'">'+contact.phonetext+'</a>';
        helpStickyConfig.tooltiptitle.contactEmail = '<a href="mailto:'+contact.email+'">'+contact.email+'</a>';
    }
    new Tooltip($("#call_h"),helpStickyConfig)
        .updateTitleContent('<div class="tooltip_title">Ll\u00e1manos</div>' +
        '<div class="tooltip_message">Será un placer atenderte por télefono,'+
        '<b> de lunes a viernes </b>de <b>9 </b> a <b>18 h</b> en el:</div>'+
        '<div class="tooltip_contact">'+helpStickyConfig.tooltiptitle.contactPhone+'</div>'+
        '<div class="tooltip_message">Tiempo medio de espera:<br><b>5 minutos</b></div>');

    new Tooltip($("#email_h"),helpStickyConfig)
        .updateTitleContent('<div class="tooltip_title">Escríbenos</div>' +
        '<div class="tooltip_message">Será un placer atenderte por correo</div>'+
        '<div class="tooltip_contact">'+helpStickyConfig.tooltiptitle.contactEmail+'</div>'+
        '<div class="tooltip_message">Tiempo medio de espera:<br><b>24 horas</b></div>');

    helpScoolTooltip = new Tooltip($("#help_sh"),helpStickyConfig);
    helpScoolTooltip.updateTitleContent('<div class="tooltip_title">¿Te podemos ayudar?</div>' +
        '<div class="tooltip_message">Hemos detectado que no encuentras tu escuela</div>'+
        '<div class="btn_ht"><span title="Sí" aria-label="Sí" class="btn__basic btn__small" id="st_btn_reportschool">'+
            '<span aria-hidden="true">Sí</span>'+
        '</span></div>'+
        '<div class="btn_ht"><span title="No" aria-label="No" class="btn__basic btn__small" id="st_btn_cancel">'+
            '<span aria-hidden="true">No</span>'+
        '</span></div>');
    helpSticky();
}

/**
 *Add the help sticky buttons an event listener
 *
 */
function helpSticky() {
    $(".btn_help").click(function(e){
        e.preventDefault();
        if($(this).hasClass("active")){$(this).removeClass("active")}else{$(".btn_help").not("id", $(this).attr("id")).removeClass("active");
        $(this).addClass("active");}
    });

    $(".page-container").click(function() {
        if ($(".btn_help").hasClass("active")){
            $(".btn_help").removeClass("active");
            helpScoolTooltip.hide();
        }
    });
}

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
 *Is executed when the get scholar information service is successfully executed, save the response data in moduleInitData.schoolData and show it in the module content.
 *
 * @param {Object} data service response data object
 */
var rest_fnGetScholarInf = function(data) {
    moduleInitData.schoolData = data;
    if(__.get(data,'operation.moduleStatus','0') == "1"){//si el módulo es completo
        changeModuleSatus($("#schoolar-data"), "complete");
    }
    if ($('[data-target="schoolar-data"]').attr("data-loaded")!="true") {
        LIST_SERVICES.listRestExec({
            showWait:true,
            service: 'GET_MUNICIPALITY',
            type: 'POST',
            asyn: false,
            data: {
                state:__.get(moduleInitData.schoolData,'schooling.location.state.id',0)
            },
            finallySuccess: [function (data) {
                rest_fnGetMunicipalities(__.get(moduleInitData.schoolData,'schooling.location.state.id',0), data);
            }],
            finallyError: [function (data) {
                rest_fnGetMunicipalities(__.get(moduleInitData.schoolData,'schooling.location.state.id',0), data);
            }]
        });
        return;
    }
    if (dommySchools.isDommy(__.get(data,'operation.keyWorkplace',''))) {
        validateEmptyOption($("#state_s"));
        validateEmptyOption($("#municipalities_s"));
    }
    if (__.get(data,'schooling.location.state.id',"") == 0 || __.get(data,'schooling.location.state.id',"") == "0") {
        _prId = moduleInitData.announcement.scholarshipProgram.id;
        municipalityTransactions["0"] = [{
            id:0,
            description: dommySchools.getDommyDescription()
        }];
    }

    loadModule.getMunicipalities(__.get(data,'schooling.location.state.id',0),function(){
        data = moduleInitData.schoolData;
        $("#municipalities_s").comboSelect(municipalityTransactions[__.get(data,'schooling.location.state.id',"")]);

        fillForm($("#formschdata"),{
            promgen: __.get(data,'average',''),
            state_s: __.get(data,'schooling.location.state.id',''),
            municipalities_s: __.get(data,'schooling.location.municipality.id',''),
            search_by: "CCT",
            cct: __.get(data,'operation.keyWorkplace',''),
            turn: __.get(data,'schooling.profession.scholarShift.id',''),
            career_area: __.get(data,'schooling.profession.area.id',''),
            career_subarea: __.get(data,'schooling.profession.subArea.id',''),
            program_career: __.get(data,'schooling.profession.careerName',''),
            type_s: __.get(data,'schooling.profession.type.id',''),
            duration: __.get(data,'schooling.profession.duration.id',''),
            trans: __.get(data,'expenses.transportationAmount','')!=""?formatMoney(__.get(data,'expenses.transportationAmount','')):"",
            dsclass: __.get(data,'schooling.profession.classesStartDate','--').split("/")[0],
            msclass: __.get(data,'schooling.profession.classesStartDate','--').split("/")[1],
            ysclass: __.get(data,'schooling.profession.classesStartDate','--').split("/")[2],
            change_h: __.get(data,'changeAddress','').toString()=="true"?"SI":__.get(data,'changeAddress','').toString()=="false"?"NO":"",
        });
        $("#modality").selectOptionDescription(__.get(data,'schooling.profession.modality.description',''));
        if (__.get(data,'changeAddress','').toString()=="true") {
            fillForm($("#formschdata"),{
                state_m: __.get(data,'schooling.newLocation.state.id',''),
                municipalities_m: __.get(data,'schooling.newLocation.municipality.id',''),
                rent: __.get(data,'expenses.isPayRent','').toString()=="true"?"SI":__.get(data,'expenses.isPayRent','').toString()=="false"?"NO":""
            });
        }
        if (__.get(data,'expenses.isPayRent','').toString()=="true") {
            fillForm($("#formschdata"),{
                payment_rent: __.get(data,'expenses.mounthlyRent','')!=""?formatMoney(__.get(data,'expenses.mounthlyRent','')):"",
            });
        }
        if (__.get(data,'operation.keyWorkplace','') != "") {
            $("#schoolslist").searchList({
                filterid: "keyWorkplace",
                filtertext: "schoolOficialName",
                items: [{
                    "keyWorkplace": __.get(data,'operation.keyWorkplace',''),
                    "schoolOficialName": __.get(data,'schooling.schoolName','')
                }]
            });
            $("#schoolslist").selectFromList(__.get(data,'operation.keyWorkplace',''));
        }
        if (dommySchools.isDommy(__.get(data,'operation.keyWorkplace',''))) {
            $("#search_by .radio-buttons").addClass("disabled");
            $("input#cct").prop("disabled", true);
        }
        if (seedFindSchool) {
            clearTimeout(seedFindSchool);
            seedFindSchool = undefined;
        }
    });
};

/**
 *Is executed when the get socioeconomic information service is successfully executed, save the response data in moduleInitData.sociodemographic and show it in the module content.
 *
 * @param {Object} data service response data object
 */
var rest_fnGetSocialData = function(data) {
    data.relatedPersons = __.get(data,"relatedPersons",[]);
    //place the student in the fisrt array position
    for (i = 0; i < data.relatedPersons.length; i++) {
        if (data.relatedPersons[i].relationship.id == "1") {
            _famAlumno = data.relatedPersons[i];
            data.relatedPersons.splice(i, 1);
            data.relatedPersons.splice(0, 0, _famAlumno);
        }
    }
    moduleInitData.sociodemographic = data;
    _famMembers = __.get(data,'relatedPersons',[]);
    family.fromhome.members = [];
    family.awayfromhome.members = [];
    family.bbva.member = {};

    for (i = 0; i < _famMembers.length; i++) {
        var _fammember = _famMembers[i];
        switch (__.get(_fammember,'personDetail.personType','')) {
            case "PERSONS_LIVE_HOME":
                family.fromhome.members.push({
                    "alreadyExists":"true",
                    "familyBoss": __.get(_fammember,'personDetail.isHeadOfHousehold','')===true?"Sí":"No",
                    "statusRelated": __.get(_fammember,'statusRelatedPersonsInformation','OK'),
                    "relatedid": __.get(_fammember,'id',''),
                    "fam_name": __.get(_fammember,'name',''),
                    "fam_appat": __.get(_fammember,'lastName',''),
                    "fam_apmat": __.get(_fammember,'secondLastName',''),
                    "fam_o_relationship": __.get(_fammember,'relationship.otherRelationshipDescription',''),
                    "fam_age": __.get(_fammember,'personDetail.age','0'),
                    "fam_omedic": __.get(_fammember,'personDetail.healthCareEntity.otherHealthCareEntity',''),
                    "total_f": formatMoney(__.get(_fammember,'personDetail.incomes[0].amount',0),true),
                    "sprogramname": __.get(_fammember,'personDetail.otherGovernmentScholarship.otherScholarshipProgramDescription',''),
                    "total_sf": formatMoney(__.get(_fammember,'personDetail.otherGovernmentScholarship.incomes[0].amount',0),true),
                    "fam_relationship": {
                        "id": __.get(_fammember,'relationship.id',''),
                        "description": __.get(_fammember,'relationship.description','')
                    },
                    "fam_relationship_des": __.get(_fammember,'relationship.id','')!="10"?__.get(_fammember,'relationship.description',''):__.get(_fammember,'relationship.otherRelationshipDescription',''),
                    "fam_civil": {
                        "id": __.get(_fammember,'personDetail.maritalStatus.id',''),
                        "description": __.get(_fammember,'personDetail.maritalStatus.description','')
                    },
                    "fam_schoollevel": {
                        "id": __.get(_fammember,'personDetail.education.id',''),
                        "description": __.get(_fammember,'personDetail.education.description','')
                    },
                    "fam_medic": {
                        "id": __.get(_fammember,'personDetail.healthCareEntity.id',''),
                        "description": __.get(_fammember,'personDetail.healthCareEntity.description','')
                    },
                    "fam_ocupation": {
                        "id": __.get(_fammember,'personDetail.economicActivity.id',''),
                        "description": __.get(_fammember,'personDetail.economicActivity.description','')
                    },
                    "fam_kindschoolarship": {
                        "id": __.get(_fammember,'personDetail.otherGovernmentScholarship.otherGovernmentScholarshipType.id',''),
                        "description": __.get(_fammember,'personDetail.otherGovernmentScholarship.otherGovernmentScholarshipType.description','')
                    },
                    "fam_programschoolarship": {
                        "id": __.get(_fammember,'personDetail.otherGovernmentScholarship.id',''),
                        "description": __.get(_fammember,'personDetail.otherGovernmentScholarship.description','')
                    },
                    "fam_gender": {
                        "id": __.get(_fammember,'personDetail.gender.id',''),
                        "description": __.get(_fammember,'personDetail.gender.id','')
                    },
                    "fam_studing": {
                        "id": __.get(_fammember,'personDetail.isStudent',''),
                        "description": __.get(_fammember,'personDetail.isStudent','') == true?"Sí":"No"
                    },
                    "fam_worked": {
                        "id": __.get(_fammember,'personDetail.hasWorkedLastMonth','').toString(),
                        "description": __.get(_fammember,'personDetail.hasWorkedLastMonth','') === true?"Sí":"No"
                    },
                    "fam_otherschoolarship": {
                        "id": __.get(_fammember,'personDetail.otherGovernmentScholarship.id','') == ""?"1": "0",
                        "description": __.get(_fammember,'personDetail.otherGovernmentScholarship.id','') == ""?"No": "Sí"
                    },
                    "m_checkfirstname": __.get(_fammember,'lastName','') == "XXXXX"?true:false,
                    "m_checklastname": __.get(_fammember,'secondLastName','') == "XXXXX"?true:false
                });
                c_fam = family.fromhome.members[family.fromhome.members.length-1];
                if (c_fam.fam_otherschoolarship.id=="0") {
                    c_fam.infoscolarship = '{"tipo":"' + __.get(_fammember,'personDetail.otherGovernmentScholarship.otherGovernmentScholarshipType.description','') + '","programa": "' + __.get(_fammember,'personDetail.otherGovernmentScholarship.description','') + '","monto": "' + formatMoney(__.get(_fammember,'personDetail.otherGovernmentScholarship.incomes[0].amount',0),true) + '"}';
                }
                break;
            case "NOT_LIVE_HOME_ECONOMIC_SUPPORT":
                family.awayfromhome.members.push({
                    "alreadyExists":"true",
                    "statusRelated": __.get(_fammember,'statusRelatedPersonsInformation','OK'),
                    "relatedid": __.get(_fammember,'id',''),
                    "fam_name": __.get(_fammember,'name',''),
                    "fam_appat": __.get(_fammember,'lastName',''),
                    "fam_apmat": __.get(_fammember,'secondLastName',''),
                    "fam_o_relationship": __.get(_fammember,'relationship.otherRelationshipDescription',''),
                    "total_f": formatMoney(__.get(_fammember,'personDetail.incomes[0].amount',0),true),
                    "fam_relationship": {
                        "id": __.get(_fammember,'relationship.id',''),
                        "description": __.get(_fammember,'relationship.description','')
                    },
                    "fam_relationship_des": __.get(_fammember,'relationship.id','')!="10"?__.get(_fammember,'relationship.description',''):__.get(_fammember,'relationship.otherRelationshipDescription',''),
                    "fam_lives": {
                        "id": __.get(_fammember,'personDetail.residencePlace.id',''),
                        "description": __.get(_fammember,'personDetail.residencePlace.description','')
                    },
                    "fam_ocupation": {
                        "id": __.get(_fammember,'personDetail.economicActivity.id',''),
                        "description": __.get(_fammember,'personDetail.economicActivity.description','')
                    },
                    "m_checkfirstname": __.get(_fammember,'lastName','') == "XXXXX"?true:false,
                    "m_checklastname": __.get(_fammember,'secondLastName','') == "XXXXX"?true:false
                });
                break;
            case "RELATIVE_WORKS_BBVA":
                family.bbva.member={
                    "alreadyExists":"true",
                    "statusRelated": __.get(_fammember,'statusRelatedPersonsInformation','OK'),
                    "relatedid": __.get(_fammember,'id',''),
                    "name_fbbva": __.get(_fammember,'name',''),
                    "lastname_fbbva": __.get(_fammember,'lastName',''),
                    "slastname_fbbva": __.get(_fammember,'secondLastName',''),
                    "relationship_b_o": __.get(_fammember,'relationship.otherRelationshipDescription',''),
                    "workposition_fbbva": __.get(_fammember,'personDetail.professionPosition',''),
                    "workstation_fbbva": __.get(_fammember,'personDetail.managementUnit',''),
                    "relationship": {
                        "id": __.get(_fammember,'relationship.id',''),
                        "description": __.get(_fammember,'relationship.otherRelationshipDescription','')==""?__.get(_fammember,'relationship.description',''):__.get(_fammember,'relationship.otherRelationshipDescription','')
                    },
                    "relationship_b": {
                        "id": __.get(_fammember,'relationship.id',''),
                        "description": __.get(_fammember,'relationship.description','')
                    },
                    "checkfirstname_fbbva": __.get(_fammember,'lastName','') == "XXXXX"?true:false,
                    "checklastname_fbbva": __.get(_fammember,'secondLastName','') == "XXXXX"?true:false
                };
                break;
            default:
                break;
        }
    }
    family.unregistered = false;
    family.fromhome.total = family.fromhome.members.length;
    $('#n_family').selectOptionId(family.fromhome.members.length);
    $("#nfamilylist").empty();
    for (var _i in family.fromhome.members) {
        family.fromhome.members[_i].memberid = _i;
        if (family.fromhome.members[_i].statusRelated != "Delete"){
            loadTemplate($("#nfamilylist"), miniTemplates.familymembercard, family.fromhome.members[_i], "append");
        }
    }

    family.awayfromhome.total = family.awayfromhome.members.length;
    $("#nextrafamilylist").empty();
    for (var _k in family.awayfromhome.members) {
        family.awayfromhome.members[_k].memberid = _k;
        if (family.awayfromhome.members[_k].statusRelated != "Delete"){
            loadTemplate($("#nextrafamilylist"), miniTemplates.efamilymembercard, family.awayfromhome.members[_k], "append");
        }
    }
    $('#extrafamily').selectOptionId(family.awayfromhome.members.length);
    $("#fam_bbvacard").empty();
    if(Object.keys(family.bbva.member).length != 0){
        $("#bbvafamily").selectRadioId('0');
        loadTemplate($("#fam_bbvacard"), miniTemplates.familybbvacard, family.bbva.member);
        if (family.bbva.member && $("#bbva_employee").prev(".notification.error").length) {
            $("#bbva_employee").prev(".notification.error").slideUp("slow");
        }
    }else{
        $("#bbvafamily").selectRadioId('1');
    }
    if(__.get(data,'auditInformation.moduleStatus','') == "COMPLETE"){//si el módulo es completo
        changeModuleSatus($("#social-data"), "complete");
    }
};

/**
 *Is executed when the get home information service is successfully executed, save the response data in moduleInitData.home and show it in the module content.
 *
 * @param {Object} data service response data object
 */
var rest_fnGetHomeServices = function(data) {
    moduleInitData.home = data;
    if(__.get(data,'operation.moduleStatus','0') == "1"){//si el módulo es completo
        changeModuleSatus($("#home-data"), "complete");
    }
    if ($('[data-target="home-data"]').attr("data-loaded")!="true") {
        return;
    }
    _hasInt = __.get(data,'homeInformation.belongings.hasInternet','');
    _hasCom = __.get(data,'homeInformation.belongings.hasComputer','');
    _hasWas = __.get(data,'homeInformation.belongings.hasWashingMachine','');
    _hasMic = __.get(data,'homeInformation.belongings.hasMicrowave','');
    _hasPay = __.get(data,'homeInformation.belongings.hasPayTV','');
    _hasMot = __.get(data,'homeInformation.belongings.hasMotorcycle','');
    fillForm($("#formhdata"),{
        roomsNumber: __.get(data,'homeInformation.roomsNumber',''),
        bedroomsNumber: __.get(data,'homeInformation.bedroomsNumber',''),
        bathroomsNumber: __.get(data,'homeInformation.bathroomsNumber',''),
        waterServicesType: __.get(data,'homeInformation.homeService.waterServicesType.id',''),
        drainageType: __.get(data,'homeInformation.drainageType.id',''),
        lightServicesType: __.get(data,'homeInformation.homeService.lightServicesType.id',''),
        cookingFuelType: __.get(data,'homeInformation.cookingFuelType.id',''),
        wallMaterialsType: __.get(data,'homeInformation.wallMaterialsType.id',''),
        ceilingMaterialsType: __.get(data,'homeInformation.ceilingMaterialsType.id',''),
        floorMaterialsType: __.get(data,'homeInformation.floorMaterialsType.id',''),
        carsNumber: __.get(data,'homeInformation.belongings.carsNumber',''),
        hasInternet: _hasInt == true ? "SI" : _hasInt == false ? "NO":"",
        hasComputer: _hasCom == true ? "SI" : _hasCom == false ? "NO":"",
        hasWashingMachine: _hasWas == true ? "SI" : _hasWas == false ? "NO":"",
        hasMicrowave:  _hasMic == true ? "SI" : _hasMic == false ? "NO":"",
        hasPayTV:  _hasPay == true ? "SI" : _hasPay == false ? "NO":"",
        hasMotorcycle:  _hasMot == true ? "SI" : _hasMot == false ? "NO":"",
    });
};

/**
 *Is executed when the get legal disclaimers service is successfully executed, save the response data in moduleInitData.legalDisclaimer and show it in the module content.
 *
 * @param {Object} data service response data object
 */
var rest_fnGetLegalDisclaimers = function(data) {
    moduleInitData.legalDisclaimer = data;
    var legalDisclaimers = __.get(data,'legalDisclaimers',[]);
    var text="";
    for (i = 0 ; i < legalDisclaimers.length ; i++) {
        $("#legal"+(i+1)).attr("data-legal-id",legalDisclaimers[i].id);
        $("#legal"+(i+1)).attr("data-legal-consecutive",legalDisclaimers[i].consecutive);
        text=legalDisclaimers[i].description.split('|');
        $("#legaltext"+(i+1)).text(text[0]);
        $("#legallink"+(i+1)).text(text[1]);
        $("#legallink"+(i+1)).attr("href",legalDisclaimers[i].link);
        if (__.get(data,'legalDisclaimers['+i+'].isAccepted','N')=='Y') {
            $("#legal"+(i+1)).doCheck();
        }else {
            $("#legal"+(i+1)).unCheck();
        }
    }
    if(__.get(data,'validation.status','') == "COMPLETO"){//si el módulo es completo
        changeModuleSatus($("#legal-data"), "complete");
        $("#legal1, #legal2, #legal3").addClass("disabled");
        $("#btn_saveld").addClass("btn__disabled");
    }else{
        changeModuleSatus($("#legal-data"), "incomplete");
        $("#legal1, #legal2, #legal3").removeClass("disabled");
        $("#btn_saveld").removeClass("btn__disabled");
    }
    if(legalDisclaimers.length>0){
        $('#formldata').show();
    }
};

/**
 *Is executed when the get scholarship announcement service is successfully executed, save the response data in moduleInitData.announcement and show it in the module content.
 *
 * @param {Object} data service response data object
 */
var rest_fnGetScholarshipAnnouncement= function(data){
    scholarshipAnnouncement=data;
    moduleInitData.announcement=scholarshipAnnouncement;
    $('#scholarshipProgram').text();
    contact.phone=__.get(scholarshipAnnouncement,'phoneNumber','');
    contact.phonetext = contact.phone;
    if (contact.phone.length == 12) {
        contact.phonetext = "(" + contact.phone.substr(0,2) +" " + contact.phone.substr(2,3) + ") " + contact.phone.substr(5,3) + " " + contact.phone.substr(8);
    }
    contact.email=__.get(scholarshipAnnouncement,'email','');
    fillHelpSticky();
    _progId = __.get(scholarshipAnnouncement,'scholarshipProgram.id','');
    $('#scholarshipProgram').text(_progId=="1"?"Secundaria":_progId=="2"?"Preparatoria":_progId=="7"?"Universidad":"");
    if(scholarshipAnnouncement.globalStatus=='1'){
        $('.step-container').find(".btn__submit").addClass('btn__disabled');
        $(".submtbtn.send").attr("style","display: none");
    }
    var tltText = "";
    switch(moduleInitData.announcement.scholarshipProgram.id){
        case "1":
            $(".typeuni").remove();
            $(".typeprep").remove();
            $("#promgen").siblings(".placeholder-simulator").text("Promedio general de primaria");
            $("#lastLevel").text("primaria");
            $("#nextLevel").text("secundaria");
            tltText = "<div>¿Cómo calcular el promedio? <br> 6to año de primaria (1er trimestre + 2do trimestre) <hr> El resultado divídelo entre 2</div>";
            break;
        case "2":
            $(".typeuni").remove();
            $("#promgen").siblings(".placeholder-simulator").text("Promedio general de secundaria");
            $("#lastLevel").text("secundaria");
            $("#nextLevel").text("preparatoria");
            tltText = "<div>¿Cómo calcular el promedio? <ul style='text-align:left'><li> &nbsp; &nbsp; 1er año de secundaria</li><li>+ 2do año de secundaria</li><li>+ 3er año de secundaria (1er trimestre + 2do trimestre)</li></ul><hr> El resultado divídelo entre 3</div>";
            break;
        case "7":
            $("#promgen").siblings(".placeholder-simulator").text("Promedio general de preparatoria");
            $("#lastLevel").text("preparatoria");
            $("#nextLevel").text("universidad");
            tltText = "<div>¿Cómo calcular el promedio? <ul style='text-align:center'> <li> &nbsp; &nbsp; 1er semestre</li><li>+ 2do semestre</li><li>+ 3er semestre</li><li>+ 4to semestre</li><li>+ 5to semestre</li> </ul><hr> El resultado divídelo entre 5</div>";
            break;
        default: break;
    }
    loadMainModules();
};

/**
 *Is executed when the update scholarship announcement status service is successfully executed
 *
 * @param {Object} data service response data object
 */
var  rest_fnUpdateScholarshipAnnouncementStatus = function(){
    _dateArray = moduleInitData.general.currentDate.split("-");
    var _date="";
    month.find(function(index){
        if(index.id == _dateArray[1]){
            _date = _dateArray[0]+" DE "+index.monthcomplete+" DE "+_dateArray[2];
            return;
        }
    });
    //send the email notification
    restExec({
        "service": "SEND_NOTIFICATION",
        "data": {
            "eventCode" : "0000001844",
            "senderId" : "0000000001",
            "devices": [
                {
                    "id": "102",
                    "serviceProvider": {
                        "id": "@@@"
                    },
                    "receivers": [
                        moduleInitData.general.student["0"].contactInf["0"].email
                    ]
                }
            ],
            "message" : {
                "messageBody" : concatSpace(_date,25) + concatSpace(moduleInitData.general.student["0"].name,50) + concatSpace(moduleInitData.general.student["0"].firstName,50) + concatSpace(moduleInitData.general.student["0"].lastName,50)
            }
        },
        "success": function () {
            loadTemplate($("#modal_generic .body"), miniTemplates.success, {
                title: "¡Gracias!",
                message: "Has finalizado la primera parte del registro. Te enviaremos por correo electrónico los pasos que deberás seguir.",
                onAccept: loadModule.scholarshipAnnouncement
            });
        },
        "showWait": true
    });
};

/**
 * function that receives the service data (LIST_CATALOGS)
 * @param {string} cat specify the catalog position
 * @param {object} data that contains the response service
 */
var rest_fnGetSchoolCatalog = function (cat, data) {
    if (cat.indexOf("CAT_PARENTESCO")!=-1) {
        for (i = 0; i < data.data.length; i++) {
            if (data.data[i].id == "0") {
                data.data.splice(i, 1);
                break;
            }
        }
    }
    if (cat=="CAT_PARENTESCO-Tutor") {
        for (i = 0; i < data.data.length; i++) {
            if (data.data[i].id == "25") {
                _parOther = data.data[i];
                data.data.splice(i, 1);
                data.data.push(_parOther);
                break;
            }
        }
    }else if (cat=="CAT_PARENTESCO-Miembro") {
        for (i = 0; i < data.data.length; i++) {
            if (data.data[i].id == "10") {
                _parOther = data.data[i];
                data.data.splice(i, 1);
                data.data.push(_parOther);
                break;
            }
        }
    }else if (cat=="CAT_PARENTESCO-Soporte") {
        for (i = 0; i < data.data.length; i++) {
            if (data.data[i].id == "19") {
                _parOther = data.data[i];
                data.data.splice(i, 1);
                data.data.push(_parOther);
                break;
            }
        }
    }else if (cat.indexOf("CAT_TPO_ESCUELA-")==0) {
        for (i = 0; i < data.data.length; i++) {
            data.data[i].id = i;
        }
        data.data.sort(function compare(a, b) {
            _descA = a.description.toUpperCase();
            _descB = b.description.toUpperCase();
            _comparison = 0;
            if (_descA > _descB) {
                comparison = 1;
            } else if (_descA < _descB) {
                comparison = -1;
            }
            return comparison;
        });
    }else if(cat.indexOf("CAT_OCUPACION")==0){
        for (i = 0; i < data.data.length; i++) {
            if (data.data[i].id == "10") {
                data.data.splice(i, 1);
                break;
            }
        }
    }
    catalogs[cat] = data.data || [];
};

/**
 * function that receives the service data (GET_SCHOOLS)
 * @param {object} data that contains the response service
 */
var rest_fnListSchools = function (data) {
    data = data.school || [];
    schools = schools.concat(data);
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

/**
 *Is executed when the get general data service (with FUN user) is successfully executed, save the response data in dataStudent.
 *
 * @param {Object} data service response data object
 */
var rest_fnGetGeneralDataFun = function(_data) {
    dataStudent = _data.student[0];
    if(_data.moduleStatus == "NUEVO"){
        loadTemplate($("#modal_generic .body"), templates.confirmemail, {
            c_email: dataStudent.contactInf[0].email
        });
    }else if(_data.moduleStatus == "ERROR"){
        loadTemplate($("#modal_generic .body"), miniTemplates.error, {
            title: "Aún no puedes participar en la convocatoria",
            message: "Podrás participar en la convocatoria cuando estés por finalizar el último grado",
            redirectToLogin: true
        });
    }else{
        loadModule.scholarshipAnnouncement();
    }
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
 *Is executed when the get general data service (with any user) is successfully executed, save the response data in moduleInitData.general and show it in the module content.
 *
 * @param {Object} data service response data object
 */
var rest_fnGetGeneralData = function(data) {
    if (__.get(data,'student[0].scholarBirthdate','--') == "01-01-1900") {
        data.student[0].scholarBirthdate = "--";
    }
    if (__.get(data,'student[0].domicile[0].codePostal','')=="00000") {
        data.student[0].domicile[0].codePostal = "";
    }
    moduleInitData.general=data;

    if ($('[data-target="general-data"]').attr("data-loaded")!="true") {
        LIST_SERVICES.listRestExec({
            showWait:true,
            service: 'GET_MUNICIPALITY',
            type: 'POST',
            asyn: false,
            data: {
                state:__.get(moduleInitData.general,'student[0].domicile[0].cdState',0)
            },
            finallySuccess: [function (data) {
                rest_fnGetMunicipalities(__.get(moduleInitData.general,'student[0].domicile[0].cdState',0), data);
            }],
            finallyError: [function (data) {
                rest_fnGetMunicipalities(__.get(moduleInitData.general,'student[0].domicile[0].cdState',0), data);
            }]
        });
        validateGeneralStatus();
        return;
    }
    loadModule.getMunicipalities(__.get(data,'student[0].domicile[0].cdState',0),function(municipality){
        $("#municipalities").comboSelect(municipality);
        var _student =  __.get(moduleInitData.general,'student[0]',{});
        var _tutor = __.get(moduleInitData.general,'student[0].tutorData[0]',{});
        var _domicile = __.get(moduleInitData.general,'student[0].domicile[0]',{});
        var _contact = __.get(moduleInitData.general,'student[0].contactInf[0]',{});
        fillForm($("#formgendata"),{
            tutorname: __.get(_tutor,'tutorName',''),
            tutorlastname: __.get(_tutor,'firstNameTutor',''),
            tutorslastname: __.get(_tutor,'lastaNameTutor',''),
            username: __.get(_student,'name',''),
            firstname: __.get(_student,'firstName',''),
            lastname: __.get(_student,'lastName',''),
            dbirthdate: __.get(_student,'scholarBirthdate','--').split("-")[0],
            mbirthdate: __.get(_student,'scholarBirthdate','--').split("-")[1],
            ybirthdate: __.get(_student,'scholarBirthdate','--').split("-")[2],
            gender: __.get(_student,'gender',''),
            curp: __.get(_student,'CURP',''),
            street: __.get(_domicile,'street','')=="X"?"":__.get(_domicile,'street',''),
            outdoornum: __.get(_domicile,'numExterior','')=="X"?"":__.get(_domicile,'numExterior',''),
            interiornum: __.get(_domicile,'numInterior',''),
            zipcode: __.get(_domicile,'codePostal',''),
            neighborhood: __.get(_domicile,'colony','')=="X"?"":__.get(_domicile,'colony',''),
            state: __.get(_domicile,'cdState',''),
            municipalities: __.get(_domicile,'cdMunicipality',''),
            references: __.get(_domicile,'particularReferences','')=="X"?"":__.get(_domicile,'particularReferences',''),
            phone: __.get(_contact,'homePhone',''),
            cellphone: __.get(_contact,'cellPhone',''),
            errandsphone: __.get(_contact,'messagePhone',''),
            email: __.get(_contact,'email',''),
            emailconf: __.get(_contact,'email',''),
            email2: __.get(_contact,'email1',''),
            email2conf: __.get(_contact,'email1',''),
            email3: __.get(_contact,'email2',''),
            email3conf: __.get(_contact,'email2',''),
        });
        $('#relationship').selectOptionDescription(__.get(_tutor,'kinship',''));
        $('#o_relationship').setValue(__.get(_tutor,'kinshipType',''));
        if (__.get(_tutor,'firstNameTutor','')=='' || (__.get(_tutor,'firstNameTutor','')=='XXXXX'&&__.get(_tutor,'lastaNameTutor','')!='XXXXX')) {
            $("#checktutofirstname").doCheck();
            $("#checktutofirstname").removeClass("disabled");
        }else{
            $("#checktutofirstname").unCheck();
            $("#checktutofirstname").addClass("disabled");
        }
        if (__.get(_tutor,'lastaNameTutor','')=='' || (__.get(_tutor,'lastaNameTutor','')=='XXXXX'&&__.get(_tutor,'firstNameTutor','')!='XXXXX')) {
            $("#checktutolastname").doCheck();
            $("#checktutolastname").removeClass("disabled");
        }else{
            $("#checktutolastname").unCheck();
            $("#checktutolastname").addClass("disabled");
        }
        if (__.get(_student,'firstName','')=='' || (__.get(_student,'firstName','')=='XXXXX')&&__.get(_student,'lastName','')!='XXXXX') {
            $("#checkfirstname").doCheck();
            $("#checkfirstname").removeClass("disabled");
        }else{
            $("#checkfirstname").unCheck();
            $("#checkfirstname").addClass("disabled");
        }
        if (__.get(_student,'lastName','')=='' || (__.get(_student,'lastName','')=='XXXXX'&&__.get(_student,'firstName','')!='XXXXX')) {
            $("#checklastname").doCheck();
            $("#checklastname").removeClass("disabled");
        }else{
            $("#checklastname").unCheck();
            $("#checklastname").addClass("disabled");
        }
        validateGeneralStatus();
    });
};
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
 *Delete family template function
 *
 * @param {Object} _temp the template DOM element
 * @param {Object} data the JSON object sended to the template
 */
var fn_deleteFam = function (_temp, data) {
    fn_showModal();
    _temp.find("#btn_delete").click(data.onAccept.bind(data));
    _temp.find("#btn_decline").click(data.onDecline.bind(data));
    if (data.origin == 'family') {
        callbackCloseModal = function () {
            if ($('#n_family').getOptionSelected().id != family.fromhome.members.length) {
                $('#n_family').selectOptionId(family.fromhome.members.length);
            }
            callbackCloseModal = function () {};
        };
    } else {
        callbackCloseModal = function () {
            if ($('#extrafamily').getOptionSelected().id != family.awayfromhome.members.length) {
                $('#extrafamily').selectOptionId(family.awayfromhome.members.length);
            }
            callbackCloseModal = function () {};
        };
    }

};

/**
 *Select boss template function
 *
 * @param {Object} _temp the template DOM element
 */
var fn_selectboss = function (_temp) {
    /**
     *If the modal is closed, it is shown again
     */
    callbackCloseModal = function () {
        loadTemplate($("#modal_generic .body"), templates.selectboss, {"members":family.fromhome.getMembers()});
        fn_showModal();
    };
    var $checkBoss = _temp.find(".checkbox");
    $checkBoss.ckeckCallback(function (thisCheckbox) {
        $("#formselectboss").find(".checkbox").addClass("disabled");
        thisCheckbox.removeClass("disabled");
    }, function () {
        $("#formselectboss").find(".checkbox").removeClass("disabled");
    });
    _temp.find("#btn_accept").click(function () {
        var bossSelected = $("#formselectboss").find(".checkbox.checked");
        function showBossError(_message) {
            if ($("#formselectboss").prev(".notification.error").length) $("#formselectboss").prev(".notification.error").remove();
            loadTemplate($("#formselectboss"), miniTemplates.notification, {
                type: 'error',
                title: 'Lo sentimos',
                message: _message
            }, 'before');
        }
        if (bossSelected.length == 0) {
            showBossError('Debes seleccionar a un jefe de familia');
        } else if (bossSelected.length == 1) {
            var bossIndex = Number(bossSelected.attr("data-index"));
            for (var i in family.fromhome.members) {
                if (i == bossIndex) {
                    family.fromhome.members[i].familyBoss = "Sí";
                } else {
                    family.fromhome.members[i].familyBoss = "No";
                }
            }
            fn_hideModal();
            callbackCloseModal = function () {};
            $("html").animate({
                scrollTop: $("#nfamilylist").offset().top - 200
            }, 1000, "swing", function () {
                $("#nfamilylist").empty();
                for (var i in family.fromhome.members) {
                    if (family.fromhome.members[i].fam_worked.id === undefined) {
                        family.fromhome.members[i].fam_worked.id = "false";
                        family.fromhome.members[i].fam_worked.description = "No";
                    }
                    if (family.fromhome.members[i].statusRelated != "Delete") {
                        loadTemplate($("#nfamilylist"), miniTemplates.familymembercard, family.fromhome.members[i], "append");
                    }
                }
            });
        } else {
            showBossError('Sólo puedes seleccionar a un jefe del hogar');
        }
    });
    fn_showModal();
};

var fn_opennotification = function () {
    fn_showModal();
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
 *Confirm all data modal function
 *
 * @param {Object} _temp the template DOM element
 * @param {Object} data the JSON object sended to the template
 */
var fn_confirmAllModal = function (_temp, data) {
    data.onDecline = typeof data.onDecline == "function" ? data.onDecline : fn_hideModal;
    if (moduleInitData.announcement.scholarshipProgram.id != "7") {_temp.find(".inidatam").hide();}
    _familyMembers = jQuery.extend(true, {}, moduleInitData.sociodemographic);
    _famFromHome = [];
    _famAwayFromHome = [];
    _bbvamember = {};
    for (_i = 0; _i < _familyMembers.relatedPersons.length; _i++) {
        _member = _familyMembers.relatedPersons[_i];
        if (_member.personDetail.personType == "PERSONS_LIVE_HOME") {
            _famFromHome.push(_member);
        }else if (_member.personDetail.personType == "NOT_LIVE_HOME_ECONOMIC_SUPPORT") {
            _famAwayFromHome.push(_member);
        }else if (_member.personDetail.personType == "RELATIVE_WORKS_BBVA") {
            _bbvamember = _member;
        }
    }
    _temp.find("#n_fromhome").text(_famFromHome.length);
    if (_famFromHome.length) {
        for (_i = 0; _i < _famFromHome.length; _i++) {
            _famh = _famFromHome[_i];
            _famh.student = _famh.personDetail.isStudent?"Sí":"No";
            _famh.hasWorked = _famh.personDetail.hasWorkedLastMonth?"Sí":"No";
            _famh.otherScholarshipProgramDescription = "";
            _famh.otherGovernmentScholarshipamount = "";
            if (__.get(_famh,"personDetail.otherGovernmentScholarship.id","")!="") {
                _famh.isotherG = "Sí";
                _famh.fam_otherschoolarship = "block";
                _famh.otherScholarshipProgramDescription = _famh.personDetail.otherGovernmentScholarship.description;
                _famh.otherGovernmentScholarshipamount = formatMoney(_famh.personDetail.otherGovernmentScholarship.incomes[0].amount);
            }else{
                _famh.isotherG = "No";
                _famh.fam_otherschoolarship = "none";
            }
            _famh.incomesamount = formatMoney(_famh.personDetail.incomes[0].amount);
            loadTemplate(_temp.find("#membersfromhome"), miniTemplates.m_familycard, _famh,"append");
        }
    }else {
        _temp.find("#membersfromhome").remove();
    }

    _temp.find("#n_awayhome").text(_famAwayFromHome.length);
    if (_famAwayFromHome.length) {
        for (_i = 0; _i < _famAwayFromHome.length; _i++) {
            _fam = _famAwayFromHome[_i];
            _fam.incomesamount = formatMoney(_fam.personDetail.incomes[0].amount);
            loadTemplate(_temp.find("#membersawayhome"), miniTemplates.m_efamilycard, _fam,"append");
        }
    }else {
        _temp.find("#membersawayhome").remove();
    }

    _temp.find("#n_bbva").text(Object.keys(_bbvamember).length?"1":"0");
    if (Object.keys(_bbvamember).length) {
        loadTemplate(_temp.find("#bbvamember"), miniTemplates.m_bbvafamilycard, _bbvamember);
    }else {
        _temp.find("#bbvamember").remove();
    }

    fn_showModal();
    _temp.find(".btn_acept").click(data.onAccept.bind(data));
    _temp.find(".btn_decline").click(data.onDecline.bind(data));
};

/**
 *Confirm email modal template
 *
 * @param {Object} _temp the template DOM element
 */
var fn_confirmemail = function (_temp) {
    callbackCloseModal = function () {
        loadTemplate($("#modal_generic .body"), templates.confirmemail, {
            c_email: dataStudent.contactInf[0].email
        });
    };
    _temp.find("#econt").data("complete", function(_data) {
        if (_data.c_email != _data.c_email2) {
            $("#c_email2").showError("Los correos no coinciden");
            return;
        }
        callbackCloseModal = function () {};
        fn_hideModal();
        restExec({
            service: 'MODIF_UPLOADSCHOLAR',
            data: {
                "userCurrent": "ALUMNO",
                "registerType": "2",
                "student": [
                    {
                        "studentId": "",
                        "scholarUser": ivUser.trim(),
                        "programType": dataStudent.programKey,
                        "statusDispersion": dataStudent.statusDispersion,
                        "originRegion": dataStudent.originRegion,
                        "schoolCycle": dataStudent.schoolCycle,
                        "cdAssignedCR": dataStudent.cdAssignedCR,
                        "assignedCR": dataStudent.assignedCR,
                        "scholarNumber": dataStudent.scholarNumber,
                        "accountNumber": dataStudent.accountNumber,
                        "folioPhoto": "",
                        "name": dataStudent.name.trim(),
                        "firstName": dataStudent.firstName.trim(),
                        "lastName": dataStudent.lastName.trim(),
                        "CURP": dataStudent.CURP,
                        "scholarBirthdate":  dataStudent.scholarBirthdate.trim(),
                        "gender": dataStudent.gender,
                        "schoolData": [{
                            "duration": "",
                            "turn": "",
                            "typeCareer": "",
                            "nameCareer": "",
                            "area": "",
                            "school": [
                                {
                                    "cdState": "",
                                    "state": "",
                                    "cdMunicipality": "",
                                    "municipality": "",
                                    "CCT": "",
                                    "control": "",
                                    "initials": "",
                                    "type": "",
                                    "name": "",
                                    "domicile": ""
                                }
                            ]
                        }],
                        "domicile": [
                            {
                                "street": dataStudent.domicile[0].street.trim(),
                                "locality": dataStudent.domicile[0].locality.trim(),
                                "numExterior": dataStudent.domicile[0].numExterior.trim(),
                                "numInterior": dataStudent.domicile[0].numInterior.trim(),
                                "codePostal": dataStudent.domicile[0].codePostal.trim(),
                                "cdMunicipality": dataStudent.domicile[0].cdMunicipality.trim(),
                                "municipality": dataStudent.domicile[0].municipality.trim(),
                                "colony": dataStudent.domicile[0].colony.trim(),
                                "cdState": dataStudent.domicile[0].cdState.trim(),
                                "state": dataStudent.domicile[0].state.trim(),
                                "betweenStreet": dataStudent.domicile[0].betweenStreet.trim(),
                                "typeOfRoad1": dataStudent.domicile[0].typeOfRoad1.trim(),
                                "andTheStreet": dataStudent.domicile[0].andTheStreet.trim(),
                                "typeOfRoad2": dataStudent.domicile[0].typeOfRoad2.trim(),
                                "behindStreet": dataStudent.domicile[0].behindStreet.trim(),
                                "typeOfRoad3": dataStudent.domicile[0].typeOfRoad3.trim(),
                                "particularReferences": dataStudent.domicile[0].particularReferences.trim()
                            }
                        ],
                        "contactInf": [
                            {
                                "homePhone": dataStudent.contactInf[0].homePhone.trim(),
                                "cellPhone": dataStudent.contactInf[0].cellPhone.trim(),
                                "messagePhone": dataStudent.contactInf[0].messagePhone.trim(),
                                "email": _data.c_email.trim(),
                                "email1": dataStudent.contactInf[0].email1.trim(),
                                "email2": dataStudent.contactInf[0].email2.trim(),
                                "facebook": ""
                            }
                        ],
                        "tutorData": [
                            {
                                "tutorName": dataStudent.tutorData[0].tutorName.trim(),
                                "firstNameTutor": dataStudent.tutorData[0].firstNameTutor.trim(),
                                "lastNameTutor": dataStudent.tutorData[0].lastaNameTutor.trim(),
                                "kinship": dataStudent.tutorData[0].kinship.trim(),
                                "kinshipType": dataStudent.tutorData[0].kinshipType.trim()
                            }
                        ],
                        "program": [
                            {
                                "status": "",
                                "modalityParticipation": "",
                                "generation": "",
                                "originResources": "",
                                "projectSEPNumber": "",
                                "numberNMDP": "",
                                "schoolGrade": "",
                                "resultImpactEvaluation": ""
                            }
                        ]
                    }
                ]
            },
            showWait: true,
            success: function () {
                loadModule.scholarshipAnnouncement();
            }
        });
    });
    fn_showModal();
};

/**
 *Report school modal function
 *
 * @param {Object} _temp the template DOM element
 * @param {Object} _data the JSON object sended to the template
 */
var fn_reportschool = function (_temp, _data) {
    $(".modal .closemodal").click(function () {
        $(this).parents(".modal").removeAttr("open");
    });
    $("input.reflectable").each(function () {
        inpval = $(this).val().trim();
        $newinp = $($(this).attr("data-reflecto"));
        $newinp.val(inpval);
        if ($newinp.val() != "") {
            $($(this).attr("data-reflecto")).siblings('.placeholder-simulator').attr("style",
                "top: 5px; font-size: 12px;");
        }
    });
    $(".form-group-select.reflectable").each(function () {
        dataOptions = $(this).data('options');
        $reflectTo = $($(this).attr("data-reflecto"));
        if (dataOptions != undefined) {
            $reflectTo.reset();
            $reflectTo.comboSelect(dataOptions);
            opSelected = $(this).getOptionSelected();
            if (opSelected != null) {
                $reflectTo.selectOptionId(opSelected.id);

            }
        }
    });
    if ($("#m_state_s").getOptionSelected()!=null && $("#m_state_s").getOptionSelected().id == "0") {
        $("#m_state_s").reset();
    }
    if ($("#m_municipalities_s").getOptionSelected()!=null && $("#m_municipalities_s").getOptionSelected().id == "0") {
        $("#m_municipalities_s").reset();
    }
    fn_showModal();
    state_id = $("#state_s").getOptionSelected().id;
    mun_id = $("#municipalities_s").getOptionSelected().id;
    state_id = $("#state_s").getOptionSelected().id;
    mun_id = $("#municipalities_s").getOptionSelected().id;
    loadModule.getCatalog("CAT_TPO_ESCUELA-"+state_id+"-"+mun_id+"-"+moduleInitData.announcement.scholarshipProgram.id, function () {
        _cat = catalogs["CAT_TPO_ESCUELA-"+state_id+"-"+mun_id+"-"+moduleInitData.announcement.scholarshipProgram.id].slice(0);
        _cat.push({
            "id": "x",
            "description": "Ninguno de los anteriores"
        });
        fnFillCatalogs("schoolType", _cat, function() {});
    });

    $('#m_state_s').onSelect(function (el) {
        loadModule.getMunicipalities(el.id, function () {
            $("#m_municipalities_s").reset();
            fnFillCatalogs("m_municipalities_s", municipalityTransactions[el.id]);
        });
    });

    $("#schoolform").data("complete", function (_data) {
        dateArray = moduleInitData.general.currentDate.split("-");
        var date="";
        var level="";
        month.find(function(index){
            if(index.id == dateArray[1]){
                date = dateArray[0]+" DE "+index.monthcomplete+" DE "+dateArray[2];
            }
        });
        if(moduleInitData.announcement.scholarshipProgram.id == "1"){
            level= "SECUNDARIA";
        }else if(moduleInitData.announcement.scholarshipProgram.id == "2"){
            level="PREPARATORIA";
        }else if(moduleInitData.announcement.scholarshipProgram.id == "7"){
            level="UNIVERSIDAD";
        }
        function messageBody(_arr) {
            _Tstr = "";
            for (var _k = 0; _k < _arr.length; _k++) {
                var element = _arr[_k];
                _Tstr = _Tstr + concatSpace(element.str,element.size);
            }
            return _Tstr;
        }
        var arrayValues = [{
                str: date,
                size: 25
            },
            {
                str: moduleInitData.general.student["0"].name,
                size: 50
            },
            {
                str: moduleInitData.general.student["0"].firstName,
                size: 50
            },
            {
                str: moduleInitData.general.student["0"].lastName,
                size: 50
            },
            {
                str: moduleInitData.general.student["0"].domicile["0"].state,
                size: 50
            },
            {
                str: moduleInitData.general.student["0"].domicile["0"].municipality,
                size: 50
            },
            {
                str: moduleInitData.general.student["0"].contactInf["0"].email,
                size: 100
            },
            {
                str: moduleInitData.general.student["0"].contactInf["0"].homePhone,
                size: 10
            },
            {
                str: _data.m_state_s.description,
                size: 50
            },
            {
                str: _data.m_municipalities_s.description,
                size: 50
            },
            {
                str: level,
                size: 50
            },
            {
                str: _data.schoolType.description,
                size: 150
            },
            {
                str: _data.m_school,
                size: 100
            }
        ];
        restExec({
            "service": "SEND_NOTIFICATION",
            "data": {
                "eventCode" : "0000001843",
                "senderId" : "0000000001",
                "devices": [
                    {
                        "id": "102",
                        "serviceProvider": {
                            "id": "@@@"
                        },
                        "receivers": [
                            scholsEmail[_data.m_state_s.id]
                        ]
                    }
                ],
                "message" : {
                      "messageBody" : messageBody(arrayValues)
                }
            },
            "success": fn_send_no_school,
            "showWait": true
        });
    });
};

/**
 *Show the report school success message
 *
 */
var fn_send_no_school = function (resp) {
    fn_hideModal();
    if(resp.data.devices[0].status.id == "PENDING"){
        loadTemplate($("#modal_generic .body"), miniTemplates.success, {
            title: "Información enviada",
            message: "Hemos recibido tu duda, Te contactaremos en un máximo de 24 horas"
        });
    }else{
        loadTemplate($("#modal_generic .body"), miniTemplates.error, {
			title: "Ocurrió un error al realizar operación",
			message: "Ocurri\u00f3 un problema, por favor intentalo m\u00e1s tarde"
		});
    }
    validateEmptyOption($("#state_s"));
    validateEmptyOption($("#municipalities_s"));
    $("#search_by").selectRadioId("CCT");
    $("#schoolname").setValue(dommySchools.getDommyDescription());
    $("#schoolslist").searchList({
        filterid: "keyWorkplace",
        filtertext: "schoolOficialName",
        items: [{
            "keyWorkplace": dommySchools.getDommyCCT(),
            "schoolOficialName": dommySchools.getDommyDescription()
        }]
    });
    $("#schoolslist").selectFromList(dommySchools.getDommyCCT());
    $("#cct").setValue(dommySchools.getDommyCCT());
    $("#search_by .radio-buttons").addClass("disabled");
    $("input#cct").prop("disabled", true);
};

/**
 *Add family modal function
 *
 * @param {Object} _template the template DOM element
 * @param {Object} fdata the JSON object sended to the template
 */
var fn_familymodal = function (_template, fdata) {
    /**
     *Validate the relationsip selected, if selected has the id 10 (other) the specify relationship input is shown
     *
     * @param {Object} el option selected
     */
    var validateRelationship = function (el) {
        if (el.id == '10') {
            $("#fam_o_relationship").clearInput();
            $("#fam_o_relationship").attr("required", "required");
            $("#fam_other_relationship").slideDown();
        } else {
            $("#fam_o_relationship").removeAttr("required");
            $("#fam_other_relationship").slideUp();
        }
    };
    _template.find("#total_sf").each(function(){
        $(this).keyup(function(){
            var object= $().add($(this));
            if(object.val()==="0.00"){
                object.showError("La cantidad no puede ser cero");
            }
        });
    });
    $("#fam_gender").comboSelect(genders);
    $("#fam_civil").comboSelect(catalogs.CAT_EDO_CIVIL);
    $("#fam_schoollevel").comboSelect(catalogs.CAT_MAX_NVL_ESTUDIO);
    fnFillCatalogs("fam_medic", catalogs.CAT_INST_MEDICA, function (sel) {
        if (sel.id == "7") {
            $("#other_medic").slideDown();
            $("#fam_omedic").prop("required", true);
        } else {
            $("#other_medic").slideUp();
            $("#fam_omedic").clearInput();
            $("#fam_omedic").prop("required", false);
        }
    });
    $("#fam_ocupation").comboSelect(catalogs.CAT_OCUPACION);
    $("#fam_age").on("keyup", function () {
        if (Number($(this).val()) >= 14) {
            $("#age14").slideDown("slow");
            $("#fam_worked").addClass("required");
            $("#fam_worked").clearRadio();
        } else {
            $("#age14").slideUp("slow");
            $("#fam_worked").removeClass("required");
            $("#fam_worked").selectRadioId("false");
        }
    });
    $('#fam_otherschoolarship').onChecked(function (rad) {
        if (rad.id == "0") {
            $(".schoolarshiparea").slideDown();
            $("#fam_kindschoolarship").addClass("required");
            $("#fam_programschoolarship").addClass("required");
            $("#total_sf").prop("required", true);
        } else {
            $(".schoolarshiparea").slideUp();
            $("#fam_kindschoolarship").removeClass("required");
            $("#fam_programschoolarship").removeClass("required");
            $("#fam_programschoolarship").reset();
            $("#total_sf").prop("required", false);
        }
    });
    $("#fam_kindschoolarship").comboSelect(catalogs.CAT_TPO_APOYO);
    $("#fam_programschoolarship").comboSelect(catalogs.CAT_INST_APOYO, function (_ssel) {
        if (_ssel.id == "6") {
            $("#oschoolarship").slideDown();
            $("#sprogramname").prop("required", true);
        } else {
            $("#oschoolarship").slideUp();
            $("#sprogramname").prop("required", false);
            $("#sprogramname").clearInput();
        }
    });
    _isStudent = ((fdata.flags.type == 'edit' && fdata.flags.memberid == 0) || family.fromhome.index() == "1");
    if (_isStudent) {
        $("#fam_relationship").comboSelect(catalogs["CAT_PARENTESCO-Miembro"], validateRelationship);
    } else {
        var opc_famx = jQuery.extend(true, {}, {
            rel: catalogs["CAT_PARENTESCO-Miembro"]
        });
        for (i = 0; i < opc_famx.rel.length; i++) {
            element = opc_famx.rel[i];
            if (element.id == "1") {
                opc_famx.rel.splice(i, 1);
                break;
            }
        }
        $("#fam_relationship").comboSelect(opc_famx.rel, validateRelationship);
    }
    $("#familyformbtn").data("complete", function (_data) {
        _data.infoscolarship = "";

        _data.total_f = formatMoney(_data.total_f,true);
        _data.total_sf = _data.total_sf==""?"":formatMoney(_data.total_sf,true);
        if (_data.fam_otherschoolarship != null && _data.fam_otherschoolarship.id == '0') {
            _data.infoscolarship = '{"tipo":"' + _data.fam_kindschoolarship.description + '","programa": "' + _data.fam_programschoolarship.description + '","monto": "' + _data.total_sf + '"}';
        }
        if (_data.fam_relationship.id != "10") {
            _data.fam_relationship_des = _data.fam_relationship.description;
        } else {
            _data.fam_relationship_des = _data.fam_o_relationship;
        }

        if (_data.flag == "edit") {
            if (_data.alreadyExists == "true") {
                _data.statusRelated = "Edit";
            }
            family.fromhome.members[_data.memberid] = _data;
        } else {
            _data.statusRelated = "Add";
            family.fromhome.members.push(_data);
        }
        $("#formfamily").slideUp("slow", function () {
            if (family.fromhome.index() <= family.fromhome.total) {
                fn_verifyCatalogs(["CAT_INST_MEDICA", "CAT_EDO_CIVIL", "CAT_OCUPACION", "CAT_TPO_APOYO", "CAT_INST_APOYO", "CAT_PARENTESCO-Miembro", "CAT_MAX_NVL_ESTUDIO"], function () {
                    loadTemplate($("#modal_generic .body"), templates.family, family.fromhome);
                });
            } else {
                if ($("#fam_members").prev().hasClass("error")) {
                    $("#fam_members").prev().remove();
                }
                var hasFamilyBoss = false;
                for (var i in family.fromhome.members) {
                    family.fromhome.members[i].memberid = i;
                    if (family.fromhome.members[i].familyBoss == "Sí") {
                        hasFamilyBoss = true;
                    }
                }
                if (this.flag != "edit" && !hasFamilyBoss) {
                    loadTemplate($("#modal_generic .body"), templates.selectboss, {"members":family.fromhome.getMembers()});
                } else {
                    $("html").animate({
                        scrollTop: $("#nfamilylist").offset().top - 200
                    }, 1000, "swing", function () {
                        $("#nfamilylist").empty();
                        for (var i in family.fromhome.members) {
                            if (family.fromhome.members[i].statusRelated != "Delete") {
                                loadTemplate($("#nfamilylist"), miniTemplates.familymembercard, family.fromhome.members[i], "append");
                            }
                        }
                    });
                    fn_hideModal();
                }
            }
        }.bind(_data));
    });
    if (fdata.flags.type == 'edit') {
        membertoedit = family[fdata.flags.group].members[fdata.flags.memberid];
        membertoedit.flag = 'edit';
        membertoedit.total_f = formatMoney(membertoedit.total_f);
        membertoedit.total_sf = formatMoney(membertoedit.total_sf);
        fillForm($("#formfamily"), membertoedit);
        $("#fam_o_relationship").setValue(membertoedit.fam_o_relationship);
        if (moduleInitData.general.student["0"].firstName == "XXXXX" && moduleInitData.general.student["0"].lastName != "XXXXX") {
            _template.find("#m_checkfirstname").doCheck();
        }
        if (moduleInitData.general.student["0"].lastName == "XXXXX" && moduleInitData.general.student["0"].firstName != "XXXXX") {
            _template.find("#m_checklastname").doCheck();
        }
    }
    if (_isStudent) {
        $("#fam_relationship").selectOptionId("1");
        $("#fam_relationship,#fam_schoollevel").find(".option-select").addClass("disabled");
        _template.find("#fam_name").setValue(moduleInitData.general.student["0"].name);
        _template.find("#fam_appat").setValue(moduleInitData.general.student["0"].firstName);
        _template.find("#fam_apmat").setValue(moduleInitData.general.student["0"].lastName);
        _template.find("#fam_age").setValue(moduleInitData.general.student["0"].age);
        _template.find("#fam_gender").selectRadioId(moduleInitData.general.student["0"].gender);
        if (moduleInitData.general.student["0"].firstName == "XXXXX" && moduleInitData.general.student["0"].lastName != "XXXXX") {
            _template.find("#m_checkfirstname").doCheck();
        }
        if (moduleInitData.general.student["0"].lastName == "XXXXX" && moduleInitData.general.student["0"].firstName != "XXXXX") {
            _template.find("#m_checklastname").doCheck();
        }

        _template.find("#fam_name").prop("disabled",true);
        _template.find("#fam_appat").prop("disabled",true);
        _template.find("#fam_apmat").prop("disabled",true);
        _template.find("#fam_age").prop("disabled",true);
        _template.find("#fam_gender .radio-buttons").addClass("disabled");
        _template.find("#m_checkfirstname").addClass("disabled");
        _template.find("#m_checklastname").addClass("disabled");

        switch (moduleInitData.announcement.scholarshipProgram.id) {
            case "1":
                $("#fam_schoollevel").selectOptionId("10");
                break;
            case "2":
                $("#fam_schoollevel").selectOptionId("12");
                break;
            case "7":
                $("#fam_schoollevel").selectOptionId("15");
                break;
            default:
                break;
        }
    }
    if (Number(_template.find("#fam_age").val()) >= 14) {
        $("#age14").slideDown("slow");
        $("#fam_worked").addClass("required");
    } else {
        $("#age14").slideUp("slow");
        $("#fam_worked").removeClass("required");
        $("#fam_worked").selectRadioId("false");
    }
    _template.find(".help_section .h_h1").click(function () {
        $h1sec = $(this).siblings(".h_h1_section");
        if ($h1sec.attr("data-collapsed")=="true") {
            $(this).find(".bbva-icon").removeClass("ui-simple-up").addClass("ui-simple-down");
            $h1sec.slideUp("slow",function () {
                $(this).attr("data-collapsed","false");
            });
        }else{
            $(this).find(".bbva-icon").removeClass("ui-simple-down").addClass("ui-simple-up");
            $h1sec.slideDown("slow",function () {
                $(this).attr("data-collapsed","true");
            });
        }
    });

    /**
     *When the modal is closed, it draw the families added and validate if selected family number is iqual to the family members added, if not, an error is shown
     *
     */
    callbackCloseModal = function () {
        if (family.fromhome.total != family.fromhome.getTotal()) {
            fn_showAddFam($("#fam_members"), "fromhome");
            if (family.fromhome.members.length) {
                $("#nfamilylist").empty();
                for (var i in family.fromhome.members) {
                    family.fromhome.members[i].memberid = i;
                    if (family.fromhome.members[i].statusRelated != "Delete") {
                        loadTemplate($("#nfamilylist"), miniTemplates.familymembercard, family.fromhome.members[i], "append");
                    }
                }
            }
        }
        callbackCloseModal = function () {};
    };
    fn_showModal();
    setTimeout(function () {
        $("#formfamily").slideDown("slow");
    }, 400);
};


/**
 *Function that is executed when family member card is loaded
 *
 * @param {Object} _temp the template DOM element
 * @param {Object} data the JSON object sended to the template
 */
var fn_familymembercard = function (_temp, data) {
    var $checkBoss = _temp.find(".checkbox.familycardboss");
    $checkBoss.checkeable(function (thisCheckbox) {
        $(".checkbox.familycardboss").addClass("disabled");
        thisCheckbox.removeClass("disabled");
        family.fromhome.members[Number(thisCheckbox.attr("data-member"))].familyBoss = "Sí";
        if (family.fromhome.members[Number(thisCheckbox.attr("data-member"))].statusRelated == "OK") {
            family.fromhome.members[Number(thisCheckbox.attr("data-member"))].statusRelated = "Edit";
        }
    }, function (thisCheckbox) {
        $(".checkbox.familycardboss").removeClass("disabled");
        family.fromhome.members[Number(thisCheckbox.attr("data-member"))].familyBoss = "No";
        if (family.fromhome.members[Number(thisCheckbox.attr("data-member"))].statusRelated == "OK") {
            family.fromhome.members[Number(thisCheckbox.attr("data-member"))].statusRelated = "Edit";
        }
    });

    if (data.familyBoss == "Sí") {
        $checkBoss.removeClass("disabled").doCheck();
    }
    $scTooltip = _temp.find(".scholarship-tooltip");
    _objdata = $scTooltip.attr("data-tooltip");
    if (_objdata != "") {
        new Tooltip($scTooltip, {
            placement: 'top',
            html: true,
            title: Mustache.to_html(miniTemplates.shcolarshipdetail.html, JSON.parse(_objdata))
        });
    } else {
        $scTooltip.remove();
    }

    _temp.find(".btn_editmember").click(function () {
        var editfromhome = jQuery.extend(true, {}, family.fromhome);
        editfromhome.flags = {
            type: 'edit',
            text: 'Guardar',
            memberid: Number($(this).attr("data-member")),
            group: 'fromhome'
        };
        editfromhome.index = Number($(this).attr("data-member")) + 1;
        fn_verifyCatalogs(["CAT_INST_MEDICA", "CAT_EDO_CIVIL", "CAT_OCUPACION", "CAT_TPO_APOYO", "CAT_INST_APOYO", "CAT_PARENTESCO-Miembro", "CAT_MAX_NVL_ESTUDIO"], function () {
            loadTemplate($("#modal_generic .body"), templates.family, editfromhome);
        });
    });
    _temp.find(".btn_deletemember").click(function () {
        _minFam = moduleInitData.announcement.scholarshipProgram.id != "7"? 2:1;
        if (family.fromhome.getTotal() > _minFam) {
            if ($(this).attr("data-member") == "0") {
                loadTemplate($("#modal_generic .body"), miniTemplates.error, {
                    title: "Lo sentimos, no te puedes eliminar",
                    message: "Es obligatorio que te incluyas"
                });
                return;
            }
            loadTemplate($("#modal_generic .body"), templates.conf, {
                memberid: $(this).attr("data-member"),
                title: "¿Deseas eliminar a un familiar?",
                message: "Al eliminarlo ya no se podrá recuperar",
                onAccept: function () {
                    var _bossFamilyDeleted = false;
                    if (family.fromhome.members[this.memberid].familyBoss == "Sí") {
                        _bossFamilyDeleted = true;
                    }
                    if (__.get(family.fromhome.members[this.memberid], "alreadyExists", "") == "true") {
                        family.fromhome.members[this.memberid].statusRelated = "Delete";
                    } else {
                        family.fromhome.members.splice(this.memberid, 1);
                    }
                    family.fromhome.total = family.fromhome.getTotal();
                    $("#n_family").selectOptionId(family.fromhome.getTotal());
                    $("#nfamilylist").empty();
                    if (_bossFamilyDeleted) {
                        loadTemplate($("#modal_generic .body"), templates.selectboss, {"members":family.fromhome.getMembers()});
                    } else {
                        for (var i in family.fromhome.members) {
                            family.fromhome.members[i].memberid = i;
                            if (family.fromhome.members[i].statusRelated != "Delete") {
                                loadTemplate($("#nfamilylist"), miniTemplates.familymembercard, family.fromhome.members[i], "append");
                            }
                        }
                        fn_hideModal();
                    }
                }
            });
        } else {
            loadTemplate($("#modal_generic .body"), miniTemplates.error, {
                title: "Lo sentimos, no puedes eliminar",
                message: "El número mínimo de integrantes es "+_minFam
            });
        }
    });

};

/**
 *Add external home family support modal
 *
 * @param {Object} _template the template DOM element
 * @param {Object} fdata the JSON object sended to the template
 */
var fn_efamilymodal = function (_template, fdata) {
    var opc_famx = jQuery.extend(true, {}, {
        rel: catalogs["CAT_PARENTESCO-Miembro"]
    });
    //remove the student option from relationship catalog
    for (i = 0; i < opc_famx.rel.length; i++) {
        element = opc_famx.rel[i];
        if (element.id == "1") {
            opc_famx.rel.splice(i, 1);
            break;
        }
    }
    $("#fam_relationship").comboSelect(opc_famx.rel, function (el) {
        if (el.id == '10') {
            $("#fam_o_relationship").clearInput();
            $("#fam_o_relationship").attr("required", "required");
            $("#fam_other_relationship").slideDown();
        } else {
            $("#fam_o_relationship").removeAttr("required");
            $("#fam_other_relationship").slideUp();
        }
    });
    $("#fam_ocupation").comboSelect(catalogs.CAT_OCUPACION);
    $("#fam_lives").comboSelect(catalogs.CAT_RESIDENCIA);
    $("#efamilyformbtn").data("complete", function (_data) {
        if (_data.flag == "edit") {
            if (_data.alreadyExists == "true") {
                _data.statusRelated = "Edit";
            }
            family.awayfromhome.members[_data.memberid] = _data;
        } else {
            _data.statusRelated = "Add";
            family.awayfromhome.members.push(_data);
        }
        if (_data.fam_relationship.id != "10") {
            _data.fam_relationship_des = _data.fam_relationship.description;
        } else {
            _data.fam_relationship_des = _data.fam_o_relationship;
        }
        $("#formefamily").slideUp("slow", function () {
            if (family.awayfromhome.index() <= family.awayfromhome.total) {
                fn_verifyCatalogs(["CAT_OCUPACION", "CAT_RESIDENCIA", "CAT_PARENTESCO-Miembro"], function () {
                    loadTemplate($("#modal_generic .body"), templates.efamily, family.awayfromhome);
                });
            } else {
                if ($("#ext_family").prev().hasClass("error")) {
                    $("#ext_family").prev().remove();
                }
                $("html").animate({
                    scrollTop: $("#nextrafamilylist").offset().top - 200
                }, 1000, "swing", function () {
                    $("#nextrafamilylist").empty();
                    for (var i in family.awayfromhome.members) {
                        family.awayfromhome.members[i].memberid = i;
                        if (family.awayfromhome.members[i].statusRelated != "Delete") {
                            loadTemplate($("#nextrafamilylist"), miniTemplates.efamilymembercard, family.awayfromhome.members[i], "append");
                        }
                    }
                });
                fn_hideModal();
            }
        });
    });
    if (fdata.flags.type == 'edit') {
        membertoedit = family.awayfromhome.members[fdata.flags.memberid];
        membertoedit.flag = 'edit';
        fillForm($("#formefamily"), membertoedit);
        $("#fam_o_relationship").setValue(__.get(membertoedit,"fam_o_relationship",""));
    }
    /**
     *When the modal is closed, it draw the external families added and validate if selected external family number is iqual to the external family members added, if not, an error is shown
     *
     */
    callbackCloseModal = function () {
        if (family.awayfromhome.total != family.awayfromhome.getTotal()) {
            fn_showAddFam($("#ext_family"), "awayfromhome");
            if (family.awayfromhome.members.length) {
                $("#nextrafamilylist").empty();
                for (var i in family.awayfromhome.members) {
                    family.awayfromhome.members[i].memberid = i;
                    if (family.awayfromhome.members[i].statusRelated != "Delete") {
                        loadTemplate($("#nextrafamilylist"), miniTemplates.efamilymembercard, family.awayfromhome.members[i], "append");
                    }
                }
            }
        }
        callbackCloseModal = function () {};
    };
    fn_showModal();
    setTimeout(function () {
        $("#formefamily").slideDown("slow");
    }, 400);
};

/**
 *Function that is executed when external family member card is loaded
 *
 * @param {Object} _temp the template DOM element
 */
var fn_efamilymembercard = function (_temp) {
    _temp.find(".btn_editemember").click(function () {
        var editawayfromhome = jQuery.extend(true, {}, family.awayfromhome);
        editawayfromhome.flags = {
            type: 'edit',
            text: 'Guardar',
            memberid: Number($(this).attr("data-member")),
            group: 'awayfromhome'
        };
        editawayfromhome.index = Number($(this).attr("data-member")) + 1;
        fn_verifyCatalogs(["CAT_OCUPACION", "CAT_RESIDENCIA", "CAT_PARENTESCO-Miembro"], function () {
            loadTemplate($("#modal_generic .body"), templates.efamily, editawayfromhome);
        });
    });
    _temp.find(".btn_deletememberaway").click(function () {
        loadTemplate($("#modal_generic .body"), templates.conf, {
            memberid: $(this).attr("data-member"),
            title: "¿Deseas eliminar a un familiar?",
            message: "Al eliminarlo ya no se podrá recuperar",
            onAccept: function () {
                if (family.awayfromhome.members[this.memberid].alreadyExists == "true") {
                    family.awayfromhome.members[this.memberid].statusRelated = "Delete";
                }else{
                    family.awayfromhome.members.splice(this.memberid, 1);
                }
                family.awayfromhome.total = family.awayfromhome.getTotal();
                $("#extrafamily").selectOptionId(family.awayfromhome.getTotal());
                $("#nextrafamilylist").empty();
                for (var i in family.awayfromhome.members) {
                    family.awayfromhome.members[i].memberid = i;
                    if (family.awayfromhome.members[i].statusRelated != "Delete") {
                        loadTemplate($("#nextrafamilylist"), miniTemplates.efamilymembercard, family.awayfromhome.members[i], "append");
                    }
                }
                fn_hideModal();
            }
        });
    });
};

/**
 *Add a bba family member modal function
 *
 */
var fn_fam_bbva = function () {
    $("#relationship_b").comboSelect(catalogs["CAT_PARENTESCO-Soporte"], function (el) {
        if (el.id == "19") {
            $("#other_relationship_b").slideDown("slow");
            $("#relationship_b_o").attr("required", "required");
            $("#relationship_b_o").clearInput();
        } else {
            $("#other_relationship_b").slideUp("slow");
            $("#relationship_b_o").removeAttr("required");
            $("#relationship_b_o").clearInput();
        }
    });
    fn_showModal();
    /**
     *When modal is closed validate if there is no family registered, if so, an error message is shown
     *
     */
    callbackCloseModal = function () {
        if (Object.keys(family.bbva.member).length == 0) {
            fn_showAddFam($("#bbva_employee"), "bbva");
        }
        callbackCloseModal = function () {};
    };
    if (family.bbva.flag == "edit") {
        fillForm($("form#fam_bbva"), family.bbva.member);
        $("#relationship_b_o").setValue(__.get(membertoedit,"relationship_b_o",""));
    }
    $("#familybbvabtn").data("complete", function (_data) {
        if (_data.relationship_b_o != "") {
            _data.relationship = {
                "id": _data.relationship_b.id,
                "description": _data.relationship_b_o
            };
        } else {
            _data.relationship = _data.relationship_b;
        }
        if (family.bbva.flag == "edit" && __.get(family, "bbva.member.alreadyExists", "false") == "true") {
            _data.statusRelated = "Edit";
        } else {
            _data.statusRelated = "Add";
        }
        fn_hideModal();
        family.bbva.member = _data;
        $("#fam_bbvacard").empty();
        loadTemplate($("#fam_bbvacard"), miniTemplates.familybbvacard, family.bbva.member);
        if (family.bbva.member && $("#bbva_employee").prev(".notification.error").length) {
            $("#bbva_employee").prev(".notification.error").slideUp("slow");
        }
    });
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

/**
 *Family member group error template
 *
 * @param {Object} notif DOM element
 */
var fn_closeBtnNotification = function (notif) {
    notif.find(".btn__addfam").click(function () {
        var group = $(this).attr("data-group");
        if (group == "bbva") {
            fn_verifyCatalogs(["CAT_PARENTESCO-Soporte"], function () {
                loadTemplate($("#modal_generic .body"), templates.fambbva, {
                    title: "Agrega la información de tu familiar"
                });
            });
        } else if (group == "fromhome") {
            fn_verifyCatalogs(["CAT_INST_MEDICA", "CAT_EDO_CIVIL", "CAT_OCUPACION", "CAT_TPO_APOYO", "CAT_INST_APOYO", "CAT_PARENTESCO-Miembro", "CAT_MAX_NVL_ESTUDIO"], function () {
                loadTemplate($("#modal_generic .body"), templates.family, family.fromhome);
            });
        } else if (group == "awayfromhome") {
            fn_verifyCatalogs(["CAT_OCUPACION", "CAT_RESIDENCIA", "CAT_PARENTESCO-Miembro"], function () {
                loadTemplate($("#modal_generic .body"), templates.efamily, family.awayfromhome);
            });
        }
    });
    notif.slideDown("slow");
};

/**
 *BBVA family member card
 *
 */
var fn_modify_bbva = function () {
    $("#btn_modify_bbva").click(function (e) {
        e.preventDefault();
        membertoedit = family.bbva.member;
        family.bbva.flag = "edit";
        fn_verifyCatalogs(["CAT_PARENTESCO-Soporte"], function () {
            loadTemplate($("#modal_generic .body"), templates.fambbva, {
                title: "Agrega la información de tu familiar"
            });
        });
    });
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
        maxFiles: 2,
        maxFilesize: 12,
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
    "school": {
        path: "./views/modal/no_school.html",
        onload: fn_reportschool
    },
    "family": {
        path: "./views/modal/familymember.html",
        onload: fn_familymodal
    },
    "efamily": {
        path: "./views/modal/efamilymember.html",
        onload: fn_efamilymodal
    },
    "fambbva": {
        path: "./views/modal/fam_bbva.html",
        onload: fn_fam_bbva
    },
    "deletefam": {
        path: "./views/modal/delete_fam.html",
        onload: fn_deleteFam
    },
    "selectboss": {
        path: "./views/modal/select_boss.html",
        onload: fn_selectboss
    },
    "confirmAllData": {
        path: "./views/modal/confirm_data.html",
        onload: fn_confirmAllModal
    },
    "confirmemail": {
        path: "./views/modal/confirm_email.html",
        onload: fn_confirmemail
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
    btnnotification: {
        onload: fn_closeBtnNotification,
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
                        '<div><span title="{{button}}" aria-label="{{button}}" class="btn__basic btn__addfam" data-group="{{section}}">'+
                            '<span aria-hidden="true">{{button}}</span>'+
                        '</span></div>'+
                    '</div>'+
                '</div>'
    },
    shcolarshipdetail: {
        onload: function () {},
        html: '<p><i class="bbva-icon ui-gradution-cap"></i>Tipo de apoyo: {{tipo}}</p><p><i class="bbva-icon ui-receipt"></i>Programa o institución: {{programa}}</p><p><i class="bbva-icon ui-ticket"></i>Monto mensual: ${{monto}}</p>'
    },
    familymembercard: {
        onload: fn_familymembercard,
        html: '<div class="grid-item card gray familycard animated fadeIn">'+
                '<p class="title">{{fam_name}} {{fam_appat}} {{fam_apmat}}<i class="bbva-icon ui-profile"></i></p>'+
                '<p class="relationship">{{fam_relationship_des}}</p>'+
                '<div class="separator"></div>'+
                '<p class="checkbox-area">'+
                    '<span class="text inf">Jefe del hogar&nbsp;</span>'+
                    '<span class="checkbox familycardboss disabled{{familybossclass}}" data-member="{{memberid}}"><i class="bbva-icon ui-checkmark"></i></span>'+
                '</p>'+
                '<div class="moreinfo">'+
                    '<p class="inf">Edad: <span>{{fam_age}}</span></p>'+
                    '<p class="inf">Sexo: <span>{{fam_gender.description}}</span></p>'+
                    '<p class="inf">Estado civil: <span>{{fam_civil.description}}</span></p>'+
                    '<p class="inf">Grado de estudio: <span>{{fam_schoollevel.description}}</span></p>'+
                    '<p class="inf">Asiste a la escuela: <span>{{fam_studing.description}}</span></p>'+
                    '<p class="inf">Ocupación: <span>{{fam_ocupation.description}}</span></p>'+
                    '<p class="inf">Atención médica: <span>{{fam_medic.description}}</span></p>'+
                    '<p class="inf">Ingresos mensuales: <span>${{total_f}} MXN</span></p>'+
                    '<p class="inf">Trabajó el último mes: <span>{{fam_worked.description}}</span></p>'+
                    '<p class="inf">Recibe otra beca: <span>{{fam_otherschoolarship.description}} <i class="bbva-icon ui-show scholarship-tooltip" data-tooltip="{{infoscolarship}}"></i></span></p>'+
                '</div>'+
                '<div class="centertext">'+
                    '<span title="Modificar" aria-label="Modificar" class="btn__basic btn__clearbg btn_editmember" data-member="{{memberid}}">'+
                        '<i class="bbva-icon ui-edit icon-fix"></i>'+
                        '<span aria-hidden="true">Modificar</span>'+
                    '</span>'+
                    '<span title="Eliminar" aria-label="Eliminar" class="btn__basic btn__clearbg btn_deletemember" data-member="{{memberid}}">'+
                        '<i class="bbva-icon ui-trash icon-fix"></i>'+
                        '<span aria-hidden="true">Eliminar</span>'+
                    '</span>'+
                '</div>'+
            '</div>'
    },
    efamilymembercard: {
        onload: fn_efamilymembercard,
        html:   '<div class="grid-item card gray familycard animated fadeIn">'+
                    '<p class="title">{{fam_name}} {{fam_appat}} {{fam_apmat}}<i class="bbva-icon ui-profile"></i></p>'+
                    '<p class="relationship">{{fam_relationship_des}}</p>'+
                    '<div class="separator"></div>'+
                    '<div class="moreinfo">'+
                        '<p class="inf">Ocupación: <span>{{fam_ocupation.description}}</span></p>'+
                        '<p class="inf">Vive: <span>{{fam_lives.description}}</span></p>'+
                        '<p class="inf">Aporta: <span>${{total_f}} MXN</span></p>'+
                    '</div>'+
                    '<div class="centertext">'+
                        '<span title="Modificar" aria-label="Modificar" class="btn__basic btn__clearbg btn_editemember" data-member="{{memberid}}">'+
                            '<i class="bbva-icon ui-edit icon-fix"></i>'+
                            '<span aria-hidden="true">Modificar</span>'+
                        '</span>'+
                    '<span title="Eliminar" aria-label="Eliminar" class="btn__basic btn__clearbg btn_deletememberaway" data-member="{{memberid}}">'+
                        '<i class="bbva-icon ui-trash icon-fix"></i>'+
                        '<span aria-hidden="true">Eliminar</span>'+
                    '</span>'+
                    '</div>'+
                '</div>'
    },
    familybbvacard: {
        onload: fn_modify_bbva,
        html: '<div class="grid-item card gray familycard bounce">'+
                    '<p class="title">{{name_fbbva}} {{lastname_fbbva}} {{slastname_fbbva}}<i class="bbva-icon ui-profile"></i></p>'+
                    '<p class="relationship">{{relationship.description}}</p>'+
                    '<div class="separator"></div>'+
                '<div class="moreinfo">'+
                    '<p class="inf">Puesto: <span>{{workposition_fbbva}}</span></p>'+
                    '<p class="inf">Área de trabajo: <span>{{workstation_fbbva}}</span></p>'+
                '</div>'+
                '<br>'+
                '<div class="centertext">'+
                    '<span title="Modificar" aria-label="Modificar" class="btn__basic btn__clearbg" id="btn_modify_bbva">'+
                        '<i class="bbva-icon ui-edit icon-fix"></i>'+
                        '<span aria-hidden="true">Modificar</span>'+
                    '</span>'+
                '</div>'+
            '</div>'
    },
    m_familycard: {
        onload: fn_nothing,
        html: '<div class="grid-item card gray  familycard mod">'+
                '<p class="title">{{name}} {{lastName}} {{secondLastName}}<i class="bbva-icon ui-profile"></i></p>'+
                '<p class="relationship">{{relationship.description}}</p>'+
                '<div class="separator"></div>'+
                '<div class="read-only">'+
                    '<p>Edad: <span>{{personDetail.age}}</span></p>'+
                    '<p>Sexo: <span>{{personDetail.gender.id}}</span></p>'+
                    '<p>Estado civil: <span>{{personDetail.maritalStatus.description}}</span></p>'+
                    '<p>Grado de estudio: <span>{{personDetail.education.description}}</span></p>'+
                    '<p>Asiste a la escuela: <span>{{student}}</span></p>'+
                    '<p>Ocupaci&oacute;n: <span>{{personDetail.economicActivity.description}}</span></p>'+
                    '<p>Atenci&oacute;n m&eacute;dica: <span>{{personDetail.healthCareEntity.description}}</span></p>'+
                    '<p>Ingresos mensuales: <span>{{incomesamount}} MXN</span></p>'+
                    '<p>Trabaj&oacute; el &uacute;ltimo mes: <span>{{hasWorked}}</span></p>'+
                    '<p>Recibe otra beca: <span>{{isotherG}}</span></p>'+
                    '<div style="display: {{fam_otherschoolarship}}">'+
                        '<p>Tipo de beca: <span>{{personDetail.otherGovernmentScholarship.otherGovernmentScholarshipType.description}}</p>'+
                        '<p>Programa de beca: <span>{{otherScholarshipProgramDescription}}</p>'+
                        '<p>Monto de la beca: <span>{{otherGovernmentScholarshipamount}} MXN</p>'+
                    '</div>'+
                '</div>'+
            '</div>'
    },
    m_efamilycard: {
        onload: fn_nothing,
        html: '<div class="grid-item card gray  familycard mod">'+
                '<p class="title">{{name}} {{lastName}} {{secondLastName}}<i class="bbva-icon ui-profile"></i></p>'+
                '<p class="relationship">{{relationship.description}}</p>'+
                '<div class="separator"></div>'+
                '<div class="read-only">'+
                    '<p>Ocupaci&oacute;n: <span>{{personDetail.economicActivity.description}}</span></p>'+
                    '<p>Vive: <span>{{personDetail.residencePlace.description}}</span></p>'+
                    '<p>Aporta: <span>{{incomesamount}} MXN</span></p>'+
                '</div>'+
            '</div>'
    },
    m_bbvafamilycard: {
        onload: fn_nothing,
        html: '<div class="grid-item card gray  familycard mod bounce">'+
                '<p class="title">{{name}} {{lastName}} {{secondLastName}}<i class="bbva-icon ui-profile"></i></p>'+
                '<p class="relationship">{{relationship.description}}</p>'+
                '<div class="separator"></div>'+
                '<div class="read-only">'+
                    '<p>Puesto: <span>{{personDetail.professionPosition}}</span></p>'+
                    '<p>&Aacute;rea de trabajo: <span>{{personDetail.managementUnit}}</span></p>'+
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
    CCT: {
        regEx: /^(0[1-9]|1[0-9]|2[0-9]|3[0-2])[A-Z]{3}[0-9]{4}[A-Z]{1}$/,
        error: "Por favor valida la clave de tu escuela"
    },
    PROM: {
        regEx: /10$|^\d(\.\d\d?)?$/,
        error: "Ingresa una calificación entre 0 y 10"
    },
    FB: {
        regEx: /(http|https):\/\/(?:www\.)facebook\.com\/(\b(([\w\-\.])*\/{0,1})|\b(profile\.php\?id=\d.*))$/,
        error: "Por favor ingresa una url válida"
    },
    ZIPCODE: {
        regEx: /^\d{5}/,
        error: "Por favor ingresa un código postal válido"
    },
    YEAR_50_ACT: {
        regEx: {
            test: function(year) {
                nyear = Number(year);
                return (!isNaN(nyear) && (year >= 1950 && year <= new Date().getFullYear()));
            }
        },
        error: "Ingresa un año de 1950-actual"
    },
    YEAR_80_ACT: {
        regEx: {
            test: function(year) {
                nyear = Number(year);
                return (!isNaN(nyear) && (year >= 1980 && year <= new Date().getFullYear()));
            }
        },
        error: "Ingresa un año de 1980-actual"
    },
    YEAR_MIN_80: {
        regEx: {
            test: function(year) {
                nyear = Number(year);
                return (!isNaN(nyear) && year >= 1980);
            }
        },
        error: "Ingresa un año desde 1980"
    },
	FOL:{
        regEx: /^[0-9]{2}[127][0-9]{8}$/
    },
    FUN: {
        regEx: /^FUN[0-9]{8}$/
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
                integerDigits:"6",
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
 *Show an error on a family group
 *
 * @param {Object} $form DOM element
 * @param {string} fam_group the family group
 */
fn_showAddFam = function($form, fam_group) {
    _scrollTo = hasAttr($form, 'data-notify') ? $form.attr('data-notify') : 'html';
    $(_scrollTo).animate({
        scrollTop: $form.prev().offset().top - 100
    }, 1000, "swing", function() {
        notifyElem = $form.prev();
        if (notifyElem.length != 0 && notifyElem.hasClass("notification")) notifyElem.remove();
        loadTemplate($form, miniTemplates.btnnotification, {
            type: 'error',
            title: 'Datos obligatorios incompletos',
            message: 'Por favor ingresa la información de tu familiar',
            button: 'Agregar familiar',
            section: fam_group
        }, 'before');
    });
};

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
$("#btn_fb").click(function(e) {
    e.preventDefault();
    loadTemplate($("#modal_generic .body"), templates.fb, {
        title: "Para vincular tu facebook, realiza los siguiente pasos"
    });
});
$("#btn_savegd").data("complete", function(_data) {
    var dateto = $('#mbirthdate').getOptionSelected().id + '/' + $('#dbirthdate').getOptionSelected().description + '/' + $('#ybirthdate').val();
    if (vali_date(dateto)) {
        restExec({
            service: 'MODIF_UPLOADSCHOLAR',
            data: {
                "userCurrent": "ALUMNO",
                "registerType": "2",
                "student": [
                    {
                        "studentId": "",
                        "scholarUser": ivUser,
                        "programType": moduleInitData.announcement.scholarshipProgram.id,
                        "statusDispersion": "",
                        "originRegion": "",
                        "schoolCycle": "",
                        "cdAssignedCR": "",
                        "assignedCR": "",
                        "scholarNumber": "",
                        "accountNumber": "",
                        "folioPhoto": "",
                        "name": _data.username,
                        "firstName": _data.firstname,
                        "lastName": _data.lastname,
                        "CURP": _data.curp,
                        "scholarBirthdate":  _data.dbirthdate.description+"-"+_data.mbirthdate.id+"-"+_data.ybirthdate,
                        "gender": _data.gender.id,
                        "schoolData": [
                            {
                        "duration": "",
                                "turn": "",
                                "typeCareer": "",
                                "nameCareer": "",
                                "area": "",
                                "school": [
                                    {
                                        "cdState": "",
                                        "state": "",
                                        "cdMunicipality": "",
                                        "municipality": "",
                                        "CCT": "",
                                        "control": "",
                                        "initials": "",
                                        "type": "",
                                        "name": "",
                                        "domicile": ""
                                    }
                                ]
                            }
                        ],
                        "domicile": [
                            {
                                "street": _data.street,
                                "locality": "",
                                "numExterior": _data.outdoornum,
                                "numInterior": _data.interiornum,
                                "codePostal": _data.zipcode,
                                "cdMunicipality": _data.municipalities.id,
                                "municipality": _data.municipalities.description,
                                "colony": _data.neighborhood,
                                "cdState": _data.state.id,
                                "state": _data.state.description,
                                "betweenStreet": "",
                                "typeOfRoad1": "",
                                "andTheStreet": "",
                                "typeOfRoad2": "",
                                "behindStreet": "",
                                "typeOfRoad3": "",
                                "particularReferences": _data.references
                            }
                        ],
                        "contactInf": [
                            {
                                "homePhone": _data.phone,
                                "cellPhone": _data.cellphone,
                                "messagePhone": _data.errandsphone,
                                "email":_data.email,
                                "email1": _data.email2,
                                "email2": _data.email3,
                                "facebook": ""
                            }
                        ],
                        "tutorData": [
                            {
                                "tutorName": _data.tutorname,
                                "firstNameTutor": _data.tutorlastname,
                                "lastNameTutor": _data.tutorslastname,
                                "kinship": _data.relationship.description,
                                "kinshipType": _data.o_relationship
                            }
                        ],
                        "program": [
                            {
                                "status": "",
                                "modalityParticipation": "",
                                "generation": "",
                                "originResources": "",
                                "projectSEPNumber": "",
                                "numberNMDP": "",
                                "schoolGrade": "",
                                "resultImpactEvaluation": ""
                            }
                        ]
                    }
                ]
            },
            showWait: true,
            success: function () {
                loadModule.general(
                    function () {
                        changeStatusSel($("#general-data"));
                    }
                );
            }
        });
    } else {
        fbdate = false;
        $('#dbirthdate').showComboError("Fecha inválida");
        $('#mbirthdate').showComboError("Fecha inválida");
        $("html").animate({
            scrollTop: $("#dbirthdate").offset().top - 200
        }, 1000, "swing", 'before');
    }
});
$("#formschdata").data("validations", function(_data) {
    if (_data.schoolname == "" && (_data.cct != "" || _data.localities != "" || _data.schoolT != null)) {
        $('#snerror').show();
        return false;
    }
    return true;
});
$("#btn_savesd").data("complete", function(_data) {
    var dateto = "",
    _uni = false;
    if (moduleInitData.announcement.scholarshipProgram.id == "7") {
        dateto = _data.msclass.id + '/' + _data.dsclass.description + '/' + _data.ysclass;
        _uni = true;
    }
    if (_uni && !vali_date(dateto)) {
        $('#dsclass').showComboError("Fecha inválida");
        $('#msclass').showComboError("Fecha inválida");
        $("html").animate({
            scrollTop: $("#dsclass").offset().top - 200
        }, 1000, "swing", 'before');
        return;
    }
    restExec({
        service: 'UPDATE_SCHOLARINF',
        data: {
                "id": ivUser,
                "scholarshipProgram": [
                    {
                        "id": moduleInitData.announcement.scholarshipProgram.id
                    }
                ],
                "average": _data.promgen,
                "schooling": {
                    "schoolName": _data.schoolname,
                    "location": {
                        "state": {
                            "id": _data.state_s.id
                        },
                        "municipality": {
                            "id": _data.municipalities_s.id
                        }
                    },
                    "profession": {
                        "area": _data.career_area,
                        "subArea": _data.career_subarea,
                        "careerName": _data.program_career,
                        "modality": _data.modality,
                        "type": _data.type_s,
                        "scholarShift": _data.turn,
                        "duration": _data.duration,
                        "classesStartDate": _uni?_data.dsclass.description+"-"+_data.msclass.id+"-"+_data.ysclass:""
                    },
                    "newLocation": {
                        "state": {
                            "id": __.get(_data,'state_m.id',''),
                            "name": __.get(_data,'state_m.description','')
                        },
                        "municipality": {
                            "id": __.get(_data,'municipalities_m.id',''),
                            "name": __.get(_data,'municipalities_m.description','')
                        }
                    }
                },
                "operation": {
                    "searchType": "CCT",
                    "searchDescription": _data.schoolslist.keyWorkplace,
                    "userCurrent": "ALUMNO",
                    "keyWorkplace": _data.schoolslist.keyWorkplace
                },
                "changeAddress": _uni?(_data.change_h.id == "SI" ? true : false):false,
                "expenses": {
                    "mounthlyRent": _uni?_data.payment_rent!=""?formatMoney(_data.payment_rent,true).replace(/,/g, '').replace(/\$/g, ''):"":"",
                    "isPayRent": _uni?_data.rent.id=="SI"?true:false:false,
                    "transportationAmount":_uni?_data.trans!=""?formatMoney(_data.trans,true).replace(/,/g, '').replace(/\$/g, ''):"":""
                }
        },
        showWait: true,
        success: function() {
            loadModule.schoolData(function () {
                changeStatusSel($("#schoolar-data"));
                hideWait();
            });
        }
    });
});
$("#btn_savesoc").data("complete", function(e) {
    var _hasFamilyBoss = false;
    var _tempFamFH = family.fromhome.getMembers();
    if (moduleInitData.announcement.scholarshipProgram.id != "7" && family.fromhome.getTotal()<2) {
        fn_showAddFam($("#fam_members"), "fromhome");
        return;
    }

    for (var i in _tempFamFH) {
        if (_tempFamFH[i].familyBoss == "Sí") {
            _hasFamilyBoss = true;
            break;
        }
    }
    if (!_hasFamilyBoss && family.fromhome.getTotal() > 0) {
        loadTemplate($("#modal_generic .body"), templates.selectboss, {"members":_tempFamFH});
    } else {
        var error = $("#social-data").find(".notification.error");

        if (error.length === 0) {
            allFamilies = [];
            for (_i = 0; _i < family.fromhome.members.length; _i++) {
                c_family = family.fromhome.members[_i];
                if (c_family.statusRelated != "OK") {
                    n_data = {
                        "id": __.get(c_family,"relatedid","0")==""?"0":__.get(c_family,"relatedid","0"),
                        "name": c_family.fam_name,
                        "lastName": c_family.fam_appat,
                        "secondLastName": c_family.fam_apmat,
                        "statusRelatedPersonsInformation": family.unregistered?"Add":c_family.statusRelated,
                        "relationship": {
                            "id": c_family.fam_relationship.id,
                            "otherRelationshipDescription": c_family.fam_o_relationship
                        },
                        "personDetail": {
                            "personType": "PERSONS_LIVE_HOME",
                            "isHeadOfHousehold": c_family.familyBoss == "Sí"?"true":"false",
                            "gender": {
                                "id": c_family.fam_gender.id
                            },
                            "age": c_family.fam_age,
                            "maritalStatus": {
                                "id": c_family.fam_civil.id
                            },
                            "education": {
                                "id": c_family.fam_schoollevel.id
                            },
                            "isStudent": c_family.fam_studing.id,
                            "economicActivity": {
                                "id": c_family.fam_ocupation.id
                            },
                            "healthCareEntity": {
                                "id": c_family.fam_medic.id,
                                "otherHealthCareEntity": c_family.fam_omedic
                            },
                            "incomes": [
                                {
                                    "amount": (c_family.total_f).toString().replace(/,/g, '').replace(/\$/g, ''),
                                    "currency": "MXN"
                                }
                            ],
                            "hasWorkedLastMonth": c_family.fam_worked.id
                        }
                    };
                    if (c_family.fam_otherschoolarship.id == "0") {
                        n_data.personDetail.otherGovernmentScholarship = {
                            "id": c_family.fam_programschoolarship.id,
                            "otherScholarshipProgramDescription": c_family.fam_programschoolarship.id!="6"?c_family.fam_programschoolarship.description:c_family.sprogramname,
                            "otherGovernmentScholarshipType": {
                                "id": c_family.fam_kindschoolarship.id
                            },
                            "incomes": [
                                {
                                    "amount": (c_family.total_sf).toString().replace(/,/g, '').replace(/\$/g, ''),
                                    "currency": "MXN"
                                }
                            ]
                        };
                    }
                    allFamilies.push(n_data);
                }
            }
            for (_i = 0; _i < family.awayfromhome.members.length; _i++) {
                c_family = family.awayfromhome.members[_i];
                if (c_family.statusRelated != "OK") {
                    n_data = {
                        "id": __.get(c_family,"relatedid","0") == ""?"0":__.get(c_family,"relatedid","0"),
                        "name": c_family.fam_name,
                        "lastName": c_family.fam_appat,
                        "secondLastName": c_family.fam_apmat,
                        "statusRelatedPersonsInformation": __.get(c_family,"statusRelated","Add"),
                        "relationship": {
                            "id": c_family.fam_relationship.id,
                            "otherRelationshipDescription": c_family.fam_o_relationship
                        },
                        "personDetail": {
                            "personType": "NOT_LIVE_HOME_ECONOMIC_SUPPORT",
                            "residencePlace": {
                                "id": c_family.fam_lives.id
                            },
                            "incomes": [
                                {
                                    "amount": (c_family.total_f).toString().replace(/,/g, '').replace(/\$/g, ''),
                                    "currency": "MXN"
                                }
                            ],
                            "economicActivity": {
                                "id": c_family.fam_ocupation.id
                            }
                        }
                    };
                    allFamilies.push(n_data);
                }
            }
            c_family = family.bbva.member;
            if (Object.keys(family.bbva.member).length > 0 && c_family.statusRelated != "OK") {
                n_data = {
                    "id": __.get(c_family,"relatedid","0")==""?"0":__.get(c_family,"relatedid","0"),
                    "name": c_family.name_fbbva,
                    "lastName": c_family.lastname_fbbva,
                    "secondLastName": c_family.slastname_fbbva,
                    "statusRelatedPersonsInformation": c_family.statusRelated,
                    "relationship": {
                        "id": c_family.relationship.id,
                        "otherRelationshipDescription": c_family.relationship_b_o
                    },
                    "personDetail": {
                        "personType": "RELATIVE_WORKS_BBVA",
                        "professionPosition": c_family.workposition_fbbva,
                        "managementUnit": c_family.workstation_fbbva
                    }
                };
                allFamilies.push(n_data);
            }
            if (allFamilies.length == 0) return;
            var servToExec = family.unregistered?"CREATE_SOCINF":"UPDATE_SOCINF";

            restExec({
                service: servToExec,
                data: {
                    "relatedPersons": allFamilies
                },
                hasUrlParam: true,
                urlParam: {
                    scholarId: ivUser
                },
                showWait: true,
                success: function() {
                    loadModule.sociodemographic(function () {
                        changeStatusSel($("#social-data"));
                    });
                },
                error: function(_error) {
                    if (__.get(_error,"status",0)==200) {
                        loadModule.sociodemographic(function () {
                            changeStatusSel($("#social-data"));
                        });
                    }else{
                        rest_fnShowError(_error);
                    }
                }
            });
        } else {
            $('html').animate({
                scrollTop: error.offset().top - 100
            }, 2000, "swing");
        }
    }

});
$("#btn_savehd").data("complete", function(data) {
    restExec({
        service: 'UPDATE_HOMEINF',
        data: {
            "operation": {
                "userCurrent": "ALUMNO"
            },
            "id": ivUser,
            "homeInformation": {
                "roomsNumber": data.roomsNumber.id,
                "bedroomsNumber": data.bedroomsNumber.id,
                "bathroomsNumber": data.bathroomsNumber.id,
                "drainageType": data.drainageType,
                "homeService": {
                    "waterServicesType": data.waterServicesType,
                    "lightServicesType": data.lightServicesType
                },
                "wallMaterialsType": data.wallMaterialsType,
                "cookingFuelType": data.cookingFuelType,
                "ceilingMaterialsType": data.ceilingMaterialsType,
                "floorMaterialsType": data.floorMaterialsType,
                "belongings": {
                    "carsNumber": data.carsNumber.id,
                    "hasInternet": (data.hasInternet.id == "SI"),
                    "hasComputer": (data.hasComputer.id == "SI"),
                    "hasMicrowave": (data.hasMicrowave.id == "SI"),
                    "hasPayTV": (data.hasPayTV.id == "SI"),
                    "hasWashingMachine": (data.hasWashingMachine.id == "SI"),
                    "hasMotorcycle": (data.hasMotorcycle.id == "SI"),
                }
            }
        },
        hasUrlParam: true,
        urlParam: {
            scholarId: ivUser
        },
        showWait: true,
        success: function() {
            loadModule.home(function () {
                changeStatusSel($("#inmueble-data"));
            });
        }
    });
});

$("#btn_savehd").data("complete", function(data) {
    restExec({
        service: 'UPDATE_HOMEINF',
        data: {
            "operation": {
                "userCurrent": "ALUMNO"
            },
            "id": ivUser,
            "homeInformation": {
                "roomsNumber": data.roomsNumber.id,
                "bedroomsNumber": data.bedroomsNumber.id,
                "bathroomsNumber": data.bathroomsNumber.id,
                "drainageType": data.drainageType,
                "homeService": {
                    "waterServicesType": data.waterServicesType,
                    "lightServicesType": data.lightServicesType
                },
                "wallMaterialsType": data.wallMaterialsType,
                "cookingFuelType": data.cookingFuelType,
                "ceilingMaterialsType": data.ceilingMaterialsType,
                "floorMaterialsType": data.floorMaterialsType,
                "belongings": {
                    "carsNumber": data.carsNumber.id,
                    "hasInternet": (data.hasInternet.id == "SI"),
                    "hasComputer": (data.hasComputer.id == "SI"),
                    "hasMicrowave": (data.hasMicrowave.id == "SI"),
                    "hasPayTV": (data.hasPayTV.id == "SI"),
                    "hasWashingMachine": (data.hasWashingMachine.id == "SI"),
                    "hasMotorcycle": (data.hasMotorcycle.id == "SI"),
                }
            }
        },
        hasUrlParam: true,
        urlParam: {
            scholarId: ivUser
        },
        showWait: true,
        success: function() {
            loadModule.home(function () {
                changeStatusSel($("#stage-data"));
            });
        }
    });
});

$("#btn_saveld").data("complete", function() {
    var _legalDisclaimers = [];
    $("#legal1, #legal2, #legal3").each(function () {
        if ($(this).isChecked()) {
            _legalDisclaimers.push(
                {
                    "id": $(this).attr("data-legal-id"),
                    "isAccepted": "Y",
                    "consecutive": $(this).attr("data-legal-consecutive"),
                    "moduleId": 31
                }
            );
        }
    });
    restExec({
        service: 'UPDATE_LEGAL',
        data: {
            "legalDisclaimers": _legalDisclaimers,
            "scholar": {
                "id": ivUser
            },
            "scholarshipProgram": {
                "id": moduleInitData.announcement.scholarshipProgram.id
            }
        },
        showWait: true,
        success: function() {
            loadModule.legalDisclaimer(function () {
                changeStatusSel($("#legal-data"));
            });
        }
    });
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

new Tooltip($("#ybirthdate").parent(".placeholder-wrapper"), {
    placement: 'bottom', // or bottom, left, right, and variations
    trigger: "focus",
    html: true,
    closeOnClickOutside: true,
    title: "Por ejemplo: 2001"
});

new Tooltip($("#ysclass").parent(".placeholder-wrapper"), {
    placement: 'bottom', // or bottom, left, right, and variations
    trigger: "focus",
    html: true,
    closeOnClickOutside: true,
    title: "Por ejemplo: 2001"
});

var seedFindSchool;

/**
 *Function that shows the Report school button
 *
 */
function showReportNewSchool() {
    $("#reportschool_sec").slideDown();
    $("#help_sh").slideDown("slow", function() {
        $("#help_sh").click();
        helpScoolTooltip.show();
        $("#st_btn_reportschool").click(function() {
            state_id = $("#state_s").getOptionSelected().id;
            mun_id = $("#municipalities_s").getOptionSelected().id;
            loadModule.getCatalog("CAT_TPO_ESCUELA-"+state_id+"-"+mun_id+"-"+moduleInitData.announcement.scholarshipProgram.id, function () {
                loadTemplate($("#modal_generic .body"), templates.school, {});
            });
            $("#help_sh").click();
            helpScoolTooltip.hide();
        });
        $("#st_btn_cancel").click(function() {
            $("#help_sh").click();
            helpScoolTooltip.hide();
        });
    });
}

/**
 *Executes the showRerportNewSchool function after 120 seconds (2 minutes)
 *
 */
function countCantFindSchool() {
    if (seedFindSchool == undefined) {
        seedFindSchool = setTimeout(showReportNewSchool, 120000);
    }
}


$('#search_by').onChecked(function(rad) {
    countCantFindSchool();
    $(".school-list").hide();
    $("#schoolT").removeClass("required");
    $("#schoolslist").unselect();
    $("#btn_locality, #btn_type, #btn_cct").addClass("btn__disabled");
    $("#cct, #localities").removeAttr("required");
    $('.school-list').find('.list-result').addClass('disabled');
    $('#schoolname').prop("disabled", true);
    $(".school-list").show();
    switch (rad.id) {
        case "CCT":
            $("#cct").clearInput();
            $("#cct").attr("required", "required");
            break;
        case "LOC":
            $("#localities").attr("required", "true");
            state_id = $("#state_s").getOptionSelected().id;
            mun_id = $("#municipalities_s").getOptionSelected().id;
            loadModule.getCatalog("CAT_LOCALIDADES-"+state_id+"-"+mun_id+"-"+moduleInitData.announcement.scholarshipProgram.id, function () {
                $("#localitieslist").searchList({
                    filterid: "description",
                    filtertext: "description",
                    items: catalogs["CAT_LOCALIDADES-"+$("#state_s").getOptionSelected().id+"-"+$("#municipalities_s").getOptionSelected().id+"-"+moduleInitData.announcement.scholarshipProgram.id]
                }, function(element) {
                    $("#btn_locality").removeClass("btn__disabled");
                });
            });
            break;
        case "TYP":
            $("#schoolT").reset();
            state_id = $("#state_s").getOptionSelected().id;
            mun_id = $("#municipalities_s").getOptionSelected().id;
            loadModule.getCatalog("CAT_TPO_ESCUELA-"+state_id+"-"+mun_id+"-"+moduleInitData.announcement.scholarshipProgram.id, function () {
                fnFillCatalogs("schoolT", catalogs["CAT_TPO_ESCUELA-"+state_id+"-"+mun_id+"-"+moduleInitData.announcement.scholarshipProgram.id], function() {
                    $("#btn_type").removeClass("btn__disabled");
                });
            });
            break;
        default:
            break;
    }
    $('.search-filter .filter:not(.filter_' + rad.id.toLowerCase() + ')').hide('fast', function() {
        $('.search-filter .filter_' + rad.id.toLowerCase()).show('fast');
    });
});
$('.radio-section.search-by').onRadioReset(function() {
    $(".school-list").hide();
    $("#schoolT").removeClass("required");
    $("#schoolslist").unselect();
    $("#btn_locality, #btn_type, #btn_cct").addClass("btn__disabled");
    $("#cct, #localities").removeAttr("required");
    $('.search-filter .filter').hide('fast');
});

$("#cct").keyup(function(e) {
    if (expRegs.CCT.regEx.test($(this).val().toUpperCase())) {
        $("#btn_cct").removeClass("btn__disabled");
    } else $("#btn_cct").addClass("btn__disabled");
});
$(".btn_reportschool").click(function() {
    loadTemplate($("#modal_generic .body"), templates.school, {});
});
$("#btn_locality, #btn_type, #btn_cct").click(function() {
    $('#snerror').hide();
    if ($(this).hasClass("btn__disabled")) return;
    searchType = "";
    value = "";
    switch (this.id) {
        case "btn_locality":
            searchType = "location";
            value = $("#localities").val();
            break;
        case "btn_type":
            searchType = "schoolAcronym";
            value = $("#schoolT").getOptionSelected().description;
            break;
        case "btn_cct":
            searchType = "keyWorkplace";
            value = $("#cct").val();
            break;
        default:
            break;
    }
    _dataListSchool = {
        "region": "",
        "state": $("#state_s").getOptionSelected().description,
        "municipality": $("#municipalities_s").getOptionSelected().description,
        "location": "",
        "schoolType":"",
        "programScholarshipId": moduleInitData.announcement.scholarshipProgram.id,
        "keyWorkplace": "",
        "schoolOficialName": "",
        "schoolAcronym": "",
        "completeInformation": 2,
        "paginationIn": [
            {
                "paginationKey": "1",
                "pageSize": "100"
            }
        ]
    };
     _dataListSchool[searchType] = value;
     schools=[];
    getSchoolsList();

    $(".school-list").slideDown("slow", function() {
        $('.school-list').find('.list-result').removeClass('disabled');
        $('#schoolname').prop("disabled", false);
        $("#schoolslist").onSelect(function() {
            clearTimeout(seedFindSchool);
            seedFindSchool = undefined;
        });
    });
});
/**
 *It execute the school pagination if the hasMoreData flag is equal to "1"
 *
 * @param {object} data the service object response
 */
var paginationSchoolList = function (data) {
    if (data.paginationOut[0].hasMoreData == "1") {
        _dataListSchool.paginationIn[0].paginationKey = data.paginationOut[0].paginationKey;
        getSchoolsList();
    }
    $("#schoolslist").searchList({
        filterid: "keyWorkplace",
        filtertext: "schoolOficialName",
        items: schools
    });
};
var _dataListSchool;
/**
 *Executes the 'GET_SCHOOLS' service
 *
 */
function getSchoolsList () {
    restExec({
        service: 'GET_SCHOOLS',
        data: _dataListSchool,
        showWait:true,
        success: rest_fnListSchools,
        finallySuccess: paginationSchoolList,
        error: function (_err) {
            if (__.get(_err,"responseJSON.code","")=="01229001") {
                if (schools.length>0) {
                    $("#schoolslist").searchList({
                        filterid: "keyWorkplace",
                        filtertext: "schoolOficialName",
                        items: schools
                    });
                }else {
                    $("#schoolslist").searchList({
                        filterid: "keyWorkplace",
                        filtertext: "schoolOficialName",
                        items: schools
                    });
                    loadTemplate($("#modal_generic .body"), miniTemplates.error, {
                        title: "No se encontraron escuelas",
                        message: "No se encontraron resultados de escuelas con los filtros ingresados"
                    });
                }
            }else{
                rest_fnShowError(_err);
            }
        }
    });
}

seedFindSchool = undefined;

$("#n_family").onSelect(function(el) {
    nfam = Number(el.id);
    if (nfam != family.fromhome.getTotal()) {
        family.fromhome.total = nfam;
        family.fromhome.flags = {
            type: 'add',
            text: 'Continuar'
        };
        if (nfam < family.fromhome.getTotal()) {
            var deletefromhome = family.fromhome.getMembers();
            deletefromhome.splice(0, 1);

            loadTemplate($("#modal_generic .body"), templates.deletefam, {
                title: "¿Deseas eliminar algún familiar?",
                message: "Selecciona el familiar que deseas eliminar(al eliminarlo ya no se podrá recuperar):",
                members: deletefromhome,
                origin: 'family',
                onAccept: function() {
                    nFam = family.fromhome.getTotal();
                    newNfam = family.fromhome.total;
                    dif = nFam - newNfam;
                    cChecked = $("#list-member").find(".checkbox.checked").length;
                    if (cChecked > dif) {
                        if ($("#formdeletefam").prev(".notification.error").length) $("#formdeletefam").prev(".notification.error").remove();
                        loadTemplate($("#formdeletefam"), miniTemplates.notification, {
                            type: 'error',
                            title: 'Lo sentimos',
                            message: 'Sólo puedes eliminar ' + dif + ' familiar(es)'
                        }, 'before');
                    } else if (cChecked < dif) {
                        if ($("#formdeletefam").prev(".notification.error").length) $("#formdeletefam").prev(".notification.error").remove();
                        loadTemplate($("#formdeletefam"), miniTemplates.notification, {
                            type: 'error',
                            title: 'Lo sentimos',
                            message: 'Debes seleccionar ' + dif + ' familiar(es) o cancelar'
                        }, 'before');
                    } else if (cChecked == dif) {
                        indexR = $("#list-member").find(".checkbox.checked");
                        bossFamilyDeleted = false;
                        for (var i = indexR.length - 1; i >= 0; i--) {
                            var mem_index = $(indexR[i]).attr("data-index");
                            if (family.fromhome.members[Number(mem_index)].familyBoss == "Sí") {
                                bossFamilyDeleted = true;
                            }
                            if (__.get(family.fromhome.members[Number(mem_index)],"alreadyExists","false") == "true") {
                                family.fromhome.members[Number(mem_index)].statusRelated = "Delete";
                            }else{
                                family.fromhome.members.splice(Number(mem_index), 1);
                            }
                        }
                        if (bossFamilyDeleted) {
                            _famLst = {members: family.fromhome.getMembers()};
                            if (_famLst.members.length == 1) {
                                family.fromhome.members[0].familyBoss = "Sí";
                                if (__.get(family.fromhome.members[0],"alreadyExists","false") == "true") {
                                    family.fromhome.members[0].statusRelated = "Edit";
                                }
                            }else{
                                loadTemplate($("#modal_generic .body"), templates.selectboss, _famLst);
                            }
                        } else {
                            fn_hideModal();
                            $("#nfamilylist").empty();
                            for (var _i in family.fromhome.members) {
                                family.fromhome.members[_i].memberid = _i;
                                if (family.fromhome.members[_i].statusRelated != "Delete") {
                                    loadTemplate($("#nfamilylist"), miniTemplates.familymembercard, family.fromhome.members[_i], "append");
                                }
                            }
                        }
                    }
                },
                onDecline: function() {
                    $('#n_family').selectOptionId(family.fromhome.getTotal());
                    fn_hideModal();
                }
            });
        } else{
            fn_verifyCatalogs(["CAT_INST_MEDICA","CAT_EDO_CIVIL","CAT_OCUPACION","CAT_TPO_APOYO","CAT_INST_APOYO","CAT_PARENTESCO-Miembro","CAT_MAX_NVL_ESTUDIO"],function(){
                loadTemplate($("#modal_generic .body"), templates.family, family.fromhome);
            });
        }
    }else {
        if ($("#fam_members").prev().hasClass("error")) {
            $("#fam_members").prev().remove();
        }
    }
});

//extrafamily

$("#extrafamily").comboSelect((function() {
    _arrFamily = [];
    for (var i = 0; i < 10; i++) {
        _arrFamily.push({
            id: "" + i,
            description: "" + i
        });
    }
    _arrFamily.push({
        id: "10",
        description: "10 o más"
    });
    return _arrFamily;
})(), function(el) {
    nfam = Number(el.id);
    if (nfam == 0 && family.awayfromhome.getTotal() == 0) {
        if ($("#ext_family").prev().hasClass("error")) {
            $("#ext_family").prev().remove();
        }
    }else if (nfam != family.awayfromhome.getTotal()) {
        family.awayfromhome.total = nfam;
        family.awayfromhome.flags = {
            type: 'add',
            text: 'Continuar'
        };
        if (nfam === 0) {
            loadTemplate($("#modal_generic .body"), templates.conf, {
                title: "¿Deseas eliminar todos los familiares?",
                message: "Al eliminarlos ya no se podrán recuperar",
                onAccept: function() {
                    if ($("#ext_family").prev().hasClass("error")) {
                        $("#ext_family").prev().remove();
                    }
                    fam_toDelete = [];
                    for (i = 0; i < family.awayfromhome.members.length; i++) {
                        e_fam = family.awayfromhome.members[i];
                        if (__.get(e_fam,"alreadyExists","false")=="true") {
                            family.awayfromhome.members[i].statusRelated = "Delete";
                        }else{
                            fam_toDelete.push(i);
                        }
                    }
                    for (_ei = fam_toDelete.length-1; _ei >= 0; _ei--) {
                        family.awayfromhome.members.splice(fam_toDelete[_ei], 1);
                    }
                    $("#nextrafamilylist").empty();
                    fn_hideModal();
                },
                onDecline: function() {
                    $('#extrafamily').selectOptionId(family.awayfromhome.getTotal());
                    fn_hideModal();
                }
            });
        } else if (nfam < family.awayfromhome.getTotal()) {
            loadTemplate($("#modal_generic .body"), templates.deletefam, {
                title: "¿Deseas eliminar algún familiar?",
                message: "Selecciona el familiar que deseas eliminar(al eliminarlo ya no se podrá recuperar):",
                members: family.awayfromhome.getMembers(),
                origin: 'efamily',
                onAccept: function() {
                    nFam = family.awayfromhome.getTotal();
                    newNfam = family.awayfromhome.total;
                    dif = nFam - newNfam;
                    cChecked = $("#list-member").find(".checkbox.checked").length;
                    if (cChecked > dif) {
                        if ($("#formdeletefam").prev(".notification.error").length) $("#formdeletefam").prev(".notification.error").remove();
                        loadTemplate($("#formdeletefam"), miniTemplates.notification, {
                            type: 'error',
                            title: 'Lo sentimos',
                            message: 'Sólo puedes eliminar ' + dif + ' familiar(es)'
                        }, 'before');
                    } else if (cChecked < dif) {
                        if ($("#formdeletefam").prev(".notification.error").length) $("#formdeletefam").prev(".notification.error").remove();
                        loadTemplate($("#formdeletefam"), miniTemplates.notification, {
                            type: 'error',
                            title: 'Lo sentimos',
                            message: 'Debes seleccionar ' + dif + ' familiar(es) o cancelar'
                        }, 'before');
                    } else if (cChecked == dif) {
                        indexR = $("#list-member").find(".checkbox.checked");
                        for (var i = indexR.length - 1; i >= 0; i--) {
                            var mem_index = $(indexR[i]).attr("data-index");
                            if (__.get(family.awayfromhome.members[Number(mem_index)],"alreadyExists","false") == "true") {
                                family.awayfromhome.members[Number(mem_index)].statusRelated = "Delete";
                            }else{
                                family.awayfromhome.members.splice(Number(mem_index), 1);
                            }
                        }
                        fn_hideModal();
                        $("#nextrafamilylist").empty();
                        for (var _i in family.awayfromhome.members) {
                            family.awayfromhome.members[_i].memberid = _i;
                            if (family.awayfromhome.members[_i].statusRelated != "Delete") {
                                loadTemplate($("#nextrafamilylist"), miniTemplates.efamilymembercard, family.awayfromhome.members[_i], "append");
                            }
                        }
                    }
                },
                onDecline: function() {
                    fn_hideModal();
                    $('#extrafamily').selectOptionId(family.awayfromhome.getTotal());

                }
            });
        } else if (nfam != family.awayfromhome.getTotal()) {
            fn_verifyCatalogs(["CAT_OCUPACION","CAT_RESIDENCIA","CAT_PARENTESCO-Miembro"],function(){
                loadTemplate($("#modal_generic .body"), templates.efamily, family.awayfromhome);
            });

        }
    } else {
        if (family.awayfromhome.getTotal() == nfam) {
            if ($("#ext_family").prev().hasClass("error")) {
                $("#ext_family").prev().remove();
            }
        }
        $("#nextrafamilylist").empty();
        for (var i in family.awayfromhome.members) {
            if (family.awayfromhome.members[i].statusRelated != "Delete") {
                loadTemplate($("#nextrafamilylist"), miniTemplates.efamilymembercard, family.awayfromhome.members[i], "append");
            }
        }
    }
});

$('#bbvafamily').onChecked(function(rad) {
    $("#fam_bbvacard").html("");
    if (rad.id == "0") {
        if (Object.keys(family.bbva.member).length==0) {
            family.bbva.flag = "create";
            fn_verifyCatalogs(["CAT_PARENTESCO-Soporte"],function(){
                loadTemplate($("#modal_generic .body"), templates.fambbva, {
                    title: "Modifica la información de tu familiar"
                });
            });
        }else{
            if (__.get(family.bbva.member,"alreadyExists","false") == "true") {
                if (__.get(family.bbva.member,"statusRelated","") == "Delete") {
                    family.bbva.member.statusRelated = "Edit";
                }
            }else{
                family.bbva.member.statusRelated = "Add";
            }
            family.bbva.flag = "edit";
            loadTemplate($("#fam_bbvacard"), miniTemplates.familybbvacard, family.bbva.member);
            if (family.bbva.member && $("#bbva_employee").prev(".notification.error").length) {
                $("#bbva_employee").prev(".notification.error").slideUp("slow");
            }
        }
    } else {
        if ($("#bbva_employee").prev(".notification.error").length) {
            $("#bbva_employee").prev(".notification.error").remove();
        }
        if (__.get(family.bbva.member,"alreadyExists","false") == "true") {
            family.bbva.member.statusRelated = "Delete";
        }else{
            family.bbva.member = {};
            family.bbva.flag = "create";
        }
    }
});

/*FIN DE SOCIODEMOGRÁFICOS*/
//endregion

/*Home*/
$("#roomsNumber").comboSelect((function() {
    _arrNumRooms = [];
    for (var i = 1; i < 20; i++) {
        _arrNumRooms.push({
            id: "" + i,
            description: "" + i
        });
    }
    _arrNumRooms.push({
        id: "20",
        description: "20 o más"
    });
    return _arrNumRooms;
})());

$("#bedroomsNumber").comboSelect((function() {
    _arrNumRooms = [];
    for (var i = 0; i < 4; i++) {
        _arrNumRooms.push({
            id: "" + i,
            description: "" + i
        });
    }
    _arrNumRooms.push({
        id: "4",
        description: "4 o más"
    });
    return _arrNumRooms;
})());

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

$(".query_curp").click(function() {
    window.open("https://www.gob.mx/curp/", "_blank");
});
$(".query_privacy").click(function() {
    window.open(" https://www.fundacionbbvabancomer.org/aviso-de-privacidad/", "_blank");
});

$("#fam_mig").onSelect(function(el) {
    if (el.id == "0") {
        $("#y_fam_mig").slideDown("slow");
        $("#n_fam_mig").addClass("required");
        //$("#n_fam_mig").reset();
        //nfam = Number(el.id);
    } else {
        $("#y_fam_mig").slideUp("slow");
        $("#n_fam_mig").removeClass("required");
        $("#fam_mig_cards").empty();
    }
});
$('#change_h').onChecked(function(rad) {
    if (rad.id == "SI") {
        $("#migrate_area").slideDown();
        $("#migrate_area .form-group-select").addClass("required");
        $("#migrate_area input#trans").attr("required", "");
        $("#rent").addClass("required");
    } else {
        $("#migrate_area").slideUp();
        $("#migrate_area .form-group-select").removeClass("required").removeComboError();
        $("#migrate_area input#trans").removeAttr("required");
        $("#migrate_area input#trans").clearInput();
        $("#rent").selectRadioId("NO").clearRadio().removeClass("required");
    }
});
$("#rent").onChecked(function(rad) {
    if (rad.id == "SI") {
        $("#pay_rent").slideDown("slow");
        $("#payment_rent").attr("required", "required");
    } else {
        $("#pay_rent").slideUp("slow");
        $("#payment_rent").removeAttr("required");
        $("#payment_rent").clearInput();
    }
});

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
    _StateId = moduleInitData.schoolData.schooling.location.state.id;
    _StateDesc="";
    _MunicipalityDesc="";
    if (_StateId!=0) {
        for (_i = 0; _i < stateTransactions.length; _i++) {
            if (stateTransactions[_i].id == _StateId) {
                _StateDesc = stateTransactions[_i].description;
                break;
            }
        }
        for (_i = 0; _i < municipalityTransactions[_StateId].length; _i++) {
            if (municipalityTransactions[_StateId][_i].id == moduleInitData.schoolData.schooling.location.municipality.id) {
                _MunicipalityDesc = municipalityTransactions[_StateId][_i].description;
                break;
            }
        }
    }else{
        _StateDesc = "PENDIENTE";
        _MunicipalityDesc = "PENDIENTE";
    }
    var level = "";
    var bbvaFamily = "No";
    switch(moduleInitData.announcement.scholarshipProgram.id){
        case "1": level="primaria"; break;
        case "2": level="secundaria"; break;
        case "7": level="preparatoria"; break;
        default: level="Desconocido"; break;
    }

    if(Object.keys(family.bbva.member).length>0){
        bbvaFamily = "Si";
    }
    loadTemplate($("#modal_generic .body"), templates.confirmAllData, {
        tutorName: moduleInitData.general.student[0].tutorData[0].tutorName,
        tutorLastName: moduleInitData.general.student[0].tutorData[0].firstNameTutor,
        tutorSecondLastName: moduleInitData.general.student[0].tutorData[0].lastaNameTutor,
        tutorRelationship: moduleInitData.general.student[0].tutorData[0].kinship,
        name: moduleInitData.general.student[0].name,
        lastName: moduleInitData.general.student[0].firstName,
        secondLastName: moduleInitData.general.student[0].lastName,
        birthdate: moduleInitData.general.student[0].scholarBirthdate,
        gender: moduleInitData.general.student[0].gender,
        curp: moduleInitData.general.student[0].CURP,
        street: moduleInitData.general.student[0].domicile[0].street,
        interiorNumber: moduleInitData.general.student[0].domicile[0].numInterior,
        outdoorNumber: moduleInitData.general.student[0].domicile[0].numExterior,
        zipcode: moduleInitData.general.student[0].domicile[0].codePostal,
        colony: moduleInitData.general.student[0].domicile[0].colony,
        municipality:moduleInitData.general.student[0].domicile[0].municipality,
        state: moduleInitData.general.student[0].domicile[0].state,
        references: moduleInitData.general.student[0].domicile[0].particularReferences,
        homePhone: moduleInitData.general.student[0].contactInf[0].homePhone,
        cellPhone: moduleInitData.general.student[0].contactInf[0].cellPhone,
        errandsphone: moduleInitData.general.student[0].contactInf[0].messagePhone,
        email: moduleInitData.general.student[0].contactInf[0].email,
        email2: moduleInitData.general.student[0].contactInf[0].email1,
        email3:moduleInitData.general.student[0].contactInf[0].email2,
        levelDescription: level,
        average: moduleInitData.schoolData.average,
        municipalitySchool:_MunicipalityDesc,
        stateSchool: _StateDesc,
        schoolName: moduleInitData.schoolData.schooling.schoolName,
        turn: moduleInitData.schoolData.schooling.profession.scholarShift.description,
        flagCareer: level == "Universidad" ? "block" : "none",
        area: moduleInitData.schoolData.schooling.profession.area.description,
        subarea: moduleInitData.schoolData.schooling.profession.subArea.description,
        career: moduleInitData.schoolData.schooling.profession.careerName,
        modality: moduleInitData.schoolData.schooling.profession.modality.description,
        careerType:moduleInitData.schoolData.schooling.profession.type.description,
        duration: moduleInitData.schoolData.schooling.profession.duration.description,
        spendingOnTransportation: formatMoney(moduleInitData.schoolData.expenses.transportationAmount),
        startClassDate: moduleInitData.schoolData.schooling.profession.classesStartDate,
        changeHome: moduleInitData.schoolData.changeAddress==true?"Sí":"No",
        flagChangeHome: moduleInitData.schoolData.changeAddress == true ? "block" : "none",
        municipalityChange: moduleInitData.schoolData.schooling.newLocation.municipality.name,
        stateChange: moduleInitData.schoolData.schooling.newLocation.state.name,
        rent: moduleInitData.schoolData.expenses.isPayRent?"Sí":"No",
        flagIsRent: moduleInitData.schoolData.expenses.isPayRent? "block" : "none",
        paymentRent: formatMoney(moduleInitData.schoolData.expenses.mounthlyRent),
        bbvaFamily: bbvaFamily,
        flagBbvaFam: bbvaFamily == "Si" ? "block" : "none",
        numRooms: (moduleInitData.home.homeInformation.roomsNumber == "20")?moduleInitData.home.homeInformation.roomsNumber +" o más":moduleInitData.home.homeInformation.roomsNumber,
        numRoomsSleep: (moduleInitData.home.homeInformation.bedroomsNumber == "4")?moduleInitData.home.homeInformation.bedroomsNumber+" o más":moduleInitData.home.homeInformation.bedroomsNumber,
        numBath: (moduleInitData.home.homeInformation.bathroomsNumber == "2")?moduleInitData.home.homeInformation.bathroomsNumber+" o más":moduleInitData.home.homeInformation.bathroomsNumber,
        water: moduleInitData.home.homeInformation.homeService.waterServicesType.description,
        drain: moduleInitData.home.homeInformation.drainageType.description,
        light: moduleInitData.home.homeInformation.homeService.lightServicesType.description,
        fuel: moduleInitData.home.homeInformation.cookingFuelType.description,
        wall: moduleInitData.home.homeInformation.wallMaterialsType.description,
        roof: moduleInitData.home.homeInformation.ceilingMaterialsType.description,
        floor: moduleInitData.home.homeInformation.floorMaterialsType.description,
        cars: (moduleInitData.home.homeInformation.belongings.carsNumber == "2")?moduleInitData.home.homeInformation.belongings.carsNumber+" o más":moduleInitData.home.homeInformation.belongings.carsNumber,
        internet: moduleInitData.home.homeInformation.belongings.hasInternet==true?"Sí":"No",
        laptop: moduleInitData.home.homeInformation.belongings.hasComputer==true?"Sí":"No",
        washingMachine: moduleInitData.home.homeInformation.belongings.hasWashingMachine==true?"Sí":"No",
        microwave: moduleInitData.home.homeInformation.belongings.hasMicrowave==true?"Sí":"No",
        tvService: moduleInitData.home.homeInformation.belongings.hasPayTV==true?"Sí":"No",
        motorcyle: moduleInitData.home.homeInformation.belongings.hasMotorcycle==true?"Sí":"No",
        urlLegal: moduleInitData.legalDisclaimer.legalDisclaimers[0].link,
        textLegal:moduleInitData.legalDisclaimer.legalDisclaimers[0].description.split("|")[1],
        legal1: moduleInitData.legalDisclaimer.legalDisclaimers[0].description.split("|")[0],
        urlLegal2: moduleInitData.legalDisclaimer.legalDisclaimers[1].link,
        textLegal2:moduleInitData.legalDisclaimer.legalDisclaimers[1].description.split("|")[1],
        legal2: moduleInitData.legalDisclaimer.legalDisclaimers[1].description.split("|")[0],
        urlLegal3: moduleInitData.legalDisclaimer.legalDisclaimers[2].link,
        textLegal3:moduleInitData.legalDisclaimer.legalDisclaimers[2].description.split("|")[1],
        legal3: moduleInitData.legalDisclaimer.legalDisclaimers[2].description.split("|")[0],
        onAccept: function() {
            fn_hideModal();
            saveglobal();
        },
        onDecline: function() {
            fn_hideModal();
        }
    });
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
     *Returns the JSON object to call restExec function
     *
     * @param {string} cat catalog name
     * @param {function} catCallBack callback function
     * @returns {Object}
     */
    getJSONCatalog: function (cat,catCallBack) {
        return {
            service: 'LIST_CATALOGS',
            type: 'GET',
            async: false,
            hasUrlParam: true,
            urlParam: {
                catalog: cat,
            },
            data: {},
            finallySuccess: [function (data) {
                rest_fnGetSchoolCatalog(cat, data);
            },catCallBack || rest_fnNothig]
        };
    },
    /**
     *Gets the general data and shows it in "datos generales" module
     *
     * @param {function} finalSuccess optional callback function
     */
    general:function(finalSuccess){
        restExec({
            service: 'SCHOLAR_DETAIL',
            type: 'POST',
            data: {
                "userScholar": ivUser,
                "registerType": "2"
            },
            success: rest_fnGetGeneralData,
            finallySuccess: [loadModule.ensureFun(finalSuccess),loadModule.checkStatus],
            error: function (error) {
                if (__.get(error,"responseJSON.code",'')!="01229001") {
                    rest_fnShowError(error);
                }else {
                    resetForm($("#formgendata"));
                }
            }
        });
    },
    /**
     *Gets the school data and shows it in "datos escolares" module
     *
     * @param {function} finalSuccess optional callback function
     */
    schoolData:function (finalSuccess) {
        restExec({
            service: 'GET_SCHOLARINF',
            type: 'GET',
            hasUrlParam: true,
            async: false,
            urlParam: {
                scholarId: ivUser,
                programScholarshipId: moduleInitData.announcement.scholarshipProgram.id
            },
            data: {},
            success: rest_fnGetScholarInf,
            finallySuccess: [loadModule.ensureFun(finalSuccess),loadModule.checkStatus],
            error: function (error) {
                if (__.get(error,"responseJSON.code",'')!="01229001") {
                    rest_fnShowError(error);
                }else {
                    resetForm($("#formschdata"));
                }
            }
        });
    },
    /**
     *Gets the sociodemographic data and shows it in "datos sociodemográficos" module
     *
     * @param {function} finalSuccess optional callback function
     */
    sociodemographic: function(finalSuccess) {
        restExec({
            service: 'GET_SOCINF',
            type: 'GET',
            hasUrlParam: true,
            urlParam: {
                scholarId: ivUser,
                scholarshipProgramId: moduleInitData.announcement.scholarshipProgram.id
            },
            data: {},
            success: rest_fnGetSocialData,
            finallySuccess: [loadModule.ensureFun(finalSuccess),loadModule.checkStatus],
            error: function (error) {
                if (__.get(error,"responseJSON.code",'')!="01229001") {
                    rest_fnShowError(error);
                }else {
                    resetForm($("#formsocdata"));
                    family.fromhome.members = [];
                    family.awayfromhome.members = [];
                    family.bbva.member = {};
                    $("#nfamilylist").empty();
                    $("#nextrafamilylist").empty();
                    $("#fam_bbvacard").empty();
                }
            }
        });
    },
    /**
     *Gets the home information and shows it in "características del hogar" module
     *
     * @param {function} finalSuccess optional callback function
     */
    home: function(finalSuccess) {
        restExec({
            service: 'GET_HOMEINF',
            type: 'GET',
            hasUrlParam: true,
            urlParam: {
                scholarId: ivUser,
                programScholarshipId: moduleInitData.announcement.scholarshipProgram.id
            },
            data: {},
            success: rest_fnGetHomeServices,
            finallySuccess: [loadModule.ensureFun(finalSuccess),loadModule.checkStatus],
            error: function (error) {
                if (__.get(error,"responseJSON.code",'')!="01229001"&&__.get(error,"responseJSON.code",'')!="01229008") {
                    rest_fnShowError(error);
                }else {
                    resetForm($("#formhdata"));
                }
            }
        });
    },
    /**
     *Gets the legal announcements and shows it in "avisos legales" module
     *
     * @param {function} finalSuccess optional callback function
     */
    legalDisclaimer: function (finalSuccess) {
        restExec({
            service: 'GET_LEGAL',
            type: 'GET',
            hasUrlParam: true,
            urlParam: {
                scholarId: ivUser,
                scholarshipProgramId: moduleInitData.announcement.scholarshipProgram.id,
                moduleID: 31
            },
            data: {},
            success: rest_fnGetLegalDisclaimers,
            finallySuccess: [loadModule.ensureFun(finalSuccess),loadModule.checkStatus]
        });
    },
    /**
     *Gets the announcement status
     *
     * @param {function} finalSuccess optional callback function
     */
    scholarshipAnnouncement: function(finalSuccess){
        restExec({
            service: 'GET_ANNOUNCEMENT',
            type: 'GET',
            hasUrlParam: true,
            showWait: true,
            urlParam: {
                registerType: "CO",
                scholarId: ivUser
            },
            data: {},
            success: rest_fnGetScholarshipAnnouncement,
            finallySuccess: [loadModule.ensureFun(finalSuccess),loadModule.checkStatus],
            finallyError: function () {
                $(".content").hide();
            }
        });
    },
    /**
     *Has the catalog list by module, it execute those catalogs before the module is shown.
     *
     */
    moduleCatalog: {
        general:{
            list: function () {
                return ["CAT_Tipo_Alta", "CAT_BANK", "CAT_CREDITMORTGAGE", "CAT_CREDITCOMMERCIAL", "CAT_COFINAVIT", "CAT_GRAVAMEN"];
            },
            callback: function () {
                fnFillCatalogs("relationship", __.get(catalogs,"CAT_Tipo_Alta",[]), function(el) {
                    if (el.id == "25") {
                        $("#o_relationship").clearInput();
                        $("#o_relationship").attr("required", "required");
                        $("#other_relationship").slideDown();
                    } else {
                        $("#o_relationship").removeAttr("required");
                        $("#other_relationship").slideUp();
                        $("#o_relationship").clearInput();
                    }
                });
                fnFillCatalogs("generatingbank", __.get(catalogs,"CAT_BANK",[]), function(el) {
                });
                fnFillCatalogs("mortgagecredittype", __.get(catalogs,"CAT_CREDITMORTGAGE",[]), function(el) {
                });
                fnFillCatalogs("commercialcredit", __.get(catalogs,"CAT_CREDITCOMMERCIAL",[]), function(el) {
                });
                fnFillCatalogs("cofinavit", __.get(catalogs,"CAT_COFINAVIT",[]), function(el) {
                });
                fnFillCatalogs("barzon", __.get(catalogs,"CAT_COFINAVIT",[]), function(el) {
                });
                fnFillCatalogs("gravamen", __.get(catalogs,"CAT_GRAVAMEN",[]), function(el) {
                });
                $('[data-target="general-data"]').attr("data-loaded","true");
                if (typeof moduleInitData.general != "undefined") {
                    rest_fnGetGeneralData(moduleInitData.general);
                }
                toggleModule($('[data-target="general-data"]'));
            }
        },
        schoolData: {
            list: function () {
                return ["CAT_TYPEPROPERTY"];
            },
            callback: function () {
                fnFillCatalogs("typepropertie", __.get(catalogs,"CAT_TYPEPROPERTY",[]));
                
                $('[data-target="schoolar-data"]').attr("data-loaded","true");
                if (typeof moduleInitData.schoolData != "undefined"){
                    rest_fnGetScholarInf(moduleInitData.schoolData);
                }
                toggleModule($('[data-target="schoolar-data"]'));
            }
        },
        dataInmueble: {
            list: function () {
                return ["CAT_TYPEPROPERTY","CAT_SUBTYPEPROPERTY","CAT_STATE"];
            },
            callback: function () {
                fnFillCatalogs("typepropertie", __.get(catalogs,"CAT_TYPEPROPERTY",[]));
                fnFillCatalogs("subtypeproperty", __.get(catalogs,"CAT_SUBTYPEPROPERTY",[]));
                fnFillCatalogs("propertystate", __.get(catalogs,"CAT_STATE",[]));
                fnFillCatalogs("municipalities_d", __.get(catalogs,"CAT_STATE",[]));

                
                $('[data-target="inmueble-data"]').attr("data-loaded","true");
                if (typeof moduleInitData.home != "undefined"){
                    rest_fnGetHomeServices(moduleInitData.home);
                }
                toggleModule($('[data-target="inmueble-data"]'));
            }
        },
        dataStages: {
            list: function () {
                return ["CAT_TYPEPROPERTY","CAT_SUBTYPEPROPERTY","CAT_STATE"];
            },
            callback: function () {
                fnFillCatalogs("typepropertie", __.get(catalogs,"CAT_TYPEPROPERTY",[]));
                fnFillCatalogs("subtypeproperty", __.get(catalogs,"CAT_SUBTYPEPROPERTY",[]));
                fnFillCatalogs("propertystate", __.get(catalogs,"CAT_STATE",[]));
                fnFillCatalogs("municipalities_d", __.get(catalogs,"CAT_STATE",[]));

                
                $('[data-target="stages-data"]').attr("data-loaded","true");
                if (typeof moduleInitData.home != "undefined"){
                    rest_fnGetHomeServices(moduleInitData.home);
                }
                toggleModule($('[data-target="stages-data"]'));
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
    $("#n_family").comboSelect((function() {
        _arrFamily = [];
        for (var i = moduleInitData.announcement.scholarshipProgram.id == "7"? 1:2; i < 20; i++) {
            _arrFamily.push({
                id: "" + i,
                description: "" + i
            });
        }
        _arrFamily.push({
            id: "20",
            description: "20 o más"
        });
        return _arrFamily;
    })());
    LIST_SERVICES.listRestExec({
        showWait:true,
        service: 'GET_STATES',
        type: 'POST',
        data: {},
        asyn: false,
        finallySuccess: [function (data) {
            rest_fnGetStates(data);
        },function () {
            $("#state").comboSelect(stateTransactions, function(el) {
                $("#municipalities").reset();
                loadModule.getMunicipalities(el.id,function(){
                    $("#municipalities").comboSelect(municipalityTransactions[el.id]);
                });
            });
            $("#state_s").comboSelect(stateTransactions, function(el) {
                $("#municipalities_s").reset();
                $("#school_s").css("display", "none");
                $('.radio-section.search-by').clearRadio().removeClass("required");
                if (el.id == 0 || el.id == "0") {
                    _prId = moduleInitData.announcement.scholarshipProgram.id;
                    municipalityTransactions["0"] = [{
                        id:0,
                        description: dommySchools.getDommyDescription()
                    }];
                }
                loadModule.getMunicipalities(el.id,function(){
                    $("#municipalities_s").comboSelect(municipalityTransactions[el.id], function() {
                        $("#search_by .radio-buttons").removeClass("disabled");
                        $("input#cct").prop("disabled", false);
                        $("#school_s").css("display", "block");
                        $('.radio-section.search-by').clearRadio().addClass("required");
                    });
                });
            });
            $("#state_m").comboSelect(stateTransactions, function(el) {
                $("#municipalities_m").reset();
                loadModule.getMunicipalities(el.id,function(){
                    $("#municipalities_m").comboSelect(municipalityTransactions[el.id]);
                });

            });
        }]
    });
    LIST_SERVICES.listRestExec({
        service: 'SCHOLAR_DETAIL',
        type: 'POST',
        data: {
            "userScholar": ivUser,
            "registerType": "2"
        },
        success: rest_fnGetGeneralData,
        ignoreError: true,
        error: function (error) {
            if (__.get(error,"responseJSON.code",'')!="01229001") {
                LIST_SERVICES.errors.push(error);
            }
        }
    });
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
    LIST_SERVICES.listRestExec({
        service: 'GET_SCHOLARINF',
        type: 'GET',
        hasUrlParam: true,
        urlParam: {
            scholarId: ivUser,
            programScholarshipId: moduleInitData.announcement.scholarshipProgram.id
        },
        data: {},
        success: rest_fnGetScholarInf,
        ignoreError: true,
        error: function (error) {
            if (__.get(error,"responseJSON.code",'')!="01229001") {
                LIST_SERVICES.errors.push(error);
            }
        }
    });
    LIST_SERVICES.listRestExec({
        service: 'GET_SOCINF',
        type: 'GET',
        hasUrlParam: true,
        urlParam: {
            scholarId: ivUser,
            scholarshipProgramId: moduleInitData.announcement.scholarshipProgram.id
        },
        data: {},
        success: rest_fnGetSocialData,
        ignoreError: true,
        error: function (error) {
            if (__.get(error,"responseJSON.code",'')!="01229001") {
                LIST_SERVICES.errors.push(error);
            }
        }
    });
    LIST_SERVICES.listRestExec({
        service: 'GET_HOMEINF',
        type: 'GET',
        hasUrlParam: true,
        urlParam: {
            scholarId: ivUser,
            programScholarshipId: moduleInitData.announcement.scholarshipProgram.id
        },
        data: {},
        success: rest_fnGetHomeServices,
        ignoreError: true,
        error: function (error) {
            if (__.get(error,"responseJSON.code",'')!="01229001"&&__.get(error,"responseJSON.code",'')!="01229008") {
                LIST_SERVICES.errors.push(error);
            }
        }
    });
    LIST_SERVICES.listRestExec({
        service: 'GET_LEGAL',
        type: 'GET',
        hasUrlParam: true,
        urlParam: {
            scholarId: ivUser,
            scholarshipProgramId: moduleInitData.announcement.scholarshipProgram.id,
            moduleID: 31
        },
        data: {},
        success: rest_fnGetLegalDisclaimers,
    },_cllback);
};

/**
 * Validates if the user is a FUN type, if so 'SCHOLAR_DETAIL' is executed to detect if the user is allready registered
*/
if(expRegs.FOL.regEx.test(ivUser)){
    /*if (ivUser.charAt(2) == "1") { //secundaria
        $(".page-container").remove();
        $(".help-menu").remove();
        loadTemplate($("#modal_generic .body"), miniTemplates.error, {
            title: "La convocatoria ha terminado",
            message: "Lo sentimos, el registro finalizó el 5 de julio.",
            onAccept: logout
        });
        callbackCloseModal = logout;
    }else{*/
        loadModule.scholarshipAnnouncement();
    //}
}else if(expRegs.FUN.regEx.test(ivUser)){
    restExec({
        service: 'SCHOLAR_DETAIL',
        type: 'POST',
        data: {
            "userScholar": ivUser,
            "registerType": "2"
        },
        showWait: true,
        finallyError: function () {
            $(".content").hide();
        },
        success: rest_fnGetGeneralDataFun
    });
}

//pre-load templates
Object.keys(templates).forEach(function(_template) {
    $.get(templates[_template].path,function (templatetext) {
        templates[_template].html = templatetext;
    });
});

$("#currentYear").text(new Date().getFullYear());