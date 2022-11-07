# AppScriptUtilities

Conjunto de Utilidades para el entorno de Google AppScript que proporciona funcionalidades utilies para tareas comunes y/o repetitivas.

> puede incluir esta librería en cualquier proyecto de tipo AppScript

## Ejemplos:

```javascript
// obtener el ID de la url de un proyecto AppScript:
let f = AppScriptUtilities.getIdFromUrl('https://script.google.com/home/projects/487gfnbjkgt985t4-hgm458954/edit')
// => { status: true, content: '487gfnbjkgt985t4-hgm458954' }

// obtener el ID de la url de una hoja de calculo:
let f = AppScriptUtilities.getIdFromUrl('https://docs.google.com/spreadsheets/d/h58fjbbfkjgF569fmgjghg85nfngh7tgh6tjrf8/edit#gid=0')
 // => { status: true, content: 'h58fjbbfkjgF569fmgjghg85nfngh7tgh6tjrf8' }

 // convertir un archivo EXCEL en hoja de cálculo de Google y almacenarlo en una carpeta:
 let f = AppScriptUtilities.convertExcelToSheets('EXCEL_ID', 'FOLDER_ID');
 // { status: true, content: 'NEW_SPREADSHEET_ID' }
```

## Métodos

| # | Nombre | Parámetros | Descripción
-- | -- | -- | -- |
| 1 | <strong style="color: #CBC700;">convertStringToDate</strong> | str:string | convierte un string dado a un formato de fecha válido
| 2 | <strong style="color: #CBC700;">getHolidays</strong> | .getHolidaysByYear(YEAR:number) | obtiene los dias festivos de Colombia basado en la ley 51 de 1983
| 3 | <strong style="color: #CBC700;">flowFunctions</strong> | funcs:Object | ejecuta varias funciones en orden y pasa como parametros a la siguiente funcion el resultado de la anterior
| 4 | <strong style="color: #CBC700;">joinObjects</strong> | ...args:Object | crea un nuevo objeto a partir de varios objetos. Las claves repetidas son ignoradas
| 5 | <strong style="color: #CBC700;">partialFunction</strong> | func:function, ...args:any | Crea la invocación de una funcion dependiendo de los argumentos que ésta reciba.
| 6 | <strong style="color: #CBC700;">convertRowsToColumns</strong> | arr:Array, ...args:Array | Convierte filas en columnas en un arreglo de arreglos
| 7 | <strong style="color: #CBC700;">splitArray</strong> | arr:Array, size:number | Separa un arreglo en varios arreglos pequeños con la misma longitud segun el parametro size
| 8 | <strong style="color: #CBC700;">capitalizeString</strong> | str:string |  Hace que la primera letra de cada palabra de un texto sea mayúscula
| 9 | <strong style="color: #CBC700;">convertExcelToSheets</strong> | ExcelId:string, FolderTargetId:string | Convierte el archivo excel dado a Sheets y lo almacena en el folder con Id FolderTargetId
| 10 | <strong style="color: #CBC700;">countNumbersAndLettersFromString</strong> | str:string |  Funcion encargada de contar cuantas letras y cuantos numeros contiene una cadena de texto
| 11 | <strong style="color: #CBC700;">checkTypeSheet</strong> | id:string |  Verifica si una hoja de calculo es de tipo Google SpreadSheet o Excel
| 12 | <strong style="color: #CBC700;">isValidURL</strong> | str:string |  Verifica que una cadena de texto tenga una url valida
| 13 | <strong style="color: #CBC700;">createPDFFromBase64</strong> | baseData:string, namePdf:string, folderId:string | Crea un pdf utilizando un string en base 64, lo almacena y devulve el identificador
| 14 | <strong style="color: #CBC700;">checkEmail</strong> | email:string | Revisa si una direccion de correo es valida. Retorna true si el correo es valido
| 15 | <strong style="color: #CBC700;">addFileToFront</strong> | FileName:string |  Agrega el contenido de un archivo html a una vista renderizada
| 16 | <strong style="color: #CBC700;">getRowColumnNumberByA1Notation</strong> | cell:string |  funcion que devuelve la columna y la fila de un celda en formato A1
| 17 | <strong style="color: #CBC700;">getLetterByNumber</strong> | index:number |  Retorna la letra correspondiente al numero dado
| 18 | <strong style="color: #CBC700;">getColumnByA1Notation</strong> | index:number |   Funcion que toma como parametro un string en notacion A1 y devuelve su correspondiente valor numerico como columna
| 19 | <strong style="color: #CBC700;">getIdFromUrl</strong> | url:string |  Funcion que extrae el ID de una url
| 20 | <strong style="color: #CBC700;">makeid</str0ong> | length:number |  Función que genera un cadena de caracteres aleatorios (numeros y letras solamente)
| 21 | <strong style="color: #CBC700;">getBase64ImgAsBlob</strong> | base64:string, nameOfImage:string |  obtiene el blob de una imagen en base64
| 22 | <strong style="color: #CBC700;">sendEmail</strong> | emailto:string, subject:string, from:string, bodymsg:string, attachments:Array, img:boolean, cc:string |  Envía correos electrónicos