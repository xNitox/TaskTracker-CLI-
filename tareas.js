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
        console.log(`No se encontr el id ${ingresarID}`)
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

}

const tareaEnProgresoFinalizada = async(rl) => {
    console.log("hola");
}
/*
1- Mostrar tareas (titulos)
2- Seleccionar id
3- Preguntar si actualizar o eliminar
4- Opcion 1 agregar contenido con 1 salto de linea
5- Opcion 2 eliminar tarea
*/

export {nuevaTarea,actualizarYeliminarTareas,tareaEnProgresoFinalizada};
