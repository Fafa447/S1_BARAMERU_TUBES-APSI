/* =========================================================
   Barameru Adventure – main.js
   Edit data produk di array "products" di bawah ini.
   ========================================================= */

const WA_NUMBER = "6285740778307";

/* ---------- DATA PRODUK ----------
   kategori: paket | tenda | tidur | tas | masak | lampu | pakaian
   harga   : teks yang tampil di kartu                              */
const products = [
  // Paket
  { nama: "Paket 2 Orang Gunung", harga: "Rp75.000", kategori: "paket", img: "paket-2p-gunung.jpg", tag: "Hemat" },
  { nama: "Paket 3 Orang Gunung", harga: "Rp90.000", kategori: "paket", img: "paket-3p-gunung.jpg", tag: "Hemat" },
  { nama: "Paket 4 Orang Gunung", harga: "Rp105.000", kategori: "paket", img: "paket-4p-gunung.jpg", tag: "Hemat" },
  // Tenda
  { nama: "Tenda Kapasitas 2 Orang", harga: "Rp25.000", kategori: "tenda", img: "tenda-2p.jpg" },
  { nama: "Tenda Kapasitas 3 Orang", harga: "Rp35.000", kategori: "tenda", img: "tenda-3p.jpg" },
  { nama: "Tenda Kapasitas 4 Orang", harga: "Rp40.000", kategori: "tenda", img: "tenda-4p.jpg" },
  { nama: "Flysheet", harga: "Rp10.000", kategori: "tenda", img: "flysheet.jpg" },
  { nama: "Tiang Flysheet", harga: "Rp10.000", kategori: "tenda", img: "tiang-flysheet.jpg" },
  // Tidur
  { nama: "Matras Single", harga: "Rp3.000", kategori: "tidur", img: "matras-single.jpg" },
  { nama: "Matras Aluminium Foil", harga: "Rp6.000", kategori: "tidur", img: "matras-foil.jpg" },
  { nama: "Sleeping Bag Bulu", harga: "Rp9.000", kategori: "tidur", img: "sb-bulu.jpg" },
  { nama: "Sleeping Bag Polar", harga: "Rp7.000", kategori: "tidur", img: "sb-polar.jpg" },
  // Tas
  { nama: "Carrier", harga: "Rp15.000 – Rp25.000", kategori: "tas", img: "carrier.jpg", note: "45L: Rp15.000/hari · 60L: Rp20.000/hari · 70L: Rp25.000/hari" },
  { nama: "Daypack", harga: "Rp10.000", kategori: "tas", img: "daypack.jpg" },
  { nama: "Hydropack", harga: "Rp10.000", kategori: "tas", img: "hydropack.jpg" },
  { nama: "Raincover", harga: "Rp3.000", kategori: "tas", img: "raincover.jpg" },
  // Masak
  { nama: "Kompor Kovar", harga: "Rp12.000", kategori: "masak", img: "kompor.jpg" },
  { nama: "Cooking Set DS 308", harga: "Rp10.000", kategori: "masak", img: "cooking-set.jpg" },
  { nama: "Gas Portable", harga: "Rp8.000", kategori: "masak", img: "gas.jpg", tanpaHari: true, note: "Sewa : Rp8.000 · Tukar Tabung: Rp7.000" },
  // Penerangan
  { nama: "Headlamp", harga: "Rp7.000", kategori: "lampu", img: "headlamp.jpg" },
  { nama: "Lampu Tenda", harga: "Rp7.000", kategori: "lampu", img: "lampu-tenda.jpg" },
  // Pakaian & lainnya
  { nama: "Sepatu Gunung", harga: "Rp20.000", kategori: "pakaian", img: "sepatu.jpg" },
  { nama: "Jaket", harga: "Rp10.000", kategori: "pakaian", img: "jaket.jpg" },
  { nama: "Sarung Tangan", harga: "Rp10.000", kategori: "pakaian", img: "sarung-tangan.jpg" },
  { nama: "Tracking Pole", harga: "Rp10.000", kategori: "pakaian", img: "trackingpole.jpg" },
];

/* ---------- Render produk ---------- */
const grid = document.getElementById("productGrid");

