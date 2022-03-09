const inquirer = require('inquirer');
require('colors')


const preguntas =[{
    type: 'list',
    name: 'option',
    message: 'What would you like to do',
    choices: [{     
                value: 1,
                name:`${"1.".green} Search city`
               },
               {     
                value: 2,
                name:`${"2.".green} Record`
               },
               {     
                value: 0,
                name:`${"0.".green} Leave`
               },
              ]
}]

const pausa =async()=>{
    const wait =[{
        type: 'input',
        name: 'pausa',
        message: `press ${'ENTER'.green} to continue`,
    }
    ]
    console.log('\n')
    await inquirer.prompt(wait)
}

const inquirerMenu = async()=>{

    console.clear()
    console.log('=========================='.green)
    console.log('  select an option')
    console.log('=========================='.green)

    const {option} = await inquirer.prompt(preguntas)
    return option

}

const leerInput = async(message)=>{

    const question =[{  
        type:'input',
        name:'desc',
        message,
        validate(value){
            if(value.length===0){
                return 'please enter a value'
            }
            return true;}  
    }]

    const {desc} = await inquirer.prompt(question)
    return desc
}

const objectList = async(objects=[])=>{
    const choices =objects.map((objects,i)=>{
        const idx =`${i+1}`.green
        return{
            value: objects.id,
            name: `${idx} ${objects.name}`
        }
    })

    choices.unshift({
        value:'0',
        name:'0.'.green+'cancel'
    })

    const preguntas =[
        {
            type:"list",
            name:"id",
            message:"select a place",
            choices
            
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}


module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    objectList,
    
}
