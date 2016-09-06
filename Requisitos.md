# Requisitos

### Comunicación con el servidor

* El envio de mensajes de la aplicación al servidor se realizará en formato JSON.
* El envio de mensajes del servidor a la aplicacion se realizara en formato JSON.

### Funcionalidades

#### Archivo
* Cargar una BN a partir de un archivo JSON local.
* Guardar la BN actual en un archivo JSON local.
* Exportar el DAG de la BN actual a un archivo PNG local.

#### Conexiones

* Establecer una conexión con el servidor.
* Guardar la nueva conexión en un archivo de formato JSON.
* Cargar una conexión guardada en formato JSON.
* Probar la conexión mediante una petición REST GET.

#### Ejecución de algoritmos

* **[REST]** Enviar en una petición **GET** el comando de ejecución del algoritmo ABI con los siguientes parametros:
   - FSS measure (e.g. Mutual Information)
   - Max island size
   - Base LV cardinality
   - Unidimensionality test threshold
   - Batch size (Debe ser igual al número de instancias en el archivo de datos)
   - Data file name
   - Information Measure values (*True*/*False*)
* **[REST]** Recibir la BN resultante tras la ejecucion del algoritmo como respuesta de la petición **GET**.
* **[WebSocket]** ```TODO```: Enviar el comando de ejecución del algoritmo.
* **[WebSocket]** ```TODO```: Recibir la BN resultante de la ejecución de una iteración del algoritmo

#### Visualización de la BN
* La aplicación mostrará la red bayesiana utilizando una libreria de grafos (Cytoscape.js, D3.js)
* La aplicación mostrará la CPT asociada a cada nodo cuando se haga click izquierdo sobre el mismo

#### Analisis de la BN 
* Mostrar la tabla de valores de la *Information Measure* con respecto a todas las variables
* Permitir ordenar la tabla por:
   - Variable 1
   - Variable 2
   - Valor de menor a mayor
   - Valor de mayor a menor
* Generar una Information curve a partir de la tabla de valores de la *Information Measure*.

### Preferencias del usuario
* Guardar las preferencias en un archivo JSON local.
* Cargar preferencias a partir de un archivo JSON local.
* Buscar automaticamente preferencias en un directorio local llamado "/prefs"
* Las preferencias incluirán:
   - Visualizacion (Color de los nodos, de las conexiones..etc)
   - Export JSON pretify?

### Formato de los archivos 
#### Bayesian network (Example)

```json
{
	"elements": {
		"nodes": [
			{
				"data": {
					"id": "0"
				}
			},
			{
				"data": {
					"id": "1"
				}
			}
		],
		"edges": [
			{
				"data": {
					"source": "1",
					"target": "0"
				}
			}
		]
	},
	"probabilityTables": {
		TODO
	},
	"ltmStructure":{
		TODO
	},
	"bivariateMutualInformation":
	[
	    {
	        "data":{
	            "var1": "0",
	            "var2": "1",
	            "value": "0.245678"
	        }
	    }
	]
}
```

#### Concept Drift Management (WebSocket only?)
```json
{
	TODO
}
```