grid.innerHTML = products.map((p) => `
  <div class="col-6 col-md-4 col-lg-3 product-item" data-cat="${p.kategori}">
    <div class="product-card">
      <div class="thumb">
        <img src="assets/img/produk/${p.img}" alt="${p.nama}" loading="lazy">
      </div>
      <div class="body">
        <h6>${p.nama}</h6>
        <div class="price">${p.harga}${p.tanpaHari ? "" : " <small>/ hari</small>"}</div>
        ${p.note ? `<small class="text-muted mb-2">${p.note}</small>` : '<span class="mb-2"></span>'}
      </div>
    </div>
  </div>`).join("");

/* ---------- Filter produk ---------- */
document.querySelectorAll("#productFilters li").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("#productFilters .active").classList.remove("active");
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".product-item").forEach((el) => {
      el.classList.toggle("hide", f !== "all" && el.dataset.cat !== f);
    });
  });
});

/* ---------- Navbar: scroll, menu mobile, active link ---------- */
const header = document.getElementById("header");
const navmenu = document.getElementById("navmenu");
const scrollTop = document.getElementById("scrollTop");
const navLinks = document.querySelectorAll("#navmenu a");

function onScroll() {
  header.classList.toggle("scrolled", window.scrollY > 40);
  scrollTop.classList.toggle("show", window.scrollY > 400);

  const pos = window.scrollY + 120;
  navLinks.forEach((a) => {
    const sec = document.querySelector(a.getAttribute("href"));
    if (sec && pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach((x) => x.classList.remove("active"));
      a.classList.add("active");
    }
  });
}
window.addEventListener("scroll", onScroll);
onScroll();

document.querySelector(".mobile-nav-toggle").addEventListener("click", (e) => {
  navmenu.classList.toggle("open");
  e.target.classList.toggle("bi-list");
  e.target.classList.toggle("bi-x");
});
navLinks.forEach((a) => a.addEventListener("click", () => navmenu.classList.remove("open")));

scrollTop.addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });

/* ---------- Status buka / tutup (WIB) ---------- */
function updateOpenStatus() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
  const day = now.getDay(); // 0 = Minggu
  const minutes = now.getHours() * 60 + now.getMinutes();
  const openAt = day === 0 ? 13 * 60 : 9 * 60;
  const closeAt = 21 * 60;
  const isOpen = minutes >= openAt && minutes < closeAt;

  const box = document.getElementById("openStatus");
  const text = document.getElementById("openStatusText");
  box.classList.add(isOpen ? "open" : "closed");
  text.textContent = isOpen
    ? "Buka sekarang · tutup pukul 21.00 WIB"
    : "Sedang tutup · buka " + (day === 0 ? "pukul 13.00 WIB" : "pukul 09.00 WIB") + " (Minggu 13.00 WIB)";
}
updateOpenStatus();

/* ---------- Counter statistik ---------- */
function runCounter(el) {
  const target = parseFloat(el.dataset.target);
  const decimal = el.dataset.decimal ? 1 : 0;
  const plus = el.dataset.plus ? "+" : "";
  const dur = 1400, start = performance.now();
  (function tick(t) {
    const p = Math.min((t - start) / dur, 1);
    const v = target * p;
    el.textContent = (decimal ? v.toFixed(1).replace(".", ",") : Math.floor(v).toLocaleString("id-ID")) + (p === 1 ? plus : "");
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { runCounter(en.target); io.unobserve(en.target); } });
}, { threshold: 0.6 });
document.querySelectorAll(".counter").forEach((c) => io.observe(c));

/* ---------- Form -> WhatsApp ---------- */
document.getElementById("fDate").min = new Date().toISOString().split("T")[0];

document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = document.getElementById("fName").value.trim();
  const tgl = document.getElementById("fDate").value;
  const item = document.getElementById("fItem").value.trim();
  const msg = document.getElementById("fMsg").value.trim();

  const text =
    `Halo Barameru Adventure,\n` +
    `Nama: ${nama}\nTanggal sewa: ${tgl}\nAlat: ${item}` +
    (msg ? `\nCatatan: ${msg}` : "");
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
});

/* ---------- Footer tahun & AOS ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
AOS.init({ duration: 700, once: true, offset: 60 });
