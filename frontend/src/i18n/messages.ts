import type { Locale } from "@/i18n/config";

type MessageStat = {
  value: string;
  label: string;
};

type MessageCard = {
  title: string;
  description: string;
};

type MessageProcessStep = MessageCard & {
  step: string;
};

type ContactFormMessages = {
  name: string;
  email: string;
  company: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  placeholders: {
    name: string;
    email: string;
    company: string;
    message: string;
  };
};

export type Messages = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    projects: string;
    qualifications: string;
    contact: string;
  };
  common: {
    underConstruction: string;
    language: string;
  };
  home: {
    availability: string;
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    visualEyebrow: string;
    visualTitle: string;
    principleEyebrow: string;
    principleText: string;
    stats: MessageStat[];
    featureTitle: string;
    featureDescription: string;
    features: MessageCard[];
    processTitle: string;
    processDescription: string;
    process: MessageProcessStep[];
    closingTitle: string;
    closingDescription: string;
    closingCta: string;
  };
  contact: {
    title: string;
    description: string;
    availabilityTitle: string;
    availabilityDescription: string;
    responseTitle: string;
    responseDescription: string;
    form: ContactFormMessages;
  };
  projects: {
    title: string;
    description: string;
    placeholderTitle: string;
    placeholderDescription: string;
    caseStudiesTitle: string;
    caseStudiesDescription: string;
  };
  qualifications: {
    title: string;
    description: string;
    placeholderTitle: string;
    placeholderDescription: string;
    credibilityTitle: string;
    credibilityDescription: string;
  };
  footer: {
    line: string;
  };
};

