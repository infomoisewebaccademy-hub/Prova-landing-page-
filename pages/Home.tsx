
import React, { useMemo, useState } from 'react';
import { Course, UserProfile, LandingPageConfig } from '../types';
import { CheckCircle, ArrowRight, ShieldCheck, Zap, Database, Layout, Target, Cpu, Layers, Users, Lock, Quote, Star, Award, Smartphone, MessageCircle, CheckCircle2, X, PlayCircle, BookOpen, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, CreditCard, Check, XCircle, Banknote, Rocket, TrendingUp, UserCheck, AlertTriangle, ChevronDown, ChevronUp, HelpCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  courses: Course[];
  onCourseSelect: (courseId: string) => void;
  user?: UserProfile | null;
  // Riceviamo l'intera configurazione
  landingConfig?: LandingPageConfig;
}

// DEFAULT CONFIGURATION (Contenuto esatto dell'immagine)
const DEFAULT_CONFIG: LandingPageConfig = {
  announcement_bar: {
    text: '🎉 Offerta lancio: Tutti i corsi al 50% di sconto per i primi 100 iscritti!',
    is_visible: false,
    is_sticky: false,
    type: 'static',
    bg_color: '#fbbf24', // Amber 400
    text_color: '#1e3a8a' // Blue 900
  },
  hero: {
    title: "Crea Siti Web Professionali o Piattaforme con l'AI in Poche Ore",
    subtitle: 'Senza Scrivere Una Riga di Codice.',
    cta_primary: 'Scopri i corsi disponibili',
    cta_secondary: '', // Rimosso default
    image_url: '', 
    benefits: [
        "Accesso a vita ai contenuti",
        "Assistenza 7 giorni su 7",
        "Nessuna esperienza richiesta"
    ],
    show_badges: true
  },
  ai_era_section: {
      title: 'La Nuova Era del Web',
      subtitle: "Benvenuto Nell'Era dell'Intelligenza Artificiale",
      text: "Fino a ieri, creare un sito web significava: imparare a programmare per anni, spendere migliaia di euro per agenzie, o accontentarsi di template limitati.\nOggi tutto è cambiato.\nL'intelligenza artificiale ha reso la creazione web accessibile a chiunque. In poche ore puoi ottenere risultati che prima richiedevano settimane di lavoro e competenze avanzate.\nIl risultato?\nImprenditori che diventano autonomi e risparmiano migliaia di euro\nPersone comuni che si creano un'entrata extra da €1.000-5.000 al mese\nIdee che diventano realtà senza barriere tecniche\nE tu? Sei pronto a far parte di questa rivoluzione?",
      is_visible: true
  },
  about_section: {
    title: 'Perché nasce Moise Web Academy',
    subtitle: 'LA NOSTRA MISSIONE',
    text: "Siamo Moise Web Academy. Negli ultimi anni abbiamo costruito piattaforme AI, siti web dinamici, automazioni, landing page e campagne pubblicitarie per decine di progetti reali.\nNel mercato della formazione c'è una cosa che ci ha sempre dato fastidio:",
    mission_points: [
        "I corsi che promettono soldi veloci",
        "I “guru” che non hanno mai creato nulla",
        "Le lezioni che obbligano a comprare tool da 30–100€/mese"
    ],
    image_url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    quote: '"Non vi promettiamo guadagni facili, vi diamo competenze reali."',
    quote_author: 'DANIEL MOISE',
    quote_author_image: '',
    quote_author_image_size: 48,
    quote_author_image_offset_x: 0,
    quote_author_image_offset_y: 0,
    quote_author_image_alignment: 'center',
    quote_author_image_scale: 1,
    is_visible: true
  },
  features_section: {
    title: 'Cosa imparerete con noi',
    subtitle: 'Competenze tecniche verticali, divise per obiettivi.',
    is_visible: true,
    cards: [
      { 
          icon: 'Cpu', 
          title: 'AI & Sviluppo Low-Code', 
          desc: 'Google AI Studio (Zero Costi)\nDatabase Supabase\nDeploy su Vercel\nGestione Domini & DNS' 
      },
      { 
          icon: 'Layout', 
          title: 'Landing Page & Siti Web', 
          desc: 'Elementor (versione base)\nStruttura & Copy\nTemplate pronti all\'uso\nOttimizzazione Mobile' 
      },
      { 
          icon: 'Zap', 
          title: 'Automazioni a Costo Zero', 
          desc: 'Notifiche intelligenti\nEmail automatiche\nWebhook Make/N8N\nAPI Integration' 
      },
      { 
          icon: 'Target', 
          title: 'Pubblicità & Ads', 
          desc: 'Meta Ads (FB/IG)\nTikTok Ads\nStrategie E-commerce\nLead Generation' 
      }
    ]
  },
  how_it_works_section: {
      title: 'Come Funziona Moise Web Academy',
      subtitle: 'Tre semplici passi per diventare un Web Creator professionista',
      is_visible: true,
      steps: [
          {
              title: 'Impara',
              desc: "Segui i video passo-passo. Daniel ti guida dalla A alla Z, senza dare nulla per scontato. Ogni concetto è spiegato in modo semplice, chiaro e pratico. Anche se oggi non sai cosa sia l'HTML.",
              icon: 'BookOpen'
          },
          {
              title: 'Crea',
              desc: "Applichi subito quello che impari. In poche ore avrai il tuo primo sito web professionale online, con dominio personalizzato e hosting gratuito. Zero costi nascosti, zero sorprese.",
              icon: 'Rocket'
          },
          {
              title: 'Monetizza (Scelta Tua)',
              desc: "Offri i tuoi servizi ad aziende locali (1 sito = €1.000-5.000) oppure lancia i tuoi progetti digitali. Nel 2025 ogni business ha bisogno di presenza online, e tu sai esattamente come dargliela.",
              icon: 'Banknote'
          }
      ]
  },
  comparison_section: {
    title: 'La Tua Vita Prima e Dopo Moise Web Academy',
    subtitle: 'Non è solo un corso. È un cambio di prospettiva sulla tua autonomia e sulle tue possibilità.',
    is_visible: true,
    before_title: 'PRIMA (Senza il corso)',
    after_title: 'DOPO (Con il corso)',
    before_items: [
        'Dipendi da sviluppatori costosi per ogni singola modifica',
        'Spendi 2.000-10.000€ per un sito base (e altre centinaia per ogni aggiornamento)',
        'Aspetti settimane o mesi per vedere il tuo progetto online',
        'Le tue idee restano solo idee perché "costa troppo realizzarle"',
        'Perdi opportunità di business e clienti per mancanza di presenza online',
        'Lavori con orari fissi, stipendio fisso, dipendenza da un datore di lavoro',
        'Guardi altri che guadagnano online e pensi "vorrei saperlo fare anch\'io"'
    ],
    after_items: [
        'Sei completamente autonomo, modifichi e crei quando e come vuoi',
        'Crei siti professionali in poche ore con costi quasi zero',
        'Pubblichi online in giornata, senza aspettare nessuno',
        'Trasformi ogni idea in un progetto reale: siti, e-commerce, piattaforme',
        'Offri servizi da €1.000-5.000 per progetto e ti crei un\'entrata extra (o principale)',
        'Lavori da dove vuoi, quando vuoi, con orari flessibili',
        'Hai una competenza ad alto valore che ti rende indipendente e ricercato'
    ]
  },
  testimonials_section: {
    title: 'Cosa dicono i nostri studenti',
    subtitle: 'Storie di successo reali',
    is_visible: true,
    reviews: [
        { name: 'Marco Rossi', role: 'Freelance Developer', text: 'Ho risparmiato centinaia di euro in abbonamenti software grazie a questo corso.', avatar: '' },
        { name: 'Giulia Bianchi', role: 'Imprenditrice', text: 'Finalmente un approccio pratico e senza giri di parole. Consigliatissimo.', avatar: '' }
    ]
  },
  usp_section: {
    title: 'Perché siamo diversi dagli altri corsi',
    is_visible: true,
    items: [
      { title: 'TUTTO SENZA SPESE EXTRA', desc: 'Ogni corso è pensato per lavorare con AI a costo zero.' },
      { title: 'Lezioni pratiche, non teoria', desc: 'Ogni modulo contiene schermate reali e processi passo-passo.' },
      { title: 'Nessuna fuffa', desc: 'Non vi promettiamo guadagni, vi diamo competenze tecniche solide.' },
      { title: 'Prezzi onesti', desc: 'Ogni corso lo pagate singolarmente. Niente abbonamenti.' }
    ]
  },
  cta_section: {
    title: 'Iniziate a costruire qualcosa di reale.',
    subtitle: 'Usate l’AI a costo zero, create progetti veri e portate le vostre competenze al livello successivo.',
    button_text: 'Guarda tutti i corsi',
    is_visible: true
  },
  footer: {
      text: 'Moise Web Academy',
      copyright: 'Tutti i diritti riservati.',
      is_visible: true,
      logo_height: 40,
      logo_margin_top: 0,
      logo_margin_bottom: 0,
      logo_margin_left: 0,
      logo_margin_right: 0
  }
};

