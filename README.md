# SANIVEX — Control de Plagas y Sanidad Ambiental

Plataforma web de última generación para **SANIVEX** (Colombia), diseñada con estética **Liquid Glass**, visualización interactiva **3D con Three.js**, scroll fluido nativo y arquitectura optimizada para alta conversión corporativa y residencial.

---

## 🚀 Tecnologías Principales

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) con motor Turbopack.
- **Estilos & Diseño**: [Tailwind CSS v4](https://tailwindcss.com/) + CSS Vanilla optimizado.
- **Gráficos 3D**: [Three.js](https://threejs.org/) (Emblema paramétrico interactivo con macrofotografía biológica).
- **Iconografía & Animaciones**: [Lucide React](https://lucide.dev/) y [Framer Motion](https://www.framer.com/motion/).
- **Tipografía Institucional**: [Poppins](https://fonts.google.com/specimen/Poppins) (principal) y [Montserrat](https://fonts.google.com/specimen/Montserrat) (fallback).
- **Base de Datos & Backend**: [Supabase](https://supabase.com/) (PostgreSQL).
- **Notificaciones**: [Sonner](https://sonner.emilkowal.ski/).
- **Despliegue & CI/CD**: [Vercel](https://vercel.com/) integrado con GitHub.

---

## ✨ Características y Módulos de la Plataforma

### 1. Menú Principal Liquid Glass Flotante (`Navbar`)
- **Efecto Cristal Líquido**: Desenfoque calibrado por hardware (`backdrop-blur-2xl backdrop-saturate-150`) con bisel de luz blanca y reflejos cáusticos.
- **Anticolisión Lumínica**: Degradado ahumado balanceado que disuelve los textos e imágenes que pasan por detrás, manteniendo los botones y enlaces 100% legibles.
- **Adaptabilidad de Tema**: Detección dinámica de scroll y soporte automático para secciones con fondo claro u oscuro.
- **Segmentación de Audiencia**: Selector de modo *Residencial* vs *Comercial / Industrial*.
- **Portal de Clientes & Búsqueda**: Consulta rápida de actas sanitarias por NIT y buscador predictivo de vectores y servicios.

### 2. Emblema 3D Interactivo (Desktop)
- Logo volumétrico interactivo extruido con Three.js que responde al cursor del ratón.
- Texturas de macrofotografía integradas (roedores, insectos, aves).
- Desactivación inteligente en móviles para garantizar **0% de consumo de GPU/batería** en teléfonos y tabletas.

### 3. Scroll Continuo Fluido (Experiencia Nativa)
- Desplazamiento orgánico y continuo sin trabas ni bloqueos rígidos por sección (`scroll-snap`), simulando el comportamiento de una aplicación móvil nativa.
- Navegación lateral asistida con indicador de progreso (`ScrollDots`).

### 4. Módulos Interactivos de Servicios Técnicos
- **`MipTimeline` (Manejo Integrado de Plagas)**: Línea de tiempo interactiva con fases de *Diagnóstico*, *Monitoreo Activo* y *Blindaje Sanitario* (BPM / HACCP / INVIMA).
- **`RodentsRiskInspector`**: Matriz de evaluación de riesgo para redes eléctricas, bodegas de alimentos y perímetros industriales.
- **`InsectsMatrix`**: Catálogo técnico de control para cucarachas, moscas, zancudos y hormigas.
- **`BirdsShowcase`**: Sistemas disuasorios ópticos, mecánicos y redes de exclusión sin daño animal.
- **`TermitesRadar`**: Tecnología de detección y barreras químicas para xilófagos y termitas subterráneas.
- **`SanitizationEstimator`**: Calculadora clínica interactiva de nebulización en frío ULV contra virus y bacterias.
- **`AboutSanivex`**: Sección institucional con métricas de cobertura, certificaciones internacionales y perfil corporativo.

### 5. Pie de Página Corporativo (`Footer`)
- Banner de llamada a la acción de alta conversión.
- Directorio de líneas de emergencia 24/7 y cobertura directa en **5 ciudades principales** (Bogotá D.C., Medellín, Cali, Barranquilla y Bucaramanga).
- Cumplimiento normativo (INVIMA, Secretarías de Salud, Habeas Data Ley 1581).

### 6. Optimización Especializada para iPhone e iOS
- **Safe Area Insets**: Soporte nativo para Notch y Dynamic Island (`env(safe-area-inset-top)`) y barra de inicio inferior (`env(safe-area-inset-bottom)`).
- **Prevención de Zoom Automático**: Campos de formulario calibrados a `16px` en móvil para evitar que Safari aplique zoom forzado al tocar un campo.
- **`viewport-fit: cover` & `theme-color`**: Integración con el marco del navegador de iOS.
- **Eliminación de Tap-Highlight**: Toques fluidos y respuesta instantánea sin destellos grises por defecto.

---

## 🛠️ Instalación y Entorno Local

### Requisitos
- [Node.js](https://nodejs.org/) v18+ o superior.
- Gestor de paquetes `npm`.

### Pasos de Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/dohuglasr-tech/Sanivexapp.git
   cd Sanivexapp
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Variables de Entorno**:
   Copia el archivo de ejemplo y configura tus claves de Supabase:
   ```bash
   cp .env.example .env.local
   ```
   Variables necesarias:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
   ```

4. **Ejecutar el Servidor de Desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

5. **Compilar para Producción**:
   ```bash
   npm run build
   ```

---

## 📁 Estructura del Proyecto

```text
Sanivexapp/
├── public/                 # Recursos estáticos (logos, iconografía, imágenes macro)
├── src/
│   ├── app/
│   │   ├── globals.css     # Design tokens, utilidades Liquid Glass y resets iOS
│   │   ├── layout.tsx      # RootLayout con fuentes Poppins/Montserrat y viewport cover
│   │   ├── page.tsx        # Página principal (Hero 3D, secciones, scroll continuo)
│   │   └── lab-3d/         # Laboratorio de visualización Three.js
│   ├── components/
│   │   ├── Navbar.tsx      # Barra de navegación flotante con Liquid Glass y dock móvil
│   │   ├── Footer.tsx      # Pie de página institucional y sedes
│   │   ├── FloatingActions.tsx # Botón WhatsApp flotante y retorno al inicio
│   │   ├── QuoteModal.tsx  # Modal de cotización optimizado para móvil
│   │   ├── ScrollDots.tsx  # Navegación y progreso vertical
│   │   ├── GlassCard.tsx   # Componentes de tarjetas de vidrio
│   │   └── interactive/    # Módulos técnicos interactivos (MIP, Roedores, Aves, etc.)
│   └── lib/
│       └── supabase.ts     # Cliente de conexión a base de datos
├── AGENTS.md               # Reglas de estilo y tipografía institucional
├── package.json
└── README.md
```

---

## 📄 Licencia y Derechos

© 2026 **SANIVEX S.A.S.** — NIT 901.482.195-3. Todos los derechos reservados.
Certificaciones sanitarias y protocolos avalados por normatividad INVIMA y Ministerio de Salud y Protección Social de Colombia.
