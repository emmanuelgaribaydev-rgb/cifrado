// 1. VARIABLES Y ARRAYS INICIALES (Aquí está tu abecedario)
const abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const totalLetras = abecedario.length;

const discoExt = document.getElementById('discoExt');
const discoInt = document.getElementById('discoInt');
const inputDesplazamiento = document.getElementById('desplazamiento');

// Capturamos los nuevos elementos HTML para los textos
const inputTextoOriginal = document.getElementById('textoOriginal');
const outputTextoCifrado = document.getElementById('textoCifrado');


// 2. FUNCIÓN PARA DIBUJAR LA RUEDA
function dibujarLetras(contenedor, radioPixeles) {
    abecedario.forEach((letra, i) => {
        const div = document.createElement('div');
        div.className = 'letra';
        div.innerText = letra;
        
        const angulo = (i / totalLetras) * 360;

        div.style.transform = `translate(-50%, -50%) rotate(${angulo}deg) translateY(-${radioPixeles}px)`;
        div.style.left = '50%';
        div.style.top = '50%';

        contenedor.appendChild(div);
    });
}

// Dibujamos ambos discos al cargar la página
dibujarLetras(discoExt, 195);
dibujarLetras(discoInt, 125);


// 3. LÓGICA MATEMÁTICA DEL CIFRADO
function cifrarTexto() {
    // Si los elementos de texto no existen aún en el HTML, no hacemos nada
    if (!inputTextoOriginal || !outputTextoCifrado) return;

    const texto = inputTextoOriginal.value.toUpperCase();
    const clave = parseInt(inputDesplazamiento.value) || 0;
    let resultado = "";

    for (let i = 0; i < texto.length; i++) {
        const char = texto[i];
        const indexOriginal = abecedario.indexOf(char);

        if (indexOriginal !== -1) {
            // Lógica circular usando módulo (%)
            const nuevoIndex = (indexOriginal + clave) % totalLetras;
            resultado += abecedario[nuevoIndex];
        } else {
            // Mantiene espacios y signos de puntuación
            resultado += char;
        }
    }
    
    outputTextoCifrado.value = resultado;
}


// 4. ANIMACIÓN DE LA RUEDA
function rotarDisco() {
    const clave = parseInt(inputDesplazamiento.value) || 0;
    const gradosPorLetra = 360 / totalLetras;
    const rotacionTotal = clave * gradosPorLetra;

    discoInt.style.transform = `rotate(-${rotacionTotal}deg)`;
    
    // Al girar la rueda, también recalculamos el cifrado en tiempo real
    cifrarTexto();
}


// 5. EVENTOS (Escuchamos cuándo el usuario interactúa)
inputDesplazamiento.addEventListener('input', rotarDisco);

if (inputTextoOriginal) {
    inputTextoOriginal.addEventListener('input', cifrarTexto);
}