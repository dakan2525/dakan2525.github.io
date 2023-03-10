export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid")
    input.parentElement.querySelector(".input-message-error").innerHTML = " ";
  }else {
    input.parentElement.classList.add("input-container--invalid")
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    
  }
}

const tipoDeErrrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",

]
  

const mensajeDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío"
  },
  email: {
    valueMissing: "El campo email no puede estar vacío",
    typeMismatch: "El correo no es valido"
  },
  password: { 
    valueMissing: "El campo password no puede estar vacío",
    patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula y un número"
  },
  nacimiento: {
    valueMissing: "El campo fecha de nacimiento no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad" 
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El numero telefonico debe tener 10 numeros",
  },
  direccion: {
    valueMissing: "El campo dirección no puede estar vacío",
    patternMismatch: "El campo tiene como limite 40 caracteres tomando en cuenta los espacios",
  },
  ciudad: {
    valueMissing: "El campo ciudad no puede estar vacío",
    patternMismatch: "El campo tiene como limite 40 caracteres tomando en cuenta los espacios",
  },
  estado: {
    valueMissing: "El campo estado no puede estar vacío",
    patternMismatch: "El campo tiene como limite 40 caracteres tomando en cuenta los espacios",
  }

}

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput,input){
  let mensaje = "";
  tipoDeErrrores.forEach((error) => {
    if(input.validity[error]) {
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajeDeError[tipoDeInput][error]);
      mensaje = mensajeDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
