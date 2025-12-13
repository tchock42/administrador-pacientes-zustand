# 🥗 Administrador de Pacientes Veterinaria

Aplicación en **React + Vite + TypeScript** almacena pacientes de una veterinaria
El proyecto usa Zustand para el manejo del estado global.

---

## 🚀 Tecnologías utilizadas
- [React](https://react.dev/) → Librería principal para la UI
- [Vite](https://vitejs.dev/) → Bundler rápido para desarrollo y build
- [TypeScript](https://www.typescriptlang.org/) → Tipado estático y robustez en el código
- **Zustand** → Manejo de estado global

---

## 📂 Estructura del proyecto
 - src/ components/       # Componentes reutilizables (formularios, listas, etc.) 
 - App.tsx           # Componente principal main.tsx          # Punto de entrada
 - store.ts          # Store de la aplicacion

---

## ⚙️ Instalación y uso
1. Clonar el repositorio:
  ```bash
  git clone https://github.com/tchock42/administrador-pacientes-zustand
  cd administrador-pacientes-zustand

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```
4. Generar el build de producción:
```bash
npm run build
```
5. Previsualizar build
```bash
npm run preview
```

## 🧪 Scripts disponibles
- npm run dev → entorno local con hot reload
- npm run build → build optimizado para producción
- npm run preview → servidor de preview del build
- npm run lint → verificación de estilo con ESLint

## 🎯 Funcionalidades principales
- Formulario para ingreso de datos
    - Nombre
    - Propietario
    - Correo
    - Fecha
    - Síntomas
- Usa local storage para guardar temporalmente los datos

## 📦 CI/CD
Este proyecto se ha desplegado en google cloud mediante un contenedor de docker en cloud run
  ```bash
  gcloud run deploy administrador-paciente --source . --platform managed --region us-central1 --allow-unauthenticated
  ```

## 📸 Demo
([Página en Google Cloud](https://administrador-paciente-512996493296.us-central1.run.app/))