// Helper per mappare stringhe icona a componenti Lucide
const IconMap: Record<string, React.ElementType> = {
  Cpu, Layout, Zap, Target, ShieldCheck, Database, Layers, Users, Lock, Star, Award, Smartphone, 
  BookOpen, Rocket, Banknote, TrendingUp
};

// Colori specifici per le card (ordine: Blu, Viola, Arancio, Rosa)
const CARD_COLORS = [
    { bg: 'bg-blue-50', text: 'text-blue-600' },
    { bg: 'bg-purple-50', text: 'text-purple-600' },
    { bg: 'bg-orange-50', text: 'text-orange-600' },
    { bg: 'bg-pink-50', text: 'text-pink-600' },
];

const FAQ_ITEMS = [
    {
        q: "Devo avere competenze tecniche o di programmazione?",
        a: "Assolutamente NO. Il corso è pensato per chi parte da zero assoluto. Se sai usare WhatsApp, Google e guardare un video su YouTube, sei già pronto. Non serve sapere nulla di codice, HTML, CSS o programmazione."
    },
    {
        q: "Quanto tempo serve per completare il corso?",
        a: "Il corso base si completa in 3-5 ore. Il premium in 8-10 ore totali. Ma puoi andare completamente al tuo ritmo: hai accesso illimitato a vita, quindi puoi seguirlo in una settimana o in due mesi. Tu decidi."
    },
    {
        q: "Quanto tempo ci vuole per creare un sito dopo il corso?",
        a: "Dopo aver seguito il corso base, puoi creare un sito professionale in 3-5 ore. Con la pratica e l'esperienza, scendi a 1-2 ore per sito. I nostri studenti più veloci creano landing page in 30-45 minuti."
    },
    {
        q: "Quali strumenti servono? Ci sono costi aggiuntivi?",
        a: "Ti serve solo un computer (Windows, Mac o Linux) e una connessione internet. Gli strumenti AI che usiamo (AI Studio Gemini) sono gratuiti o hanno piani free molto generosi. L'unico costo ricorrente è il dominio personalizzato (circa €10-15 all'anno), che è completamente opzionale."
    },
    {
        q: "L'hosting è davvero gratuito?",
        a: "Sì! Ti insegniamo a usare soluzioni di hosting gratuite professionali con performance eccellenti. Zero costi mensili, zero sorprese. Ovviamente se in futuro vorrai passare a hosting premium potrai farlo, ma non è necessario per iniziare."
    },
    {
        q: "Posso davvero guadagnare creando siti per clienti?",
        a: "Assolutamente sì. Un sito vetrina base si vende da €800 a €3.000. Un e-commerce completo da €2.000 a €10.000. Un gestionale personalizzato anche oltre. La domanda è altissima (ogni attività ha bisogno di presenza online) e chi sa creare siti professionali velocemente è molto ricercato."
    },
    {
        q: "Come trovo i clienti?",
        a: "Nel corso Premium ti diamo script pronti per contattare attività locali (ristoranti, hotel, professionisti, negozi, palestre). Puoi iniziare anche da conoscenti e passaparola. Molti nostri studenti trovano i primi clienti semplicemente guardandosi intorno nella propria città: quante attività hanno siti vecchi o inesistenti?"
    },
    {
        q: "Per quanto tempo ho accesso al corso?",
        a: "Per sempre. Accesso illimitato a vita. Anche se tra 5 anni vuoi rivedere una lezione, sarà ancora lì. E riceverai GRATIS tutti gli aggiornamenti futuri quando aggiungiamo nuovi contenuti o funzionalità."
    },
    {
        q: "C'è supporto se ho problemi o domande?",
        a: "Sì! Assistenza 7 giorni su 7 via chat per qualsiasi dubbio tecnico o domanda. Nel corso Premium hai anche assistenza PRIORITARIA (rispondiamo entro 2 ore) + sessioni 1-a-1 con Daniel per analizzare i tuoi progetti."
    },
    {
        q: "Cosa succede se l'AI cambia o viene aggiornata?",
        a: "Aggiorniamo costantemente il corso con le ultime novità e strumenti AI. Quando escono nuove funzionalità o miglioramenti, aggiungiamo lezioni gratuite. Il tuo accesso include TUTTI gli aggiornamenti futuri senza costi extra."
    },
    {
        q: "Il corso va bene anche per creare il sito della MIA attività?",
        a: "Assolutamente sì! Anzi, è uno dei casi d'uso principali. Risparmi migliaia di euro (che avresti dato a un'agenzia) e resti autonomo per sempre. Ogni volta che vuoi modificare qualcosa, lo fai tu in pochi minuti. Zero dipendenze."
    },
    {
        q: "E se non ho tempo ora? Posso iniziare dopo?",
        a: "Certamente! Una volta iscritto hai accesso a vita. Puoi iniziare domani, tra una settimana o tra un mese. Il corso sarà sempre lì ad aspettarti. Ma ricorda: i bonus per i primi 50 iscritti scadono, quindi iscriviti ora per non perderli."
    },
    {
        q: "Il corso è registrato o sono lezioni live?",
        a: "Tutto registrato e sempre disponibile. Massima flessibilità: segui quando vuoi, metti in pausa, rivedi le parti che ti servono 10 volte se necessario. Nessun vincolo di orario o giorno."
    },
    {
        q: "Funziona anche per creare app mobile?",
        a: "Il corso si concentra su siti web professionali (che comunque sono responsive e funzionano perfettamente su mobile). Per app native iOS/Android servirebbero competenze diverse. Ma i siti web moderni sono così potenti che spesso sostituiscono benissimo le app."
    },
    {
        q: "Che differenza c'è tra Base e Premium?",
        a: "Base (€50): Perfetto per siti vetrina, landing page, siti aziendali. Ideale se vuoi iniziare o creare il tuo sito personale/aziendale. Premium (€100): Include TUTTO del Base + e-commerce, CRM, gestionali, area membri, automazioni avanzate. Per chi vuole offrire servizi premium e guadagnare di più."
    },
    {
        q: "Posso passare da Base a Premium dopo?",
        a: "Sì, puoi fare upgrade in qualsiasi momento pagando la differenza. Ma i bonus esclusivi (sessioni 1-a-1, template, script) sono solo per chi si iscrive ora nei primi 50 posti."
    },
    {
        q: "C'è una garanzia?",
        a: "Sì! Garanzia Soddisfatti o Rimborsati di 30 giorni. Se non sei soddisfatto per qualsiasi motivo, ti rimborsiamo il 100%. Nessuna domanda, nessuna giustificazione. Zero rischi per te."
    },
    {
        q: "Il corso è adatto anche a persone over 50?",
        a: "Assolutamente sì! Abbiamo studenti di tutte le età. L'unico requisito è saper usare un computer base. Se riesci a guardare video su YouTube e scrivere su WhatsApp, sei già pronto. Daniel spiega tutto passo-passo, senza dare nulla per scontato."
    }
];

