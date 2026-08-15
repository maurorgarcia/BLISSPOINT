# Ideas de producto — Menú Digital Pancho Doto

Notas de features exploradas/propuestas. No forman parte del sitio en producción
salvo que se indique lo contrario.

---

## 1. Armador de pancho interactivo + pedido por WhatsApp

**Estado:** implementado en la rama `ideas` (`components/PanchoBuilder.tsx`), no
mergeado a `nextjs-migration`.

Botón flotante "Armá tu pancho" que abre un modal donde el cliente elige pan,
salchicha y hasta 4 toppings, ve el precio total actualizarse en vivo, y al
confirmar se le abre WhatsApp con el pedido ya redactado (pan, salchicha,
toppings y total). No requiere backend ni pago online — todo el estado vive en
el cliente. Reutiliza los datos de `CATS` y `TOPPINGS_ONLY` de `data/menu.ts`
sin tocar la sección "La barra" existente.

---

## 2. Tarjeta de sellos digital (fidelización)

**Estado:** solo propuesta, sin implementar.

**Mecánica:** cada 6 panchos comprados, el 7mo es gratis. El cliente se
identifica con su número de WhatsApp (no hace falta bajar una app ni crear
cuenta). El sello se suma automáticamente al mandar el pedido desde el
armador (punto 1), o lo carga el empleado desde un link de admin simple. A un
sello de completar la tarjeta, se dispara un mensaje de WhatsApp recordando
al cliente que le queda un pancho gratis.

**Por qué esto y no otra cosa (justificación de negocio):**
- En gastronomía el número que más impacta no es el ticket promedio, es la
  **frecuencia de visita**. Conseguir un cliente nuevo cuesta 5-7x más que
  lograr que uno que ya compró vuelva.
- Pancho Doto tiene 2 locales + foodtruck sin presupuesto de marketing
  grande — cada cliente que ya cruzó la puerta vale más que uno nuevo por
  captar.
- Casi ningún local independiente de panchos tiene un programa de
  fidelización (es cosa de cadenas grandes) → ventaja competitiva real
  contra otras panchuquerías del barrio.
- El mensaje de "te falta 1 sello" es lo que efectivamente trae de vuelta al
  cliente esa semana, no la próxima — el teléfono sirve como identificador
  Y como canal de reactivación al mismo tiempo.

**Por qué WhatsApp (teléfono) y no DNI como identificador:**
- El DNI es dato sensible bajo la Ley de Protección de Datos Personales
  (25.326, Argentina) — guardarlo implica responsabilidad legal que no
  aporta nada acá.
- El teléfono hace doble trabajo (identifica + permite recontactar); el DNI
  no sirve para nada más que quedar guardado.
- Pedir el celular se siente normal en un programa de puntos; pedir el DNI
  genera desconfianza y baja la adopción.
- No hay riesgo real de "fraude": el sello se carga desde el mismo WhatsApp
  que manda el pedido, no se puede falsificar sin acceso al teléfono ajeno.

**Trade-off honesto:** a diferencia del armador (100% client-side), esto
necesita persistir el estado del cliente entre visitas y dispositivos →
requiere backend (Supabase, ya está en el stack del proyecto) en vez de solo
`localStorage`. Más laburo que el armador, pero es el tipo de feature que un
dueño de local nota directo en la caja.

**Pendiente de definir antes de construir:**
- Quién carga el sello en el momento de la compra (¿automático desde el
  armador, o un empleado con un link/PIN de admin?)
- Regla exacta del premio (6+1 gratis, o algo distinto)
- Si el mensaje de "te falta 1 sello" se manda solo, o hay que integrarlo con
  alguna herramienta de envío de WhatsApp (no es un simple `wa.me` como el
  armador, porque acá el negocio tiene que iniciar la conversación)
