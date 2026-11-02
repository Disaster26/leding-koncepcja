(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- produkty z leding.eu (strona 1 kategorii PLAFONY LED) ---------- */
  var P = [
    ['Plafon LED z czujnikiem 6W 230V 750lm 210mm VARIO PIR', '79,90 zł', 'D', '01', '339-plafon-led-z-czujnikiem-pir-6w-230v-vario'],
    ['Plafon automatyczny LED 15W 230V 2100lm 220mm SOL MV', '135,00 zł', 'B', '02', '354-plafon-automatyczny-led-15w-230v-2100lm-sol-mv'],
    ['Plafon automatyczny LED 15W 230V 2100lm 220mm SOL MV z pilotem', '139,00 zł', 'B', '03', '355-plafon-automatyczny-led-15w-230v-2100lm-sol-mvpil'],
    ['Plafon LED 15W 230V 2100lm 220mm SOL praca ciągła', '97,00 zł', 'B', '04', '356-plafon-led-15w-230v-2100lm-sol-praca-ciagla'],
    ['Plafon LED 18W 230V 2500lm 280mm SOL praca ciągła', '132,00 zł', 'B', '05', '357-plafon-led-18w-230v-2500lm-sol-praca-ciagla'],
    ['Plafon LED 24W 230V 3400lm 330mm SOL praca ciągła', '173,00 zł', 'B', '06', '358-plafon-led-24w-230v-3400lm-sol-praca-ciagla'],
    ['Plafon automatyczny LED 18W 230V 2500lm 280mm SOL MV', '169,00 zł', 'B', '07', '359-plafon-automatyczny-led-18w-230v-2500lm-sol-mv'],
    ['Plafon automatyczny LED 24W 230V 3400lm 330mm SOL MV z pilotem', '215,00 zł', '', '08', '360-plafon-automatyczny-led-24w-230v-3400lm-sol-mv'],
    ['Plafon automatyczny LED 18W 230V 2500lm 280mm PLAZA MV', '229,00 zł', 'B', '09', '373-plafon-automatyczny-led-18w-230v-2500lm-plaza-mv'],
    ['Plafon automatyczny LED 24W 230V 3400lm 330mm PLAZA MV', '225,00 zł', 'B', '10', '376-plafon-automatyczny-led-24w-230v-3400lm-plaza-mv'],
    ['Plafon LED praca ciągła 18W 230V 2500lm 280mm PLAZA', '183,00 zł', 'B', '11', '385-plafon-led-18w-230v-2500lm-plaza-praca-ciagla'],
    ['Plafon LED praca ciągła 24W 230V 3400lm 330mm PLAZA', '189,00 zł', 'B', '12', '389-plafon-led-24w-230v-3400lm-plaza-praca-ciagla']
  ].map(function (a, i) {
    return { id: 'p' + (i + 1), name: a[0], price: a[1], en: a[2], img: 'img/p/' + a[3] + '.webp', href: 'https://leding.eu/plafony-led/' + a[4], w: parseInt(a[0].match(/(\d+)W/)[1], 10) };
  });

  /* ---------- kategorie i serie (nazwy z oferty leding.eu) ---------- */
  var C = [
    { k: 'plafony', n: 'Plafony LED', img: 'img/plafony-led.png', s: ['SOL', 'SOL MV', 'SOL PIR', 'PLAZA', 'PLAZA MV', 'PLAZA PIR', 'dwustrumieniowe 4W/18W i 4W/24W', 'PIKTO PLAZA / PIKTO SOL', 'ADMINO', 'SENSO', 'VARIO PIR', 'FALA MV'] },
    { k: 'naswietlacze', n: 'Naświetlacze LED', img: 'img/c_naswietlacze.webp', s: ['PATIO (PIR + stałe)', 'z czujnikiem PIR', 'bez czujnika 10-30W'] },
    { k: 'piwniczne', n: 'Lampy piwniczne', img: 'img/c_piwniczne.webp', s: ['CANTINA 230V', 'CANTINA 24V', 'CANTINA+MV', 'VARIO PIR'] },
    { k: 'panele', n: 'Panele LED', img: 'img/c_panele.webp', s: ['PLATO 3', 'PLATO ULTRA', 'EXTENSO', 'EXTENSO ULTRA', 'LEUTENSO 30x120', 'GRANDE', 'ramki natynkowe MARCO'] },
    { k: 'hermetyczne', n: 'Lampy hermetyczne i rastrowe', img: 'img/c_hermetyczne.webp', s: ['oprawy hermetyczne T8', 'oprawy rastrowe T8', 'LINEA-2'] },
    { k: 'przemyslowe', n: 'Oprawy przemysłowe', img: 'img/c_przemyslowe.webp', s: ['HIGH-BAY SPACE', 'HIGH-BAY SATURO', 'akcesoria do HIGH-BAY'] },
    { k: 'uliczne', n: 'Lampy uliczne i parkowe', img: 'img/c_uliczne.webp', s: ['VIRA', 'NERO DUE', 'VICOLO', 'AURIS'] },
    { k: 'swietlowki', n: 'Świetlówki i żarówki LED', img: 'img/c_swietlowki.webp', s: ['świetlówki T8 LINIO', 'świetlówki T5', 'żarówki E27 / E14', 'żarówki MR16 / GU10'] },
    { k: 'tasmy', n: 'Taśmy LED', img: 'img/c_tasmy.webp', s: ['CINTA 12V', 'CINTA 24V', 'CINTA IP65', 'zasilacze'] },
    { k: 'inne', n: 'Produkt na zamówienie', img: '', s: [] }
  ];
  var CM = {}; C.forEach(function (c) { CM[c.k] = c; });

  var S = { prod: {}, cats: {}, ser: {}, qty: {}, files: [], step: 1 };

  /* ---------- kafelki produktow ---------- */
  var grid = $('#grid');
  grid.innerHTML = P.map(function (p) {
    return '<article class="prod" data-w="' + p.w + '">' +
      '<a class="pi" href="' + p.href + '"><img src="' + p.img + '" alt="' + esc(p.name) + '" width="450" height="450" loading="lazy"></a>' +
      '<div class="pd">' + (p.en ? '<img class="en" src="img/en_' + p.en + '.webp" alt="Klasa energetyczna ' + p.en + '" width="150" height="83">' : '') +
      '<h3><a href="' + p.href + '">' + esc(p.name) + '</a></h3><div class="pr">' + p.price + '</div>' +
      '<button class="add" type="button" data-id="' + p.id + '">+ Do zapytania</button></div></article>';
  }).join('');

  grid.addEventListener('click', function (e) {
    var b = e.target.closest('.add'); if (!b) return;
    var id = b.getAttribute('data-id');
    if (S.prod[id]) { delete S.prod[id]; } else { S.prod[id] = true; if (!S.qty[id]) S.qty[id] = 10; }
    syncProd();
  });

  function syncProd() {
    $$('.add').forEach(function (b) {
      var on = !!S.prod[b.getAttribute('data-id')];
      b.classList.toggle('on', on);
      b.textContent = on ? '✓ W zapytaniu' : '+ Do zapytania';
    });
    var n = Object.keys(S.prod).length;
    $$('.cnt').forEach(function (c) { c.hidden = !n; c.textContent = n; });
    var box = $('#picked');
    box.hidden = !n;
    $('ul', box).innerHTML = P.filter(function (p) { return S.prod[p.id]; }).map(function (p) {
      return '<li><span>' + esc(p.name) + '</span><button class="rm" type="button" data-rm="' + p.id + '">Usuń</button></li>';
    }).join('');
  }
  $('#picked').addEventListener('click', function (e) {
    var b = e.target.closest('[data-rm]'); if (!b) return;
    delete S.prod[b.getAttribute('data-rm')]; syncProd();
  });

  /* filtr mocy */
  var moce = {}; P.forEach(function (p) { moce[p.w] = (moce[p.w] || 0) + 1; });
  $('#fMoc').innerHTML = Object.keys(moce).sort(function (a, b) { return a - b; }).map(function (w) {
    return '<label><input type="checkbox" value="' + w + '"> ' + w + ' W (' + moce[w] + ')</label>';
  }).join('');
  $('#fMoc').addEventListener('change', function () {
    var on = $$('#fMoc input:checked').map(function (i) { return i.value; });
    var n = 0;
    $$('.prod').forEach(function (a) { var v = !on.length || on.indexOf(a.getAttribute('data-w')) > -1; a.hidden = !v; if (v) n++; });
    $('#shown').textContent = on.length ? 'Pokazano ' + n + ' z 12 produktów na tej stronie' : 'Pokazano 1-12 z 52 pozycji';
  });

  /* ---------- krok 1 ---------- */
  $('#cats').innerHTML = C.map(function (c) {
    return '<label class="copt"><input type="checkbox" value="' + c.k + '">' + (c.img ? '<img src="' + c.img + '" alt="" width="42" height="42" loading="lazy">' : '') + '<span>' + c.n + '</span></label>';
  }).join('');
  $('#cats').addEventListener('change', function (e) {
    var k = e.target.value; if (e.target.checked) S.cats[k] = true; else delete S.cats[k]; $('#msg').textContent = '';
    renderSeries();
  });
  function renderSeries() {
    $('#series').innerHTML = C.filter(function (c) { return S.cats[c.k]; }).map(function (c) {
      if (c.k === 'inne') return '<div class="sgrp"><h4>Produkt na zamówienie</h4><label class="fld"><span>Jakiej funkcji lub parametru brakuje w standardowych oprawach?</span><textarea id="inneOpis" placeholder="np. plafon z podświetlanym numerem budynku, inne napięcie, nietypowy wymiar">' + esc(S.inne || '') + '</textarea></label></div>';
      return '<div class="sgrp"><h4>' + c.n + ': seria lub typ <span style="font-weight:400;color:#5f6368">(opcjonalnie)</span></h4><div class="chips">' +
        c.s.map(function (s) { var id = c.k + '|' + s; return '<label class="chip"><input type="checkbox" value="' + esc(id) + '"' + (S.ser[id] ? ' checked' : '') + '><span>' + esc(s) + '</span></label>'; }).join('') + '</div></div>';
    }).join('');
  }
  $('#series').addEventListener('change', function (e) {
    if (e.target.type !== 'checkbox') return;
    if (e.target.checked) S.ser[e.target.value] = true; else delete S.ser[e.target.value];
  });
  $('#series').addEventListener('input', function (e) { if (e.target.id === 'inneOpis') S.inne = e.target.value; });

  /* pozycje do kroku 2 */
  function positions() {
    var out = [];
    P.forEach(function (p) { if (S.prod[p.id]) out.push({ id: p.id, nm: p.name, sub: 'cena w sklepie: ' + p.price + '/szt.' }); });
    C.forEach(function (c) {
      if (!S.cats[c.k]) return;
      var ss = c.s.filter(function (s) { return S.ser[c.k + '|' + s]; });
      if (ss.length) ss.forEach(function (s) { out.push({ id: c.k + '|' + s, nm: c.n + ': ' + s, sub: '' }); });
      else out.push({ id: c.k, nm: c.n, sub: c.k === 'inne' ? 'rozwiązanie niestandardowe' : 'seria do doboru' });
    });
    return out;
  }
  function renderRows() {
    $('#rows').innerHTML = positions().map(function (r) {
      var q = S.qty[r.id] || '';
      return '<div class="row"><div class="nm">' + esc(r.nm) + (r.sub ? '<small>' + esc(r.sub) + '</small>' : '') + '</div>' +
        '<div class="qty"><button type="button" data-d="-1" aria-label="Mniej">-</button><input type="number" min="1" inputmode="numeric" placeholder="szt." value="' + q + '" data-q="' + esc(r.id) + '" aria-label="Ilość: ' + esc(r.nm) + '"><button type="button" data-d="1" aria-label="Więcej">+</button></div></div>';
    }).join('');
  }
  $('#rows').addEventListener('click', function (e) {
    var b = e.target.closest('[data-d]'); if (!b) return;
    var i = $('input', b.parentNode); var v = (parseInt(i.value, 10) || 0) + parseInt(b.getAttribute('data-d'), 10);
    i.value = Math.max(1, v); S.qty[i.getAttribute('data-q')] = +i.value;
  });
  $('#rows').addEventListener('input', function (e) { var i = e.target; if (i.dataset.q) S.qty[i.dataset.q] = parseInt(i.value, 10) || 0; });

  $('#termin').addEventListener('change', function () { $('#dataBox').hidden = this.value !== 'data'; });
  (function () { var d = new Date(); d.setDate(d.getDate() + 3); $('#data').min = d.toISOString().slice(0, 10); })();
  $('#kod').addEventListener('input', function () { var v = this.value.replace(/\D/g, '').slice(0, 5); this.value = v.length > 2 ? v.slice(0, 2) + '-' + v.slice(2) : v; });

  /* ---------- krok 3: pliki ---------- */
  var fileIn = $('#file'), drop = $('#drop');
  function size(b) { return b > 1048576 ? (b / 1048576).toFixed(1).replace('.', ',') + ' MB' : Math.max(1, Math.round(b / 1024)) + ' kB'; }
  function addFiles(list) {
    Array.prototype.forEach.call(list, function (f) {
      if (!S.files.some(function (x) { return x.name === f.name && x.size === f.size; })) S.files.push({ name: f.name, size: f.size });
    });
    renderFiles();
  }
  function renderFiles() {
    $('#files').innerHTML = S.files.map(function (f, i) {
      var ext = (f.name.split('.').pop() || '').slice(0, 4);
      return '<li><span class="ext">' + esc(ext) + '</span><span class="fn">' + esc(f.name) + '</span><span class="fs">' + size(f.size) + '</span><button class="rm" type="button" data-f="' + i + '">Usuń</button></li>';
    }).join('');
  }
  fileIn.addEventListener('change', function () { addFiles(fileIn.files); fileIn.value = ''; });
  $('#files').addEventListener('click', function (e) { var b = e.target.closest('[data-f]'); if (!b) return; S.files.splice(+b.getAttribute('data-f'), 1); renderFiles(); });
  ['dragenter', 'dragover'].forEach(function (t) { drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.add('over'); }); });
  ['dragleave', 'drop'].forEach(function (t) { drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.remove('over'); }); });
  drop.addEventListener('drop', function (e) { if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files); });

  /* ---------- krok 4 ---------- */
  function nipOk(v) {
    var d = v.replace(/\D/g, ''); if (d.length !== 10) return false;
    var w = [6, 5, 7, 2, 3, 4, 5, 6, 7], s = 0; for (var i = 0; i < 9; i++) s += w[i] * +d[i];
    return s % 11 === +d[9];
  }
  $('#nip').addEventListener('input', function () { this.value = this.value.replace(/[^\d-\s]/g, ''); $('#nipErr').textContent = ''; this.parentNode.classList.remove('bad'); });

  var TITLES = ['', 'Czego dotyczy zapytanie?', 'Ilości, termin i miejsce', 'Rysunek, lista pozycji, plik', 'Dane firmy i wysyłka'];
  function val(id) { return ($('#' + id).value || '').trim(); }
  function termin() { var t = $('#termin').value; if (t === 'data') { var d = val('data'); return d ? d.split('-').reverse().join('.') : ''; } return t; }
  function zakres() { return ($('input[name=zakres]:checked') || {}).value || ''; }
  function sumQty() { return positions().reduce(function (a, r) { return a + (S.qty[r.id] || 0); }, 0); }
  function catsShort() {
    var a = []; if (Object.keys(S.prod).length) a.push('Plafony LED');
    C.forEach(function (c) { if (S.cats[c.k] && a.indexOf(c.n) < 0) a.push(c.n); }); return a;
  }

  function renderSum() {
    var pos = positions();
    $('#sum').innerHTML = '<h4>Podsumowanie</h4><dl>' +
      '<dt>Pozycje<button class="ed" type="button" data-goto="1">zmień</button></dt><dd>' + pos.map(function (r) { return esc(r.nm) + ': <b>' + (S.qty[r.id] || 0) + ' szt.</b>'; }).join('<br>') + '</dd>' +
      '<dt>Termin<button class="ed" type="button" data-goto="2">zmień</button></dt><dd>' + esc(termin()) + '</dd>' +
      '<dt>Zakres</dt><dd>' + esc(zakres()) + '</dd>' +
      '<dt>Miejsce</dt><dd>' + esc(val('kod') + ' ' + val('miasto')) + (val('obiekt') ? ', ' + esc(val('obiekt')) : '') + '</dd>' +
      '<dt>Załączniki<button class="ed" type="button" data-goto="3">zmień</button></dt><dd>' + (S.files.length ? S.files.map(function (f) { return esc(f.name); }).join(', ') : 'brak') + '</dd>' +
      ((S.cats.inne && S.inne) || val('lista') || val('uwagi') ? '<dt>Opis</dt><dd>' + esc([S.cats.inne ? S.inne : '', val('lista'), val('uwagi')].filter(Boolean).join(' / ')) + '</dd>' : '') +
      '</dl>';
  }
  $('#sum').addEventListener('click', function (e) { var b = e.target.closest('[data-goto]'); if (b) go(+b.getAttribute('data-goto')); });

  function check(n) {
    var m = '';
    $$('.fld.bad').forEach(function (f) { f.classList.remove('bad'); });
    function bad(id) { $('#' + id).closest('.fld').classList.add('bad'); }
    if (n === 1) {
      if (!Object.keys(S.prod).length && !Object.keys(S.cats).length) m = 'Wybierz co najmniej jedną kategorię albo dodaj produkt z listy powyżej.';
    } else if (n === 2) {
      var miss = positions().some(function (r) { return !(S.qty[r.id] > 0); });
      if (miss) m = 'Podaj ilość przy każdej pozycji.';
      else if (!termin()) { m = 'Wybierz termin dostawy.'; bad($('#termin').value === 'data' ? 'data' : 'termin'); }
      else if (!/^\d{2}-\d{3}$/.test(val('kod'))) { m = 'Podaj kod pocztowy w formacie 00-000.'; bad('kod'); }
      else if (!val('miasto')) { m = 'Podaj miejscowość dostawy lub montażu.'; bad('miasto'); }
    } else if (n === 4) {
      if (!nipOk(val('nip'))) { m = 'Sprawdź NIP.'; bad('nip'); $('#nipErr').textContent = 'Nieprawidłowy NIP (10 cyfr z cyfrą kontrolną).'; }
      else if (!val('firma')) { m = 'Podaj nazwę firmy.'; bad('firma'); }
      else if (!val('osoba')) { m = 'Podaj osobę kontaktową.'; bad('osoba'); }
      else if (val('tel').replace(/\D/g, '').length < 9) { m = 'Podaj numer telefonu.'; bad('tel'); }
      else if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(val('email'))) { m = 'Podaj poprawny adres e-mail.'; bad('email'); }
      else if (!$('#zgoda').checked) m = 'Zaznacz zgodę na przetwarzanie danych.';
    }
    $('#msg').textContent = m;
    return !m;
  }

  function go(n) {
    S.step = n;
    $$('.step').forEach(function (s) { s.classList.toggle('on', +s.getAttribute('data-step') === n); });
    $('#stTitle').textContent = TITLES[n]; $('#stNo').textContent = 'Krok ' + n + ' z 4';
    $('#prog').style.width = (n * 25) + '%';
    $('#back').hidden = n === 1; $('#next').hidden = n === 4; $('#send').hidden = n !== 4;
    $('#msg').textContent = '';
    if (n === 2) renderRows();
    if (n === 4) renderSum();
    var f = $('#form'), r = f.getBoundingClientRect();
    if (r.top < 0 || r.top > innerHeight * 0.6) f.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  $('#next').addEventListener('click', function () { if (check(S.step)) go(S.step + 1); });
  $('#back').addEventListener('click', function () { go(S.step - 1); });

  /* ---------- wysylka (pokazowa) ---------- */
  var NR = 'ZO/2026/11/0001';
  var LIST = [
    { nr: 'ZO/2026/10/0049', d: '30.10.2026', f: 'Wspólnota Mieszkaniowa (przykład)', c: 'Plafony LED: SOL MV, CANTINA 230V', q: '64 szt.', t: 'Do miesiąca', st: ['o', 'Oferta wysłana'] },
    { nr: 'ZO/2026/10/0048', d: '29.10.2026', f: 'Firma Elektro (przykład)', c: 'Oprawy przemysłowe: HIGH-BAY SPACE', q: '28 szt.', t: 'Do 2 tygodni', st: ['w', 'W przygotowaniu'] },
    { nr: 'ZO/2026/10/0047', d: '27.10.2026', f: 'Spółdzielnia Mieszkaniowa (przykład)', c: 'Plafony LED: dwustrumieniowe, PIKTO PLAZA', q: '120 szt.', t: '20.11.2026', st: ['o', 'Oferta wysłana'] },
    { nr: 'ZO/2026/10/0046', d: '24.10.2026', f: 'Zarządca Nieruchomości (przykład)', c: 'Naświetlacze LED: PATIO, Lampy uliczne: VIRA', q: '18 szt.', t: 'Jak najszybciej', st: ['o', 'Oferta wysłana'] }
  ];
  var mine = null;

  $('#send').addEventListener('click', function () {
    if (!check(4)) return;
    var pos = positions(), email = val('email');
    var today = new Date(), dd = ('0' + today.getDate()).slice(-2) + '.' + ('0' + (today.getMonth() + 1)).slice(-2) + '.' + today.getFullYear();
    mine = { nr: NR, d: dd, f: val('firma'), c: catsShort().join(', '), q: sumQty() + ' szt.', t: termin(), st: ['n', 'Nowe'], me: true };
    $('#dNr').textContent = NR; $('#dNr2').textContent = NR; $('#dMail').textContent = email; $('#dTo').textContent = email;
    $('#dBody').innerHTML = '<p>Dzień dobry ' + esc(val('osoba').split(' ')[0]) + ',</p>' +
      '<p>dziękujemy za zapytanie ofertowe. Otrzymało numer <b>' + NR + '</b>, prosimy powoływać się na nie w korespondencji.</p>' +
      '<p>Zapytanie obejmuje:</p><ul>' + pos.map(function (r) { return '<li>' + esc(r.nm) + ': ' + (S.qty[r.id] || 0) + ' szt.</li>'; }).join('') + '</ul>' +
      '<p>Termin: ' + esc(termin()) + '<br>Zakres: ' + esc(zakres()) + '<br>Miejsce: ' + esc(val('kod') + ' ' + val('miasto')) + '<br>Załączniki: ' + (S.files.length ? S.files.length + ' (' + S.files.map(function (f) { return esc(f.name); }).join(', ') + ')' : 'brak') + '</p>' +
      '<p>Ofertę przygotuje dział handlowy, w razie pytań skontaktujemy się pod numerem ' + esc(val('tel')) + '.</p>' +
      '<p>Pozdrawiamy<br>Leding.EU Sp. z o.o.<br>ul. Kijowska 44, 85-703 Bydgoszcz<br>tel. 52 522 22 38</p>';
    $('#wiz').style.display = 'none'; $('#done').classList.add('on');
    var f = $('#form'); if (f.getBoundingClientRect().top < 0) f.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });
  $('#again').addEventListener('click', function () {
    S.prod = {}; S.cats = {}; S.ser = {}; S.qty = {}; S.files = []; S.inne = '';
    $$('#cats input').forEach(function (i) { i.checked = false; }); renderSeries(); renderFiles(); syncProd();
    ['termin', 'data', 'kod', 'miasto', 'obiekt', 'lista', 'uwagi', 'nip', 'firma', 'osoba', 'tel', 'email'].forEach(function (id) { $('#' + id).value = ''; });
    $('#zgoda').checked = false; $('#dataBox').hidden = true;
    $('#done').classList.remove('on'); $('#wiz').style.display = ''; go(1);
  });

  /* ---------- lista zapytan ---------- */
  function renderList() {
    var rows = (mine ? [mine] : []).concat(LIST);
    $('#zlBody').innerHTML = rows.map(function (r) {
      return '<tr' + (r.me ? ' class="new"' : '') + '><td class="nr">' + r.nr + (r.me ? '' : '<span class="tag">przykład</span>') + '</td><td data-l="Data">' + r.d + '</td><td data-l="Firma">' + esc(r.f) + '</td><td data-l="Dotyczy">' + esc(r.c) + '</td><td data-l="Ilość" style="white-space:nowrap">' + r.q + '</td><td data-l="Termin">' + esc(r.t) + '</td><td><span class="st ' + r.st[0] + '">' + r.st[1] + '</span></td></tr>';
    }).join('');
  }
  var dlg = $('#dlg'), lastFocus = null;
  function openList() { renderList(); lastFocus = document.activeElement; dlg.classList.add('open'); dlg.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; $('#closeList').focus(); }
  function closeList() { dlg.classList.remove('open'); dlg.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  $('#openList').addEventListener('click', openList);
  $('#toList').addEventListener('click', openList);
  $('#closeList').addEventListener('click', closeList);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeList(); });

  /* ---------- menu, pasek, wysokosc naglowka ---------- */
  var panel = $('#panel');
  $('#burger').addEventListener('click', function () { panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; });
  $$('[data-close]', panel).forEach(function (el) { el.addEventListener('click', function () { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (dlg.classList.contains('open')) closeList(); if (panel.classList.contains('open')) $('[data-close]', panel).click(); } });

  function hh() { document.documentElement.style.setProperty('--hh', $('#hdr').offsetHeight + 'px'); }
  hh(); addEventListener('resize', hh);

  var mob = $('#mob'), past = false, inForm = false;
  function upd() { mob.classList.toggle('widac', past && !inForm); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { past = !en[0].isIntersecting && en[0].boundingClientRect.top < 0; upd(); }).observe($('#heroCta'));
    new IntersectionObserver(function (en) { inForm = en[0].isIntersecting; upd(); }, { rootMargin: '0px 0px -30% 0px' }).observe($('#zapytanie'));
  }
})();
