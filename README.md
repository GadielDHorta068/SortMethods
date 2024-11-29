# 🖥️ Comparador de Algoritmos de Ordenamiento

## 📝 Descripción del Proyecto

Este proyecto es una aplicación web interactiva que permite visualizar y comparar cuatro algoritmos de ordenamiento clásicos: Burbuja, Selección, Inserción y QuickSort. La aplicación muestra gráficamente cómo cada algoritmo ordena un conjunto de números, proporcionando estadísticas en tiempo real sobre comparaciones, intercambios y tiempo de ejecución.

## ✨ Características Principales

- Visualización en tiempo real de algoritmos de ordenamiento
- Estadísticas detalladas para cada algoritmo
- Interfaz interactiva con control de tamaño de array
- Representación gráfica mediante barras de diferentes alturas

## 🧮 Algoritmos Implementados

### 1. Ordenamiento Burbuja (Bubble Sort)

#### Pseudocódigo
```
función bubbleSort(arreglo):
    para i desde 0 hasta longitud(arreglo) - 1:
        para j desde 0 hasta longitud(arreglo) - i - 1:
            si arreglo[j] > arreglo[j+1]:
                intercambiar(arreglo[j], arreglo[j+1])
```

#### Complejidad
- Tiempo: O(n²)
- Espacio: O(1)

#### Características
- Método simple pero ineficiente para grandes conjuntos
- Compara elementos adyacentes y los intercambia si están en orden incorrecto

### 2. Ordenamiento por Selección (Selection Sort)

#### Pseudocódigo
```
función selectionSort(arreglo):
    para i desde 0 hasta longitud(arreglo) - 1:
        índiceMinimo = i
        para j desde i + 1 hasta longitud(arreglo):
            si arreglo[j] < arreglo[índiceMinimo]:
                índiceMinimo = j
        intercambiar(arreglo[i], arreglo[índiceMinimo])
```

#### Complejidad
- Tiempo: O(n²)
- Espacio: O(1)

#### Características
- Divide el arreglo en dos subarreglos
- Encuentra repetidamente el mínimo de la porción no ordenada

### 3. Ordenamiento por Inserción (Insertion Sort)

#### Pseudocódigo
```
función insertionSort(arreglo):
    para i desde 1 hasta longitud(arreglo):
        clave = arreglo[i]
        j = i - 1
        mientras j >= 0 y arreglo[j] > clave:
            arreglo[j+1] = arreglo[j]
            j = j - 1
        arreglo[j+1] = clave
```

#### Complejidad
- Tiempo: O(n²)
- Espacio: O(1)

#### Características
- Eficiente para conjuntos pequeños
- Construye el arreglo final de uno en uno
- Útil cuando el arreglo ya está parcialmente ordenado

### 4. Ordenamiento Rápido (QuickSort)

#### Pseudocódigo
```
función quickSort(arreglo, inicio, fin):
    si inicio < fin:
        pivote = particion(arreglo, inicio, fin)
        quickSort(arreglo, inicio, pivote-1)
        quickSort(arreglo, pivote+1, fin)

función particion(arreglo, inicio, fin):
    pivote = arreglo[fin]
    i = inicio - 1
    para j desde inicio hasta fin:
        si arreglo[j] <= pivote:
            i = i + 1
            intercambiar(arreglo[i], arreglo[j])
    intercambiar(arreglo[i+1], arreglo[fin])
    devolver i + 1
```

#### Complejidad
- Tiempo promedio: O(n log n)
- Peor caso: O(n²)
- Espacio: O(log n)

#### Características
- Algoritmo de divide y conquista
- Muy eficiente en la práctica
- Utiliza un elemento pivote para particionar

## 🚀 Instalación y Uso

1. Clonar el repositorio
2. Abrir `index.html` en un navegador web
3. Usar el control deslizante para cambiar el tamaño del array
4. Presionar "Generar y Ordenar" para iniciar la visualización

## 🔍 Detalles Técnicos

- **Lenguajes**: HTML, CSS, JavaScript
- **Visualización**: Barras de diferentes alturas representando valores
- **Interactividad**: Animaciones en tiempo real
- **Estadísticas**: Comparaciones, intercambios y tiempo de ejecución

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, lee las guías de contribución antes de enviar un pull request.

## 📄 Licencia

[Especificar la licencia, por ejemplo MIT]
