# Reto Front-End - Nucleus

Página de registro basada en el diseño del reto, hecha con Vue 3, TypeScript y CSS. Para levantar el proyecto usé Vite.

## Cómo ejecutarlo

Necesitas Node.js 22.12 o superior y npm.

```bash
npm install
npm run dev
```

Luego abre la dirección que aparece en la terminal, normalmente http://127.0.0.1:5173.
Si PowerShell bloquea el comando `npm`, puedes usar `npm.cmd`.

## Qué hice

- Armé la página con la imagen a la izquierda y el formulario a la derecha.
- Ajusté el diseño para que ocupe toda la pantalla. En celular, la imagen queda arriba del formulario.
- Creé un componente reutilizable para los campos.
- Agregué validaciones para campos vacíos, formato del correo, contraseña de al menos 8 caracteres y confirmación de contraseña.
- Añadí mensajes de error y una confirmación cuando los datos son válidos.

El proyecto solo cubre el frontend. No guarda datos ni crea cuentas reales. Los botones de Google y de inicio de sesión muestran un aviso porque todavía no están conectados a un servicio.

## Aprendizajes y dificultades

Con este ejercicio practiqué la Composition API de Vue, el uso de componentes y la validación de formularios. La parte que requirió más ajustes fue el tamaño y el recorte de la imagen, junto con los espacios del formulario al cambiar de pantalla.

## Qué mejoraría

Agregaría una opción para mostrar la contraseña y conectaría el registro y el acceso con Google a un backend.

## Pruebas

```bash
npm test
npm run test:e2e
npm run build
```

Las pruebas revisan las validaciones y el flujo del formulario en escritorio y móvil. Para ejecutar `test:e2e` necesitas Google Chrome instalado.

## Referencias

- [Diseño de Nucleus UI](https://dribbble.com/shots/25536172-Login-Register-Page-Nucleus-UI).
- [Foto de Brooke Cagle en Unsplash](https://unsplash.com/photos/woman-sitting-around-table-holding-tablet-JBwcenOuRCg).
- [Fuente Inter](https://rsms.me/inter/). Su licencia está en `public/fonts/OFL.txt`.

El enunciado original está en [docs/CHALLENGE.md](docs/CHALLENGE.md).
