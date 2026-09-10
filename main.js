document.addEventListener('DOMContentLoaded', () => {

  /* HAMBURGER */
  const hbg = document.getElementById('hamburger');
  const drw = document.getElementById('drawer');
  if (hbg && drw) {
    hbg.addEventListener('click', () => {
      const o = hbg.classList.toggle('ouvert');
      drw.classList.toggle('ouvert', o);
      document.body.style.overflow = o ? 'hidden' : '';
    });
    drw.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hbg.classList.remove('ouvert');
      drw.classList.remove('ouvert');
      document.body.style.overflow = '';
    }));
  }

  /* NAV SCROLL */
  const nav = document.getElementById('nav');
  if (nav) window.addEventListener('scroll', () =>
    nav.classList.toggle('scrolled', window.scrollY > 60));

  /* INTERSECTION OBSERVER */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-observe],.apparait,.stat,.carte-sceno,.carte-projet').forEach(el => obs.observe(el));

  /* ONGLETS (pages intérieures) */
  const tabs = document.querySelectorAll('.sceno-tab, .proj-tab');
  if (tabs.length) {
    const ids = [...tabs].map(t => t.getAttribute('href').replace('#',''));
    const secs = ids.map(id => document.getElementById(id)).filter(Boolean);
    window.addEventListener('scroll', () => {
      let cur = ids[0];
      secs.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
      tabs.forEach(t => t.classList.toggle('actif', t.getAttribute('href') === '#' + cur));
    });
  }

  /* LIGHTBOX */
  const ov = document.createElement('div');
  ov.className = 'lightbox-overlay';
  ov.innerHTML = '<button class="lightbox-fermer">&#x2715;</button><img src="" alt=""/>';
  document.body.appendChild(ov);
  const lbImg = ov.querySelector('img');

  const open  = (src, alt) => { lbImg.src = src; lbImg.alt = alt||''; ov.classList.add('actif'); document.body.style.overflow='hidden'; };
  const close = () => { ov.classList.remove('actif'); document.body.style.overflow=''; setTimeout(()=>{ lbImg.src=''; },300); };

  ov.querySelector('.lightbox-fermer').addEventListener('click', close);
  ov.addEventListener('click', e => { if (e.target===ov) close(); });
  document.addEventListener('keydown', e => { if (e.key==='Escape') close(); });

  const sel = '.photo-cadre img,.photo-sceno img,.sceno-photo-principale img,.concept-photo img,.galerie-photo img';
  document.querySelectorAll(sel).forEach(img => {
    img.parentElement.classList.add('photo-cliquable');
    img.addEventListener('click', () => open(img.dataset.full||img.src, img.alt));
  });

});
