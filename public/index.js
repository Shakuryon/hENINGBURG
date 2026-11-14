/* ==========================================================
   Heningburg's Pressure Washing LLC — index.js
   ========================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  /* ---------- "Why Wash" dropdown ---------- */
  var navDrop = document.getElementById("navDrop");
  var dropToggle = document.getElementById("dropToggle");

  function setDrop(open) {
    navDrop.classList.toggle("is-open", open);
    dropToggle.setAttribute("aria-expanded", String(open));
  }

  dropToggle.addEventListener("click", function () {
    setDrop(!navDrop.classList.contains("is-open"));
  });
  document.addEventListener("click", function (e) {
    if (!navDrop.contains(e.target)) setDrop(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navDrop.classList.contains("is-open")) {
      setDrop(false);
      dropToggle.focus();
    }
  });
  navDrop.addEventListener("focusout", function (e) {
    if (e.relatedTarget && !navDrop.contains(e.relatedTarget)) setDrop(false);
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      closeNav();
      setDrop(false);
    });
  });

  /* ---------- Hero speed lines + droplets ---------- */
  var lines = document.getElementById("speedLines");
  if (lines && !reduceMotion) {
    for (var i = 0; i < 9; i++) {
      var streak = document.createElement("span");
      streak.className = "streak";
      streak.style.top = 6 + Math.random() * 82 + "%";
      streak.style.width = 120 + Math.random() * 220 + "px";
      streak.style.animationDuration = 1.6 + Math.random() * 2.4 + "s";
      streak.style.animationDelay = -Math.random() * 4 + "s";
      streak.style.opacity = (0.25 + Math.random() * 0.5).toFixed(2);
      lines.appendChild(streak);
    }
    for (var d = 0; d < 12; d++) {
      var drop = document.createElement("span");
      drop.className = "drop";
      var size = 8 + Math.random() * 14;
      drop.style.left = Math.random() * 100 + "%";
      drop.style.width = size + "px";
      drop.style.height = size + "px";
      drop.style.animationDuration = 5 + Math.random() * 6 + "s";
      drop.style.animationDelay = -Math.random() * 10 + "s";
      lines.appendChild(drop);
    }
  }

  /* ---------- Ticker: duplicate the track so the loop is seamless ---------- */
  var track = document.getElementById("tickerTrack");
  if (track) track.innerHTML += track.innerHTML;

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el, n) {
      el.style.transitionDelay = (n % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Gallery filter ---------- */
  var filters = document.querySelectorAll(".filter");
  var shots = document.querySelectorAll(".shot");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");
      filters.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
      shots.forEach(function (shot) {
        var show = cat === "all" || shot.getAttribute("data-cat") === cat;
        shot.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Spray-to-clean demo ---------- */
  var canvas = document.getElementById("washCanvas");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var pctEl = document.getElementById("shinePct");
    var fill = document.getElementById("meterFill");
    var win = document.getElementById("washWin");
    var COLS = 24, ROWS = 12;
    var cells, cleaned, done;

    function paintGrime() {
      var rect = canvas.getBoundingClientRect();
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.globalCompositeOperation = "source-over";

      // base layer of grime
      ctx.fillStyle = "rgba(74, 66, 40, 0.94)";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // algae and mildew blotches
      var colors = ["rgba(46, 74, 34, 0.55)", "rgba(30, 36, 22, 0.5)", "rgba(110, 86, 44, 0.45)"];
      for (var b = 0; b < 90; b++) {
        ctx.fillStyle = colors[b % colors.length];
        ctx.beginPath();
        ctx.arc(Math.random() * rect.width, Math.random() * rect.height, 12 + Math.random() * 60, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "rgba(255, 248, 227, 0.9)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "400 " + Math.max(20, rect.width / 16) + "px 'Lilita One', 'Arial Black', sans-serif";
      ctx.fillText("SPRAY HERE", rect.width / 2, rect.height / 2);

      cells = new Array(COLS * ROWS);
      cleaned = 0;
      done = false;
      updateHud();
      win.textContent = "";
    }

    function updateHud() {
      var pct = Math.round((cleaned / (COLS * ROWS)) * 100);
      pctEl.textContent = pct + "%";
      fill.style.width = pct + "%";
    }

    function spray(clientX, clientY) {
      if (done) return;
      var rect = canvas.getBoundingClientRect();
      var x = clientX - rect.left;
      var y = clientY - rect.top;
      var radius = Math.max(26, rect.width / 16);

      ctx.globalCompositeOperation = "destination-out";
      var g = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // mark the grid cells under the spray so we can score it
      var cw = rect.width / COLS, ch = rect.height / ROWS;
      var reach = radius * 0.7;
      for (var cx = Math.floor((x - reach) / cw); cx <= Math.floor((x + reach) / cw); cx++) {
        for (var cy = Math.floor((y - reach) / ch); cy <= Math.floor((y + reach) / ch); cy++) {
          if (cx < 0 || cy < 0 || cx >= COLS || cy >= ROWS) continue;
          var idx = cy * COLS + cx;
          if (!cells[idx]) { cells[idx] = true; cleaned++; }
        }
      }
      updateHud();

      if (cleaned / (COLS * ROWS) >= 0.85) {
        done = true;
        cleaned = COLS * ROWS;
        updateHud();
        ctx.clearRect(0, 0, rect.width, rect.height);
        win.textContent = "Spotless! Now imagine that on your driveway.";
      }
    }

    canvas.addEventListener("pointermove", function (e) {
      // mouse sprays on hover, touch sprays while dragging
      if (e.pointerType === "mouse" || e.pressure > 0) spray(e.clientX, e.clientY);
    });
    canvas.addEventListener("pointerdown", function (e) { spray(e.clientX, e.clientY); });

    document.getElementById("washReset").addEventListener("click", paintGrime);

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(paintGrime, 200);
    });

    paintGrime();
    // repaint once the display font is ready so "SPRAY HERE" uses it
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { if (cleaned === 0) paintGrime(); });
    }
  }

  /* ---------- Quote form ----------
     No backend yet: this opens the visitor's email app with the request
     filled in. Swap for Netlify Forms / Formspree when the site goes live. */
  var form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.getElementById("formNote");
      var name = form.elements.name.value.trim();
      var phone = form.elements.phone.value.trim();
      if (!name || !phone) {
        note.textContent = "Please add your name and phone number.";
        return;
      }
      var body = [
        "Name: " + name,
        "Phone: " + phone,
        "Service: " + form.elements.service.value,
        "Details: " + form.elements.message.value.trim()
      ].join("\n");
      window.location.href = "mailto:heningburgspw@gmail.com?subject=" +
        encodeURIComponent("Quote request: " + form.elements.service.value) +
        "&body=" + encodeURIComponent(body);
      note.textContent = "Opening your email app. Prefer to talk? Call 251-406-5875.";
    });
  }
})();
