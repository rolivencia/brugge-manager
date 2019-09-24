﻿/*
 *
 * Wijmo Library 5.20183.567
 * http://wijmo.com/
 *
 * Copyright(c) GrapeCity, Inc.  All rights reserved.
 *
 * Licensed under the GrapeCity Commercial License.
 * sales@wijmo.com
 * wijmo.com/products/wijmo-5/license/
 *
 */
var wijmo;
!(function(e) {
  window.wijmo || (window.wijmo = e),
    (e.culture = window.wijmo.culture = {
      Globalize: {
        name: "es-419",
        displayName: "Spanish (Latin America)",
        numberFormat: {
          ".": ".",
          ",": ",",
          "-": "-",
          "+": "+",
          "%": "%",
          percent: { pattern: ["-n %", "n %"] },
          currency: { decimals: 2, symbol: "XDR", pattern: ["-$n", "$n"] }
        },
        calendar: {
          "/": "/",
          ":": ":",
          firstDay: 1,
          days: [
            "domingo",
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado"
          ],
          daysAbbr: ["dom.", "lun.", "mar.", "mié.", "jue.", "vie.", "sáb."],
          months: [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre"
          ],
          monthsAbbr: [
            "ene.",
            "feb.",
            "mar.",
            "abr.",
            "may.",
            "jun.",
            "jul.",
            "ago.",
            "sep.",
            "oct.",
            "nov.",
            "dic."
          ],
          am: ["a.m.", "a"],
          pm: ["p.m.", "p"],
          eras: ["d. C."],
          patterns: {
            d: "d/M/yyyy",
            D: 'dddd, d "de" MMMM "de" yyyy',
            f: 'dddd, d "de" MMMM "de" yyyy HH:mm',
            F: 'dddd, d "de" MMMM "de" yyyy HH:mm:ss',
            t: "HH:mm",
            T: "HH:mm:ss",
            m: 'd" de "MMMM',
            M: 'd" de "MMMM',
            y: 'MMMM "de" yyyy',
            Y: 'MMMM "de" yyyy',
            g: "d/M/yyyy HH:mm",
            G: "d/M/yyyy HH:mm:ss",
            s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
          }
        }
      },
      Licensing: {
        cls: "CERRAR",
        ctc:
          'Por favor, póngase en contacto con GrapeCity: <a href="mailto:us.sales@grapecity.com">us.sales@grapecity.com</a>.',
        dmn:
          "La licencia de Wijmo en esta aplicación no es válida para el dominio actual. El dominio de la licencia es <b>{licDomain}</b>; el dominio actual es <b>{domain}</b>.",
        evl: "Versión de evaluación Wijmo ({version})",
        exp:
          "La licencia de Wijmo en esta aplicación ha expirado. La fecha de vencimiento de la licencia es <b>{expDate:d}</b>.",
        hdr: "Licencia Wijmo",
        lic: "La licencia de Wijmo en esta aplicación no es válida.",
        mss: "La licencia de Wijmo en esta aplicación no está configurada.",
        prd:
          "La licencia de Wijmo en esta aplicación no es válida para el control <b>{control}</b>.",
        ver:
          "La licencia de Wijmo en esta aplicación no es válida para la versión en uso. La versión de la licencia es <b>{licVer}</b>; la versión del producto es <b>{version}</b>."
      },
      Calendar: {
        ariaLabels: {
          calendar: "Calendario",
          monthView: "Vista Mes",
          yearView: "Vista Año",
          prvMo: "Mes anterior",
          today: "Hoy",
          nxtMo: "Próximo mes",
          prvYr: "Año anterior",
          currMo: "Mes actual",
          nxtYr: "Próximo año"
        }
      },
      DropDown: { ariaLabels: { tgl: "Desplegable de palanca" } },
      FlexGrid: {
        groupHeaderFormat: "{name}: <b>{value}</b> ({count:n0} ítems)",
        ariaLabels: {
          toggleDropDown: "Desplegable de palanca",
          toggleGroup: "Grupo de palanca"
        }
      },
      FlexGridDetailProvider: {
        ariaLabels: { toggleDetail: "Cambiar fila detalle" }
      },
      FlexGridFilter: {
        ariaLabels: {
          edit: "Editar filtro para Columna",
          dialog: "Editor de filtro para la columna",
          asc: "Ordenar columna en orden ascendente",
          dsc: "Ordenar columna en orden descendente",
          search: "Lista de búsqueda",
          op1: "Operador para la primera condición",
          val1: "Valor para la primera condición",
          and: "Requieren dos condiciones",
          or: "Requieren ya sea condición",
          op2: "Operador para la segunda condición",
          val2: "Valor para la segunda condición"
        },
        ascending: "↑ Ascendente",
        descending: "↓ Descendente",
        apply: "Aplicar",
        cancel: "Cancelar",
        clear: "Borrar",
        conditions: "Condiciones",
        values: "Valores",
        search: "Filtro",
        selectAll: "Seleccionar todo",
        null: "(nulo)",
        header: "Mostrar ítems donde el valor",
        and: "Y",
        or: "O",
        stringOperators: [
          { name: "(ninguno)", op: null },
          { name: "Es igual a", op: 0 },
          { name: "No es igual a", op: 1 },
          { name: "Comienza con", op: 6 },
          { name: "Termina con", op: 7 },
          { name: "Contiene", op: 8 },
          { name: "No contiene", op: 9 }
        ],
        numberOperators: [
          { name: "(ninguno)", op: null },
          { name: "Es igual a", op: 0 },
          { name: "No es igual a", op: 1 },
          { name: "Es mayor que", op: 2 },
          { name: "Es mayor o igual a", op: 3 },
          { name: "Es menor que", op: 4 },
          { name: "Es menor o igual a", op: 5 }
        ],
        dateOperators: [
          { name: "(ninguno)", op: null },
          { name: "Es igual a", op: 0 },
          { name: "es anterior a", op: 4 },
          { name: "es posterior a", op: 2 }
        ],
        booleanOperators: [
          { name: "(ninguno)", op: null },
          { name: "Es igual a", op: 0 },
          { name: "No es igual a", op: 1 }
        ]
      },
      InputDateTime: {
        ariaLabels: {
          tglDate: "Cambiar calendario",
          tglTime: "Lista de tiempo de cambiar"
        }
      },
      InputNumber: {
        ariaLabels: {
          incVal: "Incrementa el valor",
          decVal: "Disminuye el valor"
        }
      },
      MultiSelect: {
        itemsSelected: "{count:n0} ítems seleccionados",
        selectAll: "Seleccionar todo"
      },
      olap: {
        PivotFieldEditor: {
          dialogHeader: "Configuración de los campos:",
          header: "Encabezado:",
          summary: "Resúmen:",
          showAs: "Mostrar como:",
          weighBy: "Pesar por:",
          sort: "Ordenar:",
          filter: "Filtrar:",
          format: "Formato:",
          sample: "Muestra:",
          edit: "Editar…",
          clear: "Borrar",
          ok: "Aceptar",
          cancel: "Cancelar",
          none: "(ninguno)",
          sorts: { asc: "Ascendente", desc: "Descendente" },
          aggs: {
            sum: "Suma",
            cnt: "Cantidad",
            avg: "Promedio",
            max: "Máximo",
            min: "Mínimo",
            rng: "Rango",
            std: "StdDev",
            var: "VAR",
            stdp: "StdDevPop",
            varp: "VarPop",
            first: "Primero",
            last: "Último"
          },
          calcs: {
            noCalc: "No Calcular",
            dRow: "Diferencia con el renglón anterior",
            dRowPct: "% de diferencia con el renglón anterior",
            dCol: "Diferencia con la columna anterior",
            dColPct: "% de diferencia con la columna anterior",
            dPctGrand: "% del gran total",
            dPctRow: "% del total del renglón",
            dPctCol: "% del total de la columna",
            dRunTot: "Total acumulativo",
            dRunTotPct: "% del total acumulativo"
          },
          formats: {
            n0: "Entero (n0)",
            n2: "Decimal (n2)",
            c: "Moneda (c)",
            p0: "Porcentaje (p0)",
            p2: "Porcentaje (p2)",
            n2c: "Miles (n2,)",
            n2cc: "Millones (n2,,)",
            n2ccc: "Billones (n2,,,)",
            d: "Fecha (d)",
            MMMMddyyyy: "Mes día año (MMMM dd, yyyy)",
            dMyy: "Día mes año (d/M/yy)",
            ddMyy: "Día mes año (dd/M/yy)",
            dMyyyy: "Día mes año (dd/M/yyyy)",
            MMMyyyy: "Mes año (MMM yyyy)",
            MMMMyyyy: "Mes año (MMMM yyyy)",
            yyyyQq: 'Cuatrimestre (yyyy "Q" q)',
            FYEEEEQU: 'Cuatrimestre fiscal ("FY" EEEE "Q" U)'
          }
        },
        PivotEngine: { grandTotal: "Total general", subTotal: "Subtotal" },
        PivotPanel: {
          fields: "Elegir campos para agregar al reporte:",
          drag: "Arrastrar campos entre las áreas debajo:",
          filters: "Filtros",
          cols: "Columnas",
          rows: "Renglones",
          vals: "Valores",
          defer: "Diferir actualizaciones",
          update: "Actualizar"
        },
        _ListContextMenu: {
          up: "Mover arriba",
          down: "Mover abajo",
          first: "Mover al principio",
          last: "Mover al final",
          filter: "Mover al filtro del reporte",
          rows: "Mover a las etiquetas del renglón",
          cols: "Mover a las etiquetas de la columna",
          vals: "Mover a los valores",
          remove: "Eliminar campo",
          edit: "Configuración de los campos…",
          detail: "Mostrar detalles…"
        },
        PivotChart: { by: "por", and: "y" },
        DetailDialog: {
          header: "Detalles:",
          ok: "Aceptar",
          items: "{cnt:n0} ítems",
          item: "{cnt} ítem",
          row: "Renglón",
          col: "Columna"
        },
        Slicer: { multiSelect: "Multiselección", clearFilter: "Borrar filtro" }
      },
      Viewer: {
        cancel: "Cancelar",
        ok: "Aceptar",
        bottom: "Inferior:",
        top: "Superior:",
        right: "Derecha:",
        left: "Izquierda:",
        margins: "Márgenes (pulgadas)",
        orientation: "Orientación:",
        paperKind: "Tipo de papel:",
        pageSetup: "Configuración de página",
        landscape: "Horizontal",
        portrait: "Vertical",
        pageNumber: "Número de página",
        zoomFactor: "Factor de zoom",
        paginated: "Diseño de impresión",
        print: "Imprimir",
        search: "Buscar",
        matchCase: "Coincidir mayúsculas y minúsculas",
        wholeWord: "Sólo palabras completas",
        searchResults: "Resultados de la búsqueda",
        previousPage: "Página anterior",
        nextPage: "Página siguiente",
        firstPage: "Primera página",
        lastPage: "Última página",
        backwardHistory: "Hacia atrás",
        forwardHistory: "Adelante",
        pageCount: "Número de páginas",
        selectTool: "Seleccione la herramienta",
        moveTool: "Herramienta mover",
        continuousMode: "Continua la vista de página",
        singleMode: "Vista de página única",
        wholePage: "Ajuste toda la página",
        pageWidth: "Ajuste ancho de página",
        zoomOut: "Alejar",
        zoomIn: "Acercar",
        rubberbandTool: "Zoom por selección",
        magnifierTool: "Lupa",
        rotatePage: "Girar página",
        rotateDocument: "Rotar documento",
        exports: "Exportar",
        fullScreen: "Pantalla completa",
        exitFullScreen: "Salir de pantalla completa",
        hamburgerMenu: "Herramientas",
        showSearchBar: "Mostrar barra de búsqueda",
        viewMenu: "Opciones de diseño",
        searchOptions: "Opciones de búsqueda",
        matchCaseMenuItem: "Coincidir mayúsculas y minúsculas",
        wholeWordMenuItem: "Coincidir toda la palabra",
        thumbnails: "Miniaturas de página",
        outlines: "Mapa del documento",
        loading: "Cargando…",
        pdfExportName: "Adobe PDF",
        docxExportName: "Open XML Word",
        xlsxExportName: "Open XML Excel",
        docExportName: "Microsoft Word",
        xlsExportName: "Microsoft Excel",
        mhtmlExportName: "Archivo de la web (MHTML)",
        htmlExportName: "Documento HTML",
        rtfExportName: "Documento RTF",
        metafileExportName: "Comprimido metarchivos",
        csvExportName: "CSV",
        tiffExportName: "Imágenes TIFF",
        bmpExportName: "Imágenes BMP",
        emfExportName: "Metarchivo mejorado",
        gifExportName: "Imágenes GIF",
        jpgExportName: "Imágenes JPEG",
        jpegExportName: "Imágenes JPEG",
        pngExportName: "Imágenes PNG",
        abstractMethodException:
          "Se trata de un método abstracto, por favor ponerlo.",
        cannotRenderPageNoViewPage:
          "No puede procesar página sin fuente de documento y vista.",
        cannotRenderPageNoDoc:
          "No puede procesar página sin fuente de documento y vista.",
        exportFormat: "Formato de exportación:",
        exportOptionTitle: "Opciones de exportación",
        documentRestrictionsGroup: "Restricciones del documento",
        passwordSecurityGroup: "Seguridad de contraseñas",
        outputRangeGroup: "Rango de salida",
        documentInfoGroup: "Información del documento",
        generalGroup: "General",
        docInfoTitle: "Título",
        docInfoAuthor: "Autor",
        docInfoManager: "Administrador",
        docInfoOperator: "Operador",
        docInfoCompany: "Compañía",
        docInfoSubject: "Asunto",
        docInfoComment: "Comentar",
        docInfoCreator: "Creador",
        docInfoProducer: "Productor",
        docInfoCreationTime: "Hora de creación",
        docInfoRevisionTime: "Tiempo de revisión",
        docInfoKeywords: "Palabras clave",
        embedFonts: "Incrustar fuentes TrueType",
        pdfACompatible: "Compatibles con PDF/A (nivel 2B)",
        useCompression: "Utilizar compresión",
        useOutlines: "Generar esquemas",
        allowCopyContent: "Permite copiar contenido o extracción",
        allowEditAnnotations: "Permite edición de anotación",
        allowEditContent: "Permite editar contenido",
        allowPrint: "Permitir la impresión",
        ownerPassword: "Contraseña de permisos (propietario):",
        userPassword: "Contraseña de documento abierto (usuario):",
        encryptionType: "Nivel de cifrado:",
        paged: "Paginado",
        showNavigator: "Mostrar explorador",
        navigatorPosition: "Posición del Navegador",
        singleFile: "Solo archivo",
        tolerance: "Tolerancia al detectar límites de texto (puntos):",
        pictureLayer: "Capa de imagen independiente del uso",
        metafileType: "Tipo de metarchivo:",
        monochrome: "Monocromático",
        resolution: "Resolución:",
        outputRange: "Intervalo de páginas:",
        outputRangeInverted: "Invertido",
        showZoomBar: "Barra de zoom",
        searchPrev: "Buscar anterior",
        searchNext: "Buscar siguiente",
        checkMark: "✓",
        exportOk: "[j4Jaz]Exportar…",
        cannotSearch:
          "La búsqueda requiere que se especifique un origen de documento.",
        parameters: "Parámetros",
        requiringParameters: "Parámetros de entrada por favor.",
        nullParameterError: "El valor no puede ser nulo.",
        invalidParameterError: "Entrada no válida.",
        parameterNoneItemsSelected: "(ninguno)",
        parameterAllItemsSelected: "(todos)",
        parameterSelectAllItemText: "(Seleccionar todo)",
        selectParameterValue: "(seleccionar el valor)",
        apply: "Aplicar",
        errorOccured: "Se ha producido un error."
      },
      FlexSheet: {
        insertRow: "Insertar fila",
        deleteRow: "Eliminar fila",
        insertCol: "Insertar columna",
        deleteCol: "Delete Column",
        convertTable: "Convertir tabla",
        copyCells: "Copiar celdas",
        fillSeries: "Rellenar serie",
        fillFormat: "Llenar formato de sólo",
        fillWithoutFormat: "Rellenar sin formato"
      }
    });
  var a = window.wijmo._updateCulture;
  a && a();
})(wijmo || (wijmo = {}));
