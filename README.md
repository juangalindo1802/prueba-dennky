# Nucleus · Registro con Vue 3

Solución del reto técnico de Front-End: reproducción de la pantalla de registro de Nucleus UI con Vue 3, Composition API y TypeScript (`<script setup lang="ts">`).

## Ejecutar el proyecto

Requisitos: Node.js 22.12 o superior (se recomienda una versión LTS actual) y npm.

```bash
npm install
npm run dev
```

Abrir la dirección que imprime Vite, normalmente http://127.0.0.1:5173.
En PowerShell, si la política de ejecución bloquea `npm.ps1`, utilizar `npm.cmd` en lugar de `npm`.
Las pruebas de navegador utilizan Google Chrome instalado en el equipo (canal `chrome` de Playwright).

```bash
npm test          # Pruebas de validación e interacción
npm run test:e2e # Pruebas en Chrome: escritorio, móvil y móvil de 320 px
npm run build    # Comprobación de TypeScript y compilación a dist/
npm run preview  # Servir la compilación localmente
```

## Qué se realizó

- Se creó el proyecto con Vue 3, Vite y TypeScript, sin una biblioteca de componentes para controlar la maquetación.
- Se reprodujeron las dos columnas, la fotografía, el testimonio, los campos con etiquetas flotantes, las formas, los espacios y el color de acento de la referencia. Por preferencia de presentación, la imagen y el formulario ocupan toda la ventana, sin el fondo gris, los márgenes ni el contenedor redondeado de la imagen original. Los textos de la interfaz se conservaron en inglés.
- Se separó el campo reutilizable (`src/components/FormField.vue`) de la lógica de registro (`src/App.vue`) y de las reglas de validación (`src/validation.ts`).
- Se añadieron errores para nombre vacío o con menos de dos caracteres, correo vacío o con formato incorrecto, contraseña vacía o con menos de ocho caracteres útiles, y confirmación vacía o diferente. El nombre admite caracteres internacionales.
- Los errores aparecen al salir de un campo o enviar el formulario, y se actualizan al corregir los datos. Cambiar la contraseña vuelve a comprobar su confirmación.
- Se incorporaron etiquetas asociadas, atributos ARIA para errores, anuncios de estado, foco en el primer campo inválido, navegación por teclado y respeto por la preferencia de movimiento reducido.
- En móviles, la página se convierte en una columna y el testimonio se presenta como cabecera compacta. El diseño cubre como mínimo la altura de la ventana y permite desplazamiento cuando lo requieren los errores, el zoom o las pantallas bajas.
- La fotografía y la tipografía se sirven desde `public/`; no requieren solicitudes a terceros durante el uso de la aplicación.
- Se añadieron pruebas con Vitest y Vue Test Utils para errores, corrección de datos, foco, éxito, reinicio y acciones secundarias. Playwright comprueba el flujo completo y la ausencia de desbordamiento horizontal en Chrome a tres tamaños de pantalla.

El formulario comienza vacío para que se pueda probar como un registro real. La referencia muestra campos ya completados; las etiquetas adoptan esa misma disposición al escribir.

## Alcance de la demostración

El envío correcto muestra una confirmación que explica que los datos pasaron la validación. No existe un servicio de autenticación: no se crea una cuenta, no se envían ni guardan datos y las contraseñas se limpian al completar el formulario. Los botones de Google y de inicio de sesión muestran un aviso sobre este alcance en la propia página.

## Aprendizajes y decisiones

La solución muestra cómo organizar estado reactivo, reglas puras y componentes pequeños en Vue. La validación derivada con `computed` evita mantener mensajes desactualizados cuando se modifica la contraseña. Las etiquetas flotantes permiten conservar el aspecto del diseño sin usar el placeholder como única identificación del campo.

El principal desafío de maquetación fue conservar las proporciones y el recorte de la fotografía sin limitar la altura del contenido. La fotografía se refleja con CSS como en la referencia. En pantallas pequeñas se cambia la composición en vez de reducir todo proporcionalmente. El foco y los mensajes accesibles se verifican con pruebas de interacción.

Como siguientes mejoras se podrían conectar un backend con validación en servidor, incorporar OAuth real, permitir mostrar la contraseña y añadir pruebas visuales automatizadas entre navegadores. La validación de correo comprueba un formato básico; no verifica que el buzón exista.

## Referencias y créditos

- [Diseño de Taufiq Anshori para Nucleus UI en Dribbble](https://dribbble.com/shots/25536172-Login-Register-Page-Nucleus-UI).
- [Fotografía de Brooke Cagle en Unsplash](https://unsplash.com/photos/woman-sitting-around-table-holding-tablet-JBwcenOuRCg), utilizada como recurso local según la [licencia de Unsplash](https://unsplash.com/license).
- [Inter, de Rasmus Andersson](https://rsms.me/inter/), distribuida bajo SIL Open Font License. Licencia incluida en `public/fonts/OFL.txt`.
- El enunciado original se conserva en [docs/CHALLENGE.md](docs/CHALLENGE.md).

## Entrega

Repositorio: https://github.com/juangalindo1802/prueba-dennky.
La solución se prepara para la rama `main`. El enlace del repositorio debe enviarse al equipo evaluador por el canal acordado.
