# 10-Aggregation-Framework
1. [Intro](#schema1)
2. [Using the Aggregation Framework](#schema2)


<hr>

<a name="schema1"></a>

## 1. Intro



El Aggregation Framework es una característica poderosa de MongoDB que permite realizar operaciones de procesamiento 
y transformación de datos en documentos almacenados en una colección. En lugar de realizar consultas simples para 
recuperar documentos, el Aggregation Framework permite realizar operaciones más complejas y realizar análisis avanzados 
en los datos.

El Aggregation Framework utiliza un enfoque de canalización, donde los documentos pasan a través de varias etapas de o
peraciones de agregación que se aplican secuencialmente. Cada etapa realiza una operación específica en los documentos 
de entrada y pasa los resultados a la siguiente etapa.

Las operaciones de agregación en el Aggregation Framework incluyen una variedad de funciones y expresiones,
como `$match`para filtrar documentos, $group para realizar agregaciones basadas en valores específicos, 
`$project` para seleccionar campos y transformar la estructura del documento, entre otras.

Aquí hay un ejemplo simple de cómo se vería una operación de agregación en MongoDB utilizando el Aggregation Framework:

```
db.miColeccion.aggregate([
   { $match: { estado: "activo" } },
   { $group: { _id: "$categoria", total: { $sum: "$cantidad" } } },
   { $sort: { total: -1 } }
])

```
En este ejemplo:

1. La primera etapa ($match) filtra los documentos donde el campo "estado" es igual a "activo".
2. La segunda etapa ($group) agrupa los documentos por el campo "categoria" y calcula la suma de 
la cantidad para cada categoría.
3. La tercera etapa ($sort) ordena los resultados en función del total en orden descendente.


https://docs.mongodb.com/manual/core/aggregation-pipeline/

<hr>

<a name="schema2"></a>

## 2. Using the Aggregation Framework

![agg](./img/1agg.png)

- Importamos los datos.

```
mongoimport persons.json -d analytics -c persons --jsonArray
```

- Primera query con un simple filtro, lista de la colección `persons` todos los elementos que el género sea femenino.

```
db.persons([{$mathc:{gender:'female'}}])
```

- Otro ejemplo
```
db.persons.aggregate([
    { $match: { gender: 'female' } },
    { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } }
]).pretty();
```

1. `$match: { gender: 'female' }`

Filtra los documentos en la colección donde el campo "gender" es igual a "female". Esto significa que solo se 
considerarán las personas de género femenino en las etapas posteriores.

2. `$group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } }`

Agrupa los documentos restantes por el campo "location.state" y calcula el total de personas para cada estado.
El resultado de la agrupación tendrá un campo "_id" que contiene el estado y otro campo "totalPersons" 
que contiene la cantidad total de personas en ese estado.

```
{ _id: { state: 'nordland' }, totalPersons: 3 },
  { _id: { state: 'hedmark' }, totalPersons: 3 },
  { _id: { state: 'manawatu-wanganui' }, totalPersons: 8 },
  { _id: { state: 'appenzell innerrhoden' }, totalPersons: 3 },
  { _id: { state: 'eskişehir' }, totalPersons: 3 },
  { _id: { state: 'pas-de-calais' }, totalPersons: 1 },
  { _id: { state: 'siirt' }, totalPersons: 3 },
  { _id: { state: 'tyne and wear' }, totalPersons: 2 },
  { _id: { state: 'مرکزی' }, totalPersons: 8 },
  { _id: { state: 'fife' }, totalPersons: 2 },
  { _id: { state: 'rhode island' }, totalPersons: 2 },
  { _id: { state: 'new brunswick' }, totalPersons: 9 },
  { _id: { state: 'zug' }, totalPersons: 6 },
  { _id: { state: 'genève' }, totalPersons: 5 },
  { _id: { state: 'south australia' }, totalPersons: 22 },
  { _id: { state: 'nottinghamshire' }, totalPersons: 3 },
  { _id: { state: 'tocantins' }, totalPersons: 4 },
  { _id: { state: 'québec' }, totalPersons: 8 },
  { _id: { state: 'northern territory' }, totalPersons: 15 },
  { _id: { state: 'western australia' }, totalPersons: 13 }

```

- Ordenado
- 
```
db.persons.aggregate([
    { $match: { gender: 'female' } },
    { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
    { $sort: { totalPersons: -1 } }
]).pretty();
```

```
 { _id: { state: 'midtjylland' }, totalPersons: 33 },
  { _id: { state: 'nordjylland' }, totalPersons: 27 },
  { _id: { state: 'new south wales' }, totalPersons: 24 },
  { _id: { state: 'australian capital territory' }, totalPersons: 24 },
  { _id: { state: 'syddanmark' }, totalPersons: 24 },
  { _id: { state: 'south australia' }, totalPersons: 22 },
  { _id: { state: 'hovedstaden' }, totalPersons: 21 },
  { _id: { state: 'danmark' }, totalPersons: 21 },
  { _id: { state: 'queensland' }, totalPersons: 20 },

```