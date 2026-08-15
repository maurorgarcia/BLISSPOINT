# Pancho Doto — Design System

Panchería / hot dog gourmet fundada en 1999, con 2 locales en San Nicolás de los Arroyos (Italia 17, Mitre 337) y presencia en Villa Constitución, más un foodtruck para eventos. Instagram: [@panchodotosan_nicolas](https://instagram.com/panchodotosan_nicolas).

**Fuentes de este sistema** (todo en `uploads/`, no accesible externamente salvo que se re-adjunte):
- `PROJECT.md` (pegado en el brief de esta sesión) — brief completo de negocio, audiencia, objetivo, estructura de secciones, ubicaciones, placeholders pendientes.
- `DESIGN.md` — especificación visual ya resuelta (tokens de color/tipografía/espaciado/motion, specs de componentes clave) de un proyecto Next.js hermano que ya construyó esta misma landing. Este design system adopta esos tokens como fuente de verdad.
- `Manual_de_Marca_Pancho_Doto.pdf` — análisis reconstruido del manual de marca a partir del Instagram del cliente (no es manual oficial del diseñador original).
- Assets reales del cliente: logo, mascota, fondos ilustrados, mockups de producto/bebidas/toppings, y 3 fuentes OTF descargadas por el cliente (`Gokart Bubble`, `Magic Clover`, `Newscrash`).

**Proyecto actual (agosto 2026):** el negocio va a tener un **menú digital de marca** (no una landing de ventas clásica) — un lugar accesible por QR en el local o por el link de Instagram donde el cliente ve el menú completo, la barra de salsas/toppings, las bebidas, y refuerza su percepción de marca. Objetivo primario: que el visitante recorra y entienda el catálogo, no una conversión de compra clásica.

## Índice

- `tokens/` — colores, tipografía, espaciado/radios/z-index, motion/sombras (todo importado desde `styles.css`)
- `assets/` — logo, mascota (2 poses), fondos ilustrados, fotos de producto/toppings/bebidas, fuentes OTF
- `components/core/` — Button, Badge, PriceTag, MascotGuide
- `components/commerce/` — ProductCard, ToppingTile, ToppingGroupLabel
- `components/navigation/` — TabNav
- `components/feedback/` — Modal, ModalInput
- `ui_kits/menu-digital/` — recreación click-through de la landing (Hero, Sabores, Menú, Bebidas, Historia, Ubicaciones, modal de newsletter)
- `guidelines/` — specimen cards de colores, tipografía, espaciado y marca

## Components

- **Button** — pill, variantes `primary`/`secondary`/`solidDark`/`solidPanel`/`ghost`
- **Badge** / **PriceTag** — pills de estado y display de precio
- **MascotGuide** — la mascota como host recurrente (poses `eating`/`pointing`, tamaños `hero`/`accent`)
- **ProductCard** — card de menú (foto + título + precio)
- **ToppingTile** / **ToppingGroupLabel** — compositor de la sección Sabores
- **TabNav** — nav sticky por categoría, sin hamburguesa
- **Modal** / **ModalInput** — base de PedidosYaModal y NewsletterModal

### Intentional additions
No hay codebase ni Figma adjuntos con un inventario de componentes fijo — este es un set desde cero, dimensionado a las necesidades reales del brief (menú digital + 2 modales), no un set de UI kit genérico.

## CONTENT FUNDAMENTALS

- **Voz:** voseo argentino, informal, picante/con humor liviano, directo, de barrio. Ejemplos reales de tono: "¿Sos fan de ponerle salsas a tu súper pancho?", "Parada obligada post boliche: combo perfecto", "¡Cortá semana en la panche!".
- **No va con el tono:** copy corporativo ("Estimados clientes..."), vocabulario formal ("Adquiera nuestros productos premium"), textos sin gancho.
- En el menú digital, el copy es mayormente **funcional** (nombres, ingredientes, precios) — el tono de marca vive en headlines cortos, microcopy de botones y el bloque de historia, no en cada línea de producto.
- Sin emoji en el copy de marca (no aparece en el material fuente).
- Sin em-dashes en el copy visible (regla explícita del proyecto hermano en `DESIGN.md`).
- Placeholders de datos reales (precios, direcciones de Villa Constitución, WhatsApp de pedidos) se marcan explícitamente como "a confirmar" — nunca se inventan como reales. Ver `PROJECT.md §10-11`.

## VISUAL FOUNDATIONS

- **Tema:** un solo tema oscuro fijo (`--color-bg-base: #1F0A0C`, casi-negro cálido, nunca negro puro). No hay modo claro — es una decisión de marca ("Theme Lock"), no una limitación técnica.
- **Color:** amarillo (`#F5C242`) es el único accent de acción — CTAs y precios, en todas las secciones. Bordó (`#8B1A26`) se limita a navegación/acentos secundarios, nunca compite con el amarillo como color de botón. El tono papel (`#F7F3EA`) aparece SOLO como panel interno (tarjeta de horario, tarjeta de dirección) — nunca como fondo de sección completa.
- **Excepción documentada:** el Hero usa un degradé bordó→amarillo (únicos primitivos de marca, sin color nuevo) — el resto de las secciones mantiene el fondo oscuro sólido.
- **Tipografía:** 3 fuentes reales del cliente + 1 de soporte. `Newscrash` (condensada/impacto) para headlines y precios — nunca en párrafos largos. `Magic Clover` (script) exclusivamente para el wordmark "Pancho Doto" del hero. `Gokart Bubble` (bubble/playful) para microcopy de enganche y CTAs cortas. `Baloo 2` (Google Fonts) para cuerpo de texto y UI donde las display no son legibles en párrafo.
- **Fondos/imágenes:** el fondo grafiti ilustrado (`fondo1/2/3.png`) es un asset real de marca, de uso puntual — hero y bloques de producto, nunca repetido en cada sección (sería ruido visual y rompería la legibilidad del menú). Fotos de producto son PNG/WebP recortados sobre fondo transparente, montados sobre el fondo sólido de cada sección con `object-fit: contain`, ratio 4:3.
- **Mascota:** el hot dog antropomorfizado (gorra, anteojos, zapatillas) es el elemento firma — host recurrente en hero, transiciones de sección y reacciones de hover en precio. No es decoración puntual.
- **Motion:** intensidad media (`MOTION_INTENSITY 6`). Scroll-reveal de la mascota y secciones (`whileInView`, spring — nunca listeners de scroll crudos). Hover/tap en precio dispara una micro-reacción de la mascota. Tab activo del nav usa underline animado vía IntersectionObserver. Sin scroll-hijack ni pinning. `prefers-reduced-motion` obligatorio en toda animación de mascota.
- **Hover/press:** hover de card = `scale(1.02)`; tap/active = `scale(0.98)` (feedback táctil). Botones cambian a su tint de hover (`yellow-400`/`bordeaux-600`); nunca solo opacidad.
- **Bordes/sombras:** sombras siempre tintadas al fondo (`rgba(15,5,6,x)`), nunca negro puro. Bordes sutiles `1px solid var(--color-border-subtle)` en cards y superficies.
- **Radios (lock, sin mezclar):** cards de producto `16px`, botones/tabs `pill` (radio completo), inputs de modal `8px`.
- **Layout:** mobile-first estricto (uso principal: QR en el local + link de Instagram). Nav sticky de 72px de alto fijo, colapsa a scroll horizontal con snap en mobile — nunca hamburguesa (contradice la necesidad de navegar rápido). Grid de producto: 2 columnas mobile, 3–4 desktop.
- **Transparencia/blur:** el nav sticky usa `background` al ~92% de opacidad + `backdrop-filter: blur(12px)` solo cuando está enganchado (stuck), no en reposo.
- **Vibe fotográfico:** cálido, saturado, apetitoso (amarillos/rojos de fritura y salsas), sin grano ni B&N.

## ICONOGRAPHY

No hay sistema de iconos definido en el material fuente (no se encontró librería de iconos ni sprite en el manual de marca ni en el Instagram). El proyecto hermano (`DESIGN.md`) documenta el uso de Phosphor Icons en su implementación Next.js — se recomienda esa misma librería (vía CDN) si se necesitan iconos funcionales (WhatsApp, ubicación, reloj) en piezas construidas con este sistema. No usar emoji (no aparece en el tono de marca) ni SVGs hand-rolled.

## Assets

- `assets/brand/logo.png` — isotipo circular oficial, Versión A (fondo amarillo, anillo/texto bordó). No existe versión monocromática, horizontal ni "solo símbolo" — usar siempre completo, sin deformar.
- `assets/mascot/` — mascota en 2 poses (`mascot-eating.png`, `mascot-pointing.png`), fondo transparente.
- `assets/backgrounds/` — `hero-banner.png` (banner ya armado, usable directo como hero), `graffiti-2.png`, `graffiti-3.png`.
- `assets/products/`, `assets/toppings/`, `assets/beverages/` — mockups genéricos reutilizables (no son fotos reales de los productos exactos del cliente — confirmado que se pueden repetir mientras no haya foto real definitiva).
- `assets/fonts/` — `GokartBubble.otf`, `MagicClover.otf`, `Newscrash.otf` (archivos reales provistos por el cliente, no sustitutos de Google Fonts).

## Caveats / pendientes

- No hay fotos reales del local/foodtruck ni de los productos exactos — todo el contenido visual usa mockups genéricos, tal como está confirmado en el brief.
- Precios, direcciones de Villa Constitución, WhatsApp de pedidos y lista completa de toppings/bebidas son placeholders — ver `PROJECT.md §10-11` para el detalle y las preguntas pendientes con el cliente.
- No hay codebase ni Figma vivo conectado a este proyecto — el sistema se construyó a partir de los archivos subidos.
