
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Course, UserProfile, LandingPageConfig } from '../types';
import { CheckCircle, ArrowRight, ShieldCheck, Zap, Database, Layout, Target, Cpu, Layers, Users, Lock, Quote, Star, Award, Smartphone, MessageCircle, CheckCircle2, X, PlayCircle, BookOpen, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, CreditCard, Check, XCircle, Banknote, Rocket, TrendingUp, UserCheck, AlertTriangle, ChevronDown, ChevronUp, HelpCircle, Clock, Video, Image, Upload, Sparkles, Monitor, Loader2, ExternalLink, MoveHorizontal, Laptop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  courses: Course[];
  onCourseSelect: (courseId: string) => void;
  user?: UserProfile | null;
  landingConfig?: LandingPageConfig;
}

// --- COMPONENTI INTERNI ---

const WebsiteCard: React.FC<{ url: string; index: number; isMobileView: boolean }> = ({ url, index, isMobileView }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isInteracting, setIsInteracting] = useState(false);
    const [scale, setScale] = useState(1);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    
    const TARGET_WIDTH = isMobileView ? 375 : 1280; 
    const VIRTUAL_HEIGHT = 5000;       
    const BASE_SPEED = 0.6;            

    const directionRef = useRef<number>(index % 2 === 0 ? 1 : -1);

    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.clientWidth;
            const newScale = containerWidth / TARGET_WIDTH;
            setScale(newScale);
        };

        handleResize();
        setTimeout(handleResize, 100);
        window.addEventListener('resize', handleResize);
        
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, [TARGET_WIDTH, isMobileView]);

    useEffect(() => {
        if (!isLoading && scrollRef.current && directionRef.current === -1) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
        }
    }, [isLoading]);

    useEffect(() => {
        const animate = () => {
            if (isVisible && !isInteracting && !isLoading && scrollRef.current) {
                const el = scrollRef.current;
                const maxScroll = el.scrollHeight - el.clientHeight;
                
                let newScrollTop = el.scrollTop + (BASE_SPEED * directionRef.current);

                if (newScrollTop >= maxScroll) {
                    newScrollTop = maxScroll;
                    directionRef.current = -1; 
                } else if (newScrollTop <= 0) {
                    newScrollTop = 0;
                    directionRef.current = 1; 
                }

                el.scrollTop = newScrollTop;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current!);
    }, [isVisible, isInteracting, isLoading]);

    if (!isMobileView) {
        return (
            <div 
                className="w-[500px] h-[330px] relative group flex-shrink-0 mx-6 perspective-1000"
                onMouseEnter={() => setIsInteracting(true)}
                onMouseLeave={() => setIsInteracting(false)}
                onTouchStart={() => setIsInteracting(true)}
                onTouchEnd={() => setIsInteracting(false)}
            >
                <div className="absolute inset-x-0 top-0 bottom-4 bg-gray-800 rounded-t-xl rounded-b-md border-[3px] border-gray-700 shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">
                    <div className="h-6 bg-gray-900 flex justify-center items-center relative z-20 shrink-0">
                        <div className="w-1.5 h-1.5 bg-black rounded-full ring-1 ring-gray-700"></div>
                        <div className="absolute left-3 top-1.5 flex gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                    </div>

                    <div ref={containerRef} className="relative flex-1 bg-white w-full overflow-hidden">
                        {isLoading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-30">
                                <Loader2 className="h-8 w-8 text-brand-600 animate-spin mb-2" />
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Caricamento Desktop...</span>
                            </div>
                        )}
                        
                        <div 
                            style={{
                                width: TARGET_WIDTH,
                                height: `calc(100% / ${scale})`,
                                transform: `scale(${scale})`,
                                transformOrigin: 'top left',
                            }}
                            className="absolute top-0 left-0 bg-white"
                        >
                            <div 
                                ref={scrollRef}
                                className="w-full h-full overflow-y-auto scrollbar-hide"
                                style={{ scrollBehavior: 'auto', overscrollBehavior: 'contain' }} 
                            >
                                <div style={{ height: VIRTUAL_HEIGHT }} className="w-full relative">
                                    <iframe 
                                        src={url} 
                                        className="w-full h-full border-none pointer-events-none block" 
                                        loading="lazy"
                                        scrolling="no"
                                        onLoad={() => setIsLoading(false)}
                                        title="Desktop Preview"
                                        sandbox="allow-scripts allow-same-origin"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="absolute bottom-0 inset-x-[-20px] h-4 bg-gray-300 rounded-b-xl rounded-t-sm shadow-xl flex items-center justify-center border-t border-gray-400/50 gradient-to-b from-gray-200 to-gray-400">
                    <div className="w-20 h-1.5 bg-gray-400/30 rounded-full"></div>
                </div>
                
                <a href={url} target="_blank" rel="noopener noreferrer" className="absolute top-3 right-3 z-30 text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 p-2 bg-black/50 rounded-full backdrop-blur-sm">
                    <ExternalLink className="h-4 w-4" />
                </a>
            </div>
        );
    }

    return (
        <div 
            ref={containerRef}
            className="w-[260px] h-[480px] relative group flex-shrink-0 rounded-[2.5rem] border-[6px] border-slate-800 bg-slate-900 shadow-2xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.01] mx-4"
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setIsInteracting(false)}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-800 rounded-b-xl z-20 flex justify-center items-center">
                <div className="w-10 h-1 bg-slate-700 rounded-full"></div>
            </div>

            <div className="w-full h-full bg-white relative overflow-hidden rounded-[2rem]">
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-30">
                        <Loader2 className="h-8 w-8 text-brand-600 animate-spin mb-2" />
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Caricamento Mobile...</span>
                    </div>
                )}

                <div 
                    style={{
                        width: TARGET_WIDTH,
                        height: `calc(100% / ${scale})`,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                    }}
                    className="absolute top-0 left-0 bg-white"
                >
                    <div 
                        ref={scrollRef}
                        className="w-full h-full overflow-y-auto scrollbar-hide"
                        style={{ scrollBehavior: 'auto', overscrollBehavior: 'contain' }} 
                    >
                        <div style={{ height: VIRTUAL_HEIGHT }} className="w-full relative">
                            <iframe 
                                src={url} 
                                className="w-full h-full border-none pointer-events-none block" 
                                loading="lazy"
                                scrolling="no"
                                onLoad={() => setIsLoading(false)}
                                title="Mobile Preview"
                                sandbox="allow-scripts allow-same-origin"
                            ></iframe>
                        </div>
                    </div>
                </div>

                <a href={url} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 z-20 bg-black/80 text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="h-4 w-4" />
                </a>
            </div>
        </div>
    );
};

