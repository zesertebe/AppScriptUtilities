/**
 * @class AppScriptUtilities
 * @Author: Arturo Gomez Soler - https://ocancelada.dev
 * @version: 2.0.5
 * @classdesc: Clase que proporciona un conjunto de herramientas y utilidades sencillas
 * que pueden ser utilizados en cualquier proyecto AppScript
 * se recomienda usar la extension de Chrome para una mejor visualizacion: https://chrome.google.com/webstore/detail/gase-google-appscript-edi/lefcemnilieamgifcegilmkaclmhakfc
 * 
 */
class AppScriptUtilities {

  /**
   * #### convierte un string dado a un formato de fecha válido
   */
  static convertStringToDate(str){
    if (typeof str != 'string'){return{status: false, content: 'El argumento "str" debe ser una cadena de texto'}}
    let newDate = '';
    let splitStr = str.split(' ');
    if(splitStr.length >= 3 && splitStr[0].split('/').length === 3 && splitStr[0].split('/')[2].length === 4  ){
      let dateSplit = splitStr[0].split('/');
      newDate = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]} ${splitStr[1]} ${splitStr[2]}`;  
    }
    return {status: true, content: new Date(newDate)};
  }

  /**
   * #### obtiene los dias festivos de Colombia basado en la ley 51 de 1983
   * 
   * 
   */
  static getHolidays(){
    let holiDays = [
      { fecha: "01/01", proximoLunes: false, nombre: "Año Nuevo" },
      { fecha: "01/06", proximoLunes: true, nombre: "Día de los Reyes Magos" },
      { fecha: "03/19", proximoLunes: true, nombre: "Día de San José" },
      { diasParaSumar: -3, proximoLunes: false, nombre: "Jueves Santo" },
      { diasParaSumar: -2, proximoLunes: false, nombre: "Viernes Santo" },
      { fecha: "05/01", proximoLunes: false, nombre: "Día del Trabajo" },
      { diasParaSumar: 40, proximoLunes: true, nombre: "Ascensión del Señor" },
      { diasParaSumar: 60, proximoLunes: true, nombre: "Corphus Christi" },
      { diasParaSumar: 71, proximoLunes: true, nombre: "Sagrado Corazón de Jesús" },
      { fecha: "06/29", proximoLunes: true, nombre: "San Pedro y San Pablo" },
      { fecha: "07/20", proximoLunes: false, nombre: "Día de la Independencia" },
      { fecha: "08/07", proximoLunes: false, nombre: "Batalla de Boyacá" },
      { fecha: "08/15", proximoLunes: true, nombre: "La Asunción de la Virgen" },
      { fecha: "10/12", proximoLunes: true, nombre: "Día de la Raza" },
      { fecha: "11/01", proximoLunes: true, nombre: "Todos los Santos" },
      { fecha: "11/11", proximoLunes: true, nombre: "Independencia de Cartagena" },
      { fecha: "12/08", proximoLunes: false, nombre: "Día de la Inmaculada Concepción" },
      { fecha: "12/25", proximoLunes: false, nombre: "Día de Navidad" }
    ]
    const TD = (n) => n < 10 ? "0" + n : n;
    const FD = (f) => TD(f.getDate()) + "/" + TD(f.getMonth() + 1) + "/" + f.getFullYear();
    const DR = (y) => {
    let c = (19 * (y % 19) + 24) % 30;
    let d = 22 + (c) + ((2 * (y % 4) + 4 * (y % 7) + 6 * c + 5) % 7);
    return  new Date((d >= 1 && d <= 31) ?`03/${TD(d)}/${y}`:`04/${TD(d - 31)}/${y}`);
    }
    const NM = (y) => {
      while(y.getDay() !== 1){y.setDate(y.getDate() + 1)}
      return y;
    }
    const SM =(td, ds) => {
      let d = new Date(td);
      d.setDate(d.getDate() + ds);
      return d;
    }

    /**
     * #### Obtiene todos los dias festivos de un año específico
     * 
     * ```javascript
     * let holidays = AppScriptUtilities.getHolidays();
     * let data = holidays.getHolidaysByYear(2018);
     * data.forEach(el=>{
     *     console.log(el.fecha, ' - ', el.nombre);
     * })
     * // 01/01/2018 - Año Nuevo
     * // 08/01/2018 - Día de los Reyes Magos
     * // 19/03/2018 - Día de San José
     * // 29/03/2018 - Jueves Santo
     * // 30/03/2018 - Viernes Santo
     * // 01/05/2018 - Día del Trabajo
     * // 14/05/2018 - Ascensión del Señor
     * // 04/06/2018 - Corphus Christi
     * // 11/06/2018 - Sagrado Corazón de Jesús
     * // 02/07/2018 - San Pedro y San Pablo
     * // 20/07/2018 - Día de la Independencia
     * // 07/08/2018 - Batalla de Boyacá
     * // 20/08/2018 - La Asunción de la Virgen
     * // 15/10/2018 - Día de la Raza
     * // 05/11/2018 - Todos los Santos
     * // 12/11/2018 - Independencia de Cartagena
     * // 08/12/2018 - Día de la Inmaculada Concepción
     * // 25/12/2018 - Día de Navidad
     * ```
     * 
     * @param{number} year El año del que queremos obtener los dias festivos.
     */
    const GY = (year) => {
      let h = [];
      let dr = DR(year);
      let d;
      holiDays.forEach(el=>{
          d = !el.diasParaSumar ? new Date(el.fecha + "/" + year): SM(dr.toDateString(), el.diasParaSumar);
          if(el.proximoLunes){d = NM(d)}
          h.push({
            fecha: FD(d),
            nombre: el.nombre,
            estatico: el.proximoLunes
          });
      });
      return h;
    }

    /**
     * ### obtiene todos los dias festivos en un intervalo de diferentes años
     * 
     *```javascript
     * let holidays = AppScriptUtilities.getHolidays();
     * let data = holidays.getHolidaysByYearInterval(2018, 2020);
     * data.forEach(el=>{
     *     console.log('Año: ', el.year);
     *    el.festivos.forEach(holiday=>{
     *        console.log(holiday.fecha, ' - ', holiday.nombre);
     *    })
     * })
     * // =>
     * // Año: 2018
     * // 01/01/2018 - Año Nuevo
     * // 08/01/2018 - Día de los Reyes Magos
     * // 19/03/2018 - Día de San José
     * // 29/03/2018 - Jueves Santo
     * // 30/03/2018 - Viernes Santo
     * // 01/05/2018 - Día del Trabajo
     * // 14/05/2018 - Ascensión del Señor
     * // 04/06/2018 - Corphus Christi
     * // 11/06/2018 - Sagrado Corazón de Jesús
     * // 02/07/2018 - San Pedro y San Pablo
     * // 20/07/2018 - Día de la Independencia
     * // 07/08/2018 - Batalla de Boyacá
     * // 20/08/2018 - La Asunción de la Virgen
     * // 15/10/2018 - Día de la Raza
     * // 05/11/2018 - Todos los Santos
     * // 12/11/2018 - Independencia de Cartagena
     * // 08/12/2018 - Día de la Inmaculada Concepción
     * // 25/12/2018 - Día de Navidad
     * ```
     * 
     * @param{number} yearInit el año inicial del intervalo
     * @param{number} yearEnd El año final del intervalo
     */
    const GYI = (yearInit, yearEnd) => {
      let h = [];
      let y, s,d;
      for(let i = yearInit; i < yearEnd; i++){
        y = {
          year: i,
          festivos: []
        };
        s = DR(i);
        holiDays.forEach(el=>{
          d = !el.diasParaSumar? new Date(el.fecha + "/" + i): SM(s.toDateString(), el.diasParaSumar);
          if(el.proximoLunes){d=NM(d)};
          y.festivos.push({
            fecha: FD(d),
            nombre: el.nombre,
            estatico: el.proximoLunes
          })
        })
        h.push(y);
      }
      return h;
    }
    return Object.freeze({
      getHolidaysByYear: GY,
      getHolidaysByYearInterval: GYI
    })
  }

  /**
   * #### ejecuta varias funciones en orden y pasa como parametros a la siguiente funcion el resultado de la anterior
   */
  static flowFunctions(funcs){
    return (...args) => funcs.reduce((prev, fnc) => [fnc(...prev)], args)[0]
  }

  /**
   * #### crea un nuevo objeto a partir de varios objetos. Las claves repetidas son ignoradas.
   * 
   *     AppScriptUtilities.joinObjects({a: 1}, {b: 2}, {a: 3})
   *     // => { a: 1, b: 2 }
   */
  static joinObjects(...args) { return { status: true, content: args.reverse().reduce((acc, obj) => ({ ...acc, ...obj }), {}) } }

  /**
   * #### Crea la invocación de una funcion dependiendo de los argumentos que ésta reciba.
   * 
   * ```javascript
   * const saludar = (saludo, nombre) => `${saludo} ${nombre}`;
   * const buenosDias = AppScriptUtilities.partialFunction(saludar, 'Hola');
   * buenosDias.content('Pepito Grillo');
   * // => 'Hola Pepito Grillo'
   * ```
   * 
   * @param {Function} func - la funcion a invocar
   */
  static partialFunction(func, ...args) {
    if ([null, undefined, ''].includes(func)) { return { status: false, content: 'El argumento "func" no puede estar vacío' } }
    if (typeof val != 'function') { return { status: false, content: 'El argumento "func" debe ser una funcion ' } }
    return { status: true, content: (...fa) => func(...args, ...fa) }
  }

  /**
   * #### Convierte filas en columnas en un arreglo de arreglos
   * 
   * ```javascript
   * AppScriptUtilities.convertRowsToColumns([1,3], ['a', 'b'], ['si', 'no'])
   * // => [ 1, 'a', 'si' ], [ 3, 'b', 'no' ] ]
   * ```
   * 
   * @param {Array} arr - el arreglo inicial
   */
  static convertRowsToColumns(arr, ...args) {
    if (!Array.isArray(arr)) return { status: false, content: 'El tipo de dato "arr" debe ser un arreglo' };
    if (!(arr && arr.length)) return { status: true, content: [] };
    return { status: true, content: arr.map((v, i) => [v, ...args.map(arr => arr[i])]) }
  }

  /**
   * #### Separa un arreglo en varios arreglos pequeños con la misma longitud.
   * #### Si el ultimo arreglo generado no cumple la longitud deseada se dejará con la maxima longitud posible.
   * 
   *```javascript
   * var dias = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
   * AppScriptUtilities.splitArray(dias);
   * // => [ [ 'L' ], [ 'M' ], [ 'M' ], [ 'J' ], [ 'V' ], [ 'S' ], [ 'D' ] ]
   * AppScriptUtilities.splitArray(dias, 3);
   * // => [ [ 'L', 'M', 'M' ], [ 'J', 'V', 'S' ], [ 'D' ] ]
   * ```
   * 
   * @param {Array} arr - El arreglo que que queremos separar
   * @param {number} size - El tamaño que deben tener los arreglos generados 
   */
  static splitArray(arr, size = 1) {
    if (!Array.isArray(arr)) return { status: false, content: 'El tipo de dato "arr" debe ser un arreglo' };
    if (isNaN(size)) return { status: false, content: 'El tipo de dato "size" debe ser un numero' };
    const _tempArr = [...arr];
    let _newArr = [];
    if (size <= 0) return _newArr
    while (_tempArr.length) {
      _newArr.push(_tempArr.splice(0, size))
    }
    return { status: true, content: _newArr };
  }


  /**
   * #### Hace que la primera letra de cada palabra de un texto sea mayúscula
   * 
   * @param {string} str - La cadena de texto que queremos convertir
   */
  static capitalizeString(str) {
    if (typeof str != 'string') return { status: false, content: 'El argumento "str" debe ser un cadena de texto' }
    if (!str.length) return { status: false, content: '' }
    str = str[0].toUpperCase() + str.slice(1).toLowerCase();
    return { status: true, content: str.split('').map((el, elIndex) => { return str[elIndex - 1] != undefined && [' ', '.'].includes(str[elIndex - 1]) ? el.toUpperCase() : el }).join('') }

  }

  /**
 * #### Convierte el archivo excel dado a Sheets y lo almacena en el folder con Id FolderTargetId
 * 
 * @param {string} ExcelId - Id del excel a convertir
 * @param {string} FolderTargetId - Id del folder destino
 * @return {string} - Id del archivo convertido
 */
  static convertExcelToSheets(ExcelId, FolderTargetId) {
    if (typeof ExcelId != 'string') return { status: false, content: 'El argumento "ExcelId" debe ser un cadena de texto' };
    if (typeof FolderTargetId != 'string') return { status: false, content: 'El argumento "FolderTargetId" debe ser un cadena de texto' };
    if (!ExcelId.length || !FolderTargetId.length) { return { status: false, content: '' } }
    let excelFile = DriveApp.getFileById(ExcelId);
    return {
      status: true, content: Drive.Files.insert({
        title: `_CONVERTED_${excelFile.getName().split('.')[0]}`,
        parents: [{ id: FolderTargetId }]
      }, excelFile.getBlob(), { convert: true, supportsAllDrives: true }).getId()
    };

  };

  /** ### Funcion encargada de contar cuantas letras y cuantos numeros contiene una cadena de texto
   * @param{string} str La cadena de texto a evaluar
  */
  static countNumbersAndLettersFromString(str) {
    if (typeof str != 'string') return { status: false, content: 'El argumento "str" debe ser un cadena de texto' }
    let r = new RegExp('\\d', 'g');
    let count = 0;
    while (r.exec(str)) { count++ };
    return { status: true, content: { letters: str.length - count, numbers: count } };
  }

  /**
   * #### Verifica si una hoja de calculo es de tipo Google SpreadSheet o Excel
   * @param {string} id El identificador de la hoja
   * @return {bool} result Retorna true si el archivo es de tipo hoja de calculo Google Sheet, false lo contrario
   */
  static checkTypeSheet(id) {
    if (typeof id != 'string') return { status: false, content: 'El argumento "id" debe ser un cadena de texto' }
    if (!id.length) return { status: false, content: false }
    let sheet = DriveApp.getFileById(id); //SpreadsheetApp.openByUrl(data);
    let result = false;
    if (sheet.getMimeType() == 'application/vnd.google-apps.spreadsheet') {
      // no es una archivo de google sheet
      result = true;
    }
    return { status: result, content: result };
  }

  /**
   * #### Verifica que una cadena de texto tenga una url valida
   * @param {string} str La cadena de texto para verificar
   */
  static isValidURL(str) {
    if (typeof str != 'string') return { status: false, content: 'El argumento "str" debe ser un cadena de texto' }
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_=]*)?$', 'i'); // fragment locator
    return { status: true, content: !!pattern.test(str) };
  }

  /** 
   * #### Crea un pdf utilizando un string en base 64, lo almacena y devulve el identificador
   * 
   * @param {{baseData: string, namePdf: string, folderId: string}} - baseData: Los datos del documento PDF en base64
   * - namePdf El nombre que tendrá el nuevo archivo pdf
   * - folderId: El identificador de la carpeta drive en donde se almacenará el documento pdf
  */
  static createPDFFromBase64({ baseData = '', namePdf = '', folderId = '' }) {
    if (typeof baseData != 'string') return { status: false, content: 'El argumento "baseData" debe ser un cadena de texto' };
    if (typeof namePdf != 'string') return { status: false, content: 'El argumento "namePdf" debe ser un cadena de texto' };
    if (typeof folderId != 'string') return { status: false, content: 'El argumento "folderId" debe ser un cadena de texto' };
    if (!baseData.length || !namePdf.length || !folderId.length) return { status: false, content: '' }
    let blob = Utilities.newBlob(Utilities.base64Decode(baseData), 'application/pdf', namePdf);
    blob.setContentType('application/pdf');
    let _newFile = DriveApp.getFolderById(folderId).createFile(blob);
    return { status: true, content: _newFile.getUrl(), handler: _newFile.getAs(MimeType.PDF) };
  }

  /** 
   * #### Revisa si una direccion de correo es valida. Retorna true si el correo es valido 
   * @param {string} email la cadena de texto que queremos comprobar si se trata de un correo valido
  */
  static checkEmail(email) {
    if (typeof email != 'string') return { status: false, content: 'El argumento "email" debe ser un cadena de texto' }
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+.[a-zA-Z0-9]*$/;
    return { status: true, content: emailRegexp.test(email) };
  }

  /**
   * #### Agrega el contenido de un archivo html a una vista renderizada
   * @param {string} FileName El nombre **completo** del archivo que queremos agregar
   */
  static addFileToFront(FileName) {
    return HtmlService.createTemplateFromFile(FileName).evaluate().getContent();
  };


  /**
   * #### funcion que devuelve la columna y la fila de un celda en formato A1
   */
  static getRowColumnNumberByA1Notation(cell){
    if (typeof cell != 'string') return { status: false, content: 'El argumento "cell" debe ser un cadena de texto' }
    let letters = cell.match(/[A-Za-z]*/g).filter(el=>el!='')[0];
    let numbers = cell.match(/[0-9]*/g).filter(el=>el!='')[0]
    if(letters == undefined || numbers == undefined) return {status: false, content: 'Datos incorrectos'}
    return {status: true, content: {
      numbers: parseInt(numbers),
      letters: this.getColumnByA1Notation(letters).content
    }}
    
  }

  /**
   * ## Desarrollado por:
   * 
   * 
   * ### Arturo Gomez => zesertebe@gmail.com
   * 
   * ### Visite: [ocancelada.dev](https://ocancelada.dev)
   * 
   * ### se recomienda usar la extension de Chrome para una mejor visualizacion: [GASE](https://chrome.google.com/webstore/detail/gase-google-appscript-edi/lefcemnilieamgifcegilmkaclmhakfc)
   * 
   * ```mermaid
   * Clase diseñada para proporcionar utilidades que solucionan problemas comunes
   * ```
   * 
   * > *2022*
   * 
   */
  static acercaDe() {
    return {
      author: 'Arturo Gomez => zesertebe@gmail.com',
      description: `Clase diseñada para proporcionar utilidades que solucionan problemas comunes`,
      web: 'https://ocancelada.dev',
    }
  }

  /**
   * #### Retorna la letra correspondiente al numero dado
   * 
   * ```javascript
   * console.log(AppScriptUtilities.getLetterByNumber(1))
   * // => { status: true, content: 'A' }
   * console.log(AppScriptUtilities.getLetterByNumber(112))
   * // => { status: true, content: 'DH' }
   * ```
   * 
   * @param{number} index El numero del cual queremos saber su letra correspondiente
  */
  static getLetterByNumber(index){
    if (isNaN(index) || index <=0 ) return { status: false, content: 'El argumento "index" debe ser un número positivo mayor a 0' }
    return {status: true, content: index <=26? String.fromCharCode(index + 64):  String.fromCharCode(64 + parseInt((index / 26)))  +  String.fromCharCode(64+ (index - (26 * parseInt((index / 26))))) }
  }

  /**
   * #### Funcion que toma como parametro un string en notacion A1 y devuelve su correspondiente valor numerico como columna 
   * Primero evalua que la longitud del string sea de al menos 1 caracter. Actualmente solo puede trabajar hasta la columna *ZZ*
   * Ejemplo:
   * ```javascript
   * const E_INDEX = getColumnByA1Notation('E') // devuelve 5
   * const AB_INDEX = getColumnByA1Notation('AB') //devuelve 28
   * ```
   * 
   * @param {string} index string en notacion A1
   * @returns {number}
   */
  static getColumnByA1Notation(index) {
    if (typeof index != 'string') return { status: false, content: 'El argumento "index" debe ser un cadena de texto' }
    index = index.toUpperCase().match(/[A-Z]*/g).filter(el => el != '').join(''); // convierte a mayuscula por si acaso se pasa una letra en minisculas y elimina numero y otros simbolos

    if (!index.length) return { status: false, content: '' }
    /* Primero evalua si hay mas de una letra en cuyo caso toma solamente las dos primeras letras si es que hay mas 
    Luego si hay una letra la convierte a su valor ASCI y le resta 64. Si hay dos letras a la primera le resta 64 y luego la multiplica por 26
    */
    return { status: true, content: index.length === 1 ? index.charCodeAt(0) - 64 : index.split('').slice(0, 2).reduce((a, b) => ((a.charCodeAt(0)) - 64) * 26 + (b.charCodeAt(0) - 64)) };
  }

  /**
   * #### Funcion que extrae el id de una url
   * 
   * ```javascript
   * console.log(AppScriptUtilities.getIdFromUrl('https://docs.google.com/spreadsheets/d/este_es_un_id_de_ejemplo-123/edit#gid=382991151') )
   * // { status: true, content: 'este_es_un_id_de_ejemplo-123' }
   * ```
   * 
   * @param {string} url La url para extraer el id
   * @return {{status: string, content: string}} el identificador contenido en la url
  */
  static getIdFromUrl(url) {
    if (typeof url != 'string') return { status: false, content: 'El argumento "url" debe ser un cadena de texto' }
    let regexp = url.match(/[-\w]{25,}/);
    if (regexp === null) { return { status: false, content: 'No se encontró un id válido' } }
    return { status: true, content: regexp[0] };
  };

  /**
   * #### Función que genera un cadena de caracteres aleatorios (numeros y letras solamente)
   * 
   * @param {number} length - la longitud deseada para la cadena aleatoria
  */
  static makeid(length = 2) {
    if (typeof length != 'number') return { status: false, content: 'El argumento "length" debe ser un numero' }
    if (length < 0) length = length * -1;
    if (length === 0) length = 1;
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Conjunto de caracteres para ser utilizados
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return { status: true, content: result };
  }

  /** 
   * #### obtiene el blob de una imagen en base64 
   * @param {{ base64: string, nameOfImage: string }} . - base64 El codigo de la imagen en base64
   * - nameOfImage El nombre de la imagen
  */
  static getBase64ImgAsBlob({ base64, nameOfImage }) {
    if (typeof base64 != 'string') return { status: false, content: 'El argumento "base64" debe ser un cadena de texto' };
    if (!base64.length) return { status: false, content: '' }
    if (nameOfImage === null) { nameOfImage = 'img_' + this.makeid(5) };
    let _newBase64 = Utilities.base64Decode(base64);
    return { status: true, content: Utilities.newBlob(_newBase64, MimeType.JPEG, nameOfImage) };
  }

  /**
   * #### Envía correo electrónico
   * @param {{ emailto: stirng, subject: string, from: string, bodymsg: string, attachments: Array, img: string, cc: string }} . 
   * - **emailto** Correo destino
   * - **subject** Asunto del correo
   * - **bodymsg** Mensaje del correo HTML COMPLETO 
   * - **attachments** Arreglo con los archivos atados
   * - **img** Las imagenes deben estar autocontenidas en etiquetas img en formato base64
   * - **cc** la lista de correos separados por coma para hacer el envio
   */
  static sendEmail({ emailto, subject, from, bodymsg, attachments, img = null, cc = "" }) {
    let result = '';
    if (typeof emailto != 'string') return { status: false, content: 'El argumento "emailto" debe ser un cadena de texto' };

    if (emailto !== '') {
      // Parametros adicionales para el email
      let emailParameters = {
        htmlBody: bodymsg,
        cc: cc
      };
      if (img != null) {
        // en la plantilla HTML existen imagenes que deben ser enviadas
        // estas imagenes deben auto contenerse en la propia plantilla en formato BASE64
        // si al abrir el archivo HTML en cualquier navegador se visualizan las imagenes,
        // entonces le formato será correcto tambien para ser enviadas por Gmail
        let findImg = [...bodymsg.matchAll('<img')]; // buscamos todas las etiquetas img
        let srcStart = 0; // desde donde inicia el codigo de la imagen en base64
        let posToCopy = 0; // posicion para copiar al nuevo codigo html
        let srcContent = ''; // variable que almacena el codigo en base64 de cada imagen
        let inlineImages = {}; // objeto que almacena nuestra lista de imagenes
        let newHtml = ''; // variable que almacena el nuevo html
        let _tempBase64 = '';
        findImg.forEach((element, elementIndex) => {
          srcStart = bodymsg.slice(element.index, bodymsg.length - 1).search('src="') + 5 + element.index;
          newHtml += bodymsg.slice(posToCopy, srcStart)
          posToCopy = bodymsg.slice(srcStart, bodymsg.length - 1).search('"') + srcStart;
          srcContent = bodymsg.slice(srcStart, posToCopy).split(',')[1];
          _tempBase64 = this.getBase64ImgAsBlob({ base64: srcContent });
          if (_tempBase64.status) {
            if (_tempBase64.content != '') {
              inlineImages['img_' + elementIndex] = _tempBase64.content;
              newHtml += 'cid:img_' + elementIndex;
            } else {
              newHtml += srcContent;
            }
          } else {
            return _tempBase64;
          }
        })
        newHtml += bodymsg.slice(posToCopy, bodymsg.length);
        bodymsg = '';
        bodymsg += newHtml;
        newHtml = '';
        posToCopy = 0;
        findImg = [...bodymsg.matchAll('background-image:')];
        findImg.forEach((element, elementIndex) => {
          srcStart = bodymsg.slice(element.index, bodymsg.length - 1).search("url\\('") + 5 + element.index;
          newHtml += bodymsg.slice(posToCopy, srcStart)
          posToCopy = bodymsg.slice(srcStart, bodymsg.length - 1).search("'") + srcStart;
          srcContent = bodymsg.slice(srcStart, posToCopy).split(',')[1];
          _tempBase64 = this.getBase64ImgAsBlob({ base64: srcContent });
          if (_tempBase64.status) {
            if (_tempBase64.content != '') {
              inlineImages['backImg_' + elementIndex] = _tempBase64.content;
              newHtml += 'cid:backImg_' + elementIndex;
            } else {
              newHtml += srcContent;
            }
          } else {
            return _tempBase64;
          }
        })
        newHtml += bodymsg.slice(posToCopy, bodymsg.length);
        emailParameters.htmlBody = newHtml;
        emailParameters.inlineImages = inlineImages;
      }
      if (attachments != null) { emailParameters.attachments = attachments };
      if (from != null) { emailParameters.from = from };
      // Envío del correo
      result = GmailApp.sendEmail(emailto,
        subject,
        '',
        emailParameters);
    };
    return { status: true, content: result };

  };
}
