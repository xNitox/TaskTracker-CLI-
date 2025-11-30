
import * as fs  from 'node:fs/promises';
const ruta = './datos.json';

class Datos {
    static contador = 0;
    constructor(descripcion,status,fecha_creacion,fecha_actualizacion){
    Datos.contador++;
    this.id = Datos.contador;
    this.descripcion = descripcion;
    this.status = status;
    this.fecha_creacion = fecha_creacion;
    this.fecha_actualizacion = fecha_actualizacion;
    }
}


const nuevaTarea = async(rl) => {
    const fecha = new Date();
    const descripcion = await rl.question("Describa la tarea a realizar:");
    const status = "Por hacer";
    const fecha_creacion = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}/${fecha.getHours()}:${fecha.getMinutes()}`;
    const fecha_actualizacion = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}/${fecha.getHours()}:${fecha.getMinutes()}`;
    let tareas = [];
    try {
        const contenido = await fs.readFile(ruta,'utf-8');
        tareas = JSON.parse(contenido);
        if(tareas.length > 0){
            const maxId = Math.max(...tareas.map(t => t.id));
            Datos.contador = maxId;
        }
    }
    catch{
        console.log("Creando el Archivo");
        Datos.contador = 0;
    }
    const crearNuevaTarea = new Datos(descripcion,status,fecha_creacion,fecha_actualizacion); 
    tareas.push(crearNuevaTarea)
    await fs.writeFile(ruta,JSON.stringify(tareas,null,2),'utf-8');
    console.log("Tarea agregada exitosamente");
        
};

const actualizarYeliminarTareas = async (rl) =>{
    const fecha = new Date();
    try{
    const leer = await fs.readFile(ruta,'utf-8');
    const tareas = JSON.parse(leer);
    const tareasSimplificada = tareas.map(tarea =>{
        return{
            id: tarea.id,
            descripcion: tarea.descripcion
        };
    });
    console.log("===== LISTA DE TAREAS ====");
    tareasSimplificada.forEach(tarea =>{
        console.log(`[${tarea.id}] ${tarea.descripcion}`)
    });
    const ingresarID = parseInt(await rl.question("Ingrese el ID de la tarea que desea modificar:"));
    if (isNaN(ingresarID)){
        console.log("Debes ingresar un número");
        return;
    }
    const buscarId = tareas.find(tarea => tarea.id === ingresarID);
    if(!buscarId){
        console.log(`No se encontro el id ${ingresarID}`)
        return;
    }
    const pregunta = parseInt(await rl.question(`¿Que deseas hacer?
    1-Actualizar
    2-Eliminar
    3-Volver
    Seleccione una opción:`));
    switch(pregunta){
        case 1:
            const cambiarDescripcion = await rl.question("Ingrese la nueva actualización:");
            buscarId.descripcion = cambiarDescripcion;
            buscarId.fecha_actualizacion = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}/${fecha.getHours()}:${fecha.getMinutes()}`;
            await fs.writeFile(ruta, JSON.stringify(tareas,null,2),'utf-8');
            break;
        case 2:
            const nuevoContenido = tareas.filter(t => t.id !== ingresarID);
            await fs.writeFile(ruta, JSON.stringify(nuevoContenido,null, 2),'utf-8');
            break;
        case 3:
            return;
        default:
            console.log("Opción invaldia");
            break;
    }   
    }
    catch(error){
        console.log("Error:",error.message)
    }

};

const tareaEnProgresoFinalizada = async(rl) => {
    try{
        const leerArchivo = await fs.readFile(ruta,'utf-8');
        const convertir = JSON.parse(leerArchivo);
        const mostrarTareas = convertir.map(tareas => {
            return{ 
            id : tareas.id,
            descripcion : tareas.descripcion,
            status: tareas.status
        };
        });
        console.log("===== LISTA DE TAREAS ====")
        mostrarTareas.forEach(verTarea =>{
            console.log(`[${verTarea.id}] ${verTarea.descripcion} ***${verTarea.status}***`)
        });
        const pregunta = parseInt(await rl.question("Ingrese el id de la tarea:"));
        const filtrarTarea = convertir.find(elemento => pregunta === elemento.id);
        if (isNaN(pregunta)){
            console.log("Ingrese un valor numérico por favor")
            return;
        }else if(filtrarTarea === undefined){
            console.log("No se encontro la tarea");
            return;
        };
        console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("        📋 INFORMACIÓN DE LA TAREA");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log(`  ID               : ${filtrarTarea.id}`);
        console.log(`  Descripción      : ${filtrarTarea.descripcion}`);
        console.log(`  Estado           : ${filtrarTarea.status}`);
        console.log(`  Creada el        : ${filtrarTarea.fecha_creacion}`);
        console.log(`  Última actualiz. : ${filtrarTarea.fecha_actualizacion}`);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        console.log(`
            1- En progreso
            2- Finalizada
            3- Volver`);
        const opcion = parseInt(await rl.question("¿A que status desea cambiar la tarea?"));
        const estados = {
            1: "En progreso",
            2: "Finalizada"
        };
        
        switch(opcion){
            case 1:
            case 2:
            const fecha = new Date();
            filtrarTarea.status = estados[opcion ];
            filtrarTarea.fecha_actualizacion = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}/${fecha.getHours()}:${fecha.getMinutes()}`;
            fs.writeFile(ruta, JSON.stringify(convertir,null,2),'utf-8');
            console.log(`Estado actualizado a ${estados[opcion]}`);
            case 3:
                console.log("Saliendo...");
                break;
            default:
                console.log("Ingrese una opción valida");
                return;
        }
    }
    catch(error){
        console.log("Error",error.message);
        
    }
}

/*
return{
            id : elemento.id,
            descripcion: elemento.descripcion,
            fecha_creacion: elemento.fecha_creacion,
            fecha_actualizacion: elemento.fecha_actualizacion
1- Obtener el listado de tareas
2- Seleccionar las tareas por id
3- Seleccionar el nuevo estado
4- guardar
*/
const mostrarTareas = async(rl) => {
    try{
        const convertir = await fs.readFile(ruta, 'utf-8');
        const leer = JSON.parse(convertir);
        if(leer.length === 0){
            console.log("No hay tareas guardadas :(")
            return;
        }
        leer.forEach(t=>{
            console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("        📋 INFORMACIÓN DE LA TAREA");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log(`  ID               : ${t.id}`);
            console.log(`  Descripción      : ${t.descripcion}`);
            console.log(`  Estado           : ${t.status}`);
            console.log(`  Creada el        : ${t.fecha_creacion}`);
            console.log(`  Última actualiz. : ${t.fecha_actualizacion}`);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
            });   
    }
    catch(error){
        console.log("Error:",error.message)
    }
}
/*
1- Buscar las tareas
2- Mostrar las tareas
*/
export {nuevaTarea,actualizarYeliminarTareas,tareaEnProgresoFinalizada,mostrarTareas};
