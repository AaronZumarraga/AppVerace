# Bienvenido a tu app Expo ✨

Este es un proyecto creado con [Expo](https://expo.dev) utilizando [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## ✨ Tecnologías utilizadas

- **Framework:** React Native con Expo
- **Node.js:** Versión 22.14.0
- **Java:** Versión 17.0.12
- **IDE:** Visual Studio Code
- **Emulador:** Android Studio

## ✨ Instalación y configuración

1. **Crear el proyecto**
   ```bash
   npx create-expo-app@latest nombre-del-proyecto
   ```
2. **Ir al directorio del proyecto**
   ```bash
   cd nombre-del-proyecto
   ```
3. **Instalar dependencias**
   ```bash
   npm install
   ```
4. **Iniciar el servidor**
   ```bash
   npm start  # O bien
   npx expo start
   ```

En la salida de la consola, tendrás opciones para abrir la app en:
- Un [build de desarrollo](https://docs.expo.dev/develop/development-builds/introduction/)
- Un [emulador de Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- Un [simulador de iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), un entorno limitado para pruebas

## ✨ Estructura del proyecto

```
/
├── app/               # Contiene la navegación basada en archivos
│   ├── (tabs)/
│   │   ├── index.tsx      # Pantalla principal
│   │   ├── explore.tsx    # Pantalla de exploración
│   │   ├── _layout.tsx    # Configuración del navegador de pestañas
├── assets/            # Iconos, splash screen, favicon
├── components/        # Componentes reutilizables
├── constants/         # Variables globales como colores
├── hooks/             # Hooks personalizados para React Native
├── scripts/           # Scripts auxiliares como `reset-project.js`
├── app.json           # Configuración del proyecto Expo
├── package.json       # Dependencias, scripts y metadatos del proyecto
├── tsconfig.json      # Configuración de TypeScript
```

## ✨ Restablecer el proyecto

Si deseas iniciar con un proyecto limpio, ejecuta:
```bash
npm run reset-project
```
Este comando moverá el código inicial a **app-example** y creará un directorio **app/** nuevo para empezar desde cero.

## ✨ Recursos

Para aprender más sobre el desarrollo con Expo y React Native, consulta:
- [Configuración del entorno](https://reactnative.dev/docs/environment-setup)
- [Guía de desarrollo en Expo](https://docs.expo.dev/get-started/start-developing/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Android Studio](https://developer.android.com/studio?hl=es-419)
- [Lista de iconos para Expo](https://icons.expo.fyi/Index)

## ✨ Únete a la comunidad

- [Expo en GitHub](https://github.com/expo/expo) - Plataforma de código abierto.
- [Comunidad en Discord](https://chat.expo.dev) - Pregunta y comparte conocimientos sobre Expo.

---

Con esta guía, estarás listo para desarrollar tu app con React Native y Expo. ¡Feliz codificación! 🚀

