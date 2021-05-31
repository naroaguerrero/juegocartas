let listaimagenes = [];
let cartas = [];
let intentos = 0;
let jugada1 = "";
let jugada2 = "";
let identificadorJ1 = "";
let identificadorJ2 = "";

llamada();

/* let cartas = [
  { nombre: "1", seleccion: false, listaImagenes: listaImagenes[1]},
  { nombre: "2", seleccion: false, imagen: listaImagenes[1] },
  { nombre: "3", seleccion: false, imagen: listaImagenes[2] },
  { nombre: "4", seleccion: false, imagen: listaImagenes[3] },
  { nombre: "5", seleccion: false, imagen: listaImagenes[4] },
  { nombre: "6", seleccion: false, imagen: listaImagenes[5] },
  { nombre: "7", seleccion: false, imagen: listaImagenes[6] },
  { nombre: "8", seleccion: false, imagen: listaImagenes[7] },
  { nombre: "1", seleccion: false, imagen: listaImagenes[0] },
  { nombre: "2", seleccion: false, imagen: listaImagenes[1] },
  { nombre: "3", seleccion: false, imagen: listaImagenes[2] },
  { nombre: "4", seleccion: false, imagen: listaImagenes[3] },
  { nombre: "5", seleccion: false, imagen: listaImagenes[4] },
  { nombre: "6", seleccion: false, imagen: listaImagenes[5] },
  { nombre: "7", seleccion: false, imagen: listaImagenes[6] },
  { nombre: "8", seleccion: false, imagen: listaImagenes[7] },
]; */

//------------------INICIAR JUEGO------------------
function iniciarJuego() {
  let dato = document.getElementById("juego");
  dato.style.opacity = 1;

  cartas.sort(function () {
    return Math.random() - 0.5;
  });
  console.log(cartas);
  for (let i = 0; i < 16; i++) {
    let carta = cartas[i].nombre;
    let dato = document.getElementById(i.toString());
    dato.dataset.valor = carta;
  }
}

//------------------RESETEAR JUEGO------------------
function resetearJuego() {
  cartas.sort(function () {
    return Math.random() - 0.5;
  });
  for (let i = 0; i < 16; i++) {
    let carta = cartas[i].nombre;
    let dato = document.getElementById(i.toString());
    dato.dataset.valor = carta;
    colorCambio(i, "black", "?");
  }
}

//--------------------------------no estaba-------------------------
/* 
function colorCambio (posicion, color, contenido) {
    document.getElementById(posicion.toString()).style.backgroundColor = color;
    document.getElementById(posicion.toString()).innerHTML = contenido;
  }   */

//------------------GIRAR CARTA------------------
function girarCarta() {
  var evento = window.event;

  jugada2 = evento.target.dataset.valor;
  identificadorJ2 = evento.target.id;

  if (jugada1 !== "") {
    if (
      jugada1 === jugada2 &&
      identificadorJ1 !== identificadorJ2 &&
      cartas[parseInt(identificadorJ2)].seleccion != true &&
      cartas[parseInt(identificadorJ1)].seleccion != true
    ) {
      cartas[parseInt(identificadorJ1)].seleccion = true;
      cartas[parseInt(identificadorJ2)].seleccion = true;

      colorCambio(identificadorJ2, "blue", jugada2);
      vaciar();
      comprobar();
    } else if (identificadorJ1 !== identificadorJ2) {
      var self = this;
      setTimeout(function () {
        /* colorCambio(self.identificadorJ1, "black", "?");
        colorCambio(self.identificadorJ2, "black", "?"); */
        vaciar();
      }, 200);

      colorCambio(identificadorJ2, "blue", jugada2);
    }
  } else if (jugada2 !== "valor") {
    //colorCambio(identificadorJ2, "blue", jugada2);
    jugada1 = jugada2;
    identificadorJ1 = identificadorJ2;
  }
}

//------------------FUNCIÓN VACIAR------------------
function vaciar() {
  jugada1 = "";
  jugada2 = "";

  identificadorJ1 = "";
  identificadorJ2 = "";
}

//------------------COMPROBAR CARTA ACERTADA------------------
function comprobar() {
  let aciertos = 0;
  for (var i = 0; i < 16; i++) {
    if (cartas[i].seleccion == true) {
      aciertos++;
    }
  }

  if (aciertos == 16) {
    document.getElementById("juego").innerHTML = "GANASTE";
  }
}

//------------------RESETEAR JUEGO------------------
function resetearJuego() {
  cartas.sort(function () {
    return Math.random() - 0.5;
  });
  for (var i = 0; i < 16; i++) {
    let carta = cartas[i].nombre;
    let dato = document.getElementById(i.toString());
    dato.dataset.valor = carta;
    colorCambio(i, "black", "?");
  }
}

//------------------FETCH API IMG------------------
function llamada() {
  fetch(
    "https://www.googleapis.com/customsearch/v1?key=AIzaSyAnVGPWEkMEO0Rp_X-c5PQH7f4eku8Srvs&cx=ecbe0d6b15acce120&q=Motocicletas&searchType=IMAGE&imgSize=medium"
  )
    .then(function respuesta(respuesta) {
      return respuesta.json();
    })
    .then(function datos(datos) {
      console.log(datos);
      for (let i = 0; i < datos.items.length; i++) {
        listaimagenes.push(datos.items[i].link);
      }
      console.log(listaimagenes);

      for (let i = 0; i < 9; i++) {
        cartas.push({
          nombre: `${i}`,
          seleccion: false,
          imagen: listaimagenes[i],
        });
      }
    });
}