const messages: Record<Locale, Messages> = {
  en: {
    meta: {
      title: "Kyle | Product Engineer",
      description:
        "A cinematic portfolio landing page for a product-focused engineer building elegant, high-performance web experiences.",
    },
    nav: {
      home: "Home",
      projects: "Projects",
      qualifications: "Qualifications",
      contact: "Contact",
    },
    common: {
      underConstruction:
        "This section is being curated and will be filled in soon.",
      language: "Language",
    },
    home: {
      availability: "Open to freelance and full-time opportunities",
      eyebrow: "Product engineer • frontend specialist • systems thinker",
      title:
        "I build polished digital experiences with sharp UX and serious performance.",
      description:
        "From ambitious landing pages to resilient product surfaces, I blend motion, accessibility, and engineering discipline into interfaces that are memorable and conversion-focused.",
      primaryCta: "Explore projects",
      secondaryCta: "Contact me",
      visualEyebrow: "Visual system",
      visualTitle: "Modern motion, layered contrast, and premium composition.",
      principleEyebrow: "Interface principle",
      principleText:
        "Make the first impression feel expensive, then keep the UX effortless all the way through.",
      stats: [
        { value: "8+", label: "Years shipping for the web" },
        { value: "20+", label: "Production launches supported" },
        { value: "100%", label: "Responsive, accessible-first execution" },
      ],
      featureTitle: "Built to feel premium at every touchpoint",
      featureDescription:
        "I obsess over the details that make a site feel intentional, modern, and trustworthy.",
      features: [
        {
          title: "Animated storytelling",
          description:
            "Motion is used to guide attention, improve hierarchy, and add energy without overwhelming the experience.",
        },
        {
          title: "Conversion-minded layouts",
          description:
            "Sections are designed to clarify value fast, frame credibility, and move visitors toward action.",
        },
        {
          title: "Clean engineering foundations",
          description:
            "Reusable components, strong typing, and predictable structure make the frontend easy to grow.",
        },
      ],
      processTitle: "How I approach product work",
      processDescription:
        "Strong visuals only matter when they support clarity, usability, and maintainability.",
      process: [
        {
          step: "01",
          title: "Design for momentum",
          description:
            "I create interfaces that establish trust in the first few seconds and keep users moving with confidence.",
        },
        {
          step: "02",
          title: "Engineer for scale",
          description:
            "I build with reusable systems, practical constraints, and long-term iteration in mind.",
        },
        {
          step: "03",
          title: "Refine the details",
          description:
            "Micro-interactions, spacing, rhythm, and content hierarchy get the same attention as the code.",
        },
      ],
      closingTitle: "Ready to create something ambitious?",
      closingDescription:
        "If you want a portfolio, product surface, or marketing experience that looks premium and feels effortless, let’s talk.",
      closingCta: "Start a conversation",
    },
    contact: {
      title: "Let’s build something excellent",
      description:
        "This form is already designed and validated, so it is ready to be wired into your final contact workflow later.",
      availabilityTitle: "Current focus",
      availabilityDescription:
        "Portfolio sites, polished product marketing pages, frontend architecture, and UX-heavy interfaces.",
      responseTitle: "Response time",
      responseDescription:
        "Usually within 1-2 business days once the final submission flow is connected.",
      form: {
        name: "Name",
        email: "Email",
        company: "Company",
        message: "Project details",
        submit: "Send inquiry",
        sending: "Sending...",
        success: "Your message was validated and staged successfully.",
        error: "Please fix the highlighted fields and try again.",
        placeholders: {
          name: "Jane Smith",
          email: "jane@company.com",
          company: "Studio or company name",
          message: "Tell me about the project, timeline, and goals.",
        },
      },
    },
    projects: {
      title: "Selected Projects",
      description:
        "Case studies and featured work will live here once you are ready to add them.",
      placeholderTitle: "Ready for your project library",
      placeholderDescription:
        "Curated project entries, screenshots, and writeups can slot into this layout later without changing the routing structure.",
      caseStudiesTitle: "Ready for case studies",
      caseStudiesDescription:
        "Add featured work, metrics, technology stacks, and detailed before/after narratives when you are ready.",
    },
    qualifications: {
      title: "Qualifications",
      description:
        "Credentials, experience highlights, and deeper background details will be added here.",
      placeholderTitle: "Ready for your background details",
      placeholderDescription:
        "This page is ready for certifications, tooling strengths, and technical specialties once you want to populate it.",
      credibilityTitle: "Structured for credibility",
      credibilityDescription:
        "Add experience timelines, notable clients, education, or professional highlights without reworking the page shell.",
    },
    footer: {
      line: "Designed with motion, structure, and bilingual support in mind.",
    },
  },
  es: {
    meta: {
      title: "Kyle | Ingeniero de Producto",
      description:
        "Una landing page cinematica para el portafolio de un ingeniero enfocado en producto que crea experiencias web elegantes y de alto rendimiento.",
    },
    nav: {
      home: "Inicio",
      projects: "Proyectos",
      qualifications: "Cualificaciones",
      contact: "Contacto",
    },
    common: {
      underConstruction:
        "Esta seccion se esta preparando y pronto tendra contenido.",
      language: "Idioma",
    },
    home: {
      availability: "Disponible para proyectos freelance y roles full-time",
      eyebrow:
        "Ingeniero de producto • especialista frontend • pensamiento de sistemas",
      title:
        "Construyo experiencias digitales pulidas con UX preciso y rendimiento serio.",
      description:
        "Desde landing pages ambiciosas hasta superficies de producto robustas, combino motion, accesibilidad y disciplina de ingenieria para crear interfaces memorables y enfocadas en conversion.",
      primaryCta: "Ver proyectos",
      secondaryCta: "Contactarme",
      visualEyebrow: "Sistema visual",
      visualTitle:
        "Motion moderno, contraste en capas y composicion con sensacion premium.",
      principleEyebrow: "Principio de interfaz",
      principleText:
        "Haz que la primera impresion se sienta valiosa y luego mantén la UX fluida de principio a fin.",
      stats: [
        { value: "8+", label: "Anos entregando para la web" },
        { value: "20+", label: "Lanzamientos en produccion apoyados" },
        { value: "100%", label: "Ejecucion responsive y accesible primero" },
      ],
      featureTitle: "Pensado para sentirse premium en cada interaccion",
      featureDescription:
        "Me obsesionan los detalles que hacen que un sitio se sienta intencional, moderno y confiable.",
      features: [
        {
          title: "Storytelling con animacion",
          description:
            "El movimiento guia la atencion, mejora la jerarquia y aporta energia sin saturar la experiencia.",
        },
        {
          title: "Layouts orientados a conversion",
          description:
            "Las secciones estan disenadas para aclarar el valor rapidamente, reforzar credibilidad y llevar al usuario a la accion.",
        },
        {
          title: "Base de ingenieria limpia",
          description:
            "Componentes reutilizables, tipado fuerte y estructura predecible hacen que el frontend crezca con facilidad.",
        },
      ],
      processTitle: "Como abordo el trabajo de producto",
      processDescription:
        "Lo visual solo importa de verdad cuando mejora la claridad, la usabilidad y el mantenimiento.",
      process: [
        {
          step: "01",
          title: "Disenar para generar impulso",
          description:
            "Creo interfaces que generan confianza en los primeros segundos y mantienen a la persona avanzando con seguridad.",
        },
        {
          step: "02",
          title: "Ingenieria lista para escalar",
          description:
            "Construyo con sistemas reutilizables, restricciones reales e iteracion a largo plazo en mente.",
        },
        {
          step: "03",
          title: "Pulir los detalles",
          description:
            "Microinteracciones, espaciado, ritmo y jerarquia del contenido reciben la misma atencion que el codigo.",
        },
      ],
      closingTitle: "Listo para crear algo ambicioso?",
      closingDescription:
        "Si quieres un portafolio, una experiencia de producto o una pagina de marketing que se vea premium y se sienta natural, conversemos.",
      closingCta: "Iniciar conversacion",
    },
    contact: {
      title: "Construyamos algo excelente",
      description:
        "Este formulario ya esta disenado y validado, asi que quedara listo para conectarlo despues al flujo final de contacto.",
      availabilityTitle: "Enfoque actual",
      availabilityDescription:
        "Portafolios, paginas de marketing de producto, arquitectura frontend e interfaces con mucho peso en UX.",
      responseTitle: "Tiempo de respuesta",
      responseDescription:
        "Normalmente en 1 o 2 dias habiles cuando el flujo final de envio este conectado.",
      form: {
        name: "Nombre",
        email: "Correo",
        company: "Empresa",
        message: "Detalles del proyecto",
        submit: "Enviar consulta",
        sending: "Enviando...",
        success: "Tu mensaje fue validado y preparado correctamente.",
        error: "Corrige los campos marcados e intentalo de nuevo.",
        placeholders: {
          name: "Jane Smith",
          email: "jane@company.com",
          company: "Nombre del estudio o empresa",
          message: "Cuentame sobre el proyecto, tiempos y objetivos.",
        },
      },
    },
    projects: {
      title: "Proyectos Seleccionados",
      description:
        "Aqui viviran tus casos de estudio y trabajo destacado cuando quieras agregarlos.",
      placeholderTitle: "Listo para tu biblioteca de proyectos",
      placeholderDescription:
        "Las entradas curadas, capturas y descripciones de proyectos podran integrarse despues sin cambiar la estructura de rutas.",
      caseStudiesTitle: "Listo para casos de estudio",
      caseStudiesDescription:
        "Agrega trabajo destacado, metricas, stack tecnologico y narrativas detalladas antes/despues cuando quieras.",
    },
    qualifications: {
      title: "Cualificaciones",
      description:
        "Aqui se agregaran credenciales, hitos de experiencia y detalles mas profundos sobre tu trayectoria.",
      placeholderTitle: "Listo para mostrar tu experiencia",
      placeholderDescription:
        "Esta pagina ya esta preparada para certificaciones, fortalezas tecnicas y especialidades cuando quieras completarla.",
      credibilityTitle: "Estructura pensada para credibilidad",
      credibilityDescription:
        "Agrega lineas de tiempo, clientes destacados, estudios o logros profesionales sin rehacer la base de la pagina.",
    },
    footer: {
      line: "Disenado con movimiento, estructura y soporte bilingue desde el inicio.",
    },
  },
};

export function getMessages(locale: Locale) {
  return messages[locale];
}
