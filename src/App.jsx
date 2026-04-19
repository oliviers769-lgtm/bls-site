import React, { useState, useEffect, useRef } from 'react'

// Import photos — doublons exclus (photo4=photo14, photo6=photo5, photo8=photo7,
// photo11=photo10, photo13=photo12, photo23=photo21, photo24=photo18,
// photo25=photo22, photo34=photo31)
const EXCLUDED = new Set([4, 6, 8, 11, 13, 23, 24, 25, 34])
const photos = Array.from({ length: 38 }, (_, i) => i + 1)
  .filter(n => !EXCLUDED.has(n))
  .map(n => {
    try { return new URL(`./assets/photos/photo${n}.jpg`, import.meta.url).href }
    catch { return null }
  }).filter(Boolean)

const SERVICES = [
  { icon: '🏗️', title: 'Plâtrerie', desc: 'Pose de placo, isolation, faux plafonds, cloisons. Finitions soignées pour des intérieurs impeccables.' },
  { icon: '🎨', title: 'Peinture', desc: 'Peinture intérieure et extérieure, préparation des supports, application professionnelle.' },
  { icon: '🔨', title: 'Rénovation', desc: "Rénovation complète d'appartements et maisons : sols, murs, plafonds, carrelage." },
  { icon: '🪟', title: 'Menuiserie', desc: 'Pose de portes, fenêtres, parquet. Remplacement et installation sur mesure.' },
]

