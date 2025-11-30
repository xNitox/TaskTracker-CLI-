
import {nuevaTarea,actualizarYeliminarTareas, tareaEnProgresoFinalizada,mostrarTareas} from "./tareas.js";
import readline from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';
const rl = readline.createInterface({input,output});
let menu = `
╔════════════════════════════════════╗
║         TASK TRACKER CLI           ║
╚════════════════════════════════════╝
1-Agregar una nueva tarea\n
2-Actualizar y eliminar tareas\n
3-Marcar una tarea como en progreso o finalizada\n
4-Listado de todas las tareas\n
5-Listado de tareas por estado\n
6-salir`;
    
(async () => {
    let continuar = true;
    while (continuar){
        console.log(menu);
        let opcion = await rl.question("Ingrese una opcion:");
        switch (parseInt(opcion)) {
        case 1:
            await nuevaTarea(rl);
            break;
        case 2:
            await actualizarYeliminarTareas(rl);
            break;
        case 3:
            await tareaEnProgresoFinalizada(rl); 
            break;
        case 4:
            await mostrarTareas(rl);
            break;
        case 5:
            console.log("⚠️ Función en desarrollo");
            break;
        case 6:
            console.log("¡Hasta luego!");
            continuar = false;
            break;
        default:
            console.log("Opción invalida");
            break;    
        }
    }
    rl.close();
})();
