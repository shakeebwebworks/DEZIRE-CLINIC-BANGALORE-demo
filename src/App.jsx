import { useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Instagram, Menu, Phone, Plus, ShieldCheck, Sparkles, X } from 'lucide-react'
import { treatments, gallery } from './data'

const PHONE = '8971224700'
const WHATSAPP = 'https://wa.me/918971224700'
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: .75, ease: [0.22, 1, 0.36, 1] } } }

function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} variants={fadeUp} initial={reduce ? false : 'hidden'} whileInView="show" viewport={{ once: true, amount: .16 }} transition={{ delay }}>{children}</motion.div>
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    onScroll(); window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [location.pathname])
  const links = [['About', '/#about'], ['Treatments', '/#treatments'], ['Our Approach', '/#approach'], ['Gallery', '/#gallery'], ['Contact', '/#contact']]
  const go = (href) => {
    setOpen(false)
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') window.location.href = href
      else document.querySelector(href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
    <div className="container header-inner">
      <Link to="/" className="brand" aria-label="Dezire Clinic home"><span className="brand-mark">D<span>.</span></span><span className="brand-copy">DEZIRE <small>CLINIC · BANGALORE</small></span></Link>
      <nav className={`desktop-nav ${open ? 'open' : ''}`} aria-label="Main navigation">
        {links.map(([label, href]) => <a key={label} href={href} onClick={e => { e.preventDefault(); go(href) }}>{label}</a>)}
        <a className="nav-cta" href="/#contact" onClick={e => { e.preventDefault(); go('/#contact') }}>Book a consultation <ArrowUpRight size={15}/></a>
      </nav>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X/> : <Menu/>}</button>
    </div>
  </header>
}

function Eyebrow({ children }) { return <div className="eyebrow"><span/> {children}</div> }

function Footer() {
  return <footer className="footer">
    <div className="container">
      <div className="footer-top">
        <div><Link to="/" className="brand footer-brand"><span className="brand-mark">D<span>.</span></span><span className="brand-copy">DEZIRE <small>CLINIC · BANGALORE</small></span></Link><p className="footer-note">A considered approach to aesthetic care, shaped around your individual goals.</p></div>
        <div className="footer-links"><span className="footer-label">EXPLORE</span><a href="/#about">About the clinic</a><a href="/#treatments">Treatments</a><a href="/#approach">Our approach</a><a href="/#contact">Contact</a></div>
        <div className="footer-links"><span className="footer-label">GET IN TOUCH</span><a href={`tel:${PHONE}`}>+91 89712 24700</a><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp enquiry <ArrowUpRight size={13}/></a><span>Bangalore, Karnataka</span></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Dezire Clinic. Demo concept.</span><span>Medical information on this website is general and not a substitute for professional advice.</span><a href="https://www.instagram.com/dezireclinicbangalore/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17}/></a></div>
    </div>
  </footer>
}

function FloatingContact() {
  return <a className="floating-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><Phone size={18}/><span>Let's talk</span></a>
}

function TreatmentCard({ item, index }) {
  return <Reveal delay={index * .08}><Link to={`/treatments/${item.id}`} className="treatment-card">
    <div className="treatment-image"><img src={item.image} alt="" loading="lazy"/><span className="image-number">{item.number}</span><span className="card-arrow"><ArrowUpRight/></span></div>
    <div className="treatment-info"><h3>{item.name}</h3><p>{item.short}</p><span className="text-link">Explore treatment <ArrowRight size={15}/></span></div>
  </Link></Reveal>
}