const AVIS = [
  { nom: 'Audrey Pierdet', note: 5, texte: 'Gregory Bonnebouche est un artisan très professionnel et agréable. Les travaux réalisés chez nous se sont avérés de qualité, tout à fait conformes à nos attentes.' },
  { nom: 'Marie Griffay', note: 5, texte: "Nous ne pouvons que recommander l'entreprise BLS ! Travaux de rénovation réalisés avec soin et sérieux." },
  { nom: 'Véronique BARLET', note: 5, texte: "Artisan très professionnel et à l'écoute. Il prend le temps de bien expliquer les différentes étapes du chantier et donne toujours de bons conseils." },
  { nom: 'Denis Lautredou', note: 5, texte: 'Je voulais remercier la société BLS pour le beau travail effectué aussi bien pour la peinture que le changement de mes portes.' },
  { nom: 'Maurice G.', note: 5, texte: 'Très bon travail, personnel très soigné et très professionnel, sympathique et courtois. Je recommande !' },
  { nom: 'B & C Landais', note: 5, texte: 'Réfection complète d\'un appartement : peintures, sols, carrelages. Délais respectés, travail impeccable, nettoyage en fin de chantier, tarifs très corrects.' },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function FloatingButtons() {
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 16, zIndex: 999, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <a href="tel:0611024833" style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--gold)', color: 'white',
        padding: '12px 18px', borderRadius: 12, textDecoration: 'none',
        fontSize: 14, fontWeight: 700, letterSpacing: 0.3,
        boxShadow: '0 4px 20px rgba(200,137,58,0.5)', transition: 'transform 0.2s, box-shadow 0.2s',
        whiteSpace: 'nowrap',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(200,137,58,0.7)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(200,137,58,0.5)' }}
      >📞 06 11 02 48 33</a>
      <a href="https://wa.me/33611024833" target="_blank" rel="noreferrer" style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#25D366', color: 'white',
        padding: '12px 18px', borderRadius: 12, textDecoration: 'none',
        fontSize: 14, fontWeight: 700, letterSpacing: 0.3,
        boxShadow: '0 4px 20px rgba(37,211,102,0.5)', transition: 'transform 0.2s, box-shadow 0.2s',
        whiteSpace: 'nowrap',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.7)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.5)' }}
      >💬 WhatsApp</a>
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [
    { href: '#services', label: 'Services' },
    { href: '#realisations', label: 'Réalisations' },
    { href: '#avis', label: 'Avis' },
    { href: '#contact', label: 'Contact' },
  ]
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '12px 40px' : '20px 40px',
      background: scrolled ? 'rgba(15,15,13,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(200,137,58,0.2)' : 'none',
      transition: 'all 0.4s ease', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 42, height: 42, background: 'var(--gold)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 22, color: 'white' }}>BLS</div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'white', letterSpacing: 2 }}>BONNEBOUCHE</div>
          <div style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: 3, textTransform: 'uppercase' }}>Plâtrerie · Peinture</div>
        </div>
      </a>
      <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="desktop-nav">
        {links.map(l => (
          <a key={l.href} href={l.href} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--gold)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
          >{l.label}</a>
        ))}
        <a href="tel:0611024833" style={{ background: 'var(--gold)', color: 'white', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', fontSize: 13, fontWeight: 600, letterSpacing: 0.5, transition: 'background 0.2s' }}
          onMouseEnter={e => e.target.style.background = 'var(--gold-light)'}
          onMouseLeave={e => e.target.style.background = 'var(--gold)'}
        >📞 06 11 02 48 33</a>
      </div>
      <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'white', fontSize: 24, padding: 8 }} className="mobile-burger">☰</button>
      {menuOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--dark)', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'white', fontSize: 28, cursor: 'pointer' }}>✕</button>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontFamily: 'var(--font-display)', fontSize: 42, letterSpacing: 4 }}>{l.label}</a>
          ))}
          <a href="tel:0611024833" style={{ background: 'var(--gold)', color: 'white', padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontSize: 16, fontWeight: 600 }}>📞 06 11 02 48 33</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])
  return (
    <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', background: 'var(--dark)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.25 }}>
        {photos.slice(0, 6).map((src, i) => (
          <div key={i} style={{ position: 'absolute', width: '33.33%', height: '50%', left: `${(i % 3) * 33.33}%`, top: `${Math.floor(i / 3) * 50}%`, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,15,13,0.8) 0%, rgba(15,15,13,0.5) 100%)' }} />
      </div>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)' }} />
      <div className="hero-content" style={{ position: 'relative', zIndex: 1, padding: '120px 60px 60px', maxWidth: 900 }}>
        <div style={{ display: 'inline-block', background: 'var(--gold)', color: 'white', padding: '6px 16px', borderRadius: 4, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 24, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}>Estrablin · Isère · Depuis 2010</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(64px, 10vw, 130px)', color: 'white', lineHeight: 0.9, letterSpacing: 2, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.2s' }}>
          <span style={{ display: 'block' }}>PLÂTRERIE</span>
          <span style={{ display: 'block', color: 'var(--gold)' }}>PEINTURE</span>
          <span style={{ display: 'block', fontSize: '0.7em' }}>RÉNOVATION</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, maxWidth: 520, lineHeight: 1.7, marginTop: 28, marginBottom: 40, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.4s' }}>
          Artisan qualifié, 3 à 5 salariés. Des finitions soignées qui transforment vos espaces. Devis gratuit sous 24h.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.55s' }}>
          <a href="tel:0611024833" style={{ background: 'var(--gold)', color: 'white', padding: '16px 32px', borderRadius: 8, textDecoration: 'none', fontSize: 16, fontWeight: 700, letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >📞 Appeler maintenant</a>
          <a href="https://wa.me/33611024833" target="_blank" rel="noreferrer" style={{ background: 'transparent', color: 'white', padding: '16px 32px', borderRadius: 8, textDecoration: 'none', fontSize: 16, fontWeight: 600, border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'white' }}
          >💬 WhatsApp</a>
          <a href="#realisations" style={{ background: 'transparent', color: 'rgba(255,255,255,0.6)', padding: '16px 24px', borderRadius: 8, textDecoration: 'none', fontSize: 15, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
          >Voir nos réalisations →</a>
        </div>
        <div style={{ display: 'flex', gap: 40, marginTop: 60, flexWrap: 'wrap', opacity: loaded ? 1 : 0, transition: 'all 0.7s ease 0.7s' }}>
          {[{ val: '4,9/5', label: '85 avis Google' }, { val: '15+', label: "Ans d'expérience" }, { val: '100%', label: 'Devis gratuit' }].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--gold)', letterSpacing: 2 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  const [ref, inView] = useInView()
  return (
    <section id="services" ref={ref} style={{ padding: '100px 40px', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 12 }}>Ce qu'on fait</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 6vw, 72px)', lineHeight: 0.95, marginBottom: 60, color: 'var(--dark)' }}>NOS<br /><span style={{ color: 'var(--gold)' }}>SERVICES</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {SERVICES.map((s, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 16, padding: '36px 32px', borderBottom: '4px solid transparent', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${i * 0.1}s`, cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderBottomColor = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(200,137,58,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.borderBottomColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--dark)', letterSpacing: 1, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 15 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 60, background: 'var(--dark)', borderRadius: 16, padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, opacity: inView ? 1 : 0, transition: 'all 0.8s ease 0.4s' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'white', letterSpacing: 1 }}>DEVIS GRATUIT EN 24H</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 4 }}>Réponse rapide garantie — Lun–Ven 07h30 à 18h30</div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="tel:0611024833" style={{ background: 'var(--gold)', color: 'white', padding: '14px 28px', borderRadius: 8, textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>📞 06 11 02 48 33</a>
            <a href="https://wa.me/33611024833" target="_blank" rel="noreferrer" style={{ background: '#25D366', color: 'white', padding: '14px 28px', borderRadius: 8, textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhotoCarousel({ photos: carouselPhotos, onSelect }) {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(i => (i - 1 + carouselPhotos.length) % carouselPhotos.length)
  const next = () => setIdx(i => (i + 1) % carouselPhotos.length)
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: 10 }}>
      <div style={{ display: 'flex', transform: `translateX(-${idx * 100}%)`, transition: 'transform 0.35s ease' }}>
        {carouselPhotos.map((src, i) => (
          <div key={i} style={{ minWidth: '100%', flexShrink: 0 }} onClick={() => onSelect(src)}>
            <img src={src} alt={`Réalisation BLS ${i + 1}`} style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} loading="lazy" />
          </div>
        ))}
      </div>
      {[{ onClick: prev, side: 'left', label: '‹' }, { onClick: next, side: 'right', label: '›' }].map(({ onClick, side, label }) => (
        <button key={side} onClick={onClick} style={{ position: 'absolute', top: '50%', [side]: 10, transform: 'translateY(-50%)', background: 'rgba(200,137,58,0.9)', border: 'none', color: 'white', fontSize: 28, fontWeight: 700, width: 44, height: 44, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>{label}</button>
      ))}
      <div style={{ position: 'absolute', bottom: 10, right: 14, background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: 12, padding: '3px 8px', borderRadius: 20 }}>{idx + 1} / {carouselPhotos.length}</div>
    </div>
  )
}

function Realisations() {
  const [ref, inView] = useInView(0.05)
  const [selected, setSelected] = useState(null)
  return (
    <section id="realisations" ref={ref} style={{ padding: '100px 40px', background: 'var(--dark)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease', marginBottom: 48 }}>
          <div style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 12 }}>Portfolio</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 6vw, 72px)', lineHeight: 0.95, color: 'white' }}>NOS<br /><span style={{ color: 'var(--gold)' }}>RÉALISATIONS</span></h2>
        </div>
        {/* Desktop masonry */}
        <div className="masonry-grid" style={{ columns: 'auto 260px', gap: 12 }}>
          {photos.map((src, i) => (
            <div key={i} style={{ breakInside: 'avoid', marginBottom: 12, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', position: 'relative', opacity: inView ? 1 : 0, transition: `opacity 0.5s ease ${Math.min(i * 0.04, 0.8)}s` }} onClick={() => setSelected(src)}>
              <img src={src} alt={`Réalisation BLS ${i + 1}`} style={{ width: '100%', display: 'block', transition: 'transform 0.4s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                loading="lazy" />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(200,137,58,0)', transition: 'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(200,137,58,0.3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(200,137,58,0)'} />
            </div>
          ))}
        </div>
        {/* Mobile carousel */}
        <div className="carousel-mobile">
          <PhotoCarousel photos={photos} onSelect={setSelected} />
        </div>
      </div>
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, cursor: 'pointer' }}>
          <img src={selected} alt="Réalisation BLS" style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 12, objectFit: 'contain' }} />
          <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'var(--gold)', border: 'none', color: 'white', fontSize: 24, width: 44, height: 44, borderRadius: '50%', cursor: 'pointer' }}>✕</button>
        </div>
      )}
    </section>
  )
}

function Avis() {
  const [ref, inView] = useInView()
  return (
    <section id="avis" ref={ref} style={{ padding: '100px 40px', background: 'var(--cream-2)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease', marginBottom: 48 }}>
          <div style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 12 }}>Ce qu'ils disent</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 6vw, 72px)', lineHeight: 0.95, color: 'var(--dark)' }}>AVIS<br /><span style={{ color: 'var(--gold)' }}>CLIENTS</span></h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: 'var(--gold)' }}>4,9</div>
            <div>
              <div style={{ fontSize: 24, color: 'var(--gold)' }}>★★★★★</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>85 avis Google vérifiés</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {AVIS.map((a, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 16, padding: '28px 28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s ease ${i * 0.08}s` }}>
              <div style={{ color: 'var(--gold)', fontSize: 18, marginBottom: 12 }}>{'★'.repeat(a.note)}</div>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 14, fontStyle: 'italic', marginBottom: 16 }}>« {a.texte} »</p>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--dark)' }}>— {a.nom}</div>
              <div style={{ fontSize: 11, color: '#25D366', fontWeight: 600, marginTop: 4 }}>✓ Avis Google vérifié</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }
  const inputStyle = { width: '100%', padding: '14px 18px', borderRadius: 8, fontSize: 15, border: '2px solid var(--cream-2)', background: 'white', color: 'var(--dark)', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color 0.2s' }
  return (
    <section id="contact" ref={ref} style={{ padding: '100px 40px', background: 'var(--dark)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-30px)', transition: 'all 0.7s ease' }}>
          <div style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 12 }}>Nous contacter</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 5vw, 64px)', color: 'white', lineHeight: 0.95, marginBottom: 40 }}>PARLONS<br /><span style={{ color: 'var(--gold)' }}>DE VOTRE<br />PROJET</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { icon: '📞', label: 'Téléphone', content: <a href="tel:0611024833" style={{ color: 'white', textDecoration: 'none', fontSize: 16, fontWeight: 500 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = 'white'}>06 11 02 48 33</a> },
              { icon: '💬', label: 'WhatsApp', content: <a href="https://wa.me/33611024833" target="_blank" rel="noreferrer" style={{ color: 'white', textDecoration: 'none', fontSize: 16, fontWeight: 500 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = 'white'}>Envoyer un message</a> },
              {
                icon: '📍', label: 'Localisation', content: (
                  <a href="https://www.google.com/maps/dir/?api=1&destination=1+All.+de+la+Divinières+38780+Estrablin" target="_blank" rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gold)', color: 'white', padding: '10px 18px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700, transition: 'background 0.2s, transform 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >🗺️ Vous y rendre</a>
                )
              },
              { icon: '🕐', label: 'Horaires', content: <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, whiteSpace: 'pre-line', lineHeight: 1.5 }}>{'Lun–Ven : 07h30 – 18h30\nSam–Dim : Fermé'}</span> },
            ].map((info, i) => (
              <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, background: 'rgba(200,137,58,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{info.icon}</div>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>{info.label}</div>
                  {info.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(30px)', transition: 'all 0.7s ease 0.2s' }}>
          <form onSubmit={handleSubmit} style={{ background: 'var(--dark-3)', borderRadius: 20, padding: '40px 36px', border: '1px solid rgba(200,137,58,0.15)' }}>
            <div style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 24 }}>Formulaire de contact</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 24, fontStyle: 'italic' }}>📧 Email disponible bientôt — En attendant, appelez-nous ou utilisez WhatsApp</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input placeholder="Votre nom *" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'var(--cream-2)'} />
              <input placeholder="Email *" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'var(--cream-2)'} />
              <input placeholder="Téléphone" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'var(--cream-2)'} />
              <textarea placeholder="Décrivez votre projet... *" required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'var(--cream-2)'} />
              <button type="submit" disabled={status === 'sending'} style={{ background: status === 'success' ? '#22c55e' : 'var(--gold)', color: 'white', padding: '16px', borderRadius: 8, border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}>
                {status === 'sending' ? '⏳ Envoi...' : status === 'success' ? '✅ Message envoyé !' : status === 'error' ? '❌ Erreur — Réessayez' : '📤 Envoyer le message'}
              </button>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>⚠️ À configurer : remplacez YOUR_FORM_ID dans App.jsx par votre ID Formspree</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ background: '#0A0A08', padding: '32px 40px', borderTop: '1px solid rgba(200,137,58,0.15)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold)', letterSpacing: 2 }}>BLS · BONNEBOUCHE</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>SIRET 518 942 925 — Entrepreneur individuel · Depuis 2010</div>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© {new Date().getFullYear()} BLS — Tous droits réservés</div>
        <a
          href="https://orchestrateur-ai.fr/"
          target="_blank" rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#2563EB', color: 'white',
            padding: '10px 20px', borderRadius: 10, textDecoration: 'none',
            fontSize: 13, fontWeight: 700, letterSpacing: 0.3,
            boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
            transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1d4ed8'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.transform = 'translateY(0)' }}
        >🤖 Orchestrateur IA — Olivier Scafi</a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
          #contact > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          .masonry-grid { display: none !important; }
          .carousel-mobile { display: block !important; }
          .hero-content { padding-top: 100px !important; padding-left: 24px !important; padding-right: 24px !important; }
        }
        @media (min-width: 769px) {
          .carousel-mobile { display: none !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Services />
      <Realisations />
      <Avis />
      <Contact />
      <Footer />
      <FloatingButtons />
    </>
  )
}
