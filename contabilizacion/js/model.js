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