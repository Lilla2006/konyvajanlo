document.addEventListener("DOMContentLoaded", () => {
      const pages = document.querySelectorAll('.page');
      const navButtons = document.querySelectorAll('.nav-btn');

      const showPage = (id) => {
        pages.forEach(p => p.classList.remove('active'));
        document.getElementById(id).classList.add('active');

        navButtons.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.page === id);
        });
      };

      navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          showPage(btn.dataset.page);
        });
      });

      const books = [
        {
          id: 1,
          title: "A titkos kert",
          author: "Frances Hodgson Burnett",
          year: 1911,
          rating: 4.7,
          tags: ["klasszikus", "gyermekirodalom"],
          description: "Egy magányos kislány története, aki felfedez egy elhagyatott kertet, és barátokra talál."
        },
        {
          id: 2,
          title: "Gyűrűk Ura: A Gyűrű Szövetsége",
          author: "J. R. R. Tolkien",
          year: 1954,
          rating: 4.9,
          tags: ["fantasy", "epikus"],
          description: "Frodo és társai útra kelnek, hogy elpusztítsák az Egy Gyűrűt és megmentsék Középföldét."
        },
        {
          id: 3,
          title: "A kis herceg",
          author: "Antoine de Saint-Exupéry",
          year: 1943,
          rating: 4.8,
          tags: ["filozofikus", "klasszikus"],
          description: "Egy pilóta találkozása egy különös kisfiúval, aki más bolygókról érkezett."
        },
        {
          id: 4,
          title: "Bűn és bűnhődés",
          author: "Fjodor Mihajlovics Dosztojevszkij",
          year: 1866,
          rating: 4.3,
          tags: ["orosz irodalom", "dráma"],
          description: "Raszkolnyikov lelki vívódásai és bűnének következményei."
        }
      ];

      let currentBookId = null;

      const bookListEl = document.getElementById('book-list');
      const recListEl = document.getElementById('rec-list');
      const bookDetailEl = document.getElementById('book-detail');

      const renderBookCard = (book) => {
        const div = document.createElement('div');
        div.className = 'book-card';
        div.dataset.id = book.id;
        div.innerHTML = `
          <h3>${book.title}</h3>
          <p><strong>Szerző:</strong> ${book.author}</p>
          <p><strong>Év:</strong> ${book.year}</p>
          <p><strong>Értékelés:</strong> ${book.rating.toFixed(1)} / 5</p>
          <p>
            ${book.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </p>
        `;
        return div;
      };

      const loadBookList = () => {
        bookListEl.innerHTML = '';
        books.forEach(book => {
          const card = renderBookCard(book);
          card.addEventListener('click', () => {
            showBookDetail(book.id);
            showPage('view-detail');
          });
          bookListEl.appendChild(card);
        });
      };

      const showBookDetail = (id) => {
        const book = books.find(b => b.id === id);
        if (!book) return;
        currentBookId = id;
        bookDetailEl.innerHTML = `
          <h2>${book.title}</h2>
          <p class="muted">${book.author} • ${book.year}</p>
          <p><strong>Átlagos értékelés:</strong> ${book.rating.toFixed(1)} / 5</p>
          <p style="margin-top:10px;">${book.description}</p>
          <p style="margin-top:10px;">
            ${book.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </p>
        `;
        const reviewSelect = document.getElementById('review-book');
        if (reviewSelect) {
          reviewSelect.value = String(id);
        }
      };

      const loadRecommendations = () => {
        recListEl.innerHTML = '';
        const topBooks = books.filter(b => b.rating >= 4.0);
        topBooks.forEach(book => {
          const card = renderBookCard(book);
          card.addEventListener('click', () => {
            showBookDetail(book.id);
            showPage('view-detail');
          });
          recListEl.appendChild(card);
        });
      };

      const reviewSelectEl = document.getElementById('review-book');
      const reviewForm = document.getElementById('review-form');
      const reviewMsgEl = document.getElementById('review-msg');

      const loadReviewSelect = () => {
        reviewSelectEl.innerHTML = '';
        books.forEach(book => {
          const opt = document.createElement('option');
          opt.value = book.id;
          opt.textContent = book.title;
          reviewSelectEl.appendChild(opt);
        });
      };

      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const bookId = Number(reviewSelectEl.value);
        const rating = Number(document.getElementById('review-rating').value);
        const text = document.getElementById('review-text').value.trim();

        if (!bookId || !rating) {
          reviewMsgEl.textContent = 'Kérlek válaszd ki a könyvet és az értékelést.';
          reviewMsgEl.classList.remove('error');
          reviewMsgEl.classList.add('success');
          return;
        }

        reviewMsgEl.textContent = 'Köszönjük az értékelésed! (ez most csak demo, nem mentjük el sehová)';
        reviewMsgEl.classList.remove('error');
        reviewMsgEl.classList.add('success');

        document.getElementById('review-text').value = '';

        showBookDetail(bookId);
        loadRecommendations();
      });

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      const tabLogin = document.getElementById('tab-login');
      const tabRegister = document.getElementById('tab-register');
      const formLogin = document.getElementById('login');
      const formRegister = document.getElementById('register');

      tabLogin.onclick = () => {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.classList.add('active');
        formRegister.classList.remove('active');
      };

      tabRegister.onclick = () => {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        formRegister.classList.add('active');
        formLogin.classList.remove('active');
      };

      formLogin.onsubmit = e => {
        e.preventDefault();
        document.getElementById('login-email-error').textContent = '';
        document.getElementById('login-pass-error').textContent = '';
        document.getElementById('login-msg').textContent = '';

        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value;
        let ok = true;

        if (!emailRegex.test(email)) {
          document.getElementById('login-email-error').textContent = 'Érvénytelen email';
          ok = false;
        }

        if (!passRegex.test(pass)) {
          document.getElementById('login-pass-error').textContent =
            'A jelszó nem megfelelő (8 karakter, nagybetű, kisbetű, szám, speciális karakter)';
          ok = false;
        }

        if (ok) {
          document.getElementById('login-msg').textContent = 'Sikeres bejelentkezés (demo).';
        }
      };

      formRegister.onsubmit = e => {
        e.preventDefault();
        document.getElementById('reg-email-error').textContent = '';
        document.getElementById('reg-pass1-error').textContent = '';
        document.getElementById('reg-pass2-error').textContent = '';
        document.getElementById('reg-msg').textContent = '';

        const email = document.getElementById('reg-email').value.trim();
        const p1 = document.getElementById('reg-pass1').value;
        const p2 = document.getElementById('reg-pass2').value;
        let ok = true;

        if (!emailRegex.test(email)) {
          document.getElementById('reg-email-error').textContent = 'Érvénytelen email';
          ok = false;
        }

        if (!passRegex.test(p1)) {
          document.getElementById('reg-pass1-error').textContent =
            'A jelszó nem megfelelő (8 karakter, nagy/kisbetű, szám, speciális karakter)';
          ok = false;
        }

        if (p1 !== p2) {
          document.getElementById('reg-pass2-error').textContent = 'A két jelszó nem egyezik';
          ok = false;
        }

        if (ok) {
          document.getElementById('reg-msg').textContent = 'Sikeres regisztráció (demo).';
        }
      };

      loadBookList();
      loadReviewSelect();
      loadRecommendations();
      if (books.length > 0) {
        showBookDetail(books[0].id);
      }
    });