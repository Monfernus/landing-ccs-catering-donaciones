// Contenido de la landing "Comidas con propósito" — basado en el schema oficial.

export const IMPACTO = {
  titulo: 'La ayuda ya está llegando',
  // Valores de fallback: se muestran mientras carga (o si falla) el fetch a
  // `metricas_publicas` en Supabase. Ver useMetricasPublicas() en hooks.js y su uso
  // en <Impacto> (sections.jsx), que sobreescribe `valor` con el dato real por `key`.
  metricas: [
    { key: 'raciones', dbKey: 'raciones_entregadas', valor: 4820, sufijo: '', label: 'raciones entregadas' },
    { key: 'kg', dbKey: 'kg_alimentos_recibidos', valor: 1350, sufijo: ' kg', label: 'de alimentos recibidos' },
    { key: 'donantes', dbKey: 'donantes_count', valor: 214, sufijo: '', label: 'donantes' },
    { key: 'despachos', dbKey: 'despachos_realizados', valor: 96, sufijo: '', label: 'despachos realizados' },
    { key: 'comunidades', dbKey: 'comunidades_atendidas', valor: 18, sufijo: '', label: 'puntos atendidos' },
  ],
}

export const BENEFICIARIOS = [
  {
    id: 'familias',
    titulo: 'Personas y familias afectadas',
    copy: 'Preparamos y canalizamos alimentos para personas que han perdido sus viviendas, se encuentran en refugios o atraviesan dificultades para acceder a comida y agua después de la emergencia.',
  },
  {
    id: 'rescatistas',
    titulo: 'Rescatistas y equipos de respuesta',
    copy: 'También apoyamos a rescatistas, bomberos, voluntarios, personal sanitario y equipos que trabajan durante largas jornadas atendiendo la emergencia.',
  },
]

export const PASOS = [
  {
    n: '01',
    titulo: 'Recibimos',
    copy: 'Recibimos aportes monetarios, alimentos, insumos, empaques y apoyo logístico de personas, empresas y proveedores.',
  },
  {
    n: '02',
    titulo: 'Organizamos',
    copy: 'Cada donación se registra y clasifica para conocer qué recibimos, cuánto está disponible y qué necesita la operación.',
  },
  {
    n: '03',
    titulo: 'Transformamos',
    copy: 'Nuestro equipo y nuestros aliados utilizan los recursos para producir alimentos completos, seguros y adecuados para su traslado y consumo.',
  },
  {
    n: '04',
    titulo: 'Entregamos',
    copy: 'Las comidas y los insumos se despachan a través de aliados y actores que trabajan directamente con las comunidades y los equipos de rescate.',
  },
  {
    n: '05',
    titulo: 'Rendimos cuentas',
    copy: 'Registramos las entradas, los gastos, la producción y cada despacho para que los donantes puedan conocer cómo se utiliza su aporte.',
  },
]

export const FORMAS = [
  {
    id: 'monetario',
    titulo: 'Aporte monetario',
    copy: 'Tu aporte nos permite comprar alimentos, empaques y otros recursos necesarios según las necesidades diarias de la operación.',
  },
  {
    id: 'alimentos',
    titulo: 'Donación de alimentos o insumos',
    copy: 'Recibimos alimentos secos, proteínas, vegetales, agua, envases, empaques y otros insumos previamente coordinados con nuestro equipo.',
  },
  {
    id: 'empresarial',
    titulo: 'Apoyo empresarial',
    copy: 'Las empresas pueden colaborar mediante aportes económicos, productos, transporte, equipos, almacenamiento o alianzas de mayor alcance.',
  },
]

