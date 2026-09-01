(function(){
  "use strict";

  /* ---------- CONFIG ---------- */
  var WHATSAPP_NUMBER = "94716903578"; // Dearday.lk WhatsApp number (international format, no +)
  var DEFAULT_MESSAGE = "Hi Dearday.lk, I'm interested in creating a digital invitation. I'd like to know more about your packages.";

  function waLink(message){
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  function wireWhatsAppLinks(){
    document.querySelectorAll(".wa-cta").forEach(function(el){
      var pkg = el.getAttribute("data-pkg");
      var msg = pkg
        ? "Hi Dearday.lk, I'm interested in the " + pkg + " Package for a digital invitation. Please send me more details."
        : DEFAULT_MESSAGE;
      el.setAttribute("href", waLink(msg));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }

  /* ---------- LOADER ----------
     Note: this deliberately does NOT wait for window's "load" event.
     That event only fires once every sub-resource on the page — including
     the live iframes embedding real external invitation sites in the
     portfolio preview — has fully finished loading. If one of those is
     slow, blocked, or never resolves, "load" may never fire and the
     loading screen would be stuck forever. Since this script runs at the
     very end of <body>, the page's own HTML is already ready by the time
     we get here, so we just hide the loader on a short fixed timer. */
  var loader = document.getElementById("loader");
  if(loader){
    setTimeout(function(){ loader.classList.add("hide"); }, 500);
  }

  /* ---------- NAVBAR SCROLL ---------- */
  var navbar = document.getElementById("navbar");
  var navCta = document.getElementById("nav-cta");
  function onScroll(){
    if(!navbar) return;
    if(window.scrollY > 40){
      navbar.classList.add("scrolled");
      if(navCta) navCta.style.display = "inline-flex";
    } else {
      navbar.classList.remove("scrolled");
      if(navCta) navCta.style.display = "none";
    }
  }
  if(navbar){
    window.addEventListener("scroll", onScroll, {passive:true});
    onScroll();
  }

  /* ---------- MOBILE MENU ---------- */
  var hamburger = document.getElementById("hamburger");
  var mobileMenu = document.getElementById("mobile-menu");
  if(hamburger && mobileMenu){
    hamburger.addEventListener("click", function(){
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });

  var pastelThemes = ["theme-blush", "theme-mint", "theme-lavender"];

  /* =====================================================================
     PORTFOLIO — MASTER LIST (EASY EDIT ZONE)
     This is the one place to manage every project. It's used to build:
       - the full grid with filters on portfolio.html
       - the short "featured" preview on the homepage (see the
         featuredSlugs list right below — just list the titles you want
         to feature there)

     For each project you can set:
       cat:   category — one of "wedding", "birthday", "engagement",
              "party", "proposal", "custom" (controls the filter buttons)
       tag:   small label shown on the card (e.g. "Wedding")
       title: the project's title
       desc:  one short line describing it
       url:   the real link to your finished invitation website.
              Leave it as "" (empty) if you don't have a live link yet —
              the button will just scroll to the contact section instead.
              IMPORTANT: as soon as you add a url, the card automatically
              shows a LIVE, fully interactive preview of that website —
              visitors can click links and scroll around inside it right
              on the card, not just look at a picture of it.
       image: (optional) only set this if you'd rather show a lightweight
              static screenshot instead of the live interactive preview
              (e.g. if a site is slow to load). Leave it as "" in almost
              all cases — the live preview is used automatically.

     Just copy one block, paste it, and change the values — you can add
     as many as you like.
     ===================================================================== */
  var portfolioItems = [
    {cat:"wedding", tag:"Wedding", title:"Sajath & Alya", desc:"A romantic countdown invitation with gallery and RSVP.", url:"https://sajathaalya.netlify.app/", image:""},
    {cat:"wedding", tag:"Wedding", title:"Aqeel & Hana", desc:"Traditional details woven into a modern layout.", url:"https://aqeel-hana.netlify.app/", image:""},
    {cat:"wedding", tag:"Wedding", title:"Marlin & Sahnas", desc:".", url:"https://dark-cream.netlify.app/", image:""},
    {cat:"wedding", tag:"Wedding", title:"Olive-promise", desc:"Traditional details woven into a modern layout.", url:"https://olive-promise.netlify.app/", image:""},
    {cat:"wedding", tag:"Wedding", title:"Eventa-galaxy", desc:"Traditional details woven into a modern layout.", url:"https://eterna-galaxy.netlify.app/", image:""},
    {cat:"birthday", tag:"Birthday", title:"Turning Twenty-Five", desc:"A playful, colour-forward birthday experience.", url:"", image:""},
    {cat:"engagement", tag:"Engagement", title:"The Proposal Story", desc:"An elegant engagement invite with a couple's timeline.", url:"", image:""},
    {cat:"party", tag:"Party", title:"Rooftop New Year", desc:"A modern party invite with map and music.", url:"", image:""},
    {cat:"proposal", tag:"Proposal", title:"Will You Marry Me?", desc:"A cinematic surprise proposal experience.", url:"", image:""},
    {cat:"custom", tag:"Custom", title:"Founders' Anniversary", desc:"A bespoke corporate celebration invitation.", url:"", image:""},
    {cat:"birthday", tag:"Birthday", title:"Little Star Turns One", desc:"A soft, dreamy first-birthday invitation.", url:"", image:""},
    {cat:"engagement", tag:"Engagement", title:"Ceylon Garden Engagement", desc:"Botanical accents with a live countdown.", url:"", image:""}
  ];

  // Which projects (by exact title) show up in the homepage's short preview.
  // Edit this list to change what appears there — order matters.
  var featuredSlugs = ["Sajath & Alya", "Turning Twenty-Five", "The Proposal Story"];

  function buildPortfolioCard(item, i){
    var el = document.createElement("div");
    el.className = "p-item glass reveal";
    el.setAttribute("data-cat", item.cat);
    var theme = pastelThemes[i % pastelThemes.length];

    var fallbackHtml =
      '<div class="mock-face ' + theme + '" style="border-radius:14px;">' +
        '<div class="mock-seal"></div>' +
        '<div class="mock-title">' + item.title + '</div>' +
        '<div class="mock-sub">Digital Invitation</div>' +
        '<div class="mline" style="width:55%"></div>' +
      '</div>';

    var overlayHtml = "";
    if(item.image){
      // Manual override: a lightweight static picture instead of a live embed.
      overlayHtml =
        '<img src="' + item.image + '" alt="' + item.title + '" loading="lazy" ' +
        'style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:top center;" ' +
        'onerror="this.style.display=\'none\';">';
    } else if(item.url){
      // Live, fully interactive embed of the real site — visitors can click
      // links and scroll around inside it directly on the card. Only the
      // small badge in the corner captures clicks on its own; everywhere
      // else on the preview goes straight through to the embedded site.
      overlayHtml =
        '<iframe src="' + item.url + '" title="' + item.title + '" loading="lazy" ' +
        'style="position:absolute; inset:0; width:100%; height:100%; border:0;"></iframe>' +
        '<a href="' + item.url + '" target="_blank" rel="noopener noreferrer" class="p-preview-badge">Open Full Site ↗</a>';
    }

    var previewHtml = fallbackHtml + overlayHtml;

    var linkHref = item.url ? item.url : "#contact";
    var linkTarget = item.url ? ' target="_blank" rel="noopener noreferrer"' : "";

    el.innerHTML =
      '<div class="p-preview">' + previewHtml + '</div>' +
      '<div class="p-body">' +
        '<span class="p-tag">' + item.tag + '</span>' +
        '<h3 class="p-title">' + item.title + '</h3>' +
        '<p class="p-desc">' + item.desc + '</p>' +
        '<a href="' + linkHref + '"' + linkTarget + ' class="btn btn-ghost btn-sm">View Invitation</a>' +
      '</div>';
    return el;
  }

  // Homepage: short featured preview (no filters).
  var previewGrid = document.getElementById("portfolio-grid");
  if(previewGrid){
    var featuredItems = featuredSlugs
      .map(function(title){ return portfolioItems.filter(function(p){ return p.title === title; })[0]; })
      .filter(Boolean);
    featuredItems.forEach(function(item, i){
      var card = buildPortfolioCard(item, i);
      previewGrid.appendChild(card);
      io.observe(card);
    });
  }

  // Portfolio page: full grid with category filters.
  var fullGrid = document.getElementById("portfolio-grid-full");
  if(fullGrid){
    portfolioItems.forEach(function(item, i){
      var card = buildPortfolioCard(item, i);
      fullGrid.appendChild(card);
      io.observe(card);
    });

    document.querySelectorAll(".filter-btn").forEach(function(btn){
      btn.addEventListener("click", function(){
        document.querySelectorAll(".filter-btn").forEach(function(b){ b.classList.remove("active"); });
        btn.classList.add("active");
        var filter = btn.getAttribute("data-filter");
        fullGrid.querySelectorAll(".p-item").forEach(function(item){
          var match = (filter === "all" || item.getAttribute("data-cat") === filter);
          item.classList.toggle("hidden-item", !match);
        });
      });
    });
  }

  /* ---------- FEATURES DATA (homepage only) ---------- */
  var featGrid = document.getElementById("feat-grid");
  if(featGrid){
    var features = [
      ["⏱","Countdown Timer"], ["🖼","Photo Gallery"], ["📋","Event Schedule"], ["📍","Google Maps"],
      ["✉","RSVP"], ["🎵","Background Music"], ["📖","Couple Story"], ["🏛","Venue Details"],
      ["🗂","Multiple Events"], ["☎","Contact Buttons"], ["🔗","Social Links"], ["✨","Custom Animations"]
    ];
    features.forEach(function(f, i){
      var el = document.createElement("div");
      el.className = "feat-chip glass reveal" + (i % 4 === 1 ? " reveal-delay-1" : i % 4 === 2 ? " reveal-delay-2" : "");
      el.innerHTML = '<div style="font-size:20px;">' + f[0] + '</div><span>' + f[1] + '</span>';
      featGrid.appendChild(el);
      io.observe(el);
    });
  }

  /* ---------- TESTIMONIALS (homepage only) ---------- */
  var testiRow = document.getElementById("testi-row");
  if(testiRow){
    var testimonials = [
      {name:"Nethmi P.", meta:"Wedding · Colombo", quote:"Our guests kept saying it felt like a mini website just for us. So much better than a paper card.", stars:5},
      {name:"Ashan & Ruvini", meta:"Wedding · Kandy", quote:"The countdown and gallery made everyone excited before the day even arrived. Beautifully made.", stars:5},
      {name:"Dilki F.", meta:"Birthday · Negombo", quote:"Sent it on our family group and it just felt premium. Loved how easy the whole process was.", stars:5},
      {name:"Sameera W.", meta:"Engagement · Galle", quote:"Quick replies on WhatsApp, lovely design options, and the final invitation looked stunning.", stars:5},
      {name:"Hasini J.", meta:"Proposal · Colombo", quote:"He surprised me with a link instead of a card — I actually cried. Such a unique idea.", stars:5}
    ];
    function renderTestiCard(t){
      var el = document.createElement("div");
      el.className = "testi-card glass";
      el.innerHTML =
        '<div class="stars">' + "★".repeat(t.stars) + '</div>' +
        '<p class="quote">"' + t.quote + '"</p>' +
        '<div class="testi-name">' + t.name + '</div>' +
        '<div class="testi-meta">' + t.meta + '</div>';
      return el;
    }
    testimonials.concat(testimonials).forEach(function(t){
      testiRow.appendChild(renderTestiCard(t));
    });

    (function(){
      var paused = false;
      var resumeTimer = null;
      var speed = 0.55;
      var isDown = false;
      var startX, startScroll;
      var loopPoint = 0;

      function computeLoopPoint(){
        loopPoint = testiRow.scrollWidth / 2;
      }
      window.addEventListener("load", computeLoopPoint);
      window.addEventListener("resize", computeLoopPoint);
      setTimeout(computeLoopPoint, 300);

      function tick(){
        if(!paused){
          testiRow.scrollLeft += speed;
          if(testiRow.scrollLeft >= loopPoint){
            testiRow.scrollLeft -= loopPoint;
          }
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);

      function pauseThenResume(delay){
        paused = true;
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(function(){ paused = false; }, delay || 1800);
      }

      testiRow.addEventListener("mouseenter", function(){ paused = true; clearTimeout(resumeTimer); });
      testiRow.addEventListener("mouseleave", function(){ if(!isDown) paused = false; });

      testiRow.addEventListener("mousedown", function(e){
        isDown = true;
        testiRow.classList.add("dragging");
        startX = e.pageX;
        startScroll = testiRow.scrollLeft;
        paused = true;
      });
      window.addEventListener("mouseup", function(){
        if(isDown){
          isDown = false;
          testiRow.classList.remove("dragging");
          pauseThenResume(1500);
        }
      });
      window.addEventListener("mousemove", function(e){
        if(!isDown) return;
        testiRow.scrollLeft = startScroll - (e.pageX - startX);
      });

      testiRow.addEventListener("touchstart", function(){ paused = true; clearTimeout(resumeTimer); }, {passive:true});
      testiRow.addEventListener("touchend", function(){ pauseThenResume(1500); }, {passive:true});

      testiRow.addEventListener("scroll", function(){
        if(!isDown){
          if(loopPoint > 0){
            if(testiRow.scrollLeft >= loopPoint) testiRow.scrollLeft -= loopPoint;
            if(testiRow.scrollLeft < 0) testiRow.scrollLeft += loopPoint;
          }
        }
      });
    })();
  }

  /* ---------- FAQ (homepage only) ---------- */
  var faqList = document.getElementById("faq-list");
  if(faqList){
    var faqs = [
      ["What is a digital invitation?", "A digital invitation is an interactive, web-based invitation you can share as a link — combining design, photos, and details like a mini website made just for your event."],
      ["How does the invitation work?", "We design your invitation and deliver it as a shareable link. You send that link to your guests through WhatsApp, social media or any messaging app."],
      ["Can I customize the design?", "Yes. Every invitation is customized to match your event's style, colours and preferences — from the Essential to the Luxe package."],
      ["How long does it take to create?", "Turnaround depends on the package and details provided, but most invitations are ready within a few days of confirming your requirements on WhatsApp."],
      ["Can I add photos and videos?", "Yes, our Signature and Luxe packages support photo galleries, and Luxe also supports video."],
      ["Can I add background music?", "Yes, background music can be added to Signature and Luxe invitations to set the mood as guests open the link."],
      ["Can guests RSVP through the invitation?", "Yes, RSVP and contact options are available on our Signature and Luxe packages."],
      ["Can I add Google Maps?", "Yes, we can embed a Google Maps location so your guests can find the venue with one tap."],
      ["Can I share the invitation through WhatsApp?", "Absolutely — invitations are built to share instantly through WhatsApp, Messenger, Instagram or any platform you like."],
      ["Can I request a custom design?", "Yes, if you have something specific in mind, message us on WhatsApp and we'll design a fully custom invitation for you."],
      ["How long will my invitation remain active?", "Your invitation link stays active well beyond your event date — reach out to us on WhatsApp for specifics on your package."]
    ];
    faqs.forEach(function(f, i){
      var item = document.createElement("div");
      item.className = "faq-item";
      item.innerHTML =
        '<button class="faq-q"><span>' + f[0] + '</span><span class="plus">+</span></button>' +
        '<div class="faq-a"><p>' + f[1] + '</p></div>';
      faqList.appendChild(item);

      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      q.addEventListener("click", function(){
        var isOpen = item.classList.contains("open");
        faqList.querySelectorAll(".faq-item.open").forEach(function(openItem){
          openItem.classList.remove("open");
          openItem.querySelector(".faq-a").style.maxHeight = null;
        });
        if(!isOpen){
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- INIT ---------- */
  wireWhatsAppLinks();
})();
