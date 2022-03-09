const axios = require('axios')
const fs = require ('fs')

class Busquedas {

    record =[]
    dbpath='./DB/database.json'

    constructor(){
        this.leerDB();
    }

    get RecordCapitalizado(){       
        return this.record.map(lugar=>{
            let palabras = lugar.split(" ");
            palabras= palabras.map(p=>p[0].toUpperCase()+p.substring(1));

            return palabras.join(' ')
        })
    }

    get paramsMapbox(){
        return{
                'language':'es',
                'access_token':process.env.MAPBOX_KEY       
                }
        }

    async ciudad(lugar='') {
        try {
            //peticion
            const resp = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json `,
            {params:{
                'language':'es',
                'access_token':process.env.MAPBOX_KEY 
             }})

            return resp.data.features.map(lugar=>({
                id: lugar.id,
                name:lugar.place_name,
                long:lugar.center[0],
                lat:lugar.center[1],
            }))
         
        } catch (error) {
            return []
        }
    }

    async tiempo(lat,long){
        try {
            const resp = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${process.env.WEATHERBIT_KEY}`)
            const {data} = resp.data
            const parms = data[0]
            const {description} =parms.weather
            
            return   {
                temp:parms.temp,
                desc:description,
            }
           
            
        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial (lugar = ''){

        if(this.record.includes(lugar.toLocaleLowerCase())){
            return;
        }
        this.record=this.record.splice(0,5)
        
        this.record.unshift(lugar.toLocaleLowerCase());

        this.guardarDB()

    }
    
    guardarDB(){
          if(fs.existsSync('./db')){}
          else{
              fs.mkdir('DB',(err)=>{
            if(err){
                return err
            }
          });
         }
         const payload ={
             record:this.record
         }
         fs.writeFileSync(this.dbpath,JSON.stringify(payload));
              
    }
    leerDB(){
        if (!fs.existsSync(this.dbpath)){
            return null;
        }
        const info = fs.readFileSync(this.dbpath,{encoding: 'utf8'});
        const data = JSON.parse(info)
         this.record = data.record;
    }
}








module.exports = Busquedas;