// `a` es un arreglo de párrafos; cada elemento se pinta como un <p> aparte.
export const FAQS = [
  {
    q: '¿Qué tipo de donaciones reciben?',
    a: [
      'Recibimos principalmente aportes monetarios, alimentos, agua, empaques para comida y otros insumos previamente coordinados.',
      'Nuestras necesidades pueden cambiar día a día según la operación, por eso te invitamos a seguirnos en redes sociales (@caracascatering) donde compartimos con mayor detalle los artículos que estamos necesitando en cada momento.',
    ],
  },
  {
    q: '¿Puedo llevar una donación directamente?',
    a: [
      'Sí. Cada día compartimos en nuestras historias de Instagram las necesidades de la operación de acuerdo con los requerimientos nutricionales definidos en nuestros menús.',
      'Recibimos donaciones en nuestra sede de Los Ruices en Caracas de 8:00 a. m. a 5:00 p. m. ¡Escríbenos antes de acercarte para coordinar la entrega y asegurarnos de recibir tu aporte de la mejor manera!',
    ],
  },
  {
    q: '¿Cómo se utilizan las donaciones monetarias?',
    a: [
      'Se destinan a compras y gastos directamente vinculados con la producción y distribución de Comidas con Propósito.',
    ],
  },
  {
    q: '¿Puedo donar desde otro país?',
    a: [
      'Sí. Recibimos aportes en bolívares a través de nuestra cuenta en Bancamiga y donaciones en divisas mediante transferencias bancarias o Zelle a nuestras cuentas en Estados Unidos. Escríbenos para compartirte los datos correspondientes.',
    ],
  },
  {
    q: '¿Cómo puedo saber qué ocurrió con mi aporte?',
    a: [
      'Puedes seguirnos en nuestras redes sociales (@caracascatering) para conocer el alcance diario de la operación. Allí compartimos información actualizada sobre las entregas realizadas, las necesidades vigentes y el impacto de los aportes que nos permiten seguir acompañando a quienes más lo necesitan.',
    ],
  },
  {
    q: '¿Ustedes entregan directamente en las zonas afectadas?',
    a: [
      'En algunos casos realizamos entregas directamente y, en otros, coordinamos con aliados y actores que ya están trabajando en terreno. Esto nos permite llegar de forma más organizada, segura y efectiva a las personas y comunidades que necesitan apoyo.',
    ],
  },
]

export const ALIADOS = ['Caracas Catering', 'LAGA', 'BOCU']

// Fotos del bucket `galeria` (Supabase) que aún no ilustran ninguna sección del
// sitio — se muestran en el carrusel de cierre. Las que ya se usan en Operacion,
// Beneficiarios, Motivacion y Formas (sections.jsx) quedan fuera de esta lista.
export const GALERIA_CARRUSEL = [
  'f6354877-ce44-4a80-9c09-494fc38f17a6.webp',
  'c7780792-705f-41dc-85df-7154905c82ed.webp',
  '7989df82-bb10-418d-bcb0-89888bc047f9.webp',
  '5df4222c-9800-40d6-9254-dc4e5ce3a7eb.webp',
  '1203ca3a-b747-45d7-9969-cbbedc5e3985.webp',
  '47cb5b79-7f26-4f2f-85c9-df0c7325b139.webp',
  '146c68dc-34c0-416e-a475-1e6f53dab140.webp',
  '50c3ebf5-2197-46cb-ad71-ee2952cb1e42.webp',
  '62ddaf80-e31f-45c2-aeb9-fc42b87cf51f.webp',
  '5177f971-6883-42dc-8f15-18a44f56cfa0.webp',
  'afd0dd7a-e8b6-4d52-adf4-8a06bdf0f4e2.webp',
  'a59ea8ab-6922-4690-9761-b09a2a1778f1.webp',
  '40be6719-3af0-4dc9-8164-6c94e54f3bf3.webp',
  '234c6f0d-fc9e-4115-b9ed-fa14a11019c8.webp',
  'ed42e8e6-9a5e-4b5f-b461-4274ddf0dbd4.webp',
  'db16c487-558b-478a-a8e0-e100cb1f687e.webp',
  '0aa59cd0-a12a-4e2b-bd0f-9fa9664e8290.webp',
]
