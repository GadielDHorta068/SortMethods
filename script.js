// Variable global para manejar cancelación de animaciones y estadísticas
let animationControllers = {
    'visualization-bubble': null,
    'visualization-selection': null,
    'visualization-insertion': null,
    'visualization-quick': null
};

let sortingStats = {
    'visualization-bubble': { comparisons: 0, swaps: 0, startTime: 0, endTime: 0 },
    'visualization-selection': { comparisons: 0, swaps: 0, startTime: 0, endTime: 0 },
    'visualization-insertion': { comparisons: 0, swaps: 0, startTime: 0, endTime: 0 },
    'visualization-quick': { comparisons: 0, swaps: 0, startTime: 0, endTime: 0 }
};

// Actualizar estadísticas en tiempo real en la interfaz
function updateStatisticsRealTime(containerId) {
    const stats = sortingStats[containerId];
    const statsElement = document.getElementById(`stats-${containerId.replace('visualization-', '')}`);
    
    if (statsElement) {
        const currentTime = performance.now();
        const timeTaken = (currentTime - stats.startTime).toFixed(2);
        statsElement.innerHTML = `
            Comparaciones: ${stats.comparisons}<br>
            Intercambios: ${stats.swaps}<br>
            Tiempo: ${timeTaken} ms
        `;
    }
}

// Resetear estadísticas
function resetStatistics(containerId) {
    sortingStats[containerId] = { 
        comparisons: 0, 
        swaps: 0, 
        startTime: performance.now(), 
        endTime: 0 
    };
}

// Generar un arreglo aleatorio
function generateArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

