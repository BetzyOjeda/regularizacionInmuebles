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
 