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
 var catalogs = {
    "CAT_NOTARY": [
        {
            "id": "1",
            "description": "Notaría No. 183, ABASCAL OLASCOAGA RODRIGO"
        },
        {
            "id": "2",
            "description": "Notaría No. 233, ADAME LÓPEZ ÁNGEL GILBERTO"
        },
        {
            "id": "3",
            "description": "Notaría No. 174, AGUILAR MOLINA VÍCTOR RAFAEL"
        },
        {
            "id": "4",
            "description": "Notaría No. 118, AGUILERA SOTO RAMÓN"
        },
        {
            "id": "5",
            "description": "Notaría No. 19, ALESSIO ROBLES MIGUEL"
        }
    ],
    "CAT_BANK": [
        {
            "id": "1",
            "description": "Arrendadora"
        },
        {
            "id": "2",
            "description": "Centro Especializado de Recuperación "
        },
        {
            "id": "3",
            "description": "Comercial"
        },
        {
            "id": "4",
            "description": "Corporativa"
        },
        {
            "id": "5",
            "description": "Danf"
        },
        {
            "id": "6",
            "description": "Fideicomiso"
        },
        {
            "id": "7",
            "description": "Del Consumidor"
        },
        {
            "id": "8",
            "description": "Factoraje"
        }
    ],
    "CAT_CREDITMORTGAGE":[
        {
            "id": "1",
            "description": "Créd. a la vivienda"
        },
        {
            "id": "2",
            "description": "Créd. Hipotecario"
        },
        {
            "id": "3",
            "description": "Hipot. Preferencial"
        }
    ],
    "CAT_CREDITCOMMERCIAL":[
        {
            "id": "1",
            "description": "Arrendamiento"
        },
        {
            "id": "2",
            "description": "Administración"
        },
        {
            "id": "3",
            "description": "Cartera Tradicional"
        },
        {
            "id": "4",
            "description": "Créditos Comerciales"
        },
        {
            "id": "5",
            "description": "Créd. Hipotecario"
        },
        {
            "id": "6",
            "description": "Créd. a la vivienda"
        },
        {
            "id": "7",
            "description": "Desafectos"
        },
        {
            "id": "8",
            "description": "Hipot. Preferencial"
        },
        {
            "id": "9",
            "description": "Menudeo ABC Person."
        },
        {
            "id": "10",
            "description": "Planes de Crédito"
        },
        {
            "id": "11",
            "description": "Renta Hipotecaria"
        },
        {
            "id": "12",
            "description": "Tarjeta de Crédito"
        }
    ],
    "CAT_GRAVAMEN":[
        {
            "id": "1",
            "description": "Propio"
        },
        {
            "id": "2",
            "description": "Infonavit"
        },
        {
            "id": "3",
            "description": "SHF"
        },
        {
            "id": "4",
            "description": "Embargo de 3ro"
        }
    ],
    "CAT_TYPEPROPERTY":[
        {
            "id": "1",
            "description": "Condominio"
        },
        {
            "id": "2",
            "description": "Privado"
        }
    ],
    "NOTARY_DATA":[
        {
            "id": "1",
            "description": "Notaría No. 183"
        },
        {
            "id": "2",
            "description": "Notaría No. 233"
        },
        {
            "id": "3",
            "description": "Notaría No. 174"
        },
        {
            "id": "4",
            "description": "Notaría No. 118"
        },
        {
            "id": "5",
            "description": "Notaría No. 9"
        },
        {
            "id": "6",
            "description": "Notaría No. 432"
        },
        {
            "id": "7",
            "description": "Notaría No. 210"
        },
        {
            "id": "8",
            "description": "Notaría No. 10"
        },
        {
            "id": "9",
            "description": "Notaría No. 9"
        },
        {
            "id": "10",
            "description": "Notaría No. 1"
        }
    ],
    "CAT_STATE":[
        {
            "id": "1",
            "description": "Aguascalientes"
        },
        {
            "id": "2",
            "description": "Baja California"
        },
        {
            "id": "3",
            "description": "Baja California Sur"
        },
        {
            "id": "4",
            "description": "Campeche"
        },
        {
            "id": "5",
            "description": "Colima"
        },
        {
            "id": "6",
            "description": "Chihuahua"
        },
        {
            "id": "7",
            "description": "Ciudad de México"
        },
        {
            "id": "8",
            "description": "Durango"
        },
        {
            "id": "9",
            "description": "Guanajuato"
        },
        {
            "id": "10",
            "description": "Guerrero"
        },
        {
            "id": "11",
            "description": "Hidalgo"
        },
        {
            "id": "12",
            "description": "México"
        },
        {
            "id": "13",
            "description": "Michoacán de Ocampo"
        },
        {
            "id": "14",
            "description": "Morelos"
        },
        {
            "id": "15",
            "description": "Nayarit"
        },
        {
            "id": "16",
            "description": "Oaxaca"
        },
        {
            "id": "17",
            "description": "Puebla"
        },
        {
            "id": "18",
            "description": "Querétaro"
        },
        {
            "id": "19",
            "description": "Quintana Roo"
        },
        {
            "id": "20",
            "description": "San Luis Potosí"
        },
        {
            "id": "21",
            "description": "Sinaloa"
        },
        {
            "id": "22",
            "description": "Sonora"
        },
        {
            "id": "23",
            "description": "Tabasco"
        },
        {
            "id": "24",
            "description": "Tamaulipas"
        },
        {
            "id": "25",
            "description": "Tlaxcala"
        },
        {
            "id": "26",
            "description": "Veracruz de Ignacio de la Llave"
        },
        {
            "id": "27",
            "description": "Yucatán"
        },
        {
            "id": "28",
            "description": "Zacatecas"
        }
    ],
    "CAT_SUBTYPEPROPERTY":[
        {
            "id": "1",
            "description": "Bodega"
        },
        {
            "id": "2",
            "description": "Empresa"
        },
        {
            "id": "3",
            "description": "Hotel"
        },
        {
            "id": "4",
            "description": "Local comercial"
        },
        {
            "id": "5",
            "description": "Nave Industrial"
        },
        {
            "id": "6",
            "description": "Oficina"
        },
        {
            "id": "7",
            "description": "Negocios en marcha"
        },
        {
            "id": "8",
            "description": "Granja"
        },
        {
            "id": "9",
            "description": "Rancho"
        },
        {
            "id": "10",
            "description": "Terreno rustico no productivo"
        },
        {
            "id": "11",
            "description": "Terreno rustico productivo"
        },
        {
            "id": "12",
            "description": "Terreno semiurbano"
        },
        {
            "id": "13",
            "description": "Terreno urbano"
        },
        {
            "id": "14",
            "description": "Casa"
        },
        {
            "id": "15",
            "description": "Departamento"
        },
        {
            "id": "16",
            "description": "Casa con local comercial"
        }
    ]
 };
 /**
  * When a module informatios is get, the response is saved in this variable, it is used to fill the save all modal.
  * @type {Object}
  */
 var moduleInitData = {};
 