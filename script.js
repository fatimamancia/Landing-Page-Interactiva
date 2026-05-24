// script.js — Sabor Salvadoreño

// ── Año en el footer ──
document.getElementById("anio").textContent = new Date().getFullYear();


// ── Navbar: sombra al hacer scroll ──
window.addEventListener("scroll", function () {
  var nav = document.getElementById("navbar");
  if (window.scrollY > 10) {
    nav.classList.add("con-sombra");
  } else {
    nav.classList.remove("con-sombra");
  }
});


// ── Menú hamburguesa ──
var hamburger = document.getElementById("hamburger");
var navMenu   = document.getElementById("navMenu");

hamburger.addEventListener("click", function () {
  var abierto = navMenu.classList.toggle("visible");
  hamburger.classList.toggle("abierto", abierto);
  hamburger.setAttribute("aria-expanded", abierto);
});

// Cerrar el menú al hacer clic en un enlace
var enlaces = navMenu.querySelectorAll("a");
enlaces.forEach(function (enlace) {
  enlace.addEventListener("click", function () {
    navMenu.classList.remove("visible");
    hamburger.classList.remove("abierto");
    hamburger.setAttribute("aria-expanded", "false");
  });
});


// ── Tarjetas: efecto de entrada con scroll ──
var tarjetas = document.querySelectorAll(".tarjeta");

var observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada, i) {
    if (entrada.isIntersecting) {
      setTimeout(function () {
        entrada.target.style.opacity    = "1";
        entrada.target.style.transform  = "translateY(0)";
      }, i * 80);
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.1 });

tarjetas.forEach(function (tarjeta) {
  tarjeta.style.opacity   = "0";
  tarjeta.style.transform = "translateY(20px)";
  tarjeta.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  observador.observe(tarjeta);
});


// ── Validación del formulario ──
var form = document.getElementById("formulario");

function mostrarError(id, mensaje) {
  var errorEl = document.getElementById(id);
  if (errorEl) errorEl.textContent = mensaje;
}

function limpiarError(id) {
  var errorEl = document.getElementById(id);
  if (errorEl) errorEl.textContent = "";
}

function marcarError(campoId) {
  var campo = document.getElementById(campoId);
  if (campo) campo.closest(".campo").classList.add("campo-error");
}

function quitarError(campoId) {
  var campo = document.getElementById(campoId);
  if (campo) campo.closest(".campo").classList.remove("campo-error");
}

// Limpiar error al escribir
["nombre", "email", "telefono", "tipo", "mensaje"].forEach(function (id) {
  var campo = document.getElementById(id);
  if (!campo) return;

  campo.addEventListener("input", function () {
    quitarError(id);
    limpiarError("error" + id.charAt(0).toUpperCase() + id.slice(1));
  });
});

// Envío del formulario
form.addEventListener("submit", function (e) {
  e.preventDefault();

  var valido = true;

  // Nombre
  var nombre = document.getElementById("nombre").value.trim();
  if (nombre === "") {
    mostrarError("errorNombre", "Por favor escribe tu nombre.");
    marcarError("nombre");
    valido = false;
  } else if (nombre.length < 3) {
    mostrarError("errorNombre", "El nombre debe tener al menos 3 letras.");
    marcarError("nombre");
    valido = false;
  } else {
    limpiarError("errorNombre");
    quitarError("nombre");
  }

  // Email
  var email = document.getElementById("email").value.trim();
  var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (email === "") {
    mostrarError("errorEmail", "El correo es obligatorio.");
    marcarError("email");
    valido = false;
  } else if (!regexEmail.test(email)) {
    mostrarError("errorEmail", "Escribe un correo válido, ej: nombre@correo.com");
    marcarError("email");
    valido = false;
  } else {
    limpiarError("errorEmail");
    quitarError("email");
  }

  // Teléfono (opcional)
  var telefono = document.getElementById("telefono").value.trim();
  if (telefono !== "") {
    var regexTel = /^[+\d\s\-().]{7,20}$/;
    if (!regexTel.test(telefono)) {
      mostrarError("errorTelefono", "Formato no válido. Ej: +503 7000 0000");
      marcarError("telefono");
      valido = false;
    } else {
      limpiarError("errorTelefono");
      quitarError("telefono");
    }
  }

  // Tipo de pedido
  var tipo = document.getElementById("tipo").value;
  if (tipo === "") {
    mostrarError("errorTipo", "Selecciona el tipo de pedido.");
    marcarError("tipo");
    valido = false;
  } else {
    limpiarError("errorTipo");
    quitarError("tipo");
  }

  // Mensaje
  var mensaje = document.getElementById("mensaje").value.trim();
  if (mensaje === "") {
    mostrarError("errorMensaje", "Cuéntanos qué necesitas.");
    marcarError("mensaje");
    valido = false;
  } else if (mensaje.length < 15) {
    mostrarError("errorMensaje", "Por favor escribe un poco más de detalle.");
    marcarError("mensaje");
    valido = false;
  } else {
    limpiarError("errorMensaje");
    quitarError("mensaje");
  }

  // Términos
  var terminos = document.getElementById("terminos");
  if (!terminos.checked) {
    mostrarError("errorTerminos", "Debes aceptar para que podamos contactarte.");
    valido = false;
  } else {
    limpiarError("errorTerminos");
  }

  // Si todo está bien
  if (valido) {
    var btn = document.getElementById("btnEnviar");
    btn.textContent = "Enviando...";
    btn.disabled = true;

    // Simulamos el envío
    setTimeout(function () {
      form.reset();
      btn.textContent = "Enviar mensaje";
      btn.disabled = false;

      var exito = document.getElementById("mensajeExito");
      exito.style.display = "block";

      // Ocultar el mensaje de éxito después de 5 segundos
      setTimeout(function () {
        exito.style.display = "none";
      }, 5000);
    }, 1500);
  }
});
