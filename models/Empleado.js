class Empleado {
    constructor(nombre, apellido, edad, dni, sueldo) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
      this.sueldo = sueldo;
   
    }
   //Todos
    aumentarSueldo(porcentaje) {
      this.sueldo *= porcentaje // sueldo *1,20 => aumento 20%
    }
  
  }

  export class Junior extends Empleado {
    constructor(nombre,apellido,edad,dni,sueldo) {
        super(nombre,apellido,edad,dni,sueldo); //llamo al construc de la super-clase (clase padre)
        this.proyectosAsignados = []
    }
    asignarProyecto(nuevoProyecto) {
        this.proyectosAsignados.push(nuevoProyecto);
    }

}

export class Semisenior extends Empleado {
    constructor(nombre,apellido,edad,dni,sueldo, antiguedad) {
        super(nombre,apellido,edad,dni,sueldo); //llamo al construc de la super-clase (clase padre)
        this.antiguedad = antiguedad;
        this.proyectosCoordinados = [];
        this.proyectosAsignados = []
    }
    asignarProyecto(nuevoProyecto) {
        this.proyectosAsignados.push(nuevoProyecto);
    }
    coordinarProyecto(nuevoProyecto) {
        this.proyectosCoordinados.push(nuevoProyecto);
    }
    aumentarSueldo(porcentaje, antiguedad) {
        this.sueldo *= porcentaje + (this.antiguedad * 0.05) // sueldo *1,20 => aumento 20%
      }
}

export class Senior extends Empleado {
    constructor(nombre,apellido,edad,dni,sueldo, antiguedad){
        super(nombre,apellido,edad,dni,sueldo); //llamo al construc de la super-clase (clase padre)
        this.antiguedad = antiguedad;
        this.proyectosCoordinados = [];
        this.clientes = []
    }
    coordinarProyecto(nuevoProyecto) {
        this.proyectosCoordinados.push(nuevoProyecto);
    }
    aumentarSueldo(porcentaje, antiguedad) {
        this.sueldo *= porcentaje + (this.antiguedad * 0.1) // sueldo *1,20 => aumento 20%
      }

    agregarCliente(nuevoCliente){
        this.clientes.push = nuevoCliente
    }
}