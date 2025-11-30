# 📝 TaskTracker CLI

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CLI](https://img.shields.io/badge/CLI-000000?style=for-the-badge&logo=windowsterminal&logoColor=white)

**Una aplicación de línea de comandos simple y elegante para gestionar tus tareas diarias** ✨

[Características](#-características) •
[Instalación](#-instalación) •
[Uso](#-uso) •
[Estructura](#-estructura-del-proyecto)

</div>

---

## 🚀 Características

| Función | Descripción |
|---------|-------------|
| ➕ **Agregar tareas** | Crea nuevas tareas con descripción y fecha automática |
| ✏️ **Actualizar tareas** | Modifica la descripción de tareas existentes |
| 🗑️ **Eliminar tareas** | Elimina tareas que ya no necesitas |
| 🔄 **Cambiar estado** | Marca tareas como "En progreso" o "Finalizada" |
| 📋 **Listar tareas** | Visualiza todas tus tareas con información detallada |
| 💾 **Persistencia** | Los datos se guardan automáticamente en formato JSON |

---

## 📦 Instalación

### Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)

### Pasos

```bash
# Clona el repositorio
git clone https://github.com/xNitox/TaskTracker-CLI-.git

# Navega al directorio del proyecto
cd TaskTracker-CLI-

# ¡Listo! No hay dependencias externas
```

---

## 🎮 Uso

Ejecuta la aplicación con:

```bash
node tasktracker.menu.js
```

### Menú Principal

```
╔════════════════════════════════════╗
║         TASK TRACKER CLI           ║
╚════════════════════════════════════╝
1-Agregar una nueva tarea
2-Actualizar y eliminar tareas
3-Marcar una tarea como en progreso o finalizada
4-Listado de todas las tareas
5-Listado de tareas por estado
6-salir
```

### Ejemplo de visualización de tareas

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        📋 INFORMACIÓN DE LA TAREA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ID               : 1
  Descripción      : Completar proyecto
  Estado           : En progreso
  Creada el        : 26/11/2025/15:30
  Última actualiz. : 26/11/2025/18:45
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 📊 Estados de las Tareas

| Estado | Emoji | Descripción |
|--------|-------|-------------|
| **Por hacer** | 📌 | Tarea pendiente sin iniciar |
| **En progreso** | 🔄 | Tarea actualmente en desarrollo |
| **Finalizada** | ✅ | Tarea completada exitosamente |

---

## 📁 Estructura del Proyecto

```
TaskTracker-CLI-/
├── 📄 tasktracker.menu.js   # Punto de entrada y menú principal
├── 📄 tareas.js              # Lógica de gestión de tareas
├── 📄 datos.json             # Almacenamiento de datos
├── 📄 .gitignore             # Archivos ignorados por Git
└── 📄 README.md              # Documentación
```

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **ES Modules** - Sistema de módulos moderno
- **readline/promises** - Interfaz de línea de comandos
- **fs/promises** - Manejo de archivos asíncrono
- **JSON** - Formato de almacenamiento de datos

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si tienes alguna idea o mejora:

1. Haz un Fork del proyecto
2. Crea tu rama de característica (`git checkout -b feature/NuevaCaracteristica`)
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva característica'`)
4. Sube tu rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

---

## 📜 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

<div align="center">

**Hecho con ❤️ y JavaScript**

⭐ ¡Si te gusta este proyecto, dale una estrella! ⭐

</div>
https://roadmap.sh/projects/task-tracker
