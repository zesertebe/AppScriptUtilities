/**
 * @class AppScriptUtilities
 * @Author: Arturo G - https://adev.dev
 * @version: 2.0.7
 * @classdesc: Clase que proporciona un conjunto de herramientas y utilidades sencillas
 * que pueden ser utilizados en cualquier proyecto AppScript
 * se recomienda usar la extension de Chrome para una mejor visualizacion: https://chrome.google.com/webstore/detail/gase-google-appscript-edi/lefcemnilieamgifcegilmkaclmhakfc
 * 
 */
class AppScriptUtilities {

  /**
   * #### Analiza una cadena y extrae cualquier carácter numérico, devolviéndolo como un número.
   * 
   * ```javascript
   * const str = 'Mi texto 123'
   * const number = AppScriptUtilities.getNumberFromStr(str);
   * // => 123
   * ```
   *
   * @param {string} str - La cadena a analizar.
   * @returns {number} El valor numérico analizado a partir de la cadena.
   * @throws {Error} Si el argumento "str" no es una cadena de texto no vacía.
   */
  static getNumberFromStr(str) {
    if (typeof str !== 'string' || str.trim().length < 1) {
      throw new Error('El argumento "str" debe ser una cadena de texto no vacía');
    }
    const result = str.match(/[0-9]+/g);
    if (!result) {
      throw new Error('La cadena no contiene números');
    }
    return parseInt(result.join(''));
  }


