'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('general_settings', {
      title_header_services: "Nuestros Servicios Exclusivos",
      description_header_services: 'Descubre nuestra variedad de espectáculos, paquetes personalizados y experiencias únicas diseñadas para cada ocasión.',
      catalog_gallery_services: JSON.stringify([
        { id: 1, title: 'Shows Privados', description: 'Disfruta de un espectáculo exclusivo con nuestras talentosas bailarinas en la privacidad de tu evento.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 2, title: 'Despedidas de Soltero', description: 'Paquetes especiales para despedidas de soltero con múltiples bailarinas, shows temáticos y servicio personalizado.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 3, title: 'Eventos Corporativos', description: 'Entretenimiento elegante y profesional para eventos corporativos, con bailarinas de alto nivel y shows personalizados.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 4, title: 'Experiencias Temáticas', description: 'Ambientes personalizados según tus preferencias y temáticas exclusivas para ocasiones especiales.', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop', active: false },
        { id: 5, title: 'Shows Privados VIP', description: 'Espectáculo de alta categoría con atención exclusiva para clientes preferenciales.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 6, title: 'Fiestas Temáticas de Verano', description: 'Ambientación y entretenimiento especial para eventos de temporada y albercas.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 7, title: 'Show Nocturno Ejecutivo', description: 'Presentaciones ejecutivas nocturnas con un toque de elegancia y diversión garantizada.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 8, title: 'Despedidas Mixtas', description: 'Entretenimiento versátil y dinámico diseñado para grupos mixtos y celebraciones especiales.', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 9, title: 'Aniversarios Exclusivos', description: 'Celebra tus fechas importantes con un show privado adaptado a la ocasión.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop', active: false },
        { id: 10, title: 'Noches de Gala y Fantasía', description: 'Shows espectaculares con vestuarios de alta costura y coreografías deslumbrantes.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 11, title: 'Show de Fuego y Luz', description: 'Efectos visuales impactantes combinados con performance en vivo.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 12, title: 'Baile Sensual Personalizado', description: 'Coreografías privadas y cercanas enfocadas en la máxima discreción y entretenimiento.', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 13, title: 'Paquete Platino Total', description: 'Acceso ilimitado a nuestros mejores espectáculos con staff dedicado toda la noche.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 14, title: 'Celebración de Cumpleaños', description: 'Haz que tu cumpleaños sea inolvidable con sorpresas y shows a la medida.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 15, title: 'Noches de Máscaras', description: 'Ambiente misterioso y seductor con antifaces y performances temáticos.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop', active: false },
        { id: 16, title: 'Show en Yate Privado', description: 'Lleva la fiesta al mar con presentaciones exclusivas a bordo.', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 17, title: 'Despedidas de Soltera', description: 'Diversión asegurada con coreografías interactivas y animación exclusiva.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 18, title: 'Espectáculo Retro 80s y 90s', description: 'Viaja en el tiempo con música clásica y vestuarios ambientados.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 19, title: 'Lanzamiento de Marca', description: 'Atrae la atención de tus invitados con anfitrionas y shows profesionales de alto impacto.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 20, title: 'Noches de Antro y VIP', description: 'La energía de la discoteca llevada a un plano más exclusivo y cercano.', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 21, title: 'Show Burlesque Moderno', description: 'Clase, sensualidad y estilo sofisticado en cada interpretación artística.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 22, title: 'Recepciones de Lujo', description: 'Bienvenida imponente para eventos de gran magnitud.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop', active: false },
        { id: 23, title: 'Paquete Ejecutivo Gold', description: 'Atención especializada para reuniones de negocios privadas con entretenimiento nocturno.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 24, title: 'Fiestas en Penthouse', description: 'Vistas panorámicas de la ciudad combinadas con el mejor entretenimiento privado.', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 25, title: 'Show Neon Glow', description: 'Iluminación ultravioleta y pinturas fluorescentes en un show visualmente alucinante.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 26, title: 'Experiencia Círculo Cerrado', description: 'Privacidad absoluta para celebraciones íntimas y exclusivas.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 27, title: 'Cenas Espectáculo', description: 'Combina buena gastronomía con actuaciones artísticas en vivo.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 28, title: 'Noches de Ritmo Latino', description: 'Pasión y energía desbordante con coreografías tropicales.', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop', active: false },
        { id: 29, title: 'Show LED Showgirls', description: 'Vestuarios iluminados con tecnología LED que deslumbran en la oscuridad.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 30, title: 'Fiestas de Fin de Año', description: 'Despide el año por todo lo alto con nuestros paquetes especiales de temporada.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 31, title: 'Pool Party Nocturna', description: 'Diversión acuática y shows en vivo bajo las estrellas.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 32, title: 'Show de Carnaval', description: 'Color, plumas y alegría desbordante al estilo de los grandes carnavales.', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 33, title: 'Paquete VIP Diamante', description: 'El máximo nivel de lujo, confort y atención personalizada.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 34, title: 'Eventos para Socios', description: 'Encuentros privados con dinámicas diseñadas exclusivamente para miembros.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 35, title: 'Noches Neón Party', description: 'Ambiente vibrante con accesorios fluorescentes y música electrónica.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop', active: false },
        { id: 36, title: 'Apertura de Discoteca', description: 'Shows estelares para inauguraciones de locales nocturnos.', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 37, title: 'Experiencia Tropical Paradise', description: 'Ambientación exótica con bailarinas y performance tropical.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 38, title: 'Fiestas de Bienvenida', description: 'Recibe a tus invitados especiales con un espectáculo memorable.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 39, title: 'Show Romántico Íntimo', description: 'Encuentros discretos con un enfoque suave y seductor.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop', active: true },
        { id: 40, title: 'Gran Gala Anual', description: 'El evento cumbre del año con todo nuestro elenco estelar en escena.', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop', active: true }
      ])
    }, {
      id: 1
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('general_settings', {
      title_header_services: "",
      description_header_services: '',
      catalog_gallery_services: JSON.stringify([])
    }, {
      id: 1
    });
  }
};