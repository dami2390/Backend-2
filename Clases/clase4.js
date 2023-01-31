// Funciones JS

//foreach CONSULTA -- map MODIFICA

// CALLBACKS

/* document.getElementById("id").addEventListener("click", ()=>{

})

Array.forEach(()=>{

})

calcularImpuestos(IVA(), PAIS(), RETENCIONES())

array.map(()=>{}) */

/* const consultarBDD = (confirmacion) => {
    return new Promise((resolve, reject) =>{
        if (confirmacion){
            resolve("Base de datos de clientes") //Return implicito
        }
        reject("Acceso denegado")
    })
}

consultarBDD(false)
.then(resultado => console.log(resultado))
.catch(err => console.log(err)) */

// Fetch // es como una promesa ya armada

fetch('https://criptoya.com/api/dolar')
.then(response => response.json())
.then(({mep, blue, solidario}) => {
    
    console.log(mep,blue,solidario)})
.catch(err => {console.log(err)})// Aca esta encapsulada. No podriamos llamar a los valores


const consultarDolar = async () => {
    try{
        const response = await fetch('https://criptoya.com/api/dolar')
    const dolares = await response.json()
    return dolares

    } catch(err){
        return err
    }
    
   

}

/* consultarDolar().then(({mep, solidario, blue}) => {
    console.log(mep, solidario, blue) // aca deja de estar encapsulada. POdemos usar los valores en cualquier parte
})
.catch(err => console.log(err))
 */

const consulta = async () => {
    const {mep} = await consultarDolar()
    console.log(mep)
}

consulta()