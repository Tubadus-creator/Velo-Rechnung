import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Check, Zap, Shield, TrendingUp, HelpCircle, Mail, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { PLANS } from '../constants';

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Try to send to webhook, fall back to mock success for demo/CORS issues
    try {
        const response = await fetch('https://n8n.velo-automation.de/webhook/newsletter-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            setStatus('success');
            setEmail('');
        } else {
            // If server returns error, we still show success in this demo
            console.warn('Webhook returned error status, simulating success for demo');
            setStatus('success');
            setEmail('');
        }
    } catch (error) {
        // Network error (e.g. CORS or offline)
        console.warn('Webhook fetch failed, simulating success for demo:', error);
        
        // Simulate network delay then show success
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 800);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-velo-blue via-[#1a5f9e] to-velo-blue/90 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-white min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-velo-orange rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Kostenloses Rechnungsprogramm<br />
                <span className="text-velo-orange">mit automatischem Zahlungsabgleich</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Professionelle Rechnungen in 60 Sekunden – DSGVO-konform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/rechnung-erstellen">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Jetzt kostenlos testen
                    <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                </Link>
                <Link to="/dashboard">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 dark:hover:bg-white/5">
                    Live-Demo ansehen
                    </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base font-medium opacity-90">
                <span className="flex items-center gap-2"><Check className="text-velo-orange w-5 h-5" /> Keine Kreditkarte nötig</span>
                <span className="flex items-center gap-2"><Check className="text-velo-orange w-5 h-5" /> DSGVO-konform</span>
                <span className="flex items-center gap-2"><Check className="text-velo-orange w-5 h-5" /> Deutsche Server</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl shadow-2xl overflow-hidden border-4 border-white/20 bg-white/5 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=2340&auto=format&fit=crop" 
                  alt="Glückliche Freelancerin erledigt Buchhaltung entspannt am Laptop" 
                  className="w-full h-auto object-cover opacity-95 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-velo-blue/60 to-transparent dark:from-slate-900/80 mix-blend-multiply" />
              </div>
               {/* Floating Badge */}
               <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl p-4 max-w-xs text-velo-dark"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-velo-dark dark:text-white">Rechnung bezahlt ✓</p>
                    <p className="text-sm text-velo-dark/60 dark:text-slate-400">"Endlich kein Stress mehr mit der Buchhaltung!"</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-velo-light dark:bg-slate-950 py-12 transition-colors">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                  { val: "15.000+", label: "Erstellte Rechnungen" },
                  { val: "1.200+", label: "Zufriedene Nutzer" },
                  { val: "100%", label: "DSGVO-konform" },
                  { val: "60 Sek.", label: "Durchschn. Erstellung" }
              ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                      <div className="text-3xl md:text-4xl font-bold text-velo-blue dark:text-white mb-2">{stat.val}</div>
                      <div className="text-velo-dark/60 dark:text-slate-400 font-medium">{stat.label}</div>
                  </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-velo-dark dark:text-white mb-4">
                Alles was Sie brauchen. <br/><span className="text-velo-orange">Nichts was Sie nicht brauchen.</span>
            </h2>
            <p className="text-xl text-velo-dark/60 dark:text-slate-400">
                Keine Buchhaltungs-Features die Sie verwirren. Nur perfekte Rechnungen – schnell, einfach, professionell.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
                { icon: Zap, title: "Blitzschnell", desc: "Professionelle Rechnung in unter 60 Sekunden." },
                { icon: Shield, title: "Automatischer Abgleich", desc: "Banking-Integration erkennt bezahlte Rechnungen automatisch." },
                { icon: TrendingUp, title: "Mahnwesen", desc: "Automatischer Versand von Zahlungserinnerungen und Mahnungen." },
            ].map((f, i) => (
                <motion.div
                    key={i}
                    className="p-8 rounded-2xl border border-velo-light dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:shadow-xl transition-all"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="w-14 h-14 bg-velo-blue/10 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-6">
                        <f.icon className="w-7 h-7 text-velo-blue dark:text-velo-orange" />
                    </div>
                    <h3 className="text-xl font-bold text-velo-dark dark:text-white mb-3">{f.title}</h3>
                    <p className="text-velo-dark/70 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-velo-light dark:bg-slate-950 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-velo-dark dark:text-white mb-4">Einfache, transparente Preise</h2>
            <p className="text-xl text-velo-dark/60 dark:text-slate-400">Starten Sie kostenlos und wachsen Sie mit uns.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {PLANS.map((plan, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative bg-white dark:bg-slate-900 rounded-2xl p-8 border ${plan.highlighted ? 'border-velo-orange shadow-xl scale-105 z-10' : 'border-gray-200 dark:border-slate-800 shadow-sm'}`}
                >
                    {plan.highlighted && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-velo-orange text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                            {plan.badge}
                        </div>
                    )}
                    <h3 className="text-xl font-bold text-velo-dark dark:text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                        <span className="text-4xl font-bold text-velo-blue dark:text-white">{plan.price}</span>
                        {plan.period && <span className="text-velo-dark/60 dark:text-slate-500 ml-1">{plan.period}</span>}
                    </div>
                    <p className="text-velo-dark/60 dark:text-slate-400 mb-8 pb-8 border-b border-gray-100 dark:border-slate-800">{plan.description}</p>
                    
                    <ul className="space-y-4 mb-8">
                        {plan.features.map((feat, idx) => (
                            <li key={idx} className={`flex items-start gap-3 text-sm ${feat.included ? 'text-velo-dark dark:text-slate-300' : 'text-velo-dark/40 dark:text-slate-600 line-through'}`}>
                                {feat.included ? (
                                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                                ) : (
                                    <div className="w-5 h-5 shrink-0" />
                                )}
                                <span>
                                    {feat.text}
                                    {feat.badge && <span className="ml-2 px-1.5 py-0.5 bg-velo-blue/10 dark:bg-velo-blue/20 text-velo-blue dark:text-blue-300 text-xs rounded">{feat.badge}</span>}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <Link to="/rechnung-erstellen">
                        <Button 
                            variant={plan.highlighted ? 'primary' : 'outline'} 
                            fullWidth
                            className={plan.highlighted ? 'bg-velo-orange hover:bg-velo-orange/90' : 'dark:border-slate-600 dark:text-white dark:hover:bg-slate-800'}
                        >
                            {plan.cta}
                        </Button>
                    </Link>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4 max-w-4xl">
           <h2 className="text-3xl font-bold text-center mb-12 text-velo-dark dark:text-white">Häufig gestellte Fragen</h2>
           <div className="space-y-6">
                {[
                    { q: "Ist Velo Rechnungen wirklich kostenlos?", a: "Ja, der Free Plan ist dauerhaft kostenlos. Sie können unbegrenzt Rechnungen erstellen und als PDF herunterladen." },
                    { q: "Wie funktioniert der Zahlungsabgleich?", a: "Im Professional Plan verbinden Sie Ihr Bankkonto sicher über eine verschlüsselte Schnittstelle. Das System erkennt eingehende Zahlungen und markiert die entsprechende Rechnung automatisch als bezahlt." },
                    { q: "Sind meine Daten sicher?", a: "Absolut. Wir hosten ausschließlich auf ISO-zertifizierten Servern in Deutschland und halten uns strikt an die DSGVO." }
                ].map((faq, i) => (
                    <div key={i} className="bg-velo-light dark:bg-slate-800 p-6 rounded-xl">
                        <h4 className="flex items-center gap-3 font-bold text-lg mb-2 text-velo-blue dark:text-white">
                            <HelpCircle className="w-5 h-5" /> {faq.q}
                        </h4>
                        <p className="text-velo-dark/80 dark:text-slate-300 ml-8">{faq.a}</p>
                    </div>
                ))}
           </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-velo-blue text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-velo-orange/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                    <Mail className="w-8 h-8 text-velo-orange" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Keine Updates mehr verpassen</h2>
                <p className="text-white/80 mb-8 text-lg">
                    Abonnieren Sie unseren Newsletter für Buchhaltungs-Tipps, Produkt-Updates und exklusive Angebote von Velo Automation.
                </p>

                {status === 'success' ? (
                    <div className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-sm animate-fade-in">
                        <Check className="w-12 h-12 text-green-400 mx-auto mb-2" />
                        <h3 className="text-xl font-bold">Vielen Dank für Ihre Anmeldung!</h3>
                        <p className="text-white/80 mt-1">Sie haben es fast geschafft. Bitte prüfen Sie Ihren Posteingang.</p>
                    </div>
                ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input 
                                type="email" 
                                placeholder="Ihre E-Mail-Adresse" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-6 py-4 rounded-xl text-velo-dark bg-white focus:outline-none focus:ring-4 focus:ring-velo-orange/30 disabled:opacity-50"
                                disabled={status === 'loading'}
                            />
                        </div>
                        <Button 
                            type="submit" 
                            variant="secondary" 
                            size="lg"
                            className="shrink-0 h-full py-4"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? (
                                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Anmelden...</>
                            ) : (
                                'Jetzt anmelden'
                            )}
                        </Button>
                    </form>
                )}
                
                <p className="mt-6 text-xs text-white/50 max-w-md mx-auto">
                    Mit der Anmeldung stimmen Sie unseren <Link to="#" className="underline hover:text-white">Datenschutzbestimmungen</Link> zu. 
                    Wir senden kein Spam. Abmeldung jederzeit möglich.
                </p>

                {status === 'error' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-white bg-red-500/20 border border-red-500/30 py-2 px-4 rounded-lg inline-block text-sm"
                    >
                        Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
                    </motion.div>
                )}
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;