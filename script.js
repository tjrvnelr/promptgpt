      // Loading
      window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        setTimeout(() => loader.classList.add('hidden'), 400);
      });

      // Scroll progress
      const progress = document.getElementById('progress');
      window.addEventListener('scroll', () => {
        const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progress.style.width = pct + '%';
      });

      // Section reveal
      const sections = document.querySelectorAll('section');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      sections.forEach(s => observer.observe(s));

      // Back to top
      const btn = document.getElementById('backToTop');
      window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
      });
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

      // Copy buttons
      const toast = document.getElementById('toast');
      let toastTimer;
      document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const text = btn.dataset.prompt;
          navigator.clipboard.writeText(text).then(() => {
            btn.textContent = '✓ Copied';
            btn.classList.add('copied');
            clearTimeout(toastTimer);
            toast.classList.add('show');
            toastTimer = setTimeout(() => {
              toast.classList.remove('show');
              btn.textContent = 'Copy';
              btn.classList.remove('copied');
            }, 2000);
          });
        });
      });

      // Smooth scroll for nav
      document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });