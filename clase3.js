// ECMA 6

/* class Empleado {
    constructor(nombre, apellido, edad, sueldo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.sueldo = sueldo;

    }

    actualizarSueldo(porcentaje){
        this.sueldo *= porcentaje
    }

    get consultarSueldo() {
        return this.sueldo
    }
    set modificarSueldo(nuevoSueldo){
        this.sueldo = nuevoSueldo
    }
}
 */
/* const empleado1 = new Empleado("Pedro", "Pipo", 20, 24000) */
/* 
empleado1.modificarSueldo = 9000
console.log(empleado1.consultarSueldo)

empleado1.sueldo = 7000
console.log(empleado1.sueldo) */

// ECMA 7
/* 
console.log(Math.pow(5,3))
console.log(5**3) */

const nombres = ["Fran", "Dami", "Mateo", "Maria"]
/* console.log(nombres.includes("Elias"))
 */

// ECMA 8

const libro2 = {
    nombre: "Los wachos",
    editorial: "Ayala",
    autor: "Tuvie",
    year: 2021,
    precio: 300,
    stock: 10
}

/* console.log(Object.keys(libro)) //Devuelve claves del objeto
console.log(Object.values(libro)) //Devuelve valores del objeto
console.log(Object.entries(libro)) //Devuelve claves y valores del objeto /// es iterable

console.log(libro) */

// ECMA 9

const libro = {
    nombre: "Los wachos",
    editorial: "Ayala",
    autor: "Tuvie",
    year: 2021,
    precio: 300,
    stock: 10
}

// Operador Spread

const libro3 = {...libro}

/* console.log(libro3) */


//Operador Rest ...
function sumar(...num) {
  return num.reduce((a,b)=> a+b, 0)
}

/* console.log(sumar(1,2,3)) */

// ECMA 10

const nombre = " Francisco  Juan"
/* console.log(nombre)
console.log(nombre.trim())  */ //Borra espacios vacios al principio y al final

const facturas = [20000, [40000, 22000, 5000], 9000, [70000, 30000]]

/* console.log(facturas.flat().reduce((a,b)=> a+b,0)) */ // Elimina anidaciones de arrays y objetos internos. Le agrego profuncidad pasandole el parametro (2 o 3 o 4)

// ECMA 11

const facturas1 = [20000, [40000, 22000, 5000], 9000, [undefined]]
/* 
console.log(facturas1.flat(3).map(factura => 
    factura = factura ?? 0 // Operador Nullish: si factura es undifined o null devuelve 0
))  */

/* console.log(facturas1) */

//


class Empleado {
    #sueldo // Propiedad privada
    constructor(nombre, apellido, edad, sueldo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.#sueldo = sueldo;

    }

    actualizarSueldo(porcentaje){
        this.#sueldo *= porcentaje
    }

    get consultarSueldo() {
        return this.#sueldo
    }
    set modificarSueldo(nuevoSueldo){
        this.#sueldo = nuevoSueldo
    }
}

const empleado2 = new Empleado("Pedro", "Pipo", 20, 24000)
empleado2.modificarSueldo = 9000
console.log(empleado2.sueldo)
