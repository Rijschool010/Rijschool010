// Quality gate for every generated page. Needs the local server on :8150 (launch.json "rijschool010").
// Run: node verify-all.js
const fs = require('fs');
const path = require('path');
module.paths.push(path.join(__dirname, '..', 'node_modules'));
const puppeteer = require('puppeteer-core');

const BASE = 'http://localhost:8150';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const NO_FAQ = ['/', '/over-ons/', '/geslaagd/', '/reviews/', '/werkgebied/', '/contact/', '/privacy/', '/bedankt/', '/404.html'];

const pages = [];
(function walk(dir, rel) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'src', 'img', 'assets', 'verify-out'].includes(e.name)) continue;
    if (e.isDirectory()) walk(path.join(dir, e.name), rel + e.name + '/');
    else if (e.name === 'index.html') pages.push('/' + rel);
    else if (e.name === '404.html') pages.push('/404.html');
  }
})(__dirname, '');

const lum = c => { const m = c.match(/\d+(\.\d+)?/g).map(Number); const [r, g, b] = m.slice(0, 3).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05); };

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
  const links = new Set();
  let fails = 0;
  for (const url of pages) {
    const page = await browser.newPage();
    const errors = [], badReq = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400 && r.url().startsWith(BASE)) badReq.push(r.status() + ' ' + r.url()); });
    const res = {};
    for (const theme of ['light', 'dark']) {
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluateOnNewDocument(t => { try { localStorage.setItem('r010-theme', t); } catch (e) {} }, theme);
      await page.goto(BASE + url, { waitUntil: 'networkidle2', timeout: 45000 });
      await page.evaluate(() => document.querySelectorAll('.rv').forEach(e => e.classList.add('in')));
      await new Promise(r => setTimeout(r, 900));
      res['overflowDesktop_' + theme] = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
      const btns = await page.evaluate(() => [...document.querySelectorAll('.btn')].filter(b => b.offsetParent).map(el => {
        const s = getComputedStyle(el); let bg = s.backgroundColor, n = el;
        const see = c => { const a = c.match(/rgba\([^)]*,\s*([\d.]+)\)/); return !(c === 'transparent' || (a && +a[1] < 0.5)); };
        while (!see(bg) && n.parentElement) { n = n.parentElement; bg = getComputedStyle(n).backgroundColor; }
        return { t: el.textContent.trim().slice(0, 28), c: s.color, bg };
      }));
      const low = btns.map(b => ({ ...b, r: +ratio(b.c, b.bg).toFixed(2) })).filter(b => b.r < 3);
      res['btnContrast_' + theme] = low.length ? low : true;
    }
    (await page.evaluate(() => [...document.querySelectorAll('a[href^="/"]')].map(a => a.getAttribute('href')))).forEach(h => links.add(h.split('#')[0].split('?')[0] || '/'));
    res.dashes = await page.evaluate(() => !/[\u2014\u2013]/.test(document.documentElement.outerHTML));
    // mobile
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));
    res.overflowMobile = await page.evaluate(() => document.documentElement.scrollWidth <= 390 && document.body.scrollWidth <= 390);
    res.navMobile = await page.evaluate(async () => { scrollTo(0, 1200); await new Promise(r => setTimeout(r, 300)); const b = document.querySelector('.nav .bar').getBoundingClientRect(); scrollTo(0, 0); return b.top >= 0 && b.right <= 390 && b.left >= 0; });
    res.burger = await page.evaluate(async () => {
      const b = document.getElementById('burger'), m = document.getElementById('mobileMenu'), c = document.getElementById('mobileClose');
      b.click(); await new Promise(r => setTimeout(r, 300)); const o = m.classList.contains('open');
      c.click(); await new Promise(r => setTimeout(r, 300)); return o && !m.classList.contains('open');
    });
    if (!NO_FAQ.includes(url)) res.faq = await page.evaluate(async () => {
      const b = document.querySelector('.faq button'); if (!b) return false; b.click(); await new Promise(r => setTimeout(r, 450));
      return b.parentElement.classList.contains('open') && b.parentElement.querySelector('.a').offsetHeight > 20;
    });
    res.brokenImages = await page.evaluate(() => [...document.images].filter(i => i.getAttribute('src') && i.complete && i.naturalWidth === 0 && i.loading !== 'lazy').map(i => i.src));
    if (!res.brokenImages.length) res.brokenImages = true;
    res.jsErrors = errors.length ? errors : true;
    res.badRequests = badReq.length && url !== '/404.html' ? badReq : true;
    const bad = Object.entries(res).filter(([, v]) => v !== true);
    if (bad.length) fails++;
    console.log(`${bad.length ? 'FAIL' : 'PASS'}  ${url}${bad.length ? '\n   ' + bad.map(([k, v]) => k + ': ' + JSON.stringify(v)).join('\n   ') : ''}`);
    await page.close();
  }
  // internal link check
  const broken = [];
  for (const l of links) {
    const r = await fetch(BASE + l);
    if (r.status >= 400) broken.push(r.status + ' ' + l);
  }
  console.log(`\nInternal links checked: ${links.size}, broken: ${broken.length}${broken.length ? '\n  ' + broken.join('\n  ') : ''}`);
  console.log(`${pages.length - fails}/${pages.length} pages passed.`);
  await browser.close();
  process.exit(fails || broken.length ? 1 : 0);
})().catch(e => { console.error('VERIFY CRASHED:', e); process.exit(2); });
