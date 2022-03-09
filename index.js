require('dotenv').config()

const { leerInput, inquirerMenu, pausa, objectList } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");




const main = async()=>{
    let opt=''

    const busquedas = new Busquedas();

    do {
         opt = await inquirerMenu()
        switch (opt) {
            case 1:
                //mostrar mensaje
                const termino = await leerInput('city:')
                //seleccionar lugares
                const lugares = await busquedas.ciudad(termino)

                const id = await objectList(lugares);

                const lugarsel = lugares.find(l => l.id===id)
                if(id==='0')continue;
                //guardar
                busquedas.agregarHistorial(lugarsel.name)

                const time = await busquedas.tiempo(lugarsel.lat,lugarsel.long)
                
                //monstrar lugar
                console.clear()
                console.log("\ncity ​​information\n".green)
                console.log(`city: ${lugarsel.name.green}`)
                console.log(`lat:${lugarsel.lat.toString().green}`)
                console.log(`lng:${lugarsel.long.toString().green}`)
                console.log("temperature:",time.temp)
                console.log(`weather condition:${time.desc.green}`)
                break; 
            case 2:
                busquedas.RecordCapitalizado.forEach((lugar,i)=>{
                    const idx =`${i+1}`.green;
                    console.log(`${idx},${lugar}`)

                })
               
                break;
            case 0:
                break;
        }
        if (opt !==0 )await pausa();

    } while (opt !==0);
}


 main()
