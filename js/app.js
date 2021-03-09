////////  CAMPOS DEL FORMULARIO/////////

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');



///////UI//////
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;



////// CLASES //////
class Citas {
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
       this.citas =[...this.citas, cita];
       console.log(this.citas);
    }

    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id)
    }

   editarCita(citaActualizada){
    this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    //citaActualizada es un elemento que se pasa y se compara con los elementos del arreglo citas[]
   }

}



class UI {
    
      imprimirAlerta(mensaje, tipoMensaje){
         //Crar el div para el mensaje 
         const divMensaje = document.createElement('div');
         divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

         //Agregar clase en base al tipo de error
         if(tipoMensaje === 'error'){
          divMensaje.classList.add('alert-danger');
              //Mensaje de error
         divMensaje.textContent = mensaje;

         //Agregar al DOM

         document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
       
         
         //Quitar la alerta
         setTimeout(() => {
            divMensaje.remove();
         }, 3000);

         }else if (tipoMensaje === 'correcto'){
            divMensaje.classList.add('alert-success');
            //Mensaje de error
           divMensaje.textContent = mensaje;

          //Agregar al DOM

         document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
     
       
       //Quitar la alerta
       setTimeout(() => {
          divMensaje.remove();
       }, 3000);

         }else if(tipoMensaje === 'eliminar'){
                divMensaje.classList.add('alert-success');
                 //Mensaje de error
                 divMensaje.textContent = mensaje;

                  //Agregar al DOM

                 document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
     
       
                     //Quitar la alerta
                     setTimeout(() => {
                       divMensaje.remove();
                     }, 3000);
               }else if (tipoMensaje === 'editar'){
                divMensaje.classList.add('alert-success');
                //Mensaje de error
                divMensaje.textContent = mensaje;

                 //Agregar al DOM

                document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
    
      
                    //Quitar la alerta
                    setTimeout(() => {
                      divMensaje.remove();
                    }, 3000);
               }

        }

      imprimirCitas({citas}) { // Se hace destructuring desde el paso del parametro cuando este se llama igual a la propiedad que se quiere extraer
       
           this.limpiarHTML();
        citas.forEach(cita => {

            const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            //Parrafo mascota
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id; // Agragar atributo personalizado al elemento que se esta creado porque no existe en el DOM
            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;


            //Parrafo propietario
            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            
                 <span class="font-weight-bolder">Propietario:</span> ${propietario}
            `;

            //Parrafo telefono
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            
                 <span class="font-weight-bolder">Telefono:</span> ${telefono}
            `;

            //Parrafo fecha
            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            
                <span class="font-weight-bolder">Fecha:</span> ${fecha}
            `;

           //Parrafo hora
           const horaParrafo = document.createElement('p');
           horaParrafo.innerHTML = `
          
              <span class="font-weight-bolder">Hora:</span> ${hora}
          `;

           //Parrafo sintomas
           const sintomasParrafo = document.createElement('p');
           sintomasParrafo.innerHTML = `
          
              <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
          `;

          //Boton para eliminar citas

          const btnEliminar = document.createElement('button');
          btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
          btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

          btnEliminar.onclick = () => eliminarCita(id);  



          //Boton para editar citas

          const btnEditar = document.createElement('button');
          btnEditar.classList.add('btn', 'btn-info');
          btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
          btnEditar.onclick = () => cargarEdicion(cita); // Se pasa la cita completa, o sea el objeto completo

          
          //Agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);


        });
      }

           limpiarHTML() {
               while(contenedorCitas.firstChild){
                 contenedorCitas.removeChild(contenedorCitas.firstChild);
               }
           }
}


/////INSTANCIANDO CLASES DE FORMA GLOBAL/////
 const ui = new UI();
 const administrarCitas = new Citas();


///////EVENT LISTENERS////////

eventListeners();

function eventListeners(){

    mascotaInput.addEventListener('input', datosCita);
    
    propietarioInput.addEventListener('input', datosCita);

    telefonoInput.addEventListener('input', datosCita);

    fechaInput.addEventListener('input', datosCita);

    horaInput.addEventListener('input', datosCita);

    sintomasInput.addEventListener('input', datosCita);


    formulario.addEventListener('submit',nuevaCita);
}


////// OBJETO CON LA INFORMACION DE LA CITA
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

////FUNCIONES///////

//Agrega datos al objeto de cita
function datosCita(e){
  citaObj[e.target.name] = e.target.value; // [e.target.name] accede a las propiedades del input en el HTML
  
}


// Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e){
    e.preventDefault();

    //Extraer la informacion del citaObj
    const { mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //Validar inputs
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios.','error');
        return;
    }
    
    if(editando) {
         // Imprimir alerta de cita a edicion
         ui.imprimirAlerta('Cita editada correctamente!', 'editar');

         //Pasar el objeto de la cita
         administrarCitas.editarCita({...citaObj});



          //Regresar el texto del boton a su forma original
         formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
         //Quitar modo edicion
         editando = false;

    }else {
          //Generar un id unico para cada cita
     citaObj.id = Date.now();
  
     //Crear una nueva cita
     administrarCitas.agregarCita({...citaObj});// SE usa spread operator para pasar objetos diferentes

        // Imprimir alerta de cita creada
       ui.imprimirAlerta('Cita creada correctamente!', 'correcto');
    }

   

    //Reiniciar objeto cita para nueva validacion
    reiniciarCitaObj();

    //Reiniciar formulario
    formulario.reset();
    
 

    //Mostrar citas en el HTML
    ui.imprimirCitas(administrarCitas);

}


//Reiniciar Objeto de cita
function reiniciarCitaObj(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}


//Eliminar cita

function eliminarCita(id){
    //Eliminar la cita
    administrarCitas.eliminarCita(id);

    //Muestre un mensaje de cita eliminada
    ui.imprimirAlerta('La cita se elimino correctamente!','eliminar');


    //Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}


//Cargar los datos y el modo edicion

function cargarEdicion(cita){
    const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    //Llenar los inputs

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;


    //Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;


}









