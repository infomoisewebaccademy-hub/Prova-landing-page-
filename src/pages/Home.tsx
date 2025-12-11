import React from 'react';
import { Course, UserProfile, LandingPageConfig } from '../types';
import { ArrowRight, Check, Star, Zap, Play, BookOpen, Layout, Cpu, Target, Rocket, Banknote, X, MessageCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  courses: Course[];
  onCourseSelect: (courseId: string) => void;
  user: UserProfile | null;
  landingConfig?: LandingPageConfig;
}

export const Home: React.FC<HomeProps> = ({ courses, onCourseSelect, user, landingConfig }) => {
  const navigate = useNavigate();

  // Helper per navigazione
  const handleCtaClick = (path?: string) => {
    if (path && path.startsWith('http')) {
        window.open(path, '_blank');
    } else {
        navigate(path || '/courses');
    }
  };

  if (!landingConfig) {
      return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  const {
      hero,
      announcement_bar,
      ai_era_section,
      about_section,
      features_section,
      how_it_works_section,
      ai_showcase_section,
      for_whom_section,
      comparison_section,
      for_whom_not_section,
      testimonials_section,
      cta_section,
      footer
  } = landingConfig;

  return (
    <div className="font-sans text-gray-900 bg-white">
      
      {/* Announcement Bar */}
      {announcement_bar?.is_visible && (
          <div 
            className={`w-full py-2 px-4 text-center text-sm font-bold flex items-center justify-center ${announcement_bar.is_sticky ? 'sticky top-0 z-50' : ''}`}
            style={{ backgroundColor: announcement_bar.bg_color, color: announcement_bar.text_color }}
          >
              {announcement_bar.type === 'marquee' ? (
                  <marquee>{announcement_bar.text}</marquee>
              ) : (
                  <span>{announcement_bar.text}</span>
              )}
          </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 -z-10"></div>
         <div className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-12 transform translate-x-20 -z-10 opacity-50"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 <div>
                     {hero.show_badges && (
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-6">
                             <span className="flex h-2 w-2 bg-brand-600 rounded-full animate-pulse"></span>
                             Novità 2025
                         </div>
                     )}
                     <h1 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
                         {hero.title}
                     </h1>
                     <p className="text-xl lg:text-2xl text-gray-600 mb-8 font-light">
                         {hero.subtitle}
                     </p>
                     {hero.text && (
                         <p className="text-gray-500 mb-8 whitespace-pre-wrap">
                             {hero.text}
                         </p>
                     )}
                     
                     <div className="flex flex-col sm:flex-row gap-4 mb-10">
                         {hero.cta_primary && (
                             <button 
                                onClick={() => handleCtaClick('/courses')}
                                className="px-8 py-4 bg-brand-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-brand-500/30 hover:bg-brand-700 transition-all transform hover:-translate-y-1"
                             >
                                 {hero.cta_primary}
                             </button>
                         )}
                         {hero.cta_secondary && (
                             <button 
                                onClick={() => handleCtaClick()}
                                className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
                             >
                                 {hero.cta_secondary}
                             </button>
                         )}
                     </div>

                     {hero.benefits && (
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                             {hero.benefits.map((benefit, idx) => (
                                 <div key={idx} className="flex items-center text-sm text-gray-600">
                                     <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                     {benefit}
                                 </div>
                             ))}
                         </div>
                     )}
                 </div>

                 {/* Hero Image / Video */}
                 <div className="relative">
                      {hero.image_url ? (
                          <img src={hero.image_url} alt="Hero" className="rounded-2xl shadow-2xl w-full object-cover" />
                      ) : (
                          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
                              {/* Video Placeholder or Default Video */}
                               <video 
                                  src="https://res.cloudinary.com/dhj0ztos6/video/upload/v1765328025/home_page_3_tnvnqm.webm"
                                  autoPlay loop muted playsInline 
                                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                               />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                               
                               <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                                   <div className="flex items-center gap-3 mb-2">
                                       <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
                                       <span className="text-green-400 font-mono text-sm uppercase">AI Powered System</span>
                                   </div>
                                   <p className="text-white text-sm">
                                       Genera interfacce complesse e backend in pochi minuti.
                                   </p>
                               </div>
                          </div>
                      )}
                 </div>
             </div>
         </div>
      </section>

      {/* AI Era Section */}
      {ai_era_section?.is_visible && (
          <section className="py-20 bg-gray-50">
              <div className="max-w-4xl mx-auto px-4 text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{ai_era_section.title}</h2>
                  <h3 className="text-xl text-brand-600 font-bold mb-6">{ai_era_section.subtitle}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {ai_era_section.text}
                  </p>
              </div>
          </section>
      )}

      {/* About Section */}
      {about_section?.is_visible && (
          <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                      <div>
                           <img 
                            src={about_section.image_url} 
                            alt="About" 
                            className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                           />
                           
                           {/* Quote Author Widget */}
                           <div className="mt-8 flex items-center gap-4">
                               {about_section.quote_author_image && (
                                   <img 
                                    src={about_section.quote_author_image} 
                                    alt={about_section.quote_author} 
                                    className="rounded-full object-cover border-2 border-brand-100"
                                    style={{
                                        width: about_section.quote_author_image_size || 48,
                                        height: about_section.quote_author_image_size || 48,
                                        transform: `scale(${about_section.quote_author_image_scale || 1}) translate(${about_section.quote_author_image_offset_x || 0}px, ${about_section.quote_author_image_offset_y || 0}px)`
                                    }}
                                   />
                               )}
                               <div>
                                   <p className="text-sm font-bold text-gray-900 uppercase">{about_section.quote_author}</p>
                                   <p className="text-xs text-gray-500">Founder & Instructor</p>
                               </div>
                           </div>
                      </div>
                      
                      <div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">{about_section.title}</h2>
                          <p className="text-brand-600 font-bold uppercase tracking-wider mb-6">{about_section.subtitle}</p>
                          <p className="text-lg text-gray-600 mb-8 whitespace-pre-wrap">
                              {about_section.text}
                          </p>
                          
                          {about_section.quote && (
                              <blockquote className="border-l-4 border-brand-500 pl-6 italic text-gray-700 text-lg mb-8">
                                  {about_section.quote}
                              </blockquote>
                          )}

                          {about_section.mission_points && (
                              <div className="space-y-3 bg-red-50 p-6 rounded-xl border border-red-100">
                                  <p className="font-bold text-red-800 mb-2">Cosa NON troverai qui:</p>
                                  {about_section.mission_points.map((point, i) => (
                                      <div key={i} className="flex items-start text-red-700">
                                          <X className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                                          <span>{point}</span>
                                      </div>
                                  ))}
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </section>
      )}

      {/* Features Section */}
      {features_section?.is_visible && (
          <section className="py-20 bg-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                      <h2 className="text-3xl font-bold mb-4">{features_section.title}</h2>
                      <p className="text-slate-400 text-xl">{features_section.subtitle}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {features_section.cards.map((card, idx) => {
                          // Icon mapping simple
                          const IconComponent = {
                              'Cpu': Cpu,
                              'Layout': Layout,
                              'Zap': Zap,
                              'Target': Target,
                              'Star': Star
                          }[card.icon] || Star;

                          return (
                              <div key={idx} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-brand-500 transition-colors group">
                                  <div className="w-14 h-14 bg-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 transition-colors">
                                      <IconComponent className="h-7 w-7 text-white" />
                                  </div>
                                  <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                                  <p className="text-slate-400 whitespace-pre-wrap text-sm leading-relaxed">
                                      {card.desc}
                                  </p>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </section>
      )}

      {/* How It Works Section */}
      {how_it_works_section?.is_visible && (
          <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{how_it_works_section.title}</h2>
                      <p className="text-gray-500 text-xl">{how_it_works_section.subtitle}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {how_it_works_section.steps.map((step, idx) => {
                           const IconComponent = {
                              'BookOpen': BookOpen,
                              'Rocket': Rocket,
                              'Banknote': Banknote
                          }[step.icon] || Star;

                          return (
                              <div key={idx} className="relative p-6 text-center">
                                  {idx < how_it_works_section.steps.length - 1 && (
                                      <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
                                  )}
                                  <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
                                      <IconComponent className="h-8 w-8 text-brand-600" />
                                  </div>
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                  <p className="text-gray-600 text-sm">
                                      {step.desc}
                                  </p>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </section>
      )}

      {/* AI Showcase Section */}
      {ai_showcase_section?.is_visible && (
          <section className="py-20 bg-gray-50 overflow-hidden">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                       <div>
                           <h2 className="text-3xl font-bold text-gray-900 mb-4">{ai_showcase_section.title}</h2>
                           <h3 className="text-brand-600 font-bold mb-6 text-xl">{ai_showcase_section.subtitle}</h3>
                           <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                               {ai_showcase_section.text}
                           </p>
                       </div>
                       <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                                <Zap className="h-5 w-5 text-yellow-500 mr-2" /> Esempi Live Generati con AI
                            </h4>
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {ai_showcase_section.urls.map((url, i) => (
                                    <a 
                                        key={i} 
                                        href={url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-brand-50 transition-colors group border border-gray-100"
                                    >
                                        <span className="text-sm text-gray-600 group-hover:text-brand-700 truncate font-medium">{url.replace('https://', '')}</span>
                                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-brand-600" />
                                    </a>
                                ))}
                            </div>
                       </div>
                   </div>
               </div>
          </section>
      )}

      {/* For Whom / Target Section */}
      {for_whom_section?.is_visible && (
          <section className="py-20 bg-white">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                   <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{for_whom_section.title}</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {for_whom_section.items.map((item, idx) => (
                           <div key={idx} className="flex gap-4 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all bg-gray-50/50">
                               <div className="flex-shrink-0 mt-1">
                                   <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                       <Check className="h-4 w-4 text-green-600" />
                                   </div>
                               </div>
                               <div>
                                   <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                   <p className="text-sm text-gray-600">{item.desc}</p>
                               </div>
                           </div>
                       ))}
                   </div>
                   <div className="text-center mt-12">
                       <button 
                            onClick={() => handleCtaClick('/courses')}
                            className="bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30"
                        >
                           {for_whom_section.cta}
                       </button>
                   </div>
              </div>
          </section>
      )}

      {/* Comparison Section (Before / After) */}
      {comparison_section?.is_visible && (
          <section className="py-20 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{comparison_section.title}</h2>
                      <p className="text-gray-500 text-lg max-w-2xl mx-auto">{comparison_section.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                      {/* Before */}
                      <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-2 bg-red-400"></div>
                          <h3 className="text-xl font-bold text-red-600 mb-6 flex items-center">
                              <X className="h-6 w-6 mr-2" /> {comparison_section.before_title}
                          </h3>
                          <ul className="space-y-4">
                              {comparison_section.before_items.map((item, i) => (
                                  <li key={i} className="flex items-start text-gray-600">
                                      <span className="mr-3 text-red-400 text-lg">×</span>
                                      <span>{item}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>

                      {/* After */}
                      <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 relative overflow-hidden transform md:-translate-y-4">
                          <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                          <h3 className="text-xl font-bold text-green-600 mb-6 flex items-center">
                              <Check className="h-6 w-6 mr-2" /> {comparison_section.after_title}
                          </h3>
                          <ul className="space-y-4">
                              {comparison_section.after_items.map((item, i) => (
                                  <li key={i} className="flex items-start text-gray-700 font-medium">
                                      <span className="mr-3 text-green-500 text-lg">✓</span>
                                      <span>{item}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
              </div>
          </section>
      )}

      {/* For Whom NOT Section */}
      {for_whom_not_section?.is_visible && (
          <section className="py-20 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12">
                      <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center">
                          <AlertTriangle className="h-6 w-6 mr-2 text-orange-500" />
                          {for_whom_not_section.title}
                      </h2>
                      <div className="space-y-6">
                          {for_whom_not_section.items.map((item, i) => (
                              <div key={i}>
                                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                  <p className="text-sm text-gray-600">{item.desc}</p>
                              </div>
                          ))}
                      </div>
                      {for_whom_not_section.conclusion && (
                          <div className="mt-8 pt-8 border-t border-gray-200 text-center font-medium text-brand-600">
                              {for_whom_not_section.conclusion}
                          </div>
                      )}
                  </div>
              </div>
          </section>
      )}

      {/* Testimonials */}
      {testimonials_section?.is_visible && (
          <section className="py-20 bg-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                      <h2 className="text-3xl font-bold mb-4">{testimonials_section.title}</h2>
                      <p className="text-slate-400">{testimonials_section.subtitle}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {testimonials_section.reviews.map((review, idx) => (
                          <div key={idx} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative">
                              <MessageCircle className="absolute top-6 right-6 h-8 w-8 text-slate-600 opacity-20" />
                              <div className="flex items-center gap-4 mb-6">
                                  <img 
                                    src={review.avatar || `https://ui-avatars.com/api/?name=${review.name}&background=random`} 
                                    alt={review.name} 
                                    className="w-12 h-12 rounded-full object-cover"
                                  />
                                  <div>
                                      <h4 className="font-bold">{review.name}</h4>
                                      <p className="text-xs text-slate-400">{review.role}</p>
                                  </div>
                              </div>
                              <p className="text-slate-300 text-sm leading-relaxed">
                                  "{review.text}"
                              </p>
                              {review.attachmentUrl && (
                                  <div className="mt-4 pt-4 border-t border-slate-700">
                                      <a href={review.attachmentUrl} target="_blank" rel="noreferrer" className="text-xs text-brand-400 hover:text-brand-300 flex items-center">
                                          <Play className="h-3 w-3 mr-1" /> Guarda Video Testimonianza
                                      </a>
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}

      {/* CTA Section */}
      {cta_section?.is_visible && (
          <section className="py-24 bg-brand-600 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
                   <h2 className="text-4xl lg:text-5xl font-black mb-6">{cta_section.title}</h2>
                   <p className="text-xl lg:text-2xl text-brand-100 mb-10 max-w-2xl mx-auto">
                       {cta_section.subtitle}
                   </p>
                   <button 
                        onClick={() => handleCtaClick('/courses')}
                        className="bg-white text-brand-600 px-10 py-5 rounded-xl font-black text-xl hover:bg-brand-50 transition-transform transform hover:scale-105 shadow-2xl"
                    >
                       {cta_section.button_text}
                   </button>
                   <p className="mt-6 text-brand-200 text-sm">
                       Garanzia Soddisfatti o Rimborsati 30 Giorni
                   </p>
               </div>
          </section>
      )}

      {/* Footer */}
      {footer?.is_visible && (
          <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                      <div className="flex items-center gap-2 mb-6 md:mb-0">
                          <img 
                            src="https://res.cloudinary.com/dhj0ztos6/image/upload/v1764867375/mwa_trasparente_thl6fk.png" 
                            alt="Logo" 
                            style={{ height: footer.logo_height || 40 }}
                            className="object-contain"
                          />
                          <span className="font-bold text-xl text-gray-900">{footer.text}</span>
                      </div>
                      
                      <div className="flex gap-6">
                           {footer.social_links?.instagram && <a href={footer.social_links.instagram} className="text-gray-400 hover:text-brand-600">Instagram</a>}
                           {footer.social_links?.facebook && <a href={footer.social_links.facebook} className="text-gray-400 hover:text-brand-600">Facebook</a>}
                           {footer.social_links?.linkedin && <a href={footer.social_links.linkedin} className="text-gray-400 hover:text-brand-600">LinkedIn</a>}
                      </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between text-sm text-gray-500">
                      <p>&copy; {new Date().getFullYear()} {footer.copyright}</p>
                      <div className="flex gap-4 mt-4 md:mt-0">
                          <a href="#" className="hover:text-gray-900">Privacy Policy</a>
                          <a href="#" className="hover:text-gray-900">Terms of Service</a>
                      </div>
                  </div>
              </div>
          </footer>
      )}
    </div>
  );
};
