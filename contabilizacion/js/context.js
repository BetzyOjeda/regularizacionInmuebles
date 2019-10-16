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