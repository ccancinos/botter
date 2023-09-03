## Mega AFIP botter

Basado en:

- https://stackoverflow.com/questions/64277178/how-to-open-the-new-tab-using-playwright-ex-click-the-button-to-open-the-new-s
- https://www.twilio.com/blog/automated-headless-browser-scripting-in-node-js-with-playwright
- https://www.browserstack.com/guide/playwright-tutorial
- https://www.scrapingbee.com/blog/playwright-web-scraping/
- https://playwright.dev/docs/selectors#best-practices
- https://playwright.dev/docs/selectors#quick-guide

###

# Setup

Crear un archivo `.env` copiando el contenido de `.env.example` y modificar sus valores de configuración:

```
USER_CUIL='00000000000'
USER_PASS='XXXXXXXXX'
USER_NAME='XXXXXXXXXXXXXX'
# Opcional, toma por defecto N_PUNTO_VENTA=1
N_PUNTO_VENTA='1'
IMPORTE="10000"
# Todas las opciones una atras de otra, no meter /n o nada del estilo
DETALLES=["Actualización Servidor.","Actualización Cliente.","Arreglo pagina web.","Instalación paquetes","Instalación computadora nueva","Alta de cliente","Reparación base de datos","Backup base de datos","Proceso de backup automático","Servicio de Actualización de BD","Instalación de nueva terminal con cableado incluido"]
PERIODO_DESDE=01/08/2023
PERIODO_HASTA=31/08/2023
VENCIMIENTO_PAGO=07/09/2023
# Directorio para descarga de facturas. No incluir el / final
DOWNLOAD_PATH=./downloads
```

# Comandos disponibles:

## Generar Factura

Genera una factura con una descripcion de servicio facturado random obtenido de `DETALLES`. 
El archivo de la factura generada será descargado en el directorio definido en `DOWNLOAD_PATH`

```
npm run generar
```

## Consultar facturación del mes

Descarga todas las facturas del mes actual en el directorio `DOWNLOAD_PATH` e imprime un resumen por pantalla

```
npm run consultar
```

## Consultar facturación de los últimos 12 meses

Descarga todas las facturas de los últimos 12 meses en el directorio `DOWNLOAD_PATH` e imprime un resumen por pantalla

```
npm run consultar-anual
```

# TODO:

- Generar múltiples facturas de distintos montos
- Generación de factura con ingreso de datos manual
- Generación de VEP

# Desarrollo

## Chequeo de formato

```
npm run format:check
```

## Formateo

```
npm run format:write
```

## Chequeo eslint

```
npm run lint:check
```

## Autofix eslint

```
npm run lint:fix
```
