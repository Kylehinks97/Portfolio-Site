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
    aboutMe: string;
    projects: string;
    contact: string;
    downloadCV: string;
    cvLanguagePrompt: string;
    cvEnglishOption: string;
    cvSpanishOption: string;
    cvDownloadButton: string;
  };
  common: {
    underConstruction: string;
    language: string;
  };
  home: {
    availability: string;
    eyebrow: string;
    title: string;
    description: string[];
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
  aboutMe: {
    title: string;
    description: string;
    likesTitle: string;
    dislikesTitle: string;
    like: string[];
    dislike: string[];
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
    loadingTitle: string;
    loadingDescription: string;
    emptyTitle: string;
    emptyDescription: string;
    errorTitle: string;
    errorDescription: string;
    createdAtLabel: string;
    thumbnailLabel: string;
    videoLabel: string;
  };
  footer: {
    line: string;
  };
};

const messages: Record<Locale, Messages> = {
  en: {
    meta: {
      title: "Kyle Hinks | Fullstack Developer Portfolio",
      description:
        "A cinematic portfolio landing page for a product-focused engineer building elegant, high-performance web experiences.",
    },
    nav: {
      home: "Home",
      aboutMe: "About Me",
      projects: "Projects",
      contact: "Contact",
      downloadCV: "Download My CV",
      cvLanguagePrompt: "Choose CV language",
      cvEnglishOption: "English",
      cvSpanishOption: "Spanish",
      cvDownloadButton: "Download CV",
    },
    common: {
      underConstruction:
        "This section is being curated and will be filled in soon.",
      language: "Language",
    },
    home: {
      availability: "Open to freelance and full-time opportunities",
      eyebrow: "Fullstack engineer • symfony specialist • react pro",
      title:
        "I build polished digital experiences with sharp UX and scalable, performant backends.",
      description:
        [
            "🧑🏼‍💻 Bringing 3 years of fullstack experience to an exciting new remote or hybrid role.",
            "📍 Based in Valladolid, Spain. Commutable distance to Madrid."
        ],
      primaryCta: "Explore projects",
      secondaryCta: "Contact me",
      visualEyebrow: "what i bring to the table",
      visualTitle: "Not just buzzwords and self-marketing...",
      principleEyebrow: "why i could be an asset to your team",
      principleText:
        "Because I am a determined and dedicated worker, who can lead and follow.",
      stats: [
        { value: "3+", label: "Years of experience shipping for the web" },
        { value: "34+", label: "Technologies with practical experience using, professionally and privately" },
        { value: "5", label: "Public projects to demonstrate my skills and experience" },
        { value: "100%", label: "Commitment to becoming a 10x developer" },
      ],
      featureTitle: "Technical skills and experience",
      featureDescription:
        "I obsess over the details that make a site or API feel intentional, modern, and trustworthy.",
      features: [
        {
          title: "Frontend Wizard",
          description:
            "My strengths in creating beautiful UI and UX is hopefully already evident, but the attention to detail is what sets me apart.",
        },
        {
          title: "Backend Guru",
          description:
            "I enjoy working with complex data and API's to give power and utility to real-world and passion projects using modern practices.",
        },
        {
          title: "Most importantly, eternal student",
          description:
            "An emphasise of consistent dedication to the ever-evolving world of software development make me an asset to any team.",
        },
      ],
      processTitle: "Language Proficiency",
      processDescription:
        "Seamless communication is key to productivity, and is what I bring to the table.",
      process: [
        {
          step: "01",
          title: "DELE B1 Spanish",
          description:
            "I passed the DELE B1 Spanish Language competency exam in July 2024, resided in Spain ever since and increased fluency.",
        },
        {
          step: "02",
          title: "Native English Speaker",
          description:
            "Coupled with my Spanish, this has allowed me to converse effortlessly with clients and colleagues alike.",
        },
        {
          step: "03",
          title: "Programming Languages",
          description:
            "Extensive experience with Javascript, Typescript and PHP, and some experience with Python.",
        },
      ],
      closingTitle: "Have an exciting opportunity to share with me?",
      closingDescription:
        "Excited to discuss remote and hybrid from Valladolid roles. Let's talk!",
      closingCta: "Start a conversation",
    },
    aboutMe: {
      title: 'About Me',
      description: 'It is hard to convey in this setting, but I believe myself to be a down-to-earth guy. I came to Spain after meeting my wife in England. We are expecting our first born in June, my ambition is to provide them the greatest life possible. Everything else about me is in the background to that.',
      likesTitle: "I like",
      dislikesTitle: "I avoid",
      like: ['Programming', 'Sports', 'Spanish culture', 'Croquetas'],
      dislike: ['Closed-minded people', 'Wasting time', 'Pessimists']
    },
    contact: {
      title: "Let’s build something excellent",
      description:
        "Reach out and tell me what exciting projects I can get involved in, and why my expertise could be an asset to your team.",
      availabilityTitle: "What I am interested in...",
      availabilityDescription:
        "Remote and hybrid roles within a commutable distance to Valladolid, Spain.",
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
      title: "My Projects",
      description:
        "Case studies and featured body of work demonstrating my experience and abilities. My professional work is of course sensitive and cannot be shown, but links to the sites and my explanations of my contributions are available.",
      loadingTitle: "Loading projects...",
      loadingDescription:
        "Fetching the latest projects from the API. This should only take a moment.",
      emptyTitle: "No projects yet",
      emptyDescription:
        "The API responded successfully, but there are currently no project entries to display.",
      errorTitle: "Could not load projects",
      errorDescription:
        "There was a problem reaching the projects API. Please try again in a moment.",
      createdAtLabel: "Created",
      thumbnailLabel: "Thumbnail",
      videoLabel: "Video",
    },
    footer: {
      line: "Portfolio by Kyle Hinks",
    },
  },
  es: {
    meta: {
      title: "Kyle Hinks | Portafolio de Desarrollador Fullstack",
      description:
        "Una landing page de portafolio cinematográfica para un ingeniero enfocado en producto que construye experiencias web elegantes y de alto rendimiento.",
    },
    nav: {
      home: "Inicio",
      aboutMe: "Sobre mí",
      projects: "Proyectos",
      contact: "Contacto",
      downloadCV: "Descargar mi CV",
      cvLanguagePrompt: "Elige el idioma del CV",
      cvEnglishOption: "Inglés",
      cvSpanishOption: "Español",
      cvDownloadButton: "Descargar CV",
    },
    common: {
      underConstruction:
        "Esta seccion se esta preparando y pronto tendra contenido.",
      language: "Idioma",
    },
    home: {
      availability: "Abierto a oportunidades freelance y full-time",
      eyebrow: "ingeniero fullstack • especialista en symfony • pro de react",
      title:
        "Construyo experiencias digitales pulidas con UX afilado y backends escalables y de alto rendimiento.",
      description: [
        "🧑🏼‍💻 Aporto 3 años de experiencia fullstack a un nuevo rol remoto o híbrido emocionante.",
        "📍 Vivo en Valladolid, España. A una distancia conmutable de Madrid.",
      ],
      primaryCta: "Explorar proyectos",
      secondaryCta: "Contáctame",
      visualEyebrow: "lo que aporto",
      visualTitle: "No son solo buzzwords y autopromoción...",
      principleEyebrow: "por qué podría aportar a tu equipo",
      principleText:
        "Porque soy un trabajador determinado y dedicado, capaz de liderar y de seguir.",
      stats: [
        { value: "3+", label: "Años de experiencia entregando para la web" },
        {
          value: "34+",
          label:
            "Tecnologías con experiencia práctica, profesionalmente y en proyectos personales",
        },
        {
          value: "5",
          label: "Proyectos públicos para demostrar mis habilidades y experiencia",
        },
        { value: "100%", label: "Compromiso con convertirme en un desarrollador 10x" },
      ],
      featureTitle: "Habilidades técnicas y experiencia",
      featureDescription:
        "Me obsesionan los detalles que hacen que un sitio o una API se sientan intencionales, modernos y confiables.",
      features: [
        {
          title: "Mago del frontend",
          description:
            "Mis puntos fuertes creando UI y UX bonitos espero que ya sean evidentes, pero la atención al detalle es lo que me diferencia.",
        },
        {
          title: "Gurú del backend",
          description:
            "Disfruto trabajando con datos complejos y APIs para dar potencia y utilidad a proyectos reales y personales usando prácticas modernas.",
        },
        {
          title: "Y lo más importante: estudiante eterno",
          description:
            "El énfasis en una dedicación constante al mundo siempre cambiante del desarrollo de software me convierte en un activo para cualquier equipo.",
        },
      ],
      processTitle: "Dominio de idiomas",
      processDescription:
        "La comunicación fluida es clave para la productividad, y es lo que aporto.",
      process: [
        {
          step: "01",
          title: "Español DELE B1",
          description:
            "Aprobé el examen DELE B1 de competencia en español en julio de 2024, he vivido en España desde entonces y he aumentado mi fluidez.",
        },
        {
          step: "02",
          title: "Hablante nativo de inglés",
          description:
            "Junto con mi español, esto me ha permitido conversar sin esfuerzo con clientes y compañeros por igual.",
        },
        {
          step: "03",
          title: "Lenguajes de programación",
          description:
            "Amplia experiencia con Javascript, Typescript y PHP, y algo de experiencia con Python.",
        },
      ],
      closingTitle: "¿Tienes una oportunidad emocionante para compartir conmigo?",
      closingDescription:
        "Me ilusiona hablar sobre roles remotos e híbridos desde Valladolid. ¡Hablemos!",
      closingCta: "Empezar una conversación",
    },
    aboutMe: {
      title: "Sobre mí",
      description:
        "Es difícil transmitirlo en este formato, pero me considero una persona con los pies en la tierra. Vine a España después de conocer a mi mujer en Inglaterra. Estamos esperando nuestro primer bebé en junio, y mi ambición es darle la mejor vida posible. Todo lo demás queda en segundo plano frente a eso.",
      likesTitle: "Me gusta",
      dislikesTitle: "No me gusta",
      like: ["Programación", "Deporte", "Cultura española", "Croquetas"],
      dislike: ["Gente de mente cerrada", "Perder el tiempo", "Pesimistas"],
    },
    contact: {
      title: "Construyamos algo excelente",
      description:
        "Escríbeme y cuéntame en qué proyectos emocionantes puedo participar, y por qué mi experiencia podría aportar valor a tu equipo.",
      availabilityTitle: "En qué estoy interesado...",
      availabilityDescription:
        "Roles remotos e híbridos a una distancia conmutable de Valladolid, España.",
      responseTitle: "Tiempo de respuesta",
      responseDescription:
        "Normalmente en 1-2 días hábiles una vez que esté conectado el flujo final de envío.",
      form: {
        name: "Nombre",
        email: "Correo",
        company: "Empresa",
        message: "Detalles del proyecto",
        submit: "Enviar consulta",
        sending: "Enviando...",
        success: "Tu mensaje fue validado y preparado correctamente.",
        error: "Por favor, corrige los campos marcados e inténtalo de nuevo.",
        placeholders: {
          name: "Jane Smith",
          email: "jane@company.com",
          company: "Nombre del estudio o empresa",
          message: "Cuéntame sobre el proyecto, plazos y objetivos.",
        },
      },
    },
    projects: {
      title: "Mis Proyectos",
      description:
        "Casos de estudio y trabajo destacado que demuestran mi experiencia y habilidades. Mi trabajo profesional es sensible y no puedo mostrarlo, pero hay enlaces a los sitios y explicaciones de mis contribuciones.",
      loadingTitle: "Cargando proyectos...",
      loadingDescription:
        "Obteniendo los proyectos mas recientes desde la API. Deberia tardar solo un momento.",
      emptyTitle: "Todavia no hay proyectos",
      emptyDescription:
        "La API respondio correctamente, pero ahora mismo no hay proyectos para mostrar.",
      errorTitle: "No se pudieron cargar los proyectos",
      errorDescription:
        "Hubo un problema al conectar con la API de proyectos. Intentalo de nuevo en un momento.",
      createdAtLabel: "Creado",
      thumbnailLabel: "Miniatura",
      videoLabel: "Video",
    },
    footer: {
      line: "Portafolio de Kyle Hinks",
    },
  },
};

export function getMessages(locale: Locale) {
  return messages[locale];
}
