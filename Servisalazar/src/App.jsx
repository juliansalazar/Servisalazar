import './App.css'

function App() {
  return (
    <>
      <nav>SERVISALAZAR</nav>
      <h3>Surtidor: </h3>

    </>
  )

  
  
}



// Precios de los productos en la gasolinera
const precios = {
  super: 4.19,
  extra: 2.75,
  diesel: 1.75,
};

// Función para calcular el costo basado en el producto y la cantidad
function calcularCosto(producto, cantidad) {
  if (precios.hasOwnProperty(producto)) {
    return precios[producto] * cantidad;
  } else {
    return 0; // Producto inválido
  }
}

// Función para simular una transacción en la gasolinera
async function simularTransaccionGasolinera() {
  const numeroPlaca = prompt("Ingrese el número de placa del automóvil:");
  const nombre = prompt("Ingrese su nombre:");
  const numeroID = prompt("Ingrese su número de identificación nacional:");

  let eleccionProducto = await promptEleccionProducto(); // Esperar la elección del producto
  let eleccionMetodo = await promptEleccionMetodo(); // Esperar la elección del método (galones o USD)

  if (eleccionProducto === "diesel") {
    // Si el producto es diesel, esperar llamada o llenado del tanque
    if (eleccionMetodo === "usd") {
      alert("Espere un momento mientras se llena el tanque (simulado)...");
      await esperarLlamada();
    } else {
      alert("Espere un momento mientras se llena el tanque (simulado)...");
      await esperarLlenadoTanque();
    }

    const costoTotal = calcularCosto(eleccionProducto, 1);

    let mensaje = `Número de Placa: ${numeroPlaca}\n`;
    mensaje += `Nombre: ${nombre}\n`;
    mensaje += `Número de Identificación Nacional: ${numeroID}\n`;
    mensaje += `Producto: ${eleccionProducto}\n`;
    mensaje += `Llenar el Tanque: Sí\n`;
    mensaje += `Costo Total: $${costoTotal.toFixed(2)}`;

    alert("Detalles de la Transacción:\n\n" + mensaje);
  } else {
    // Calcular el costo según la entrada del usuario (ya sea galones o USD)
    let cantidad = 0;
    let montoUSD = 0;

    if (eleccionMetodo === "galones") {
      const cantidadGalones = prompt(`Ingrese la cantidad (en galones) de ${eleccionProducto}:`);
      cantidad = parseFloat(cantidadGalones);

      if (isNaN(cantidad) || cantidad <= 0) {
        alert("Cantidad inválida. Por favor, ingrese una cantidad válida de galones.");
        return;
      }
    } else if (eleccionMetodo === "usd") {
      const montoUSDInput = prompt(`Ingrese el monto (en USD) de ${eleccionProducto}:`);
      montoUSD = parseFloat(montoUSDInput);

      if (isNaN(montoUSD) || montoUSD <= 0) {
        alert("Monto inválido. Por favor, ingrese un monto válido en USD.");
        return;
      }
    } else {
      alert("Elección inválida. Por favor, ingrese 'Galones' o 'USD'.");
      return;
    }

    const costoTotal = eleccionMetodo === "galones"
      ? calcularCosto(eleccionProducto, cantidad)
      : montoUSD;

    let mensaje = `Número de Placa: ${numeroPlaca}\n`;
    mensaje += `Nombre: ${nombre}\n`;
    mensaje += `Número de Identificación Nacional: ${numeroID}\n`;
    mensaje += `Producto: ${eleccionProducto}\n`;
    
    mensaje += `Método de Llenado: ${eleccionMetodo === "galones" ? "Galones" : "USD"}\n`;
    
    if (eleccionMetodo === "galones") {
      mensaje += `Cantidad (en galones): ${cantidad}\n`;
    } else {
      mensaje += `Monto (en USD): $${montoUSD.toFixed(2)}\n`;
    }
    
    mensaje += `Llenar el Tanque: No\n`;
    mensaje += `Costo Total: $${costoTotal.toFixed(2)}`;

    alert("Detalles de la Transacción:\n\n" + mensaje);
  }
}

// Función para preguntar la elección del producto y devolver una Promesa que se resuelve con la elección
function promptEleccionProducto() {
  return new Promise((resolve) => {
    const eleccionProducto = prompt(
      "Seleccione un producto (Super, Extra o Diesel):"
    ).toLowerCase(); // Convertir a minúsculas
    resolve(eleccionProducto);
  });
}

// Función para preguntar la elección de llenado y devolver una Promesa que se resuelve con la elección
function promptEleccionMetodo() {
  return new Promise((resolve) => {
    const eleccionMetodo = prompt(
      "¿Cómo desea ingresar los datos? (Galones/USD):"
    ).toLowerCase(); // Convertir a minúsculas
    resolve(eleccionMetodo);
  });
}

// Función para simular la espera de una llamada, devuelve una Promesa que se resuelve después de un tiempo de espera
function esperarLlamada() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000); // Resolver después de 2 segundos (simulando una llamada)
  });
}

// Función para simular el llenado del tanque, devuelve una Promesa que se resuelve después de un tiempo de espera
function esperarLlenadoTanque() {
  return new Promise((resolve) => {
    setTimeout(resolve, 120000); // Resolver después de 2 minutos (simulando el llenado del tanque)
  });
}

// Ejecutar la simulación de la gasolinera
simularTransaccionGasolinera();




export default App