export const Home: React.FC<HomeProps> = ({ courses, onCourseSelect, user, landingConfig }) => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showFounderStory, setShowFounderStory] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Merge config with defaults
  const config = useMemo(() => {
    if (!landingConfig) return DEFAULT_CONFIG;
    
    // Check if the DB has old features data (less than 4 cards) and enforce defaults if so
    let featuresToUse = landingConfig.features_section;
    if (!featuresToUse || !featuresToUse.cards || featuresToUse.cards.length < 4) {
        featuresToUse = DEFAULT_CONFIG.features_section;
    }

    // Check if DB has old about section data (no mission points)
    let aboutToUse = landingConfig.about_section;
    if (!aboutToUse || !aboutToUse.mission_points || aboutToUse.mission_points.length === 0) {
        aboutToUse = { ...aboutToUse, mission_points: DEFAULT_CONFIG.about_section.mission_points };
    }

    // Check image size
    if (aboutToUse && !aboutToUse.quote_author_image_size) {
        aboutToUse.quote_author_image_size = 48; // Default fallback
    }

    const merged = {
        ...DEFAULT_CONFIG,
        ...landingConfig,
        announcement_bar: { ...DEFAULT_CONFIG.announcement_bar, ...(landingConfig.announcement_bar || {}) },
        hero: { 
            ...DEFAULT_CONFIG.hero, 
            ...(landingConfig.hero || {}),
            benefits: landingConfig.hero?.benefits || DEFAULT_CONFIG.hero.benefits 
        },
        ai_era_section: {
            ...DEFAULT_CONFIG.ai_era_section,
            ...(landingConfig.ai_era_section || {})
        },
        about_section: { ...DEFAULT_CONFIG.about_section, ...aboutToUse },
        features_section: { ...DEFAULT_CONFIG.features_section, ...featuresToUse },
        how_it_works_section: {
            ...DEFAULT_CONFIG.how_it_works_section,
            ...(landingConfig.how_it_works_section || {})
        },
        // LE SEZIONI TARGET E FILTRO SONO ORA HARDCODED E RIMOSSE DA QUI
        comparison_section: {
            ...DEFAULT_CONFIG.comparison_section,
            ...(landingConfig.comparison_section || {}),
            before_items: landingConfig.comparison_section?.before_items || DEFAULT_CONFIG.comparison_section?.before_items,
            after_items: landingConfig.comparison_section?.after_items || DEFAULT_CONFIG.comparison_section?.after_items,
        },
        testimonials_section: { ...DEFAULT_CONFIG.testimonials_section, ...(landingConfig.testimonials_section || {}) },
        usp_section: { ...DEFAULT_CONFIG.usp_section, ...(landingConfig.usp_section || {}) },
        cta_section: { ...DEFAULT_CONFIG.cta_section, ...(landingConfig.cta_section || {}) },
        footer: { 
            ...DEFAULT_CONFIG.footer, 
            ...(landingConfig.footer || {}),
            social_links: {
                ...DEFAULT_CONFIG.footer.social_links,
                ...(landingConfig.footer?.social_links || {})
            }
        }
    };

    // HOTFIX: Se il titolo che arriva dal DB contiene la vecchia dicitura, forziamo quella nuova
    if (merged.hero.title && merged.hero.title.includes("Costruiamo piattaforme")) {
        merged.hero.title = "Crea Siti Web Professionali o Piattaforme con l'AI in Poche Ore";
        merged.hero.subtitle = "Senza Scrivere Una Riga di Codice.";
    }

    return merged;
  }, [landingConfig]);

  const handleNavigateToCourses = () => {
    navigate('/courses');
  };

  const isSticky = config.announcement_bar.is_visible && config.announcement_bar.is_sticky;
  const heroPaddingClass = (config.announcement_bar.is_visible && !isSticky) 
    ? 'pt-20 lg:pt-32' 
    : 'pt-32 lg:pt-48';

  const titleParts = config.about_section.title.split("Moise Web Academy");
  const preTitle = titleParts[0] || "Perché nasce ";
  const brandTitle = "Moise Web Academy";

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* ANNOUNCEMENT BAR */}
      {config.announcement_bar.is_visible && (
        <div 
            className={`w-full z-40 overflow-hidden ${isSticky ? 'fixed top-20 shadow-md' : 'relative mt-20'}`}
            style={{ backgroundColor: config.announcement_bar.bg_color, color: config.announcement_bar.text_color }}
        >
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    display: inline-block;
                    white-space: nowrap;
                    animation: marquee 20s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className={`py-3 px-4 font-bold text-center text-sm md:text-base ${config.announcement_bar.type === 'marquee' ? 'whitespace-nowrap overflow-hidden' : ''}`}>
                {config.announcement_bar.type === 'marquee' ? (
                     <div className="animate-marquee w-full">
                         <span className="mx-8">{config.announcement_bar.text}</span>
                         <span className="mx-8">{config.announcement_bar.text}</span>
                         <span className="mx-8">{config.announcement_bar.text}</span>
                     </div>
                ) : (
                    <p>{config.announcement_bar.text}</p>
                )}
            </div>
        </div>
      )}

      {/* --- WRAPPER CONTINUO (HERO + AI ERA) --- */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
          
          {/* BACKGROUND CONDIVISO */}
          {config.hero.image_url ? (
             <div className="absolute inset-0 z-0">
               <img src={config.hero.image_url} alt="Background" className="w-full h-full object-cover opacity-30" />
               {/* Gradient Overlay unico per unire le sezioni */}
               <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
             </div>
          ) : (
             <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                 <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-600 rounded-full blur-[120px]"></div>
                 <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-900 rounded-full blur-[150px]"></div>
                 <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-blue-600 rounded-full blur-[150px]"></div>
                 {/* Grid Pattern overlay */}
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             </div>
          )}

          {/* 1. HERO CONTENT */}
          <section className={`relative z-10 pb-12 lg:pb-20 ${heroPaddingClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                {config.hero.show_badges && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 backdrop-blur border border-slate-700 text-brand-400 font-semibold text-xs sm:text-sm mb-8 uppercase tracking-wider shadow-lg">
                    <span className="flex h-2 w-2 bg-brand-500 rounded-full animate-pulse"></span>
                    Zero Abbonamenti • Zero Crediti AI • Zero Tool a Pagamento
                    </div>
                )}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
                  {config.hero.title}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400 block mt-2">
                    {config.hero.subtitle}
                  </span>
                </h1>

                {/* TESTO PERSONALIZZABILE */}
                {config.hero.text && (
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed mb-8 whitespace-pre-wrap">
                        {config.hero.text}
                    </p>
                )}

                {/* LISTA VANTAGGI CHECKLIST */}
                {config.hero.benefits && config.hero.benefits.length > 0 && (
                    <ul className="mt-8 mb-10 text-left max-w-lg mx-auto space-y-3">
                        {config.hero.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start text-lg text-slate-200 font-medium">
                                <div className="mt-1 mr-3 flex-shrink-0 bg-green-500/20 p-1 rounded-full">
                                    <Check className="h-4 w-4 text-green-400 stroke-[3]" />
                                </div>
                                {benefit}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={handleNavigateToCourses}
                    className="bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-500 hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] flex items-center justify-center group"
                  >
                    {config.hero.cta_primary} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                {config.hero.show_badges && (
                    <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-slate-400 font-medium">
                    <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-brand-500" /> Zero fuffa</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-brand-500" /> Acquisto Singolo</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-brand-500" /> Accesso a Vita</div>
                    </div>
                )}
              </div>
            </div>
          </section>

          {/* 1.5 AI ERA CONTENT (Integrata nello stesso sfondo) */}
          {config.ai_era_section?.is_visible !== false && (
              <section className="relative z-10 py-16 lg:py-24">
                 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-12">
                          <span className="inline-block py-1 px-3 rounded-full bg-brand-900/50 border border-brand-500/30 text-brand-300 font-bold tracking-widest text-xs uppercase mb-6 backdrop-blur-sm">
                              {config.ai_era_section?.subtitle}
                          </span>
                          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
                              {config.ai_era_section?.title}
                          </h2>
                      </div>

                      {/* Glassmorphism Card for Text */}
                      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                          <div className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium whitespace-pre-wrap space-y-6">
                              {/* Rendering avanzato del testo */}
                              {config.ai_era_section?.text.split('\n').map((line, i) => {
                                  if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
                                      return (
                                          <div key={i} className="flex items-start gap-3 ml-4 my-3">
                                              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0 shadow-[0_0_10px_#60a5fa]"></div>
                                              <span className="text-white font-semibold">{line.replace(/^[-•]\s*/, '')}</span>
                                          </div>
                                      );
                                  }
                                  if (line.trim().endsWith('?')) {
                                      return <p key={i} className="text-brand-300 font-bold text-2xl mt-8 text-center">{line}</p>;
                                  }
                                  if (line.trim() === '') return <br key={i} />;
                                  return <p key={i} className="mb-4">{line}</p>;
                              })}
                          </div>
                      </div>
                 </div>
              </section>
          )}
      </div>

      {/* SECTION 1 - About / Mission */}
      {config.about_section.is_visible && (
        <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    
                    {/* LEFT COLUMN: Image & Quote Card */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative rounded-3xl overflow-hidden h-[600px] w-full shadow-lg">
                            <img 
                                src={config.about_section.image_url} 
                                alt="About Us" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-8 right-0 md:-right-12 w-[90%] md:w-[450px] bg-white p-8 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 z-20 mx-4 md:mx-0">
                            <Quote className="h-10 w-10 text-slate-900 mb-6 stroke-[1.5]" />
                            <p className="font-bold text-slate-900 text-xl md:text-2xl leading-snug italic mb-8">
                                {config.about_section.quote}
                            </p>
                            <div className="flex gap-4" style={{ alignItems: config.about_section.quote_author_image_alignment || 'center' }}>
                                <div 
                                    className="bg-blue-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-sm overflow-hidden flex-shrink-0 relative"
                                    style={{ 
                                        width: `${config.about_section.quote_author_image_size || 48}px`, 
                                        height: `${config.about_section.quote_author_image_size || 48}px`,
                                    }}
                                >
                                    {config.about_section.quote_author_image ? (
                                        <img 
                                            src={config.about_section.quote_author_image} 
                                            alt={config.about_section.quote_author} 
                                            className="w-full h-full object-cover" 
                                            style={{ 
                                                transform: `scale(${config.about_section.quote_author_image_scale || 1}) translate(${config.about_section.quote_author_image_offset_x || 0}px, ${config.about_section.quote_author_image_offset_y || 0}px)`
                                            }}
                                        />
                                    ) : (
                                        "DM"
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 uppercase tracking-wider">{config.about_section.quote_author}</p>
                                    <p className="text-xs text-slate-500 font-medium">Founder, Moise Web Academy</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Text & List */}
                    <div className="w-full lg:w-1/2 lg:pt-8">
                        <div className="inline-flex items-center px-3 py-1.5 rounded bg-blue-50 text-brand-600 font-bold text-xs uppercase tracking-widest mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mr-2"></span>
                            {config.about_section.subtitle}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
                            {preTitle}
                            <span className="text-brand-600 block">{brandTitle}</span>
                        </h2>
                        <div className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                           {config.about_section.text.split("\n\n")[0]} 
                           {config.about_section.text.includes("fastidio") && !config.about_section.text.endsWith("fastidio:") && (
                               <p className="mt-4">Nel mercato della formazione c'è una cosa che ci ha sempre dato fastidio:</p>
                           )}
                        </div>
                        {config.about_section.mission_points && config.about_section.mission_points.length > 0 && (
                            <div className="bg-white rounded-2xl p-8 mb-10 border border-slate-200 shadow-sm">
                                <ul className="space-y-4">
                                    {config.about_section.mission_points.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                                                <X className="w-3.5 h-3.5 text-red-500 stroke-[3]" />
                                            </div>
                                            <span className="text-slate-700 font-medium text-lg leading-snug">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="flex gap-4 items-start pl-0">
                            <div className="w-1 self-stretch bg-brand-600 rounded-full"></div>
                            <div>
                                <h4 className="text-xl font-black text-slate-900 mb-2">Noi facciamo l’opposto.</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    In questa Academy vi insegniamo a creare tutto ciò che serve nel digitale usando strumenti a <strong>costo zero</strong>. Non pagate abbonamenti. Non servono crediti AI. Zero spese nascoste.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )}

      {/* SECTION 2 - Features Grid + COURSES PREVIEW */}
      {config.features_section.is_visible && (
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">{config.features_section.title}</h2>
                    <p className="text-xl text-slate-500">{config.features_section.subtitle}</p>
                </div>

                {/* FEATURES CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {config.features_section.cards.map((card, idx) => {
                        const IconComponent = IconMap[card.icon] || Star;
                        const colorTheme = CARD_COLORS[idx % CARD_COLORS.length];
                        const featuresList = card.desc.split('\n').filter(s => s.trim() !== '');

                        return (
                            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] transition-all duration-300 h-full flex flex-col">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${colorTheme.bg}`}>
                                    <IconComponent className={`h-8 w-8 ${colorTheme.text}`} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">{card.title}</h3>
                                
                                <div className="space-y-4 mt-auto">
                                    {featuresList.map((item, i) => (
                                        <div key={i} className="flex items-start">
                                            <div className="mt-1 mr-3 flex-shrink-0">
                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            </div>
                                            <span className="text-slate-600 text-sm font-medium leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* --- COURSES LIST RE-DESIGN --- */}
                <div className="border-t border-gray-100 pt-20 pb-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">I Nostri Corsi Più Popolari</h2>
                            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                                Scelti da migliaia di studenti per qualità e completezza dei contenuti
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.map(course => {
                                // Simulate pricing logic for display
                                const displayPrice = course.price;
                                const fakeOriginalPrice = Math.round(course.price * 1.4);
                                const discountPercent = Math.round(((fakeOriginalPrice - displayPrice) / fakeOriginalPrice) * 100);

                                return (
                                    <div key={course.id} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer" onClick={() => onCourseSelect(course.id)}>
                                        
                                        {/* Image Header */}
                                        <div className="relative h-56 overflow-hidden">
                                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                                                
                                                {/* Level Badge */}
                                                <div className="absolute top-4 left-4 bg-green-100/90 backdrop-blur text-green-800 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm">
                                                {course.level}
                                                </div>

                                                {/* Discount Badge */}
                                                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                                                -{discountPercent}%
                                                </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            
                                            {/* Category & Rating */}
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                                    Web Development
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                    <span className="text-sm font-bold text-slate-700">4.9</span>
                                                    <span className="text-xs text-slate-400">(120)</span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3 className="font-bold text-2xl text-slate-900 mb-3 leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">
                                                {course.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                                                {course.description}
                                            </p>
                                            
                                            {/* Author (Mock) */}
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Instructor" className="h-full w-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">Daniel Moise</p>
                                                    <p className="text-xs text-slate-500">Senior Developer</p>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-100 my-4"></div>

                                            {/* Stats Grid */}
                                            <div className="grid grid-cols-3 gap-2 text-xs text-slate-500 font-medium mb-6">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="h-4 w-4 text-brand-500" />
                                                    {course.duration}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <BookOpen className="h-4 w-4 text-brand-500" />
                                                    {course.lessons || course.lessons_content?.length || 0} Lez.
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Users className="h-4 w-4 text-brand-500" />
                                                    1.2k+
                                                </div>
                                            </div>
                                            
                                            {/* Footer: Price & Button */}
                                            <div className="mt-auto flex items-center justify-between gap-4">
                                                <div className="flex flex-col">
                                                    <span className="text-3xl font-black text-brand-600">€{displayPrice}</span>
                                                    <span className="text-sm text-slate-400 line-through font-medium">€{fakeOriginalPrice},00</span>
                                                </div>
                                                <button className="bg-brand-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/30 hover:-translate-y-0.5 active:translate-y-0">
                                                    Scopri di più
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
          </section>
      )}

      {/* --- HOW IT WORKS --- */}
      {config.how_it_works_section?.is_visible !== false && (
          <section className="py-24 bg-white border-t border-gray-100 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                      <span className="text-brand-600 font-bold tracking-wider uppercase text-sm mb-2 block">{config.how_it_works_section?.subtitle}</span>
                      <h2 className="text-3xl md:text-5xl font-black text-slate-900">{config.how_it_works_section?.title}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                      {/* Connection Line (Desktop) */}
                      <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gray-100 z-0"></div>

                      {(config.how_it_works_section?.steps || []).map((step, idx) => {
                          const IconComponent = IconMap[step.icon] || BookOpen;
                          return (
                              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 shadow-lg flex items-center justify-center mb-6 relative group hover:border-brand-300 hover:scale-110 transition-all duration-300">
                                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold shadow-md text-sm">
                                          {idx + 1}
                                      </div>
                                      <IconComponent className="h-8 w-8 text-slate-700 group-hover:text-brand-600 transition-colors" />
                                  </div>
                                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                  <p className="text-slate-600 leading-relaxed text-sm md:text-base px-4">
                                      {step.desc}
                                  </p>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </section>
      )}

      {/* --- NEW SECTION (HARDCODED): PER CHI È (TARGET) --- */}
      <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                      Moise Web Academy È Perfetto Per Te Se...
                  </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                      { title: 'Sei un imprenditore o titolare di attività', desc: 'Vuoi il tuo sito professionale senza spendere migliaia di euro e restare autonomo per sempre. Niente più dipendenze da agenzie o tecnici per ogni piccola modifica.' },
                      { title: 'Cerchi un lavoro extra (o principale) da casa', desc: 'Vuoi offrire servizi di creazione siti web e guadagnare €1.000-5.000 per progetto. Ti servono solo un laptop e una connessione internet.' },
                      { title: 'Sei un freelancer o consulente', desc: 'Vuoi aggiungere una competenza ad alto valore al tuo portfolio e aumentare le tue entrate del 30-50% offrendo anche la creazione di siti web ai tuoi clienti.' },
                      { title: 'Vuoi lanciare il tuo progetto digitale', desc: 'Hai un\'idea (e-commerce, piattaforma, corso online, membership) ma i costi di sviluppo ti bloccano. Con questo corso la realizzi da solo, senza limiti.' },
                      { title: 'Parti completamente da zero', desc: 'Non hai MAI creato un sito web? Perfetto. Il corso è pensato proprio per chi non sa nemmeno cosa sia l\'HTML o il CSS. Partiamo dalle basi assolute.' },
                      { title: 'Vuoi libertà geografica e temporale', desc: 'Lavoro da remoto, orari flessibili, nessun capo. I web creator professionisti guadagnano bene lavorando da dove vogliono, quando vogliono.' }
                  ].map((item, idx) => (
                      <div key={idx} className="p-8 bg-green-50 rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
                          <div className="mb-4">
                              <CheckCircle className="h-10 w-10 text-green-600" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                          <p className="text-slate-600 leading-relaxed font-medium">
                              {item.desc}
                          </p>
                      </div>
                  ))}
              </div>

              <div className="mt-16 text-center">
                  <button 
                      onClick={handleNavigateToCourses}
                      className="bg-brand-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/30 inline-flex items-center group"
                  >
                      Questo Sono Io - Voglio Iniziare → <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>
          </div>
      </section>

      {/* --- NEW SECTION (HARDCODED): PER CHI NON È (FILTRO) --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 opacity-5 rounded-full -mr-12 -mt-12 blur-3xl"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                      Questo Corso NON È Per Te Se...
                  </h2>
                  <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-6">
                  {[
                      { title: 'Cerchi la bacchetta magica', desc: 'L\'AI è potentissima, ma devi imparare a usarla nel modo giusto. Servono alcune ore per seguire i video e fare pratica. Se cerchi “soldi facili” senza impegno, questo corso non fa per te.' },
                      { title: 'Vuoi che qualcuno faccia tutto al posto tuo', desc: 'Questo è un corso formativo, non un servizio. Ti insegniamo a creare, non creiamo noi per te. Ti diamo la canna da pesca, non il pesce già pronto.' },
                      { title: 'Pensi che l\'AI faccia tutto da sola automaticamente', desc: 'L’intelligenza artificiale è uno strumento incredibile, ma serve sapere COME guidarla con i prompt giusti. È come avere una Ferrari: se non sai guidare, non ti serve a nulla.' },
                      { title: 'Vuoi diventare un programmatore "classico"', desc: 'Se il tuo sogno è scrivere migliaia di righe di codice a mano e diventare uno sviluppatore tradizionale, questo non è il percorso giusto. Noi ti insegniamo a creare siti professionali senza programmare.' },
                      { title: 'Non sei disposto a investire su te stesso', desc: '50-100€ sono meno di una cena fuori per due. Se non sei pronto a investire questa cifra simbolica per acquisire una competenza che può farti guadagnare migliaia di euro, probabilmente non sei ancora pronto.' }
                  ].map((item, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="shrink-0">
                              <XCircle className="h-8 w-8 text-red-500" />
                          </div>
                          <div>
                              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                              <p className="text-slate-400 leading-relaxed font-medium">
                                  {item.desc}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
              
              <div className="mt-12 p-6 bg-brand-900/30 border border-brand-500/30 rounded-xl text-center">
                  <p className="text-lg text-brand-200 font-medium">
                      Se invece ti riconosci nella sezione “Per Chi È”, allora sei nel posto giusto. Benvenuto! 👊
                  </p>
              </div>
          </div>
      </section>

      {/* --- COMPARISON SECTION (BEFORE / AFTER) --- */}
      {config.comparison_section?.is_visible !== false && (
         <section className="py-24 bg-slate-50 border-t border-slate-200">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center max-w-4xl mx-auto mb-16">
                     <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{config.comparison_section?.title || "La Tua Vita Prima e Dopo Moise Web Academy"}</h2>
                     <p className="text-xl text-slate-600 font-medium">
                        {config.comparison_section?.subtitle || "Non è solo un corso. È un cambio di prospettiva sulla tua autonomia e sulle tue possibilità."}
                     </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* BEFORE COLUMN */}
                     <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
                         <h3 className="text-2xl font-black text-red-600 mb-8 flex items-center">
                             <XCircle className="h-8 w-8 mr-3" />
                             {config.comparison_section?.before_title || "PRIMA (Senza il corso)"}
                         </h3>
                         <ul className="space-y-6">
                             {(config.comparison_section?.before_items || []).map((item, idx) => (
                                 <li key={idx} className="flex items-start gap-4">
                                     <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                                     <span className="text-slate-600 text-lg font-medium leading-snug">{item}</span>
                                 </li>
                             ))}
                         </ul>
                     </div>

                     {/* AFTER COLUMN */}
                     <div className="bg-white rounded-3xl p-8 md:p-10 border border-green-200 shadow-xl ring-1 ring-green-100 relative overflow-hidden transform md:-translate-y-4">
                         <div className="absolute top-0 left-0 w-full h-2 bg-brand-600"></div>
                         <h3 className="text-2xl font-black text-brand-600 mb-8 flex items-center">
                             <CheckCircle2 className="h-8 w-8 mr-3 fill-brand-100" />
                             {config.comparison_section?.after_title || "DOPO (Con il corso)"}
                         </h3>
                         <ul className="space-y-6">
                             {(config.comparison_section?.after_items || []).map((item, idx) => (
                                 <li key={idx} className="flex items-start gap-4">
                                     <div className="bg-brand-100 rounded-full p-1 flex-shrink-0 mt-0.5">
                                        <Check className="h-4 w-4 text-brand-700" strokeWidth={4} />
                                     </div>
                                     <span className="text-slate-900 text-lg font-bold leading-snug">{item}</span>
                                 </li>
                             ))}
                         </ul>
                     </div>
                 </div>
             </div>
         </section>
      )}

      {/* SECTION 3 - Testimonials */}
      {config.testimonials_section.is_visible && (
        <section className="py-24 bg-white overflow-hidden border-t border-gray-100">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-brand-600 font-bold tracking-wider uppercase text-sm">{config.testimonials_section.subtitle}</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-2">{config.testimonials_section.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {config.testimonials_section.reviews.map((review, idx) => (
                         <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
                             <Quote className="h-8 w-8 text-brand-200 absolute top-6 right-6" />
                             <p className="text-slate-600 text-lg mb-6 leading-relaxed italic">"{review.text}"</p>
                             <div className="flex items-center gap-4">
                                 <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xl">
                                     {review.avatar ? (
                                         <img src={review.avatar} alt={review.name} className="w-full h-full rounded-full object-cover" />
                                     ) : (
                                         review.name.charAt(0)
                                     )}
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-slate-900">{review.name}</h4>
                                     <p className="text-xs text-brand-600 font-semibold uppercase">{review.role}</p>
                                 </div>
                             </div>
                         </div>
                    ))}
                </div>
             </div>
        </section>
      )}

      {/* SECTION 4 - USP */}
      {config.usp_section.is_visible && (
          <section className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">{config.usp_section.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {config.usp_section.items.map((item, idx) => (
                        <div key={idx} className="flex gap-6 p-6 rounded-2xl hover:bg-white transition-colors border border-transparent hover:shadow-lg">
                            <div className="shrink-0">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </section>
      )}

      {/* SECTION - FOUNDER STORY (CHI SONO) */}
      <section className="py-12 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div 
                  onClick={() => setShowFounderStory(!showFounderStory)}
                  className="cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl p-6 md:p-8 flex items-center justify-between transition-all group shadow-sm hover:shadow-md"
              >
                  <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-brand-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                          {/* Fallback image or initials if no image provided in config, specifically for Daniel */}
                           <span className="font-bold text-brand-700 text-xl">DM</span>
                      </div>
                      <div>
                          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors">
                              CHI SONO
                          </h2>
                          <p className="text-slate-500 text-sm font-medium">Scopri la storia del tuo istruttore</p>
                      </div>
                  </div>
                  <div className={`transform transition-transform duration-300 ${showFounderStory ? 'rotate-180' : ''}`}>
                      <ChevronDown className="h-8 w-8 text-slate-400 group-hover:text-brand-600" />
                  </div>
              </div>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFounderStory ? 'max-h-[2000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                  <div className="prose prose-lg text-slate-600 leading-relaxed">
                      <p className="font-bold text-slate-900 text-xl mb-6">
                          Ciao, sono Daniel Moise, fondatore di Moise Web Academy.
                      </p>
                      <p className="mb-4">
                          Da diversi anni aiuto persone e aziende a portare i loro progetti online. Ho creato decine di siti web per clienti in tutta Italia, dall'e-commerce per un brand di moda al gestionale personalizzato per un AUTOFFICINA
                      </p>
                      <p className="mb-4">
                          Quando ho scoperto il potenziale dell'intelligenza artificiale per la creazione di siti web, ho capito subito che era una rivoluzione totale.
                      </p>
                      <p className="mb-4 font-medium text-slate-800">
                          Quello che prima mi richiedeva giorni o settimane di lavoro, ora lo faccio in poche ore. E soprattutto: senza scrivere codice.
                      </p>
                      <p className="mb-4">
                          Ma c'era un problema.
                      </p>
                      <p className="mb-4">
                          Tutte le risorse erano in inglese, frammentate su mille piattaforme diverse, troppo tecniche per chi partiva da zero.
                      </p>
                      <p className="mb-8">
                          Così ho deciso di creare Moise Web Academy: il primo corso in italiano completo, passo-passo, che insegna a chiunque - anche senza alcuna esperienza - a creare siti web professionali usando l'intelligenza artificiale.
                      </p>

                      <div className="bg-brand-50 border-l-4 border-brand-500 p-6 rounded-r-xl mb-8">
                          <h3 className="flex items-center text-xl font-bold text-brand-800 mb-2">
                              <span className="text-2xl mr-2">🎯</span> La mia missione?
                          </h3>
                          <p className="text-brand-900">
                              Democratizzare la creazione web. Renderti autonomo. Darti una competenza ad alto valore che può cambiare concretamente la tua vita, sia che tu voglia risparmiare migliaia di euro per la tua attività, sia che tu voglia creare un business online da zero.
                          </p>
                      </div>

                      <div className="mt-8 pt-8 border-t border-slate-200">
                          <p className="mb-4">
                              Se sei arrivato fin qui, significa che sei pronto per il prossimo passo.
                          </p>
                          <p className="mb-4">
                              Non serve esperienza. Non serve saper programmare.
                              <br/>Serve solo la voglia di imparare e mettersi in gioco.
                          </p>
                          <p className="font-bold text-slate-900 text-xl">
                              Ci vediamo dentro il corso! 👊
                          </p>
                          <p className="text-slate-500 italic mt-2">
                              — Daniel
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* SECTION - GUARANTEE (HARDCODED) */}
      <section className="py-24 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-block p-4 rounded-full bg-yellow-100 mb-6">
                  <ShieldCheck className="h-12 w-12 text-yellow-600" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                  Garanzia Soddisfatti o Rimborsati 30 Giorni
              </h2>
              
              <p className="text-xl text-brand-600 font-bold mb-8">
                  Zero rischi per te. Tutto il vantaggio dalla tua parte.
              </p>

              <div className="text-lg text-slate-600 leading-relaxed mb-10">
                  <p className="mb-6 font-medium">
                      Siamo così sicuri che Moise Web Academy cambierà il tuo modo di vedere la creazione di siti web che ti offriamo una garanzia totale di 30 giorni.
                      <br/>Hai un mese intero per:
                  </p>
                  
                  <ul className="text-left max-w-lg mx-auto space-y-3 mb-8">
                      {[
                          'Seguire tutto il corso al tuo ritmo',
                          'Creare i tuoi primi progetti e testare ogni lezione',
                          'Mettere in pratica tutto ciò che impari',
                          'Vedere con i tuoi occhi i risultati'
                      ].map((item, idx) => (
                          <li key={idx} className="flex items-start">
                              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                              <span className="font-medium text-slate-700">{item}</span>
                          </li>
                      ))}
                  </ul>

                  <p className="mb-4">
                      Se per QUALSIASI motivo non sei soddisfatto, ti rimborsiamo ogni centesimo. Nessuna domanda, nessuna giustificazione, nessuna discussione.
                  </p>
                  <p className="mb-8 font-bold text-slate-800">
                      Basta una semplice email e riavrai indietro il 100% di quello che hai pagato.
                  </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-brand-600"></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-wide">La nostra promessa</h3>
                  <p className="text-xl md:text-2xl text-brand-700 font-black italic">
                      "O impari a creare siti web professionali con l'AI, o non paghi nulla."
                  </p>
              </div>

              <div className="text-lg text-slate-600 mb-12 font-medium space-y-2">
                  <p>Semplice. Chiaro. Onesto.</p>
                  <p className="font-bold text-slate-900">Zero rischi. Solo opportunità.</p>
                  <p className="text-slate-500 text-base pt-4">
                      L'unica cosa che puoi perdere è il tempo che passi a rimandarla a domani.
                  </p>
              </div>

              <button 
                  onClick={handleNavigateToCourses}
                  className="bg-brand-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/30 inline-flex items-center group transform hover:scale-105"
              >
                  ACCEDI ORA <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>
          </div>
      </section>

      {/* --- SECTION FAQ (NUOVA) --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                      Domande Frequenti
                  </h2>
                  <p className="text-xl text-slate-500">
                      Tutte le risposte che cerchi prima di iniziare
                  </p>
              </div>

              <div className="space-y-4">
                  {FAQ_ITEMS.map((item, idx) => (
                      <div 
                          key={idx} 
                          className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
                      >
                          <button 
                              onClick={() => toggleFaq(idx)}
                              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                          >
                              <div className="flex items-start gap-4">
                                  <span className="text-2xl flex-shrink-0 select-none">❓</span>
                                  <span className={`text-lg font-bold ${openFaqIndex === idx ? 'text-brand-600' : 'text-slate-800'}`}>
                                      {item.q}
                                  </span>
                              </div>
                              {openFaqIndex === idx ? (
                                  <ChevronUp className="h-5 w-5 text-brand-500 flex-shrink-0 ml-4" />
                              ) : (
                                  <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0 ml-4" />
                              )}
                          </button>
                          
                          {openFaqIndex === idx && (
                              <div className="px-6 pb-6 pl-16">
                                  <div className="text-slate-600 text-lg leading-relaxed border-l-2 border-brand-100 pl-4">
                                      {item.a}
                                  </div>
                              </div>
                          )}
                      </div>
                  ))}
              </div>

              <div className="mt-16 text-center">
                  <button 
                      onClick={handleNavigateToCourses}
                      className="bg-brand-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/30 inline-flex items-center group transform hover:scale-105"
                  >
                      Ho Capito, Voglio Iniziare Ora →
                  </button>
              </div>
          </div>
      </section>

      {/* SECTION 7 - CTA FINALE */}
      {config.cta_section.is_visible && (
        <section className="py-24 bg-brand-600 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-12 -mt-12 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 opacity-20 rounded-full -ml-12 -mb-12 blur-3xl"></div>
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                    {config.cta_section.title}
                </h2>
                <p className="text-xl md:text-2xl text-brand-100 mb-10 font-medium">
                    {config.cta_section.subtitle}
                </p>
                <div className="flex justify-center">
                    <button 
                        onClick={handleNavigateToCourses}
                        className="bg-white text-brand-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-slate-100 transition-all shadow-xl shadow-brand-800/20"
                    >
                        {config.cta_section.button_text}
                    </button>
                </div>
            </div>
        </section>
      )}

      {/* FOOTER CUSTOM (RICHIESTO DA UTENTE) */}
      {config.footer.is_visible && (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8 text-sm font-sans text-gray-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                             <img 
                                src="https://res.cloudinary.com/dhj0ztos6/image/upload/v1764867375/mwa_trasparente_thl6fk.png" 
                                alt="MWA Logo" 
                                style={{ 
                                    height: `${config.footer.logo_height || 40}px`,
                                    marginTop: `${config.footer.logo_margin_top || 0}px`,
                                    marginBottom: `${config.footer.logo_margin_bottom || 0}px`,
                                    marginLeft: `${config.footer.logo_margin_left || 0}px`,
                                    marginRight: `${config.footer.logo_margin_right || 0}px`,
                                }}
                                className="w-auto object-contain"
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 text-base">Piattaforma sviluppata da</p>
                            <p className="text-brand-600 font-bold text-lg">Moise Web Srl</p>
                        </div>
                        <p className="text-xs text-gray-500 font-mono bg-gray-100 inline-block px-2 py-1 rounded">P.IVA: RO50469659</p>
                        
                        <div className="flex gap-4 mt-4">
                            {config.footer.social_links?.facebook && (
                                <a href={config.footer.social_links.facebook} target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-brand-600 hover:text-white transition-all"><Facebook className="h-4 w-4" /></a>
                            )}
                            {config.footer.social_links?.instagram && (
                                <a href={config.footer.social_links.instagram} target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-brand-600 hover:text-white transition-all"><Instagram className="h-4 w-4" /></a>
                            )}
                            {config.footer.social_links?.linkedin && (
                                <a href={config.footer.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-brand-600 hover:text-white transition-all"><Linkedin className="h-4 w-4" /></a>
                            )}
                            {config.footer.social_links?.youtube && (
                                <a href={config.footer.social_links.youtube} target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-brand-600 hover:text-white transition-all"><Youtube className="h-4 w-4" /></a>
                            )}
                        </div>
                    </div>

                    {/* Sedi Operative */}
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-6">Sedi Operative</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3 group">
                                <div className="bg-brand-50 p-2 rounded-lg text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                    <MapPin className="w-5 h-5 shrink-0" />
                                </div>
                                <div>
                                    <span className="block font-bold text-gray-900 mb-1">1. Sede Legale</span>
                                    <span className="text-gray-600">București (RO)</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="bg-brand-50 p-2 rounded-lg text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                    <MapPin className="w-5 h-5 shrink-0" />
                                </div>
                                <div>
                                    <span className="block font-bold text-gray-900 mb-1">2. Sede Secondaria</span>
                                    <span className="text-gray-600">Bergamo (BG)</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Contatti */}
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-6">Contatti</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                                <a href="tel:+393473127082" className="hover:text-brand-600 transition-colors font-medium">+39 347 312 7082</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                                <a href="tel:+393772334192" className="hover:text-brand-600 transition-colors font-medium">+39 377 233 4192</a>
                            </li>
                            <li className="flex items-center gap-3 pt-2">
                                <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                                <a href="mailto:info@mwacademy.eu" className="hover:text-brand-600 transition-colors break-all">info.moisewebaccademy@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Supporto */}
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-6">Link Utili</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-brand-600 transition-colors">Tutti i Corsi</a></li>
                            <li><a href="#" className="hover:text-brand-600 transition-colors">Chi Siamo</a></li>
                            <li><a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-brand-600 transition-colors">Termini & Condizioni</a></li>
                            <li><a href="#" className="hover:text-brand-600 transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        &copy; {new Date().getFullYear()} Moise Web Academy. Tutti i diritti riservati.
                    </p>
                    <div className="flex gap-4">
                        {/* Placeholder Icons SVG per carte di credito - Colori Originali */}
                        <svg className="h-8" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.3 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.7 0 35 0Z" fill="#2563EB"/><path d="M12.5 10.5H16.5" stroke="white" strokeWidth="2"/><path d="M21.5 10.5H25.5" stroke="white" strokeWidth="2"/><circle cx="8" cy="12" r="3" fill="white" opacity="0.5"/><text x="14" y="16" fill="white" fontSize="8" fontWeight="bold">VISA</text></svg>
                        <svg className="h-8" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.3 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.7 0 35 0Z" fill="#111"/><circle cx="13" cy="12" r="6" fill="#EB001B"/><circle cx="25" cy="12" r="6" fill="#F79E1B" fillOpacity="0.8"/></svg>
                        <svg className="h-8" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.3 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.7 0 35 0Z" fill="white" stroke="#E5E7EB"/><path d="M10 7.5L14 7.5L12 17.5" fill="#253B80"/><path d="M22 7.5H18L16 17.5H19L22 7.5Z" fill="#179BD7"/><text x="24" y="16" fill="#253B80" fontSize="8" fontWeight="bold">PayPal</text></svg>
                    </div>
                </div>
            </div>
        </footer>
      )}
    </div>
  );
};