function Home() {
  const [faq, setFaq] = useState(0)
  const [form, setForm] = useState({ name: '', phone: '', email: '', treatment: '', date: '', message: '', consent: false })
  const faqs = [
    ['How do I book a consultation?', 'Call the clinic, send a WhatsApp enquiry or use the form on this page. The clinic team can guide you through the next steps.'],
    ['What happens during an initial consultation?', 'A clinician can discuss your goals, relevant health information, available options, limitations and potential risks.'],
    ['How is treatment suitability assessed?', 'Suitability is individual. A qualified clinician should assess your health, anatomy, expectations and the risks and benefits of possible options.'],
    ['What should I know about recovery?', 'Recovery varies by procedure and individual. Your treating clinician should explain expected recovery, restrictions, warning signs and follow-up.'],
    ['Can I ask questions before deciding?', 'Absolutely. A consultation is a chance to understand options and ask questions. You should feel comfortable taking time to make an informed decision.']
  ]
  const submit = (e) => {
    e.preventDefault()
    const body = encodeURIComponent(`Hello Dezire Clinic, I would like to enquire about a consultation.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || 'Not provided'}\nTreatment: ${form.treatment}\nPreferred date: ${form.date || 'Flexible'}\nMessage: ${form.message || 'No additional message'}\n\nI agree to be contacted about this enquiry.`)
    window.open(`${WHATSAPP}?text=${body}`, '_blank', 'noopener,noreferrer')
  }
  const update = e => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  return <>
    <section className="hero">
      <div className="hero-image"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2000&q=90" alt="Editorial portrait for the Dezire Clinic aesthetic care concept"/></div>
      <div className="hero-shade"/>
      <div className="container hero-content">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: .14 } } }}>
          <motion.div variants={fadeUp}><Eyebrow>DEZIRE CLINIC · BANGALORE</Eyebrow></motion.div>
          <motion.h1 variants={fadeUp}>Feel at home<br/>in <em>your own</em><br/>skin.</motion.h1>
          <motion.p variants={fadeUp}>Personalised aesthetic care and thoughtful cosmetic surgery consultations, centred around you.</motion.p>
          <motion.div variants={fadeUp} className="hero-actions"><a className="btn-dark" href="#treatments">Explore treatments <ArrowUpRight size={16}/></a><a className="btn-quiet" href="#contact">Book a consultation <ArrowDown size={15}/></a></motion.div>
        </motion.div>
        <div className="hero-bottom"><span>01 — A MORE PERSONAL APPROACH</span><span>SCROLL TO DISCOVER <ArrowDown size={13}/></span></div>
      </div>
      <div className="hero-side-note">AESTHETIC CARE, CONSIDERED</div>
    </section>

    <section className="intro-section section-pad" id="about"><div className="container intro-grid">
      <Reveal><Eyebrow>WELCOME TO DEZIRE</Eyebrow><h2 className="display-heading">Your goals.<br/><em>Your journey.</em><br/>Your choice.</h2></Reveal>
      <Reveal delay={.12}><div className="intro-copy"><p className="lead-copy">Aesthetic care should begin with a conversation — one where you feel heard, informed and respected.</p><p>At Dezire Clinic, Bangalore, we invite you to explore your options through a personalised consultation. Our focus is on clear conversations, thoughtful planning and helping you make decisions that feel right for you.</p><a className="text-link" href="#approach">Discover our approach <ArrowRight size={15}/></a></div></Reveal>
    </div></section>

    <section className="treatments-section section-pad" id="treatments"><div className="container">
      <div className="section-heading"><Reveal><Eyebrow>EXPLORE YOUR OPTIONS</Eyebrow><h2 className="display-heading">Care that begins<br/>with <em>understanding.</em></h2></Reveal><Reveal><p>Every person is different. Explore our areas of focus, then speak with a qualified clinician about what may be appropriate for you.</p></Reveal></div>
      <div className="treatment-grid">{treatments.map((t, i) => <TreatmentCard key={t.id} item={t} index={i}/>)}</div>
    </div></section>

    <section className="approach-section section-pad" id="approach"><div className="container approach-grid">
      <Reveal className="approach-visual"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85" alt="Calm, considered clinic interior concept" loading="lazy"/><div className="visual-caption">A CALMER SPACE FOR CONSIDERED DECISIONS</div></Reveal>
      <div className="approach-content"><Reveal><Eyebrow>THE DEZIRE APPROACH</Eyebrow><h2 className="display-heading">Confidence in<br/>every <em>conversation.</em></h2><p className="approach-lead">The right decision is an informed one. We believe your care journey should feel personal, transparent and never rushed.</p></Reveal>
        {['Individual conversations','Clear information about options','Honest discussion of risks and expectations','Respect for privacy and personal choice'].map((x, i) => <Reveal key={x} delay={i * .06}><div className="approach-point"><span>0{i+1}</span><p>{x}</p><Check size={16}/></div></Reveal>)}
      </div>
    </div></section>

    <section className="journey-section section-pad"><div className="container"><Reveal><Eyebrow>A THOUGHTFUL PROCESS</Eyebrow><h2 className="display-heading">One step at a time.</h2><p className="journey-sub">Your journey is individual. Here is what a consultation-led process may look like.</p></Reveal>
      <div className="journey-grid">{[['01','Initial conversation','Share what brings you in and the questions you would like answered.'],['02','Personal assessment','Discuss relevant factors with a qualified clinician.'],['03','Understand your options','Explore potential benefits, risks, alternatives and expectations.'],['04','A considered decision','Take the time you need before deciding on any next step.'],['05','Care & follow-up','If treatment proceeds, understand your recovery and follow-up plan.']].map((x,i)=><Reveal key={x[0]} delay={i*.06}><div className="journey-item"><span>{x[0]}</span><div><h3>{x[1]}</h3><p>{x[2]}</p></div></div></Reveal>)}</div>
    </div></section>

    <section className="specialist-section"><div className="container specialist-grid"><div className="specialist-copy"><Reveal><Eyebrow>MEET YOUR CARE TEAM</Eyebrow><h2 className="display-heading">Expertise with<br/><em>a human touch.</em></h2><p>Choosing a clinician is an important part of your journey. Speak with the clinic to learn about the treating specialist's qualifications, experience and approach before making a decision.</p><a href="#contact" className="btn-outline">Ask about our specialists <ArrowUpRight size={15}/></a></Reveal></div><div className="specialist-placeholder"><div className="placeholder-icon"><Plus size={25}/></div><span>CLINIC-APPROVED PROFILE IMAGE</span><small>Doctor name and verified credentials to be added by the clinic</small></div></div></section>

    <section className="gallery-section section-pad" id="gallery"><div className="container"><div className="section-heading"><Reveal><Eyebrow>A GLIMPSE OF THE EXPERIENCE</Eyebrow><h2 className="display-heading">A space to feel<br/><em>at ease.</em></h2></Reveal><Reveal><p>Replace these visual references with approved photographs of the actual clinic, facilities and team.</p></Reveal></div><div className="gallery-grid">{gallery.map((src,i)=><Reveal key={src} delay={i*.06}><div className={`gallery-image gallery-${i+1}`}><img src={src} alt={`Clinic atmosphere reference ${i+1}`} loading="lazy"/></div></Reveal>)}</div></div></section>

    <section className="faq-section section-pad"><div className="container faq-grid"><Reveal><Eyebrow>GOOD TO KNOW</Eyebrow><h2 className="display-heading">Questions are<br/><em>always welcome.</em></h2><p>Have something else on your mind? Get in touch with the clinic team.</p><a className="text-link" href={WHATSAPP} target="_blank" rel="noreferrer">Ask us on WhatsApp <ArrowUpRight size={15}/></a></Reveal><div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq-item ${faq===i?'active':''}`} key={q}><button onClick={()=>setFaq(faq===i?-1:i)} aria-expanded={faq===i}><span>{q}</span><ChevronDown size={18}/></button><AnimatePresence initial={false}>{faq===i&&<motion.div className="faq-answer" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>

    <section className="contact-section section-pad" id="contact"><div className="container contact-grid"><div className="contact-copy"><Reveal><Eyebrow>START A CONVERSATION</Eyebrow><h2 className="display-heading">Your next step<br/>starts <em>here.</em></h2><p>Tell us how we can help. The clinic team can get in touch to discuss arranging a consultation.</p><div className="contact-detail"><span>CALL THE CLINIC</span><a href={`tel:${PHONE}`}>+91 89712 24700 <ArrowUpRight size={15}/></a></div><div className="contact-detail"><span>LOCATION</span><p>Bangalore, Karnataka, India<br/><small>Exact clinic address to be confirmed</small></p></div><a className="whatsapp-link" href={WHATSAPP} target="_blank" rel="noreferrer"><Phone size={16}/> Continue on WhatsApp <ArrowUpRight size={15}/></a></Reveal></div>
      <Reveal className="contact-form-wrap"><form className="contact-form" onSubmit={submit}><h3>Request a consultation</h3><p>Share your contact details and preferred area of interest.</p><div className="form-row"><label>Full name<input name="name" value={form.name} onChange={update} required placeholder="Your name"/></label><label>Phone number<input name="phone" value={form.phone} onChange={update} required type="tel" placeholder="+91"/></label></div><label>Email address<input name="email" value={form.email} onChange={update} type="email" placeholder="you@example.com"/></label><label>Area of interest<select name="treatment" value={form.treatment} onChange={update} required><option value="">Choose a treatment</option>{treatments.map(t=><option key={t.id}>{t.name}</option>)}<option>General consultation</option></select></label><label>Preferred date<input type="date" name="date" value={form.date} onChange={update}/></label><label>Message<textarea name="message" value={form.message} onChange={update} rows="3" placeholder="How may we help? Please do not include sensitive medical information."/></label><label className="consent"><input type="checkbox" name="consent" checked={form.consent} onChange={update} required/><span>I agree to be contacted about this enquiry and have read the clinic's privacy information.</span></label><button className="btn-dark form-submit" type="submit">Prepare my enquiry <ArrowUpRight size={16}/></button><small className="form-note">Demo form: opens your email app with the enquiry details. Connect a secure form service before launch.</small></form></Reveal>
    </div></section>
    <section className="disclaimer"><div className="container"><ShieldCheck size={17}/><p>Information on this website is for general educational purposes only and is not medical advice. All procedures carry potential risks. Treatment suitability, expected outcomes and recovery must be discussed with a qualified medical professional.</p></div></section>
  </>
}

function TreatmentDetail() {
  const { id } = useParams()
  const item = treatments.find(t => t.id === id)
  const navigate = useNavigate()
  if (!item) return <main className="not-found"><h1>Page not found</h1><Link to="/">Return home</Link></main>
  return <main className="detail-page"><section className="detail-hero"><div className="container detail-grid"><div><Eyebrow>DEZIRE CLINIC · TREATMENT GUIDE</Eyebrow><h1>{item.name.split(' ').slice(0,-1).join(' ')} <em>{item.name.split(' ').slice(-1)}</em></h1><p>{item.short}</p><a href="/#contact" className="btn-dark">Request a consultation <ArrowUpRight size={16}/></a></div><img src={item.image} alt="" /></div></section><section className="detail-body section-pad"><div className="container detail-body-grid"><div><Eyebrow>UNDERSTANDING YOUR OPTIONS</Eyebrow><h2 className="display-heading">An informed<br/><em>conversation.</em></h2></div><div><p className="lead-copy">{item.intro}</p><h3>Topics to discuss</h3>{item.points.map((p,i)=><div className="detail-point" key={p}><span>0{i+1}</span>{p}</div>)}<div className="medical-note"><strong>Important:</strong> This page provides general information only. A qualified clinician must assess individual suitability, explain alternatives and discuss potential complications and recovery.</div><button className="btn-outline" onClick={()=>navigate('/#contact')}>Talk to the clinic <ArrowUpRight size={15}/></button></div></div></section></main>
}

function ScrollManager() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({behavior:'smooth'}), 100)
    else window.scrollTo(0,0)
  }, [location])
  return null
}

function AppShell() {
  const location = useLocation()
  return <><ScrollManager/><Header/><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.25}}><Routes location={location}><Route path="/" element={<Home/>}/><Route path="/treatments/:id" element={<TreatmentDetail/>}/><Route path="*" element={<Home/>}/></Routes></motion.div></AnimatePresence><Footer/><FloatingContact/></>
}

export default function App() {
  return <BrowserRouter><AppShell/></BrowserRouter>
}