// Dibujar barras en el contenedor
function drawArray(containerId, array) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Limpiar contenedor 
    array.forEach((value) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 3}px`;
        container.appendChild(bar);
    });
}

// Cancelar animaciones existentes
function cancelAnimations() {
    Object.keys(animationControllers).forEach(containerId => {
        if (animationControllers[containerId]) {
            animationControllers[containerId].abort();
            animationControllers[containerId] = null;
        }
        resetBarColors(containerId);
    });
}

// Resetear colores de las barras
function resetBarColors(containerId) {
    const bars = document.getElementById(containerId).children;
    for (let bar of bars) {
        bar.style.backgroundColor = '#3498db';
    }
}

// Algoritmos de ordenamiento con estadísticas en tiempo real
async function bubbleSort(array, containerId) {
    const controller = new AbortController();
    animationControllers[containerId] = controller;
    const signal = controller.signal;
    
    resetStatistics(containerId);
    const stats = sortingStats[containerId];
    const bars = document.getElementById(containerId).children;
    
    // Iniciar intervalo de actualización en tiempo real
    const updateInterval = setInterval(() => {
        if (!signal.aborted) {
            updateStatisticsRealTime(containerId);
        } else {
            clearInterval(updateInterval);
        }
    }, 50);
    
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (signal.aborted) {
                clearInterval(updateInterval);
                return;
            }
            
            // Incrementar comparaciones
            stats.comparisons++;
            
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'orange';
            
            await new Promise((resolve) => setTimeout(resolve, 50));
            
            if (array[j] > array[j + 1]) {
                // Incrementar intercambios
                stats.swaps++;
                
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray(containerId, array);
            }
            
            bars[j].style.backgroundColor = '#3498db';
            bars[j + 1].style.backgroundColor = '#3498db';
        }
    }
    
    // Registrar tiempo final
    stats.endTime = performance.now();
    clearInterval(updateInterval);
    updateStatisticsRealTime(containerId);
}

async function selectionSort(array, containerId) {
    const controller = new AbortController();
    animationControllers[containerId] = controller;
    const signal = controller.signal;
    
    resetStatistics(containerId);
    const stats = sortingStats[containerId];
    const bars = document.getElementById(containerId).children;
    
    // Iniciar intervalo de actualización en tiempo real
    const updateInterval = setInterval(() => {
        if (!signal.aborted) {
            updateStatisticsRealTime(containerId);
        } else {
            clearInterval(updateInterval);
        }
    }, 50);
    
    for (let i = 0; i < array.length; i++) {
        if (signal.aborted) {
            clearInterval(updateInterval);
            return;
        }
        
        let minIdx = i;
        bars[minIdx].style.backgroundColor = 'green';
        for (let j = i + 1; j < array.length; j++) {
            if (signal.aborted) {
                clearInterval(updateInterval);
                return;
            }
            
            // Incrementar comparaciones
            stats.comparisons++;
            
            bars[j].style.backgroundColor = 'purple';
            await new Promise((resolve) => setTimeout(resolve, 50));
            
            if (array[j] < array[minIdx]) {
                bars[minIdx].style.backgroundColor = '#3498db';
                minIdx = j;
                bars[minIdx].style.backgroundColor = 'green';
            }
            bars[j].style.backgroundColor = '#3498db';
        }
        
        if (minIdx !== i) {
            // Incrementar intercambios
            stats.swaps++;
            
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            drawArray(containerId, array);
        }
        bars[minIdx].style.backgroundColor = '#3498db';
    }
    
    // Registrar tiempo final
    stats.endTime = performance.now();
    clearInterval(updateInterval);
    updateStatisticsRealTime(containerId);
}

async function insertionSort(array, containerId) {
    const controller = new AbortController();
    animationControllers[containerId] = controller;
    const signal = controller.signal;
    
    resetStatistics(containerId);
    const stats = sortingStats[containerId];
    const bars = document.getElementById(containerId).children;
    
    // Iniciar intervalo de actualización en tiempo real
    const updateInterval = setInterval(() => {
        if (!signal.aborted) {
            updateStatisticsRealTime(containerId);
        } else {
            clearInterval(updateInterval);
        }
    }, 50);
    
    for (let i = 1; i < array.length; i++) {
        if (signal.aborted) {
            clearInterval(updateInterval);
            return;
        }
        
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = 'teal';
        
        while (j >= 0 && array[j] > key) {
            if (signal.aborted) {
                clearInterval(updateInterval);
                return;
            }
            
            // Incrementar comparaciones
            stats.comparisons++;
            // Incrementar intercambios
            stats.swaps++;
            
            array[j + 1] = array[j];
            j--;
            drawArray(containerId, array);
            bars[j + 1].style.backgroundColor = 'magenta';
            await new Promise((resolve) => setTimeout(resolve, 50));
        }
        
        array[j + 1] = key;
        drawArray(containerId, array);
        bars[i].style.backgroundColor = '#3498db';
    }
    
    // Registrar tiempo final
    stats.endTime = performance.now();
    clearInterval(updateInterval);
    updateStatisticsRealTime(containerId);
}

async function quickSort(array, containerId, start = 0, end = array.length - 1) {
    const stats = sortingStats[containerId];
    const bars = document.getElementById(containerId).children;
    
    // Iniciar intervalo de actualización en tiempo real si es la llamada inicial
    let updateInterval;
    if (start === 0 && end === array.length - 1) {
        updateInterval = setInterval(() => {
            updateStatisticsRealTime(containerId);
        }, 50);
    }
    
    if (start >= end) {
        if (start === array.length - 1 && updateInterval) {
            clearInterval(updateInterval);
            updateStatisticsRealTime(containerId);
        }
        return;
    }
    
    let pivotIdx = start;
    bars[pivotIdx].style.backgroundColor = 'yellow';
    let left = start + 1;
    let right = end;

    while (left <= right) {
        // Incrementar comparaciones
        stats.comparisons++;
        
        while (left <= end && array[left] <= array[pivotIdx]) {
            left++;
            stats.comparisons++;
        }
        while (right > start && array[right] >= array[pivotIdx]) {
            right--;
            stats.comparisons++;
        }
        
        if (left < right) {
            // Incrementar intercambios
            stats.swaps++;
            
            [array[left], array[right]] = [array[right], array[left]];
            drawArray(containerId, array);
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    }

    // Intercambio del pivote
    stats.swaps++;
    [array[pivotIdx], array[right]] = [array[right], array[pivotIdx]];
    drawArray(containerId, array);

    await quickSort(array, containerId, start, right - 1);
    await quickSort(array, containerId, right + 1, end);
    
    // Si es la llamada inicial, limpiar el intervalo
    if (start === 0 && end === array.length - 1 && updateInterval) {
        clearInterval(updateInterval);
        updateStatisticsRealTime(containerId);
    }
}


// Actualizar el tamaño del array dinámicamente
document.getElementById('array-size').addEventListener('input', (event) => {
    const size = event.target.value;
    document.getElementById('array-size-display').textContent = size;
});

// Inicialización al presionar el botón
document.getElementById('toggle-button').addEventListener('click', () => {
    // Cancelar animaciones existentes
    cancelAnimations();

    const size = parseInt(document.getElementById('array-size').value, 10);

    // Generar arreglos
    const array1 = generateArray(size);
    const array2 = [...array1];
    const array3 = [...array1];
    const array4 = [...array1];

    // Dibujar en contenedores
    drawArray('visualization-bubble', array1);
    drawArray('visualization-selection', array2);
    drawArray('visualization-insertion', array3);
    drawArray('visualization-quick', array4);

    // Iniciar los algoritmos
    bubbleSort(array1, 'visualization-bubble');
    selectionSort(array2, 'visualization-selection');
    insertionSort(array3, 'visualization-insertion');
    quickSort(array4, 'visualization-quick');
});

document.querySelectorAll('.algorithm-container').forEach((container, index) => {
    const tooltips = [
        `Ordenamiento Burbuja:
        - Recorrer el arreglo.
        - Comparar elementos adyacentes.
        - Intercambiar si están en el orden incorrecto.
        - Repetir hasta que el arreglo esté ordenado.`,
        
        `Ordenamiento Selección:
        - Encontrar el elemento más pequeño del arreglo.
        - Intercambiarlo con el primer elemento.
        - Repetir este proceso para el resto del arreglo.`,
        
        `Ordenamiento Inserción:
        - Dividir el arreglo en una parte ordenada y otra no ordenada.
        - Tomar el primer elemento de la parte no ordenada.
        - Insertarlo en el lugar correcto dentro de la parte ordenada.
        - Repetir hasta que todo el arreglo esté ordenado.`,
        
        `Ordenamiento Rápido (QuickSort):
        - Seleccionar un pivote.
        - Dividir el arreglo en elementos menores y mayores al pivote.
        - Ordenar recursivamente ambas partes.
        - Combinar el resultado.`
    ];
    container.querySelector('.tooltip').textContent = tooltips[index];
});