const DEFAULT_CONFIG: LandingPageConfig = {
  announcement_bar: {
    text: '🎉 Offerta lancio: Tutti i corsi al 50% di sconto per i primi 100 iscritti!',
    is_visible: false,
    is_sticky: false,
    type: 'static',
    bg_color: '#fbbf24',
    text_color: '#1e3a8a'
  },
  hero: {
    title: "Crea Siti Web Professionali o Piattaforme con l'AI in Poche Ore",
    subtitle: 'Senza Scrivere Una Riga di Codice.',
    cta_primary: 'Scopri i corsi disponibili',
    cta_secondary: '',
    image_url: '', 
    benefits: [
        "Accesso a vita ai contenuti",
        "Assistenza 7 giorni su 7",
        "Nessuna esperienza richiesta",
        "Accesso alla community",
        "Supporto PERSONALE diretto su whatsapp",
        "Soddisfatto o rimborsato in 30 giorni"
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
    subtitle: 'CHI SIAMO',
    text: "Moise Web Academy nasce per rendere semplice ciò che sembra complesso.\nIn un mondo in cui creare siti e piattaforme digitali è sempre più fondamentale, vogliamo dimostrare che non serve essere programmatori per costruire progetti professionali.\nCon un metodo pratico e guidato, ti mostriamo come usare gli strumenti di oggi per dare vita alle tue idee, anche se parti da zero.\nLa nostra missione è offrirti competenze concrete, immediate e accessibili a tutti.\n\nNel mercato della formazione c'è una cosa che ci ha sempre dato fastidio:",
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
  ai_showcase_section: {
      title: 'Cosa Può Creare l’Intelligenza Artificiale per Te',
      subtitle: 'Potenza Creativa Senza Limiti',
      text: "L'AI non è solo uno strumento di scrittura. Oggi, con le competenze che ti insegniamo, puoi generare interfacce complete, backend scalabili e design mozzafiato in tempo reale.\n\nDal semplice sito vetrina a piattaforme complesse con login e database, passando per e-commerce e landing page ad alta conversione. Tutto questo ottimizzato tecnicamente e pronto per il mercato, senza scrivere codice manualmente e senza spendere mesi di sviluppo.",
      is_visible: true,
      urls: [
          "https://studioskinlounge.aura.build/",
          "https://flowfund-fintech-10.aura.build/",
          "https://glowmist-skincare-9.aura.build/",
          "https://conscious-dance-68.aura.build/",
          "https://gym-fitness-club-47.aura.build/",
          "https://newbox-designer.aura.build/",
          "https://architectu-interior-38.aura.build/"
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
    title: 'Cosa Dicono i Nostri Studenti',
    subtitle: 'Testimonianze',
    is_visible: true,
    reviews: [
        { 
            name: 'Marco R.', 
            role: 'Web Development', 
            text: 'Corso eccezionale! Ho trovato lavoro come sviluppatore dopo soli 3 mesi. Il docente spiega in modo chiaro e i progetti pratici sono utilissimi.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
        },
        { 
            name: 'Giulia S.', 
            role: 'Digital Marketing', 
            text: 'Contenuti aggiornati e pratici. Ora gestisco campagne per grandi brand grazie a quello che ho imparato.',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
        },
        { 
            name: 'Luca M.', 
            role: 'UI/UX Design', 
            text: 'Il miglior investimento per la mia carriera. Docenti preparatissimi e community attiva.',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
        }
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

const IconMap: Record<string, React.ElementType> = {
  Cpu, Layout, Zap, Target, ShieldCheck, Database, Layers, Users, Lock, Star, Award, Smartphone, 
  BookOpen, Rocket, Banknote, TrendingUp
};

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
  
  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', text: '', rating: 5 });

  // Showcase Slider Ref
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Detect Mobile/Desktop
  useEffect(() => {
      const checkMobile = () => {
          setIsMobileView(window.innerWidth < 1024); // Consider tablets/desktop as "Desktop view" for showcase
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Merge config with defaults
  const config = useMemo(() => {
    if (!landingConfig) return DEFAULT_CONFIG;
    
    let featuresToUse = landingConfig.features_section;
    if (!featuresToUse || !featuresToUse.cards || featuresToUse.cards.length < 4) {
        featuresToUse = DEFAULT_CONFIG.features_section;
    }

    let aboutToUse = landingConfig.about_section;
    if (!aboutToUse || !aboutToUse.mission_points || aboutToUse.mission_points.length === 0) {
        aboutToUse = { ...aboutToUse, mission_points: DEFAULT_CONFIG.about_section.mission_points };
    }

    if (aboutToUse && !aboutToUse.quote_author_image_size) {
        aboutToUse.quote_author_image_size = 48; 
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
        ai_showcase_section: {
            ...DEFAULT_CONFIG.ai_showcase_section,
            ...(landingConfig.ai_showcase_section || {})
        },
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

    if (merged.hero.title && merged.hero.title.includes("Costruiamo piattaforme")) {
        merged.hero.title = "Crea Siti Web Professionali o Piattaforme con l'AI in Poche Ore";
        merged.hero.subtitle = "Senza Scrivere Una Riga di Codice.";
    }

    return merged;
  }, [landingConfig]);

  const handleNavigateToCourses = () => {
    navigate('/courses');
  };

  const submitReview = (e: React.FormEvent) => {
      e.preventDefault();
      alert("Grazie! La tua recensione è stata inviata ed è in fase di approvazione.");
      setIsReviewModalOpen(false);
      setReviewForm({ name: '', text: '', rating: 5 });
  };

  const isSticky = config.announcement_bar.is_visible && config.announcement_bar.is_sticky;
  const heroPaddingClass = (config.announcement_bar.is_visible && !isSticky) 
    ? 'pt-32 lg:pt-40' 
    : 'pt-36 lg:pt-48';

  const brandTitle = "Moise Web Academy";

  // Helper per rilevare se l'allegato è un video
  const isVideo = (url?: string) => {
      if (!url) return false;
      return url.includes('youtube') || url.includes('youtu.be') || url.includes('vimeo') || url.endsWith('.mp4') || url.endsWith('.webm');
  };

  // Auto-scroll orizzontale
  useEffect(() => {
      let animationId: number;
      const scrollSpeed = 0.5; // Velocità ridotta per leggibilità

      const scroll = () => {
          if (sliderRef.current && !isPaused) {
              sliderRef.current.scrollLeft += scrollSpeed;
              
              // Infinite Loop Logic: Resetta la posizione quando arriva a metà contenuto (grazie alla duplicazione)
              if (sliderRef.current.scrollLeft >= (sliderRef.current.scrollWidth / 2)) {
                  sliderRef.current.scrollLeft = 0;
              }
          }
          animationId = requestAnimationFrame(scroll);
      };

      animationId = requestAnimationFrame(scroll);
      return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-slate-100 bg-slate-950 selection:bg-brand-500/30">
      
      {/* Background Glows Globali */}
      <div className="fixed top-0 w-full h-screen -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]"></div>
      </div>

      {/* ANNOUNCEMENT BAR */}
      {config.announcement_bar.is_visible && (
        <div 
            className={`w-full z-40 overflow-hidden backdrop-blur-md border-b border-white/5 ${isSticky ? 'fixed top-20 shadow-md' : 'relative mt-20'}`}
            style={{ backgroundColor: 'rgba(23, 37, 84, 0.8)', color: config.announcement_bar.text_color }} // Custom dark glass for bar
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

            <div className={`py-3 px-4 font-medium text-center text-sm md:text-base text-brand-200 ${config.announcement_bar.type === 'marquee' ? 'whitespace-nowrap overflow-hidden' : ''}`}>
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

      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden">
          {/* Hero Video Background */}
          <div className="absolute inset-0 z-0">
             <video 
                src="https://res.cloudinary.com/dhj0ztos6/video/upload/v1765326450/home_2_bbhedx.webm"
                autoPlay loop muted playsInline 
                className="w-full h-full object-cover opacity-30"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>
          </div>

          <section className={`relative z-10 pb-6 lg:pb-10 ${heroPaddingClass}`}>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                {config.hero.show_badges && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-brand-300 bg-brand-500/10 ring-1 ring-brand-500/20 rounded-full mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Sparkles className="h-3 w-3" />
                        <span className="flex h-1.5 w-1.5 bg-brand-400 rounded-full animate-pulse mx-1"></span>
                        Zero Abbonamenti • Zero Crediti AI • Zero Tool a Pagamento
                    </div>
                )}
                
                <h1 className="text-5xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.05] mb-6 animate-in fade-in zoom-in-95 duration-700 delay-100">
                  {config.hero.title}
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
                    {config.hero.subtitle}
                  </span>
                </h1>

                {config.hero.text && (
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-300 leading-relaxed mb-8 whitespace-pre-wrap animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        {config.hero.text}
                    </p>
                )}

                {/* Benefits List */}
                {config.hero.benefits && config.hero.benefits.length > 0 && (
                    <ul className="mt-8 mb-12 text-left max-w-lg mx-auto space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        {config.hero.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start text-lg text-slate-300">
                                <div className="mt-1 mr-3 flex-shrink-0 bg-brand-500/20 p-1 rounded-full ring-1 ring-brand-500/30">
                                    <Check className="h-3 w-3 text-brand-400 stroke-[3]" />
                                </div>
                                {benefit}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
                  <button 
                    onClick={handleNavigateToCourses}
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-brand-600 hover:bg-brand-500 rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] group"
                  >
                    {config.hero.cta_primary} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {config.hero.show_badges && (
                    <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-slate-400 border-t border-white/5 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                        <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-500" /> Zero fuffa</div>
                        <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-500" /> Acquisto Singolo</div>
                        <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-500" /> Accesso a Vita</div>
                    </div>
                )}
              </div>
            </div>
          </section>
      </div>

      {/* --- AI ERA SECTION (Video Integration) --- */}
      {config.ai_era_section?.is_visible !== false && (
          <section className="relative z-10 py-24">
             <div className="max-w-7xl mx-auto px-6">
                  {/* Container Glassmorphic */}
                  <div className="bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-3xl p-8 md:p-12 overflow-hidden relative shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent opacity-30 pointer-events-none"></div>
                      
                      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                          {/* Left Content */}
                          <div>
                              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-brand-300 bg-brand-500/10 ring-1 ring-brand-500/20 rounded-full mb-6">
                                  <Sparkles className="h-3 w-3" />
                                  {config.ai_era_section?.subtitle}
                              </div>
                              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-8 tracking-tight leading-tight">
                                  {config.ai_era_section?.title}
                              </h2>
                              <div className="text-lg text-slate-300 leading-relaxed space-y-6">
                                  {config.ai_era_section?.text.split('\n').map((line, i) => {
                                      if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
                                          return (
                                              <div key={i} className="flex items-start gap-3 ml-2 my-2">
                                                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0 shadow-[0_0_10px_#60a5fa]"></div>
                                                  <span className="text-slate-200 font-medium">{line.replace(/^[-•]\s*/, '')}</span>
                                              </div>
                                          );
                                      }
                                      if (line.trim().endsWith('?')) {
                                          return <p key={i} className="text-white font-bold text-xl mt-4 border-l-4 border-brand-500 pl-4">{line}</p>;
                                      }
                                      if (line.trim() === '') return <br key={i} />;
                                      return <p key={i}>{line}</p>;
                                  })}
                              </div>
                          </div>

                          {/* Right Video Visual */}
                          <div className="relative h-full min-h-[395px] w-[calc(100%+5px)] -ml-[2.5px] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                               <video 
                                  src="https://res.cloudinary.com/dhj0ztos6/video/upload/v1765328025/home_page_3_tnvnqm.webm"
                                  autoPlay loop muted playsInline 
                                  className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                               />
                               {/* Gradient Overlay on Video */}
                               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                               <div className="absolute bottom-2 left-3 right-3">
                                   <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                       <div className="flex items-center gap-3 mb-2">
                                           <div className="h-2 w-2 rounded-full bg-brand-400 animate-pulse"></div>
                                           <span className="text-xs text-brand-400 font-mono uppercase">IL TUO SUCCESSO</span>
                                       </div>
                                       <p className="text-sm text-slate-200">
                                           Diventa un professionista ricercato.
                                       </p>
                                   </div>
                               </div>
                          </div>
                      </div>
                  </div>
             </div>
          </section>
      )}

      {/* SECTION 1 - About / Mission */}
      {config.about_section.is_visible && (
        <section className="py-24 bg-slate-900/50 border-t border-white/5 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    
                    {/* LEFT COLUMN: Image & Quote */}
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden h-[500px] w-full shadow-2xl ring-1 ring-white/10 group">
                            <img 
                                src={config.about_section.image_url} 
                                alt="About Us" 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                        </div>
                        
                        {/* Floating Quote Card */}
                        <div className="absolute -bottom-6 -right-6 w-[90%] md:w-[400px] bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl ring-1 ring-white/10 shadow-2xl">
                            <Quote className="h-8 w-8 text-brand-400 mb-4 opacity-50" />
                            <p className="font-medium text-white text-lg italic mb-6 leading-relaxed">
                                {config.about_section.quote}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-brand-500/20 flex items-center justify-center ring-1 ring-brand-500/30 overflow-hidden">
                                    {config.about_section.quote_author_image ? (
                                        <img src={config.about_section.quote_author_image} alt="Author" className="w-full h-full object-cover"/>
                                    ) : (
                                        <span className="text-brand-400 font-bold text-xs">DM</span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase tracking-wider">{config.about_section.quote_author}</p>
                                    <p className="text-xs text-slate-400">Founder, MWA</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Text */}
                    <div className="pt-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-300 bg-brand-500/10 ring-1 ring-brand-500/20 rounded-full mb-6">
                            <Users className="h-3 w-3" />
                            {config.about_section.subtitle}
                        </div>
                        
                        <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight leading-tight">
                            Perché nasce <span className="text-brand-400">Moise Web Academy</span>
                        </h2>
                        
                        <div className="text-slate-300 text-lg leading-relaxed mb-8 space-y-6">
                           <p className="font-medium text-white text-xl">
                               Moise Web Academy nasce per rendere semplice ciò che sembra complesso.
                           </p>
                           <p>
                               In un mondo in cui creare siti e piattaforme digitali è sempre più fondamentale, vogliamo dimostrare che <span className="text-white font-semibold">non serve essere programmatori</span> per costruire progetti professionali.
                           </p>
                           <p>
                               Con un metodo pratico e guidato, ti mostriamo come usare gli strumenti di oggi per dare vita alle tue idee, anche se parti da zero. La nostra missione è offrirti competenze concrete, immediate e accessibili a tutti.
                           </p>

                           {/* Existing Logic for Fastidio section */}
                           {config.about_section.text.includes("fastidio") && (
                               <div className="pt-4 border-l-2 border-slate-700 pl-6 mt-6">
                                   <p className="italic text-slate-400 mb-2">
                                       Nel mercato della formazione c'è una cosa che ci ha sempre dato fastidio:
                                   </p>
                               </div>
                           )}
                        </div>

                        {config.about_section.mission_points && config.about_section.mission_points.length > 0 && (
                            <div className="bg-red-500/5 ring-1 ring-red-500/10 rounded-2xl p-6 mb-8">
                                <ul className="space-y-4">
                                    {config.about_section.mission_points.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                                                <X className="w-3.5 h-3.5 text-red-400" />
                                            </div>
                                            <span className="text-slate-300">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        <div className="flex gap-4 items-start pl-4 border-l-2 border-brand-500">
                            <div>
                                <h4 className="text-xl font-semibold text-white mb-2">Noi facciamo l’opposto.</h4>
                                <p className="text-slate-400 leading-relaxed">
                                    In questa Academy vi insegniamo a creare tutto ciò che serve nel digitale usando strumenti a <strong className="text-white">costo zero</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )}

      {/* SECTION 2 - Features Grid */}
