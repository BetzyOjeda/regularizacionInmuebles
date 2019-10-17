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
                $('[data-target="inmueble-data"]').attr("data-loaded","true");
                if (typeof moduleInitData.home != "undefined"){
                    rest_fnGetHomeServices(moduleInitData.home);
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