  /**
   * #### Crea una fecha a partir de un string y un formato dado.
   * 
   * ```javascript
   * const date = '2022/07/05'
   * const newDate = AppScriptUtilities.createDateFromString(date, 'YYYY/MM/DD')
   * // =>  Tue Jul 05 2022 00:00:00 GMT-0500 (Colombia Standard Time)
   * ```
   * 
   * @param {string} str - El string a partir del cual se creará la fecha.
   * @param {string} format - El formato de la fecha, por ejemplo "YYYY/MM/DD".
   * @returns {Date} - La fecha creada.
   * @throws {Error} - Si el formato es inválido o la fecha no puede ser creada.
   */
  static createDateFromString(str, format) {
    if (typeof str !== 'string' || str.trim().length < 1) {
      throw new Error('El argumento "str" debe ser una cadena de texto no vacía');
    }
    if (typeof format !== 'string' || format.trim().length < 5) {
      throw new Error('El argumento "format" debe ser una cadena de texto no vacía');
    }
    const formatParts = format.toUpperCase().split(/[-/.]/);
    const dateParts = str.split(/[-/.]/);
    if (formatParts.length !== 3 || dateParts.length !== 3) {
      throw new Error('El formato o el string son inválidos');
    }
    const yearIndex = formatParts.includes('YYYY') ? formatParts.indexOf('YYYY') : formatParts.indexOf('YY');
    const monthIndex = formatParts.indexOf('MM');
    const dayIndex = formatParts.indexOf('DD');
    if (yearIndex === -1 || monthIndex === -1 || dayIndex === -1) {
      throw new Error('El formato es inválido');
    }
    const year = parseInt(dateParts[yearIndex]);
    const month = parseInt(dateParts[monthIndex]) - 1;
    const day = parseInt(dateParts[dayIndex]);
    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) {
      throw new Error('La fecha es inválida');
    }
    return date;
  }


  /**
   * #### obtiene los dias festivos de Colombia basado en la ley 51 de 1983
   * 
   * 
   */
  static getHolidays() {
    const holiDays = [{
      fecha: "01/01",
      proximoLunes: false,
      nombre: "Año Nuevo"
    }, {
      fecha: "01/06",
      proximoLunes: true,
      nombre: "Día de los Reyes Magos"
    }, {
      fecha: "03/19",
      proximoLunes: true,
      nombre: "Día de San José"
    }, {
      diasParaSumar: -3,
      proximoLunes: false,
      nombre: "Jueves Santo"
    }, {
      diasParaSumar: -2,
      proximoLunes: false,
      nombre: "Viernes Santo"
    }, {
      fecha: "05/01",
      proximoLunes: false,
      nombre: "Día del Trabajo"
    }, {
      diasParaSumar: 40,
      proximoLunes: true,
      nombre: "Ascensión del Señor"
    }, {
      diasParaSumar: 60,
      proximoLunes: true,
      nombre: "Corphus Christi"
    }, {
      diasParaSumar: 71,
      proximoLunes: true,
      nombre: "Sagrado Corazón de Jesús"
    }, {
      fecha: "06/29",
      proximoLunes: true,
      nombre: "San Pedro y San Pablo"
    }, {
      fecha: "07/20",
      proximoLunes: false,
      nombre: "Día de la Independencia"
    }, {
      fecha: "08/07",
      proximoLunes: false,
      nombre: "Batalla de Boyacá"
    }, {
      fecha: "08/15",
      proximoLunes: true,
      nombre: "La Asunción de la Virgen"
    }, {
      fecha: "10/12",
      proximoLunes: true,
      nombre: "Día de la Raza"
    }, {
      fecha: "11/01",
      proximoLunes: true,
      nombre: "Todos los Santos"
    }, {
      fecha: "11/11",
      proximoLunes: true,
      nombre: "Independencia de Cartagena"
    }, {
      fecha: "12/08",
      proximoLunes: false,
      nombre: "Día de la Inmaculada Concepción"
    }, {
      fecha: "12/25",
      proximoLunes: false,
      nombre: "Día de Navidad"
    }]
    const TD = (n) => n < 10 ? "0" + n : n;
    const FD = (f) => TD(f.getDate()) + "/" + TD(f.getMonth() + 1) + "/" + f.getFullYear();
    const DR = (y) => {
      const c = (19 * (y % 19) + 24) % 30;
      const d = 22 + (c) + ((2 * (y % 4) + 4 * (y % 7) + 6 * c + 5) % 7);
      return new Date((d >= 1 && d <= 31) ? `03/${TD(d)}/${y}` : `04/${TD(d - 31)}/${y}`);
    }
    const NM = (y) => {
      while (y.getDay() !== 1) {
        y.setDate(y.getDate() + 1)
      }
      return y;
    }
    const SM = (td, ds) => {
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
      holiDays.forEach(el => {
        d = !el.diasParaSumar ? new Date(el.fecha + "/" + year) : SM(dr.toDateString(), el.diasParaSumar);
        if (el.proximoLunes) {
          d = NM(d)
        }
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
      let y, s, d;
      for (let i = yearInit; i < yearEnd; i++) {
        y = {
          year: i,
          festivos: []
        };
        s = DR(i);
        holiDays.forEach(el => {
          d = !el.diasParaSumar ? new Date(el.fecha + "/" + i) : SM(s.toDateString(), el.diasParaSumar);
          if (el.proximoLunes) {
            d = NM(d)
          };
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
   * Combina varias funciones en una sola función, en la que el resultado de cada función se convierte en el argumento de la siguiente función. 
   * @param {Function[]} funcs - Un array de funciones que se encadenarán. 
   * @returns {Function} - Una nueva función que combina todas las funciones pasadas como argumento en una sola función encadenada.
   */
  static flowFunctions(funcs) {
    // Validar que funcs es un array y que todos sus elementos son funciones
    if (!Array.isArray(funcs) || !funcs.every(fn => typeof fn === 'function')) {
      throw new Error('Todos los elementos de "funcs" deben ser funciones');
    }

    // Devuelve una función que ejecuta cada función en "funcs" en orden
    return (...args) => {
      try {
        return funcs.reduce((prev, fnc) => [fnc(...prev)], args)[0];
      } catch (error) {
        console.error('Error al ejecutar una de las funciones:', error);
        // Dependiendo de tu caso de uso, podrías lanzar el error, devolver un valor predeterminado, etc.
        throw error;
      }
    };
  }


  /**
   * #### Combina múltiples objetos en uno solo.. Las claves repetidas son ignoradas.
   * 
   * ```javascript
   * AppScriptUtilities.joinObjects({a: 1}, {b: 2}, {a: 3})
   * // => { a: 1, b: 2 }
   * ```
   * @param {...Object} args - Objetos a combinar.
   * @returns {Object} - Objeto combinado.
   * @throws {TypeError} Si los argumentos no son objetos.
   */
  static joinObjects(...args) {
    return args.reduce((acc, obj) => {
      if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            acc[key] = obj[key];
          }
        }
      }
      return acc;
    }, {});
  }

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
   * @param {function} func - La función a aplicar parcialmente.
   * @param {...*} args - Argumentos a aplicar parcialmente.
   * @returns {function} Una nueva función con los argumentos aplicados parcialmente..
   * @throws {Error} Si `func` está vacío o no es una función.
   */
  static partial(func, ...boundArgs) {
    if (typeof func !== 'function') {
      throw new Error('El primer argumento debe ser una función.');
    }
    return (...args) => func(...boundArgs, ...args);
  }


  /**
   * #### Convierte filas en columnas en un arreglo de arreglos
   * 
   * ```javascript
   * AppScriptUtilities.convertRowsToColumns([1,3], ['a', 'b'], ['si', 'no'])
   * // => [ [1, 'a', 'si'], [3, 'b', 'no'] ]
   * ```
   * 
   * @param {Array<Array>} arr - El arreglo bidimensional a convertir.
   * @param  {...Array} args - Argumentos opcionales para agregar a las nuevas columnas.
   * @throws {Error} El argumento "arr" y todos los argumentos en "args" deben ser arreglos.
   * @returns {Array<Array>} El arreglo bidimensional con filas convertidas en columnas.
   */
  static convertRowsToColumns(arr, ...args) {
    if (!Array.isArray(arr) || !args.every(Array.isArray)) {
      throw new Error('Todos los argumentos deben ser arreglos.');
    }
    const maxLength = Math.max(arr.length, ...args.map(subArr => subArr.length));
    return Array.from({ length: maxLength }).map((_, i) => [
      arr[i], ...args.map(subArr => subArr[i])
    ]);
  }

  /**
   * #### Separa un arreglo en varios arreglos pequeños con la misma longitud.
   * #### Si el ultimo arreglo generado no cumple la longitud deseada se dejará con la maxima longitud posible.
   * 
   * @example
   * ```javascript
   * var dias = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
   * AppScriptUtilities.splitArray(dias);
   * // => [ [ 'L' ], [ 'M' ], [ 'M' ], [ 'J' ], [ 'V' ], [ 'S' ], [ 'D' ] ]
   * AppScriptUtilities.splitArray(dias, 3);
   * // => [ [ 'L', 'M', 'M' ], [ 'J', 'V', 'S' ], [ 'D' ] ]
   * ```
   * 
   * @param {Array} arr - El arreglo que queremos separar.
   * @param {number} size - El tamaño que deben tener los arreglos generados.
   * @returns {Array<Array>} Arreglo de arreglos con el tamaño especificado.
   */
  static splitArray(arr, size = 1) {
    if (!Array.isArray(arr)) {
      throw new Error('El tipo de dato "arr" debe ser un arreglo');
    }
    if (typeof size !== 'number' || size <= 0 || !Number.isInteger(size)) {
      throw new Error('El tipo de dato "size" debe ser un número entero positivo');
    }

    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }


  /**
  * #### Hace que la primera letra de cada palabra de un texto sea mayúscula.
  * 
  * @param {string} str - La cadena de texto que queremos convertir.
  * @throws {Error} Lanza un error si el argumento "str" no es una cadena de texto.
  * @returns {string} La cadena de texto con la primera letra de cada palabra en mayúscula.
  */
  static capitalizeString(str) {
    if (typeof str !== 'string' || !str.trim().length) {
      throw new Error('El argumento "str" debe ser un cadena de texto no vacía');
    }
    return str.toLowerCase().replace(/(^|\s|\.)([a-z])/g, (match, delimiter, char) => delimiter + char.toUpperCase());
  }

  /**
   * #### Convierte el archivo excel dado a Sheets y lo almacena en el folder con Id folderTargetId.
   * 
   * @param {string} excelId - ID del archivo de Excel a convertir.
   * @param {string} folderTargetId - ID del folder destino donde se almacenará el archivo convertido.
   * @returns {string} - ID del archivo de Google Sheets convertido.
   * @throws {Error} Si el argumento "excelId" o "folderTargetId" no son cadenas de texto, o si están vacíos.
   */
  static convertExcelToSheets(excelId, folderTargetId) {
    if (!excelId || typeof excelId !== 'string' || !folderTargetId || typeof folderTargetId !== 'string') {
      throw new Error('Los argumentos "excelId" y "folderTargetId" deben ser cadenas de texto no vacías.');
    }

    try {
      const excelFile = DriveApp.getFileById(excelId);
      const convertedFile = Drive.Files.insert({
        title: `_CONVERTED_${excelFile.getName().split('.')[0]}`,
        parents: [{
          id: folderTargetId
        }]
      },
        excelFile.getBlob(), {
        convert: true,
        supportsAllDrives: true
      });

      return convertedFile.getId();
    } catch (error) {
      throw new Error(`Error al convertir el archivo: ${error.message}`);
    }
  };


  /**
   * #### Función que cuenta cuántas letras y cuántos números contiene una cadena de texto.
   * 
   * @param {string} str - La cadena de texto a evaluar.
   * @returns {Object} - Un objeto que contiene la cantidad de letras y de números en la cadena.
   * @throws {Error} - Si el argumento "str" no es una cadena de texto.
  */
  static countNumbersAndLettersFromString(str) {
    if (typeof str !== 'string') {
      throw new Error('El argumento "str" debe ser una cadena de texto.');
    }
    const numbers = str.match(/\d/g) || [];
    const letters = str.match(/[a-zA-Z]/g) || [];
    return {
      lettersCount: letters.length,
      numbersCount: numbers.length
    };
  }


  /**
   * #### Verifica si un archivo es de tipo Google Sheets o Excel.
   * 
   * @example
   * ```javascript
   * const isGoogleSheet = AppScriptUtilities.checkTypeSheet('ID_SHEET');
   * 
   * ```
   * 
   * @param {string} id - El identificador del archivo.
   * @return {boolean} - Retorna `true` si el archivo es de tipo Google Sheets, `false` en caso contrario.
   * @throws {Error} - Si el argumento `id` no es un string o está vacío.
   */
  static checkTypeSheet(id) {
    if (typeof id !== 'string' || !id.trim()) {
      throw new Error('El argumento "id" debe ser una cadena de texto no vacía.');
    }
    try {
      const sheet = DriveApp.getFileById(id);
      return sheet.getMimeType() === 'application/vnd.google-apps.spreadsheet';
    } catch (error) {
      throw new Error(`Error al obtener el archivo: ${error.message}`);
    }
  }


  /**
   * #### Verifica que una cadena de texto tenga una url valida
   * @param {string} str La cadena de texto para verificar
   */
  static isValidURL(str) {
    if (typeof str !== 'string') {
      throw new Error('El argumento "str" debe ser un cadena de texto')
    }
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_=]*)?$', 'i'); // fragment locator
    return !!pattern.test(str)
  }


  /** 
   * #### Crea un pdf utilizando un string en base 64, lo almacena y devulve el identificador
   * 
   * @param {string} baseData - Los datos del documento PDF en base64
   * @param {string} namePdf - El nombre que tendrá el nuevo archivo pdf
   * @param {string} folderId - El identificador de la carpeta drive en donde se almacenará el documento pdf
   * @returns {string} - El identificador del archivo creado
   */
  static createPDFFromBase64(baseData = '', namePdf = '', folderId = '') {
    if (!baseData || typeof baseData !== 'string') {
      throw new Error('El argumento "baseData" debe ser una cadena de texto no vacía.');
    }
    if (!namePdf || typeof namePdf !== 'string') {
      throw new Error('El argumento "namePdf" debe ser una cadena de texto no vacía.');
    }
    if (!folderId || typeof folderId !== 'string') {
      throw new Error('El argumento "folderId" debe ser una cadena de texto no vacía.');
    }

    try {
      const blob = Utilities.newBlob(Utilities.base64Decode(baseData), 'application/pdf', namePdf);
      const newFile = DriveApp.getFolderById(folderId).createFile(blob);
      return newFile.getId();
    } catch (error) {
      throw new Error(`Error al crear el archivo PDF: ${error.message}`);
    }
  }



  /** 
   * #### Revisa si una direccion de correo es valida. Retorna true si el correo es valido 
   * @param {string} email la cadena de texto que queremos comprobar si se trata de un correo valido
   */
  static checkEmail(email) {
    if (typeof email !== 'string' || !email.trim().length) {
      throw new Error('El parametro "email" debe ser un string no vacío')
    }
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+.[a-zA-Z0-9]*$/;
    return emailRegexp.test(email);
  }

  /**
   * #### Agrega el contenido de un archivo html a una vista renderizada
   * @param {string} fileName El nombre completo del archivo que queremos agregar, incluyendo la extensión .html
   * @returns {string} El contenido HTML renderizado del archivo
   * @throws {Error} Si el parámetro fileName no es un string no vacío
   * @throws {Error} Si no se puede crear una plantilla HTML a partir del archivo especificado
   */
  static addFileToFront(FileName) {
    if (typeof fileName !== 'string' || !fileName.trim()) {
      throw new Error('El parámetro "fileName" debe ser un string no vacío');
    }

    const template = HtmlService.createTemplateFromFile(fileName);
    if (!template) {
      throw new Error('No se pudo crear una plantilla HTML a partir del archivo especificado');
    }
    return template.evaluate().getContent();
  };


  /**
   * Devuelve la columna y la fila de una celda en formato A1.
   * @param {string} cell - La celda en formato A1.
   * @returns {Object} - Un objeto con la fila y la columna.
   * @throws {Error} - Si el argumento "cell" no es una cadena de texto o si no se pudo obtener la fila o la columna.
  */
  static getRowColumnNumberByA1Notation(cell) {
    if (typeof cell !== 'string' || !cell.trim()) {
      throw new Error('El argumento "cell" debe ser una cadena de texto no vacía.');
    }

    const columnMatch = cell.match(/[A-Za-z]+/);
    const rowMatch = cell.match(/\d+/);

    if (!columnMatch || !rowMatch) {
      throw new Error('No se pudo obtener la fila o la columna.');
    }

    return {
      row: parseInt(rowMatch[0], 10),
      column: this.getColumnByA1Notation(columnMatch[0])
    };
  }


  /**
   * ## Desarrollado por:
   * 
   * 
   * ### Arturo Gomez => zesertebe@gmail.com
   * 
   * ### Visite: [adev.dev](https://adev.dev)
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
      web: 'https://adev.dev',
    }
  }

  /**
   * ### Retorna la letra correspondiente al numero dado de columna
   * 
   * @example
   * ```javascript
   * console.log(AppScriptUtilities.getLetterByNumber(1))
   * // => { status: true, content: 'A' }
   * console.log(AppScriptUtilities.getLetterByNumber(112))
   * // => { status: true, content: 'DH' }
   * ```
   * 
   * @param {number} index - El número de columna.
   * @returns {string} La letra correspondiente a la columna.
   * @throws {Error} Si el argumento index no es un número positivo mayor a 0.
   */
  static getLetterByNumber(index) {
    if (isNaN(index) || index <= 0) {
      throw new Error('El argumento "index" debe ser un número positivo mayor a 0')
    }
    const charCodeA = 'A'.charCodeAt(0);
    let result = '';

    while (index > 0) {
      const remainder = (index - 1) % 26;
      result = String.fromCharCode(charCodeA + remainder) + result;
      index = Math.floor((index - 1) / 26);
    }
    return result;
  }

  /**
   * #### Funcion que toma como parametro un string en notacion A1 y devuelve su correspondiente valor numerico como columna 
   * Primero evalua que la longitud del string sea de al menos 1 caracter. Actualmente solo puede trabajar hasta la columna *ZZ*
   * 
   * @example
   * ```javascript
   * const E_INDEX = getColumnByA1Notation('E') // devuelve 5
   * const AB_INDEX = getColumnByA1Notation('AB') //devuelve 28
   * ```
   * 
   * @param {string} index - El valor de la columna en notación A1.
   * @returns {number} - El valor numérico correspondiente a la columna de la celda.
   * @throws {Error} - Si el argumento "index" no es una cadena de texto no vacía.
   * @throws {RangeError} - Si el valor de la columna en notación A1 es mayor a la columna ZZ.
   */
  static getColumnByA1Notation(index) {
    if (typeof index != 'string' || !index.trim().length) {
      throw new Error('El argumento "index" debe ser un cadena de texto no vacía')
    }
    index = index.toUpperCase().match(/[A-Z]*/g).filter(el => el != '').join(''); // convierte a mayuscula por si acaso se pasa una letra en minisculas y elimina numero y otros simbolos

    if (!index.length) {
      return ''
    }
    // Convierte la letra o letras en su valor numérico correspondiente.
    let columnValue = index.length === 1 ? index.charCodeAt(0) - 64 : index.slice(0, 2).split('').reduce((acc, cur) => ((acc.charCodeAt(0) - 64) * 26) + (cur.charCodeAt(0) - 64));

    if (columnValue > 702) {
      throw new RangeError('El valor de la columna en notación A1 es mayor a la columna ZZ.');
    }
    return columnValue;
  }

  /**
   * #### Extrae el ID de un enlace de Google Drive
   * 
   * @example
   * ```javascript
   * console.log(AppScriptUtilities.getIdFromUrl('https://docs.google.com/spreadsheets/d/este_es_un_id_de_ejemplo-123/edit#gid=382991151') )
   * // { status: true, content: 'este_es_un_id_de_ejemplo-123' }
   * ```
   * 
   * @param {string} url El enlace de Google Drive del que se desea extraer el ID
   * @returns {string} El ID extraído de la URL
   * @throws {Error} Si el argumento "url" no es una cadena de texto
   * @throws {Error} Si no se pudo encontrar un ID válido en la URL
   */
  static getIdFromUrl(url) {
    if (typeof url !== 'string' || !url.length) {
      throw new Error('El argumento "url" debe ser un cadena de texto no vacía')
    }
    const regexp = url.match(/[-\w]{25,}/);
    if (regexp === null) {
      throw new Error('No se pudo encontrar un ID válido en la URL');
    }
    return regexp[0]
  };

  /**
   * #### Función que genera un cadena de caracteres aleatorios (numeros y letras solamente)
   * 
   * @param {number} length - La longitud deseada para la cadena aleatoria (por defecto 2)
   * @returns {string} - La cadena aleatoria generada.
   * @throws {Error} - Si el argumento length no es un número positivo.
   */
  static makeid(length = 2) {
    if (typeof length !== 'number' || length <= 0 || !Number.isInteger(length)) {
      throw new Error('El argumento "length" debe ser un número positivo entero');
    }
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Conjunto de caracteres para ser utilizados
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  /** 
   * #### obtiene el blob de una imagen en base64 
   * @param {string} base64 - La codificación de la imagen en base64.
   * @param {string=} nameOfImage - El nombre de la imagen. Si no se proporciona, se genera un nombre aleatorio.
   * @returns {Blob} - El objeto blob que representa la imagen.
   * @throws {Error} - Si el argumento "base64" no es una cadena de texto no vacía.
   */
  static getBase64ImgAsBlob(
    base64,
    nameOfImage
  ) {
    if (typeof base64 !== 'string' || !base64.length) {
      throw new Error('El argumento "base64" debe ser un cadena de texto no vacía')
    };

    if (typeof nameOfImage !== 'string' || nameOfImage.trim() === '') {
      nameOfImage = 'img_' + this.makeid(5);
    }
    const _newBase64 = Utilities.base64Decode(base64);
    return Utilities.newBlob(_newBase64, MimeType.JPEG, nameOfImage)

  }

  /**
   * ### Envía correo electrónico
   * @param {{ emailto: stirng, subject: string, from: string, bodymsg: string, attachments: Array, img: string, cc: string }} . 
   * - **emailto** Correo destino
   * - **subject** Asunto del correo
   * - **bodymsg** Mensaje del correo HTML COMPLETO 
   * - **attachments** Arreglo con los archivos atados
   * - **img** Las imagenes deben estar autocontenidas en etiquetas img en formato base64
   * - **cc** la lista de correos separados por coma para hacer el envio
   */
  static sendEmail({
    emailto,
    subject,
    from,
    bodymsg,
    attachments,
    img = null,
    cc = ""
  }) {
    // Verificar si emailto es una cadena de texto no vacía
    if (typeof emailto !== 'string' || emailto.trim() === '') {
      throw new Error('El argumento "emailto" debe ser una cadena de texto no vacía');
    }

    let result = false;
    if (typeof emailto !== 'string') {
      throw new Error('El argumento "emailto" debe ser un cadena de texto no vacía')
    };

    // Parametros adicionales para el email
    const emailParameters = {
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
        _tempBase64 = this.getBase64ImgAsBlob({
          base64: srcContent
        });
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
        _tempBase64 = this.getBase64ImgAsBlob({
          base64: srcContent
        });
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
    if (attachments != null) {
      emailParameters.attachments = attachments
    };
    if (from != null) {
      emailParameters.from = from
    };
    // Envío del correo
    result = GmailApp.sendEmail(emailto,
      subject,
      '',
      emailParameters);

    return !!result;
  };
}

