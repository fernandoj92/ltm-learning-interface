# Estructura del interfaz de usuario

## (19-09-2016)
La aplicación ha sido diseñada para que cada ventana trabaje unicamente con un proceso de análisis, 
de tal forma que si se quiere trabajar en varios "proyectos" de forma simultánea deberían abrirse varias
ventanas. La razón detras de esta decisión se encuentra en la dificultad que conllevaría desarrollar 
una aplicacion multi-tab que mantuviese el estado de varios "proyectos" en un entorno web.

La ventana se estructura en varios módulos (subventanas). Cada uno de estos módulos puede ser 
customizado para....

## (04-10-2016)

La versión inicial cuenta con tres módulos principales y un modulo "hijo" que son:

* El listado de Streams.
    * El listado de Execution Results (ERs) correspondiente a dicho stream.
* El visualizador del DAG.
* El visualizador de las CPTs.

### 1) Listado de Streams

* Muestra los streams actuales. Un stream puede encontrarse de varias formas:
    * Activo: Puede recibir nuevas insercciones de ERs.
    * Inactivo: No puede recibir nuevas insercciones pero sigue almacenando en memoria los ERs.
    * Eliminado: Deja de existir y con ello los ERs asociados.

#### 1.1) Listado de ERs

* Muestra los ERs de dicho stream

### 2) Visualizador del DAG

* Muestra el DAG asociado a la red bayesiana del ER seleccionado.

### 3) Visualizador de las CPTs

* Muestra las CPTs asociadas a la red bayesiana del ER seleccionado.

