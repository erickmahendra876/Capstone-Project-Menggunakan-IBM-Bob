/* =============================================================
   Wowo Rental — script.js
   Vanilla JavaScript — no external libraries.
   All features: auth, fleet catalog, filters, booking flow,
   payment, document upload, admin panel, notifications, GPS.
   ============================================================= */

'use strict';

/* ============================================================
   1. DATA LAYER — Fleet, Drivers, Bookings, Maintenance
   ============================================================ */

/** @type {Array<Object>} Fleet data – uses real image files from /image/ */
const FLEET = [
  { id: 1,  name: 'Toyota Agya',            type: 'City Car', transmission: 'Matic',  passengers: 4,  cc: 998,   fuel: 'Bensin', ac: true, audio: true, dailyRate: 250000,  deposit: 500000,  status: 'Tersedia', img: 'image/agya.jpg',          tags: ['Irit', 'City'],     desc: 'City Car lincah untuk dalam kota. Irit bahan bakar, mudah parkir.' },
  { id: 2,  name: 'Daihatsu Ayla',          type: 'City Car', transmission: 'Manual', passengers: 4,  cc: 998,   fuel: 'Bensin', ac: true, audio: true, dailyRate: 220000,  deposit: 450000,  status: 'Tersedia', img: 'image/ayla.jpg',          tags: ['Irit', 'Manual'],   desc: 'City Car terjangkau dengan konsumsi BBM sangat irit.' },
  { id: 3,  name: 'Honda Brio',             type: 'City Car', transmission: 'Matic',  passengers: 4,  cc: 1199,  fuel: 'Bensin', ac: true, audio: true, dailyRate: 280000,  deposit: 550000,  status: 'Tersedia', img: 'image/brio.jpg',          tags: ['Sporty'],           desc: 'Tampilan sporty modern, nyaman untuk perjalanan kota.' },
  { id: 4,  name: 'Toyota Avanza',          type: 'MPV',      transmission: 'Manual', passengers: 7,  cc: 1329,  fuel: 'Bensin', ac: true, audio: true, dailyRate: 350000,  deposit: 700000,  status: 'Tersedia', img: 'image/avanza.jpg',        tags: ['Keluarga'],         desc: 'MPV keluarga paling populer, lapang dan nyaman 7 penumpang.' },
  { id: 5,  name: 'Toyota Innova',          type: 'MPV',      transmission: 'Matic',  passengers: 7,  cc: 1998,  fuel: 'Solar',  ac: true, audio: true, dailyRate: 550000,  deposit: 1000000, status: 'Tersedia', img: 'image/inova.jpg',         tags: ['Premium', 'Diesel'],desc: 'Legenda MPV premium, ideal untuk perjalanan jauh atau keluarga besar.' },
  { id: 6,  name: 'Mitsubishi Xpander',     type: 'MPV',      transmission: 'Matic',  passengers: 7,  cc: 1499,  fuel: 'Bensin', ac: true, audio: true, dailyRate: 480000,  deposit: 900000,  status: 'Tersewa', img:  'image/xpander.jpg',       tags: ['Modern'],           desc: 'MPV modern dengan desain dinamis dan fitur lengkap.' },
  { id: 7,  name: 'Toyota Rush',            type: 'SUV',      transmission: 'Matic',  passengers: 7,  cc: 1496,  fuel: 'Bensin', ac: true, audio: true, dailyRate: 450000,  deposit: 850000,  status: 'Tersedia', img: 'image/rush.png',          tags: ['Tangguh'],          desc: 'SUV tangguh dengan ground clearance tinggi untuk segala medan.' },
  { id: 8,  name: 'Honda HR-V',             type: 'SUV',      transmission: 'Matic',  passengers: 5,  cc: 1496,  fuel: 'Bensin', ac: true, audio: true, dailyRate: 500000,  deposit: 1000000, status: 'Tersedia', img: 'image/hrv.jpg',           tags: ['Modern', 'SUV'],    desc: 'Crossover SUV stylish dengan interior mewah dan fitur canggih.' },
  { id: 9,  name: 'Yamaha NMAX',            type: 'Motor',    transmission: 'Matic',  passengers: 2,  cc: 155,   fuel: 'Bensin', ac: false,audio: false,dailyRate: 120000,  deposit: 250000,  status: 'Tersedia', img: 'image/nmax.jpg',          tags: ['Hemat'],            desc: 'Skuter premium bertenaga dengan ABS untuk berkendara aman.' },
  { id: 10, name: 'Honda PCX',              type: 'Motor',    transmission: 'Matic',  passengers: 2,  cc: 156,   fuel: 'Bensin', ac: false,audio: false,dailyRate: 110000,  deposit: 200000,  status: 'Tersewa', img:  'image/pcx.jpg',           tags: ['Hemat'],            desc: 'Skuter stylish dengan bagasi besar dan konsumsi BBM efisien.' },
  {id:  11, name: 'Kawasaki ZX-25',         type: 'Luxury',   transmission: 'Manual', passengers: 2,  cc: 249,   fuel: 'Bensin', ac: false,audio: false,dailyRate: 500000,  deposit: 200000,  status: 'Tersewa', img: 'image/kawasaki.jpg',         tags: ['Modern', 'Premium'],desc: 'motor supersport kelas 250 cc yang sangat fenomenal karena menggunakan konfigurasi mesin 4 silinder segaris (Inline-4)' },
  { id: 12, name: 'Mercedes-Benz E-Class',  type: 'Luxury',   transmission: 'Matic',  passengers: 5,  cc: 1991,  fuel: 'Bensin', ac: true, audio: true, dailyRate: 1500000, deposit: 3000000, status: 'Tersedia', img: 'image/mercy_e_class.jpg', tags: ['VIP', 'Prestige'],  desc: 'Sedan mewah kelas dunia. Sempurna untuk acara formal & eksekutif.' },
  { id: 13, name: 'Toyota Alphard',         type: 'Luxury',   transmission: 'Matic',  passengers: 7,  cc: 2494,  fuel: 'Bensin', ac: true, audio: true, dailyRate: 1800000, deposit: 3500000, status: 'Tersedia', img: 'image/alphard.jpg',       tags: ['VIP', 'Prestige'],  desc: 'Minivan mewah paling bergengsi. Kabin sangat luas & nyaman.' }
];

/** Add-on options for the booking flow */
const ADDONS = [
  { id: 'carseat',  name: 'Car Seat Anak',     price: 50000,  icon: '🧒' },
  { id: 'gps',      name: 'GPS Navigator',     price: 35000,  icon: '🗺️' },
  { id: 'driver2',  name: 'Sopir Tambahan',    price: 150000, icon: '👨‍✈️' },
  { id: 'delivery', name: 'Antar Luar Kota',   price: 200000, icon: '🚚' },
  { id: 'insurance',name: 'Asuransi Harian',   price: 75000,  icon: '🛡️' }
];

/** Sample driver pool */
const DRIVERS = [
  { id: 1, name: 'Budi Santoso',   phone: '081234567001', status: 'Tersedia',  rating: 4.9, trips: 234 },
  { id: 2, name: 'Agus Raharjo',   phone: '081234567002', status: 'Bertugas',  rating: 4.8, trips: 189 },
  { id: 3, name: 'Dedi Wijaya',    phone: '081234567003', status: 'Tersedia',  rating: 5.0, trips: 312 },
  { id: 4, name: 'Cecep Darman',   phone: '081234567004', status: 'Tersedia',  rating: 4.7, trips: 145 },
  { id: 5, name: 'Rudi Hartono',   phone: '081234567005', status: 'Cuti',      rating: 4.6, trips: 98 }
];

/** Sample bookings for admin */
const BOOKINGS = [
  { id: 'WR-001', customer: 'Ahmad Fauzi',  vehicle: 'Toyota Avanza',   start: '2025-11-01', end: '2025-11-05', status: 'Aktif',    total: 1400000, driver: 'Budi Santoso',  docStatus: 'Disetujui' },
  { id: 'WR-002', customer: 'Rina Susanti', vehicle: 'Honda HR-V',      start: '2025-11-02', end: '2025-11-04', status: 'Aktif',    total: 1000000, driver: '-',             docStatus: 'Disetujui' },
  { id: 'WR-003', customer: 'Hendra K.',    vehicle: 'Mitsubishi Xpander', start: '2025-10-28', end: '2025-11-01', status: 'Selesai', total: 1920000, driver: 'Agus Raharjo', docStatus: 'Disetujui' },
  { id: 'WR-004', customer: 'Dewi Ayu',     vehicle: 'Honda PCX',       start: '2025-11-03', end: '2025-11-04', status: 'Pending',  total: 110000,  driver: '-',             docStatus: 'Pending' },
  { id: 'WR-005', customer: 'Budi Prasetyo',vehicle: 'Toyota Alphard',  start: '2025-11-05', end: '2025-11-07', status: 'Pending',  total: 3600000, driver: 'Dedi Wijaya',   docStatus: 'Review' },
  { id: 'WR-006', customer: 'Sari Dewi',    vehicle: 'Yamaha NMAX',     start: '2025-11-06', end: '2025-11-08', status: 'Aktif',    total: 240000,  driver: '-',             docStatus: 'Disetujui' }
];

/** Maintenance schedules */
const MAINTENANCE = [
  { id: 1, vehicle: 'Toyota Avanza',   date: '2025-11-10', type: 'Servis Berkala',  mechanic: 'Bengkel Maju',  status: 'Terjadwal' },
  { id: 2, vehicle: 'Honda Brio',      date: '2025-11-08', type: 'Ganti Oli',       mechanic: 'Bengkel Maju',  status: 'Terjadwal' },
  { id: 3, vehicle: 'Honda PCX',       date: '2025-11-05', type: 'Cek Rem',         mechanic: 'Bengkel Jaya',  status: 'Selesai' },
  { id: 4, vehicle: 'Toyota Innova',   date: '2025-11-15', type: 'Servis Berkala',  mechanic: 'Bengkel Maju',  status: 'Terjadwal' }
];

/** GPS mock data */
const GPS_DATA = [
  { vehicle: 'Toyota Avanza',    plate: 'B 1234 WR', lat: -6.2088, lng: 106.8456, speed: 45, lastUpdate: '2 menit lalu', status: 'Bergerak',  renter: 'Ahmad Fauzi' },
  { vehicle: 'Honda HR-V',       plate: 'B 5678 WR', lat: -6.1751, lng: 106.8272, speed: 0,  lastUpdate: '5 menit lalu', status: 'Parkir',    renter: 'Rina Susanti' },
  { vehicle: 'Sari Dewi / NMAX', plate: 'B 9012 WR', lat: -6.3000, lng: 106.9000, speed: 60, lastUpdate: '1 menit lalu', status: 'Bergerak',  renter: 'Sari Dewi' }
];

/** Testimonials */
const TESTIMONIALS = [
  { name: 'Ahmad Renald Fauzi',    city: 'Yogyakarta',     rating: 5, text: 'Pelayanan sangat memuaskan! Kendaraan bersih dan terawat. Proses pemesanan mudah, DP via QRIS langsung konfirmasi. Pasti sewa lagi!' },
  { name: 'Rina Susanwati',        city: 'Solo',           rating: 5, text: 'Wowo Rental terbaik! HR-V yang saya sewa nyaman banget buat road trip. Sopirnya ramah dan tepat waktu. Recommended 👍' },
  { name: 'Hendra Arya Kusuma',    city: 'Semarang',       rating: 4, text: 'Harga kompetitif, armada banyak pilihannya. Proses upload dokumen mudah. Mungkin bisa tambah pilihan kendaraan Luxury lebih banyak.' },
  { name: 'Bagus Herdman',         city: 'Yogyakarta',     rating: 5, text: 'Kondisi motornya memuaskan sekali. Harga juga sangat terjangkau dan cocok jika kalian ingin bepergian jauh. Sangat - sangat recommended 👍' }

];

/* ============================================================
   2. STATE MANAGEMENT
   ============================================================ */
const state = {
  currentUser: null,      // logged-in user object
  filters: {             // fleet filter state
    type: '',
    transmission: '',
    passengers: '',
    maxPrice: 2000000,
    status: ''
  },
  booking: {             // current booking in progress
    vehicle: null,
    startDate: null,
    endDate: null,
    durationDays: 0,
    rentalType: 'lepas_kunci',
    addons: [],
    payment: '',
    totalCost: 0
  },
  searchParams: {        // from the search widget
    pickup: '',
    dropoff: '',
    startDatetime: '',
    endDatetime: '',
    vehicleType: ''
  }
};

/* ============================================================
   3. UTILITY FUNCTIONS
   ============================================================ */

/** Format Rupiah */
function formatRupiah(amount) {
  return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

/** Show a toast notification */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const icon  = toast.querySelector('i');
  document.getElementById('toastMsg').textContent = message;
  icon.setAttribute('data-lucide', type === 'error' ? 'x-circle' : 'check-circle');
  icon.className = `w-5 h-5 flex-shrink-0 ${type === 'error' ? 'text-red-400' : 'text-green-400'}`;
  lucide.createIcons();
  toast.classList.remove('hidden');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('show');
  }, 3500);
}

/** Open any modal by id */
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

/** Close any modal by id */
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  document.body.style.overflow = '';
}

/** Scroll to top */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Toggle mobile menu */
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('hidden');
}

/** Calculate days between two Date objects */
function calcDays(start, end) {
  const diff = end - start;
  if (diff <= 0) return 0;
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/* ============================================================
   4. DATE / TIME PICKER — Flatpickr
   ============================================================ */
function initDatePickers() {
  const opts = {
    enableTime: true,
    dateFormat: 'd M Y — H:i',
    minDate: 'today',
    time_24hr: true,
    locale: { firstDayOfWeek: 1 }
  };

  flatpickr('#startDatetime', {
    ...opts,
    onChange: () => updateDurationInfo()
  });

  flatpickr('#endDatetime', {
    ...opts,
    onChange: () => updateDurationInfo()
  });
}

/** Update duration info label in search widget */
function updateDurationInfo() {
  const s = document.getElementById('startDatetime')._flatpickr;
  const e = document.getElementById('endDatetime')._flatpickr;
  if (!s || !e || !s.selectedDates[0] || !e.selectedDates[0]) return;
  const days = calcDays(s.selectedDates[0], e.selectedDates[0]);
  const el = document.getElementById('searchDurationInfo');
  if (days > 0) {
    el.textContent = `⏱ Durasi sewa: ${days} hari`;
    el.className = 'text-sm font-semibold text-blue-600';
    state.booking.startDate = s.selectedDates[0];
    state.booking.endDate   = e.selectedDates[0];
    state.booking.durationDays = days;
  } else {
    el.textContent = '⚠ Tanggal selesai harus setelah tanggal mulai.';
    el.className = 'text-sm font-semibold text-red-500';
  }
}

/* ============================================================
   5. AUTHENTICATION
   ============================================================ */

/** Handle Google / Facebook social auth (simulated) */
function handleSocialAuth(provider) {
  const names = { google: 'Pengguna Google', facebook: 'Pengguna Facebook' };
  loginUser({ name: names[provider], provider, phone: '' });
}

function showPhoneStep1() {
  document.getElementById('phoneStep1').classList.remove('hidden');
  document.getElementById('phoneStep2').classList.add('hidden');
}

/** Send OTP (simulated — shows step 2 form) */
function sendOTP() {
  const phone = document.getElementById('phoneInput').value.trim();
  if (!phone || phone.length < 8) {
    showToast('Masukkan nomor telepon yang valid.', 'error');
    return;
  }
  // Simulate OTP send delay
  showToast(`Kode OTP dikirim ke +62${phone}`);
  document.getElementById('phoneStep1').classList.add('hidden');
  document.getElementById('phoneStep2').classList.remove('hidden');
}

/** Verify OTP (simulated — any 6-digit code is accepted) */
function verifyOTP() {
  const otp = document.getElementById('otpInput').value.trim();
  if (otp.length !== 6 || isNaN(otp)) {
    showToast('Kode OTP harus 6 angka.', 'error');
    return;
  }
  const phone = document.getElementById('phoneInput').value.trim();
  loginUser({ name: `+62 ${phone}`, provider: 'phone', phone });
}

/** Finalize login */
function loginUser(user) {
  state.currentUser = user;
  closeModal('authModal');
  // Update navbar
  document.getElementById('navAuthBtn').classList.add('hidden');
  document.getElementById('navUserDisplay').classList.remove('hidden');
  document.getElementById('navUserName').textContent = `👤 ${user.name}`;
  showToast(`Selamat datang, ${user.name}!`);
  // Reset phone steps for next open
  showPhoneStep1();
}

/** Logout */
function logout() {
  state.currentUser = null;
  document.getElementById('navAuthBtn').classList.remove('hidden');
  document.getElementById('navUserDisplay').classList.add('hidden');
  showToast('Anda telah keluar.');
}

/* ============================================================
   6. FLEET CATALOG
   ============================================================ */

/** Render fleet cards into #fleetGrid */
function renderFleet(data) {
  const grid = document.getElementById('fleetGrid');
  const noMsg = document.getElementById('noResultsMsg');
  grid.innerHTML = '';
  if (!data.length) {
    noMsg.classList.remove('hidden');
    return;
  }
  noMsg.classList.add('hidden');
  data.forEach(v => {
    const card = document.createElement('div');
    card.className = 'fleet-card';
    card.innerHTML = `
      <div class="fleet-card-img-wrap">
        <img src="${v.img}" alt="${v.name}" loading="lazy" />
        <span class="status-badge ${v.status === 'Tersedia' ? 'status-available' : 'status-rented'}">${v.status}</span>
      </div>
      <div class="p-4 flex flex-col flex-1">
        <div class="flex items-start justify-between mb-1">
          <h3 class="font-bold text-navy-900 text-base">${v.name}</h3>
          <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">${v.type}</span>
        </div>
        <div class="flex flex-wrap gap-1 mb-3">
          ${v.tags.map(t => `<span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">${t}</span>`).join('')}
        </div>
        <div class="grid grid-cols-2 gap-y-1 text-xs text-gray-500 mb-4">
          <span>⚙ ${v.transmission}</span>
          <span>👥 ${v.passengers} Penumpang</span>
          <span>🔧 ${v.cc} CC</span>
          <span>⛽ ${v.fuel}</span>
          ${v.ac ? '<span>❄ AC</span>' : ''}
          ${v.audio ? '<span>🎵 Audio</span>' : ''}
        </div>
        <div class="mt-auto">
          <div class="flex items-end justify-between mb-3">
            <div>
              <p class="text-xs text-gray-400">Mulai dari</p>
              <p class="text-xl font-extrabold text-accent">${formatRupiah(v.dailyRate)}<span class="text-xs font-normal text-gray-400">/hari</span></p>
            </div>
          </div>
          <div class="flex gap-2">
            <button onclick="openVehicleDetail(${v.id})" class="flex-1 border-2 border-accent text-accent hover:bg-accent hover:text-white font-semibold text-sm py-2 rounded-xl transition-colors">Detail</button>
            <button onclick="openBookingFlow(${v.id})" ${v.status !== 'Tersedia' ? 'disabled title="Unit sedang tersewa"' : ''} class="flex-1 bg-accent hover:bg-orange-600 text-white font-semibold text-sm py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Pesan</button>
          </div>
        </div>
      </div>`;
    grid.appendChild(card);
  });
  lucide.createIcons();
}

/** Set type filter */
function setFilter(key, value) {
  state.filters[key] = value;
  // Update active button style
  if (key === 'type') {
    document.querySelectorAll('#typeFilters .filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === value);
    });
  }
  applyFilters();
}

/** Read all filter inputs and re-render fleet */
function applyFilters() {
  state.filters.transmission = document.getElementById('transFilter').value;
  state.filters.passengers   = document.getElementById('passengerFilter').value;
  state.filters.maxPrice     = parseInt(document.getElementById('maxPriceFilter').value);
  state.filters.status       = document.getElementById('statusFilter').value;

  const filtered = FLEET.filter(v => {
    if (state.filters.type         && v.type         !== state.filters.type)         return false;
    if (state.filters.transmission && v.transmission !== state.filters.transmission) return false;
    if (state.filters.passengers) {
      const cap = parseInt(state.filters.passengers);
      if (cap === 8 && v.passengers < 8)  return false;
      if (cap !== 8 && v.passengers !== cap) return false;
    }
    if (v.dailyRate > state.filters.maxPrice) return false;
    if (state.filters.status && v.status !== state.filters.status) return false;
    return true;
  });
  renderFleet(filtered);
}

/** Update price label in filter bar */
function updatePriceLabel() {
  const val = parseInt(document.getElementById('maxPriceFilter').value);
  document.getElementById('priceLabel').textContent = `≤ ${formatRupiah(val)}`;
}

/* ============================================================
   7. SEARCH WIDGET
   ============================================================ */
function searchVehicles() {
  const pickup  = document.getElementById('pickupLocation').value.trim();
  const dropoff = document.getElementById('dropoffLocation').value.trim();
  const type    = document.getElementById('vehicleTypeSearch').value;

  if (!pickup) { showToast('Masukkan lokasi penjemputan.', 'error'); return; }
  if (!state.booking.startDate || !state.booking.endDate) {
    showToast('Pilih tanggal dan jam sewa.', 'error'); return;
  }

  // Apply vehicle type to fleet filter
  state.filters.type = type;
  document.querySelectorAll('#typeFilters .filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });
  applyFilters();

  // Save search params
  state.searchParams = {
    pickup, dropoff,
    startDatetime: document.getElementById('startDatetime').value,
    endDatetime:   document.getElementById('endDatetime').value,
    vehicleType:   type
  };

  // Scroll to fleet
  document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' });
  showToast(`Menampilkan ${type || 'semua'} kendaraan tersedia!`);
}

/* ============================================================
   8. VEHICLE DETAIL MODAL
   ============================================================ */
function openVehicleDetail(vehicleId) {
  const v = FLEET.find(x => x.id === vehicleId);
  if (!v) return;

  // Gallery images: main + 2 extra angles (reuse same image for demo)
  const detailContent = document.getElementById('detailContent');
  detailContent.innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <div>
        <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">${v.type}</span>
        <h2 class="text-2xl font-extrabold text-navy-900 mt-1">${v.name}</h2>
        <p class="text-gray-500 text-sm mt-1">${v.desc}</p>
      </div>
      <span class="status-badge ${v.status === 'Tersedia' ? 'status-available' : 'status-rented'} mt-1">${v.status}</span>
    </div>

    <!-- Gallery -->
    <div class="mb-5">
      <img id="mainGalleryImg" src="${v.img}" alt="${v.name} — tampak depan"
           class="w-full h-60 object-cover rounded-xl border border-gray-100 cursor-zoom-in" />
      <div class="flex gap-2 mt-2">
        <img src="${v.img}" alt="${v.name} — eksterior" onclick="document.getElementById('mainGalleryImg').src=this.src"
             class="w-20 h-16 object-cover rounded-lg border-2 border-accent cursor-pointer hover:opacity-90" />
        <img src="${v.img}" alt="${v.name} — interior" onclick="document.getElementById('mainGalleryImg').src=this.src"
             class="w-20 h-16 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 filter saturate-50" />
        <img src="${v.img}" alt="${v.name} — belakang" onclick="document.getElementById('mainGalleryImg').src=this.src"
             class="w-20 h-16 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 filter hue-rotate-15" />
      </div>
    </div>

    <!-- Specs -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
      ${[
        ['⚙', 'Transmisi', v.transmission],
        ['👥', 'Kapasitas', v.passengers + ' penumpang'],
        ['🔧', 'Mesin', v.cc + ' CC'],
        ['⛽', 'Bahan Bakar', v.fuel],
        ['❄', 'AC', v.ac ? 'Ya' : 'Tidak'],
        ['🎵', 'Audio', v.audio ? 'Ya' : 'Tidak']
      ].map(([icon, label, val]) => `
        <div class="bg-gray-50 rounded-xl p-3 text-center">
          <p class="text-lg">${icon}</p>
          <p class="text-xs text-gray-400 font-medium mt-0.5">${label}</p>
          <p class="text-sm font-bold text-navy-900">${val}</p>
        </div>`).join('')}
    </div>

    <!-- Price Calculator -->
    <div class="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-4 border border-orange-100 mb-5">
      <h4 class="font-bold text-navy-900 mb-3">🧮 Kalkulator Harga</h4>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label class="form-label">Durasi (hari)</label>
          <input type="number" id="calcDays" value="${state.booking.durationDays || 1}" min="1" max="365"
                 oninput="recalcPrice(${v.id})" class="form-input" />
        </div>
        <div>
          <label class="form-label">Jenis Sewa</label>
          <select id="calcRentalType" onchange="recalcPrice(${v.id})" class="form-input">
            <option value="lepas_kunci">Lepas Kunci</option>
            <option value="dengan_sopir">Dengan Sopir (+${formatRupiah(150000)}/hari)</option>
          </select>
        </div>
      </div>
      <div class="space-y-2 mb-3">
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Add-ons (per hari)</p>
        <div class="grid grid-cols-2 gap-2" id="addonsCheckboxes">
          ${ADDONS.map(a => `
            <label class="flex items-center gap-2 cursor-pointer text-sm p-2 rounded-lg hover:bg-white/70 transition-colors">
              <input type="checkbox" name="addon" value="${a.id}" onchange="recalcPrice(${v.id})" class="accent-orange-500 w-4 h-4" />
              <span>${a.icon} ${a.name}</span>
              <span class="ml-auto text-xs text-gray-400">${formatRupiah(a.price)}</span>
            </label>`).join('')}
        </div>
      </div>
      <div class="border-t border-orange-100 pt-3">
        <div class="flex justify-between text-sm mb-1"><span class="text-gray-500">Sewa kendaraan</span><span id="calcBase" class="font-semibold">${formatRupiah(v.dailyRate)}</span></div>
        <div id="calcAddonLines"></div>
        <div class="flex justify-between text-sm mb-1"><span class="text-gray-500">Deposit (refundable)</span><span class="font-semibold">${formatRupiah(v.deposit)}</span></div>
        <div class="flex justify-between text-base font-extrabold text-navy-900 mt-2 pt-2 border-t border-orange-200">
          <span>Total Biaya</span><span id="calcTotal" class="text-accent">${formatRupiah(v.dailyRate + v.deposit)}</span>
        </div>
      </div>
    </div>

    <div class="flex gap-3">
      <button onclick="closeModal('detailModal')" class="flex-1 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors">Tutup</button>
      <button onclick="closeModal('detailModal'); openBookingFlow(${v.id})"
              ${v.status !== 'Tersedia' ? 'disabled' : ''}
              class="flex-2 bg-accent hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        ${v.status === 'Tersedia' ? 'Pesan Sekarang' : 'Unit Sedang Tersewa'}
      </button>
    </div>`;

  openModal('detailModal');
  lucide.createIcons();
  recalcPrice(v.id); // initial calculation
}

/** Recalculate price in detail modal */
function recalcPrice(vehicleId) {
  const v     = FLEET.find(x => x.id === vehicleId);
  const days  = parseInt(document.getElementById('calcDays').value) || 1;
  const rType = document.getElementById('calcRentalType').value;
  const driverCost = rType === 'dengan_sopir' ? 150000 : 0;

  const selectedAddons = Array.from(document.querySelectorAll('#addonsCheckboxes input[type=checkbox]:checked'))
    .map(cb => ADDONS.find(a => a.id === cb.value));

  const baseTotal   = (v.dailyRate + driverCost) * days;
  const addonTotal  = selectedAddons.reduce((s, a) => s + a.price * days, 0);
  const grandTotal  = baseTotal + addonTotal + v.deposit;

  document.getElementById('calcBase').textContent  = formatRupiah(baseTotal);
  const addonLines = document.getElementById('calcAddonLines');
  addonLines.innerHTML = selectedAddons.map(a =>
    `<div class="flex justify-between text-sm mb-1"><span class="text-gray-400">+ ${a.name}</span><span class="font-semibold">${formatRupiah(a.price * days)}</span></div>`
  ).join('');
  document.getElementById('calcTotal').textContent = formatRupiah(grandTotal);
}

/* ============================================================
   9. BOOKING FLOW
   ============================================================ */

/** Multi-step booking modal */
function openBookingFlow(vehicleId) {
  if (!state.currentUser) {
    openModal('authModal');
    showToast('Silakan masuk terlebih dahulu untuk memesan.', 'error');
    return;
  }
  const v = FLEET.find(x => x.id === vehicleId);
  if (!v) return;
  state.booking.vehicle = v;
  state.booking.addons  = [];
  state.booking.payment = '';

  renderBookingStep1(v);
  openModal('bookingModal');
}

/** Step 1: Booking details + add-ons */
function renderBookingStep1(v) {
  document.getElementById('bookingModalSubtitle').textContent = `Langkah 1 dari 3 — Detail Pesanan`;
  const days = state.booking.durationDays || 1;
  document.getElementById('bookingContent').innerHTML = `
    <div class="flex items-center gap-4 mb-5 p-3 bg-gray-50 rounded-xl">
      <img src="${v.img}" alt="${v.name}" class="w-20 h-16 object-cover rounded-xl flex-shrink-0" />
      <div>
        <p class="font-bold text-navy-900">${v.name}</p>
        <p class="text-sm text-gray-500">${v.type} · ${v.transmission}</p>
        <p class="text-accent font-bold">${formatRupiah(v.dailyRate)}/hari</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 mb-4">
      <div>
        <label class="form-label">Durasi Sewa (hari)</label>
        <input type="number" id="bookDays" value="${days}" min="1" max="365" oninput="updateBookingSummary()" class="form-input" />
      </div>
      <div>
        <label class="form-label">Jenis Sewa</label>
        <select id="bookRentalType" onchange="updateBookingSummary()" class="form-input">
          <option value="lepas_kunci">Lepas Kunci</option>
          <option value="dengan_sopir">Dengan Sopir</option>
        </select>
      </div>
      <div>
        <label class="form-label">Tanggal Mulai</label>
        <input type="text" id="bookStart" value="${state.searchParams.startDatetime || ''}" placeholder="Pilih tanggal" class="form-input" />
      </div>
      <div>
        <label class="form-label">Tanggal Selesai</label>
        <input type="text" id="bookEnd" value="${state.searchParams.endDatetime || ''}" placeholder="Pilih tanggal" class="form-input" />
      </div>
      <div class="col-span-2">
        <label class="form-label">Lokasi Penjemputan</label>
        <input type="text" id="bookPickup" value="${state.searchParams.pickup || ''}" placeholder="Alamat penjemputan" class="form-input" />
      </div>
    </div>

    <div class="mb-4">
      <p class="form-label mb-2">Add-ons (opsional)</p>
      <div class="grid grid-cols-2 gap-2">
        ${ADDONS.map(a => `
          <label class="flex items-center gap-2 cursor-pointer text-sm p-2.5 rounded-xl border border-gray-100 hover:border-accent/50 hover:bg-orange-50 transition-colors">
            <input type="checkbox" name="bookAddon" value="${a.id}" onchange="updateBookingSummary()" class="accent-orange-500 w-4 h-4" />
            <span>${a.icon} ${a.name}</span>
            <span class="ml-auto text-xs text-gray-400 font-semibold">+${formatRupiah(a.price)}</span>
          </label>`).join('')}
      </div>
    </div>

    <div id="bookSummaryBox" class="bg-orange-50 rounded-xl p-4 border border-orange-100 mb-5 text-sm">
      <!-- Filled by updateBookingSummary() -->
    </div>

    <button onclick="goToBookingStep2()" class="w-full bg-accent hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors">
      Lanjut: Upload Dokumen →
    </button>`;

  updateBookingSummary();
}

/** Recalculate booking summary live */
function updateBookingSummary() {
  const v = state.booking.vehicle;
  if (!v) return;
  const days      = parseInt(document.getElementById('bookDays')?.value) || 1;
  const rType     = document.getElementById('bookRentalType')?.value || 'lepas_kunci';
  const driverFee = rType === 'dengan_sopir' ? 150000 : 0;

  const selectedAddons = Array.from(document.querySelectorAll('input[name="bookAddon"]:checked'))
    .map(cb => ADDONS.find(a => a.id === cb.value)).filter(Boolean);

  const baseTotal  = (v.dailyRate + driverFee) * days;
  const addonTotal = selectedAddons.reduce((s, a) => s + a.price * days, 0);
  const grandTotal = baseTotal + addonTotal + v.deposit;

  // Save to state
  state.booking.durationDays = days;
  state.booking.rentalType   = rType;
  state.booking.addons       = selectedAddons;
  state.booking.totalCost    = grandTotal;

  const box = document.getElementById('bookSummaryBox');
  if (!box) return;
  box.innerHTML = `
    <div class="flex justify-between mb-1"><span class="text-gray-500">Sewa (${days} hari × ${formatRupiah(v.dailyRate + driverFee)})</span><span class="font-semibold">${formatRupiah(baseTotal)}</span></div>
    ${selectedAddons.map(a => `<div class="flex justify-between mb-1"><span class="text-gray-400">+ ${a.icon} ${a.name}</span><span class="font-semibold">${formatRupiah(a.price * days)}</span></div>`).join('')}
    <div class="flex justify-between mb-1"><span class="text-gray-500">Deposit</span><span class="font-semibold">${formatRupiah(v.deposit)}</span></div>
    <div class="flex justify-between pt-2 border-t border-orange-200 font-extrabold text-navy-900"><span>Total</span><span class="text-accent">${formatRupiah(grandTotal)}</span></div>`;
}

/** Step 2: Document Upload */
function goToBookingStep2() {
  const pickup = document.getElementById('bookPickup')?.value.trim();
  if (!pickup) { showToast('Masukkan lokasi penjemputan.', 'error'); return; }

  document.getElementById('bookingModalSubtitle').textContent = `Langkah 2 dari 3 — Upload Dokumen`;
  document.getElementById('bookingContent').innerHTML = `
    <p class="text-sm text-gray-500 mb-5">Upload foto KTP dan SIM Anda untuk verifikasi identitas. Format JPG/PNG, maks. 5MB.</p>

    <div class="space-y-4 mb-5">
      <!-- KTP Upload -->
      <div>
        <label class="form-label">Foto KTP <span class="text-red-500">*</span></label>
        <div id="ktpUploadArea" class="upload-area" onclick="document.getElementById('ktpFile').click()">
          <div id="ktpPreview" class="text-center">
            <p class="text-3xl mb-1">🪪</p>
            <p class="text-sm font-semibold text-gray-500">Klik untuk upload foto KTP</p>
            <p class="text-xs text-gray-400">JPG, PNG — maks. 5MB</p>
          </div>
        </div>
        <input type="file" id="ktpFile" accept="image/*" class="hidden" onchange="previewDoc('ktpFile','ktpPreview')" />
      </div>
      <!-- SIM Upload -->
      <div>
        <label class="form-label">Foto SIM A / SIM C <span class="text-red-500">*</span></label>
        <div id="simUploadArea" class="upload-area" onclick="document.getElementById('simFile').click()">
          <div id="simPreview" class="text-center">
            <p class="text-3xl mb-1">🚗</p>
            <p class="text-sm font-semibold text-gray-500">Klik untuk upload foto SIM</p>
            <p class="text-xs text-gray-400">JPG, PNG — maks. 5MB</p>
          </div>
        </div>
        <input type="file" id="simFile" accept="image/*" class="hidden" onchange="previewDoc('simFile','simPreview')" />
      </div>
    </div>

    <div class="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-5 text-sm text-blue-700">
      <strong>ℹ Info:</strong> Dokumen Anda dienkripsi dan hanya digunakan untuk verifikasi identitas sesuai UU PDP.
    </div>

    <div class="flex gap-3">
      <button onclick="renderBookingStep1(state.booking.vehicle)" class="flex-1 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors">← Kembali</button>
      <button onclick="goToBookingStep3()" class="flex-1 bg-accent hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors">Lanjut: Pembayaran →</button>
    </div>`;
}

/** Preview uploaded document in the upload area */
function previewDoc(inputId, previewId) {
  const file = document.getElementById(inputId).files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { showToast('File terlalu besar. Maks 5MB.', 'error'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    const prev = document.getElementById(previewId);
    prev.innerHTML = `<img src="${e.target.result}" alt="Preview dokumen" class="w-full h-32 object-contain rounded-lg" />
      <p class="text-xs text-green-600 font-semibold mt-1">✓ ${file.name}</p>`;
  };
  reader.readAsDataURL(file);
}

/** Step 3: Payment */
function goToBookingStep3() {
  document.getElementById('bookingModalSubtitle').textContent = `Langkah 3 dari 3 — Pembayaran`;
  const v = state.booking.vehicle;

  document.getElementById('bookingContent').innerHTML = `
    <div class="bg-gray-50 rounded-xl p-4 mb-5 text-sm">
      <p class="font-bold text-navy-900 mb-2">${v.name} · ${state.booking.durationDays} hari</p>
      <div class="flex justify-between text-gray-600 mb-1"><span>Subtotal sewa + add-ons</span><span class="font-semibold">${formatRupiah(state.booking.totalCost - v.deposit)}</span></div>
      <div class="flex justify-between text-gray-600 mb-1"><span>Deposit (refundable)</span><span class="font-semibold">${formatRupiah(v.deposit)}</span></div>
      <div class="flex justify-between font-extrabold text-navy-900 text-base pt-2 border-t border-gray-200"><span>Total Pembayaran</span><span class="text-accent">${formatRupiah(state.booking.totalCost)}</span></div>
    </div>

    <p class="form-label mb-3">Pilih Metode Pembayaran</p>
    <div class="grid grid-cols-2 gap-3 mb-5" id="paymentMethods">
      ${[
        { id: 'transfer', icon: '🏦', label: 'Transfer Bank' },
        { id: 'qris',     icon: '📲', label: 'QRIS' },
        { id: 'ewallet',  icon: '💳', label: 'e-Wallet' },
        { id: 'cc',       icon: '💰', label: 'Kartu Kredit' }
      ].map(pm => `
        <button onclick="selectPayment('${pm.id}')" id="pm_${pm.id}" class="payment-btn">
          <span class="text-2xl">${pm.icon}</span>
          <span>${pm.label}</span>
        </button>`).join('')}
    </div>

    <div id="paymentDetail" class="mb-5"></div>

    <div class="flex gap-3">
      <button onclick="goToBookingStep2()" class="flex-1 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors">← Kembali</button>
      <button onclick="confirmBooking()" class="flex-1 bg-accent hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors">Konfirmasi & Bayar</button>
    </div>`;
}

/** Show payment detail based on selection */
function selectPayment(method) {
  state.booking.payment = method;
  document.querySelectorAll('.payment-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById(`pm_${method}`)?.classList.add('selected');

  const details = {
    transfer: `<div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm"><p class="font-bold text-navy-900 mb-2">Transfer Bank</p><p class="text-gray-600">Bank BCA · No. Rekening: <strong>1234567890</strong></p><p class="text-gray-600">A.n. PT Wowo Rental Indonesia</p><p class="text-xs text-gray-400 mt-2">Kirim bukti transfer ke WhatsApp kami setelah pembayaran.</p></div>`,
    qris:     `<div class="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-center"><p class="font-bold text-navy-900 mb-2">Scan QRIS</p><div class="bg-white border-2 border-gray-200 rounded-xl w-32 h-32 mx-auto flex items-center justify-center text-4xl">📲</div><p class="text-xs text-gray-400 mt-2">Scan dengan aplikasi GoPay, OVO, DANA, atau ShopeePay</p></div>`,
    ewallet:  `<div class="bg-purple-50 border border-purple-200 rounded-xl p-4 text-sm"><p class="font-bold text-navy-900 mb-2">e-Wallet</p><div class="grid grid-cols-3 gap-2 mt-2">${['GoPay','OVO','DANA'].map(w=>`<button class="border border-purple-200 rounded-lg p-2 text-xs font-semibold hover:bg-purple-100 transition-colors">${w}</button>`).join('')}</div></div>`,
    cc:       `<div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm"><p class="font-bold text-navy-900 mb-2">Kartu Kredit / Debit</p><input placeholder="Nomor Kartu" class="form-input mb-2" /><div class="grid grid-cols-2 gap-2"><input placeholder="MM/YY" class="form-input" /><input placeholder="CVV" class="form-input" /></div></div>`
  };
  document.getElementById('paymentDetail').innerHTML = details[method] || '';
}

/** Final booking confirmation */
function confirmBooking() {
  if (!state.booking.payment) { showToast('Pilih metode pembayaran.', 'error'); return; }
  const v = state.booking.vehicle;

  // Show success screen
  document.getElementById('bookingContent').innerHTML = `
    <div class="text-center py-6">
      <div class="text-6xl mb-4">🎉</div>
      <h3 class="text-2xl font-extrabold text-navy-900 mb-2">Pesanan Diterima!</h3>
      <p class="text-gray-500 mb-4">Terima kasih! Pesanan <strong>${v.name}</strong> Anda sedang diproses.</p>
      <div class="bg-gray-50 rounded-xl p-4 text-sm text-left mb-5">
        <div class="flex justify-between mb-1"><span class="text-gray-500">Nomor Pesanan</span><span class="font-bold text-navy-900">WR-${String(Date.now()).slice(-6)}</span></div>
        <div class="flex justify-between mb-1"><span class="text-gray-500">Kendaraan</span><span class="font-semibold">${v.name}</span></div>
        <div class="flex justify-between mb-1"><span class="text-gray-500">Durasi</span><span class="font-semibold">${state.booking.durationDays} hari</span></div>
        <div class="flex justify-between mb-1"><span class="text-gray-500">Metode Bayar</span><span class="font-semibold capitalize">${state.booking.payment}</span></div>
        <div class="flex justify-between font-extrabold text-navy-900 pt-2 border-t border-gray-200"><span>Total</span><span class="text-accent">${formatRupiah(state.booking.totalCost)}</span></div>
      </div>
      <p class="text-sm text-gray-400 mb-5">Konfirmasi pesanan telah dikirim ke WhatsApp & email Anda.</p>
      <button onclick="closeModal('bookingModal')" class="bg-accent hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-colors">Tutup</button>
    </div>`;
  document.getElementById('bookingModalSubtitle').textContent = 'Berhasil! 🎉';

  // Simulate notification
  setTimeout(() => showToast(`📱 Konfirmasi pesanan dikirim via WhatsApp!`), 1000);
  setTimeout(() => showToast(`📧 Bukti pemesanan dikirim ke email Anda!`), 2500);
}

/* ============================================================
   10. TESTIMONIALS
   ============================================================ */
function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  grid.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="stars mb-2">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      <p class="text-gray-600 text-sm mb-4">"${t.text}"</p>
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">${t.name.charAt(0)}</div>
        <div>
          <p class="font-semibold text-sm text-navy-900">${t.name}</p>
          <p class="text-xs text-gray-400">${t.city}</p>
        </div>
      </div>
    </div>`).join('');
}

/* ============================================================
   11. CONTACT FORM
   ============================================================ */
function submitContactForm() {
  showToast('Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.');
}

/* ============================================================
   12. ADMIN PANEL
   ============================================================ */
function openAdminPanel() {
  document.getElementById('adminPanel').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  showAdminTab('dashboard');
  lucide.createIcons();
}

function closeAdminPanel() {
  document.getElementById('adminPanel').classList.add('hidden');
  document.body.style.overflow = '';
}

/** Switch admin tabs */
function showAdminTab(tab) {
  // Update nav button styles
  document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[onclick="showAdminTab('${tab}')"]`)?.classList.add('active');

  const content = document.getElementById('adminContent');

  const renderers = {
    dashboard:    renderAdminDashboard,
    fleet:        renderAdminFleet,
    bookings:     renderAdminBookings,
    calendar:     renderAdminCalendar,
    verification: renderAdminVerification,
    drivers:      renderAdminDrivers,
    maintenance:  renderAdminMaintenance,
    reports:      renderAdminReports,
    gps:          renderAdminGPS
  };

  if (renderers[tab]) {
    renderers[tab](content);
    lucide.createIcons();
  }
}

/** Admin: Dashboard overview */
function renderAdminDashboard(container) {
  const totalRevenue = BOOKINGS.reduce((s, b) => s + b.total, 0);
  const activeCount  = BOOKINGS.filter(b => b.status === 'Aktif').length;
  const availCount   = FLEET.filter(v => v.status === 'Tersedia').length;
  const pendingCount = BOOKINGS.filter(b => b.docStatus === 'Pending' || b.docStatus === 'Review').length;

  container.innerHTML = `
    <div class="mb-6">
      <h2 class="text-2xl font-extrabold text-navy-900">Dashboard Admin</h2>
      <p class="text-gray-500 text-sm">Ringkasan operasional Wowo Rental</p>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      ${[
        { label: 'Total Pendapatan',  value: formatRupiah(totalRevenue), icon: 'trending-up',   color: 'text-green-600',  bg: 'bg-green-50'  },
        { label: 'Pesanan Aktif',     value: activeCount + ' pesanan',  icon: 'calendar-check', color: 'text-blue-600',   bg: 'bg-blue-50'   },
        { label: 'Unit Tersedia',     value: availCount + ' unit',      icon: 'car',            color: 'text-accent',     bg: 'bg-orange-50' },
        { label: 'Dokumen Pending',   value: pendingCount + ' dokumen', icon: 'shield-alert',   color: 'text-yellow-600', bg: 'bg-yellow-50' }
      ].map(s => `
        <div class="admin-stat-card flex items-center gap-4">
          <div class="w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0">
            <i data-lucide="${s.icon}" class="w-6 h-6 ${s.color}"></i>
          </div>
          <div>
            <p class="text-xs text-gray-400 font-medium">${s.label}</p>
            <p class="text-lg font-extrabold text-navy-900">${s.value}</p>
          </div>
        </div>`).join('')}
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Recent bookings -->
      <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 class="font-bold text-navy-900 mb-4">Pesanan Terbaru</h3>
        <div class="overflow-x-auto">
          <table class="admin-table">
            <thead><tr><th>ID</th><th>Pelanggan</th><th>Unit</th><th>Status</th></tr></thead>
            <tbody>
              ${BOOKINGS.slice(0,5).map(b => `
                <tr>
                  <td class="font-mono text-xs">${b.id}</td>
                  <td>${b.customer}</td>
                  <td class="text-xs">${b.vehicle}</td>
                  <td><span class="status-badge-pill ${b.status}">${b.status}</span></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Notification log -->
      <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 class="font-bold text-navy-900 mb-4">Log Notifikasi Otomatis</h3>
        <div class="space-y-3 text-sm">
          ${[
            { icon: '📱', msg: 'Konfirmasi pesanan WR-006 dikirim ke Sari Dewi via WhatsApp',    time: '5 menit lalu',  type: 'success' },
            { icon: '📧', msg: 'Bukti pembayaran WR-005 dikirim ke budi@email.com',              time: '12 menit lalu', type: 'success' },
            { icon: '⏰', msg: 'Pengingat pengembalian WR-003 dikirim ke Hendra (H-1)',          time: '1 jam lalu',    type: 'warning' },
            { icon: '🔔', msg: 'Dokumen WR-004 menunggu verifikasi admin',                       time: '2 jam lalu',    type: 'info' }
          ].map(n => `
            <div class="flex items-start gap-3 p-2.5 rounded-lg ${n.type === 'warning' ? 'bg-yellow-50' : n.type === 'info' ? 'bg-blue-50' : 'bg-green-50'}">
              <span>${n.icon}</span>
              <div class="flex-1">
                <p class="text-gray-700">${n.msg}</p>
                <p class="text-xs text-gray-400 mt-0.5">${n.time}</p>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

/** Admin: Fleet Management */
function renderAdminFleet(container) {
  container.innerHTML = `
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-extrabold text-navy-900">Manajemen Armada</h2>
        <p class="text-gray-500 text-sm">${FLEET.length} unit terdaftar</p>
      </div>
      <button onclick="showAddVehicleForm()" class="bg-accent hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
        <i data-lucide="plus" class="w-4 h-4"></i> Tambah Unit
      </button>
    </div>

    <div id="addVehicleForm" class="hidden bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
      <h3 class="font-bold text-navy-900 mb-4">Tambah Kendaraan Baru</h3>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div><label class="form-label">Nama Kendaraan</label><input type="text" placeholder="cth. Toyota Avanza" class="form-input" /></div>
        <div><label class="form-label">Tipe</label><select class="form-input"><option>City Car</option><option>SUV</option><option>MPV</option><option>Motor</option><option>Luxury</option></select></div>
        <div><label class="form-label">Transmisi</label><select class="form-input"><option>Matic</option><option>Manual</option></select></div>
        <div><label class="form-label">Kapasitas Penumpang</label><input type="number" placeholder="7" class="form-input" /></div>
        <div><label class="form-label">Tarif Harian (Rp)</label><input type="number" placeholder="350000" class="form-input" /></div>
        <div><label class="form-label">Deposit (Rp)</label><input type="number" placeholder="700000" class="form-input" /></div>
        <div class="col-span-2"><label class="form-label">Foto Unit</label><input type="file" accept="image/*" class="form-input" /></div>
      </div>
      <div class="flex gap-3">
        <button onclick="document.getElementById('addVehicleForm').classList.add('hidden')" class="border-2 border-gray-200 text-gray-600 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50">Batal</button>
        <button onclick="showToast('Unit berhasil ditambahkan!')" class="bg-accent text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-orange-600">Simpan Unit</button>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="admin-table">
          <thead><tr><th>Foto</th><th>Kendaraan</th><th>Tipe</th><th>Tarif/Hari</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            ${FLEET.map(v => `
              <tr>
                <td><img src="${v.img}" alt="${v.name}" class="w-16 h-12 object-cover rounded-lg" /></td>
                <td class="font-semibold text-navy-900">${v.name}</td>
                <td>${v.type}</td>
                <td class="font-semibold text-accent">${formatRupiah(v.dailyRate)}</td>
                <td><span class="status-badge ${v.status === 'Tersedia' ? 'status-available' : 'status-rented'}">${v.status}</span></td>
                <td>
                  <div class="flex gap-2">
                    <button onclick="showToast('Mode edit kendaraan')" class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-semibold hover:bg-blue-200 transition-colors">Edit</button>
                    <button onclick="confirmDeleteVehicle('${v.name}')" class="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-lg font-semibold hover:bg-red-200 transition-colors">Hapus</button>
                  </div>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function showAddVehicleForm() {
  document.getElementById('addVehicleForm').classList.toggle('hidden');
  lucide.createIcons();
}

function confirmDeleteVehicle(name) {
  if (confirm(`Hapus unit "${name}" dari armada?`)) showToast(`Unit "${name}" dihapus.`, 'error');
}

/** Admin: Bookings */
function renderAdminBookings(container) {
  container.innerHTML = `
    <div class="mb-6">
      <h2 class="text-2xl font-extrabold text-navy-900">Manajemen Pesanan</h2>
      <p class="text-gray-500 text-sm">${BOOKINGS.length} total pesanan</p>
    </div>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="admin-table">
          <thead><tr><th>ID</th><th>Pelanggan</th><th>Unit</th><th>Periode</th><th>Total</th><th>Status</th><th>Sopir</th><th>Aksi</th></tr></thead>
          <tbody>
            ${BOOKINGS.map(b => `
              <tr>
                <td class="font-mono text-xs font-semibold">${b.id}</td>
                <td class="font-medium">${b.customer}</td>
                <td class="text-xs">${b.vehicle}</td>
                <td class="text-xs text-gray-500">${b.start} s/d ${b.end}</td>
                <td class="font-semibold text-accent">${formatRupiah(b.total)}</td>
                <td><span class="status-badge-pill ${b.status}">${b.status}</span></td>
                <td class="text-xs">${b.driver}</td>
                <td>
                  <button onclick="showToast('Notifikasi dikirim ke ${b.customer}')" class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200 transition-colors">Notif</button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

/** Admin: Booking Calendar */
function renderAdminCalendar(container) {
  const today = new Date();
  const month = today.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
  const days  = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];

  // Build simple calendar grid
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  let calCells = '';
  for (let i = 0; i < firstDay; i++) calCells += `<div></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const booking = BOOKINGS.find(b => {
      const s = new Date(b.start).getDate(), e = new Date(b.end).getDate();
      return d >= s && d <= e && b.status === 'Aktif';
    });
    const isToday = d === today.getDate();
    calCells += `
      <div class="relative p-1.5 rounded-lg text-xs text-center cursor-pointer hover:bg-blue-50 transition-colors
           ${isToday ? 'bg-accent text-white font-bold hover:bg-orange-600' : booking ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-600'}">
        ${d}
        ${booking && !isToday ? `<span class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500"></span>` : ''}
      </div>`;
  }

  container.innerHTML = `
    <div class="mb-6">
      <h2 class="text-2xl font-extrabold text-navy-900">Kalender Ketersediaan</h2>
      <p class="text-gray-500 text-sm">Tampilan booking real-time</p>
    </div>
    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 class="font-bold text-navy-900 mb-4 capitalize">${month}</h3>
        <div class="grid grid-cols-7 gap-1 mb-2">
          ${days.map(d => `<div class="text-xs text-center font-bold text-gray-400 py-1">${d}</div>`).join('')}
        </div>
        <div class="grid grid-cols-7 gap-1">${calCells}</div>
        <div class="flex gap-4 mt-4 text-xs text-gray-500">
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-accent inline-block"></span> Hari ini</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-blue-100 inline-block"></span> Ada booking</span>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 class="font-bold text-navy-900 mb-4">Unit Aktif</h3>
        <div class="space-y-3">
          ${BOOKINGS.filter(b => b.status === 'Aktif').map(b => `
            <div class="p-3 bg-blue-50 rounded-xl text-sm">
              <p class="font-bold text-navy-900">${b.vehicle}</p>
              <p class="text-blue-700 text-xs">🧑 ${b.customer}</p>
              <p class="text-gray-500 text-xs">📅 s/d ${b.end}</p>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

/** Admin: Document Verification */
function renderAdminVerification(container) {
  const pending = BOOKINGS.filter(b => b.docStatus !== 'Disetujui');
  container.innerHTML = `
    <div class="mb-6">
      <h2 class="text-2xl font-extrabold text-navy-900">Verifikasi Dokumen</h2>
      <p class="text-gray-500 text-sm">${pending.length} dokumen menunggu tinjauan</p>
    </div>
    <div class="grid gap-4">
      ${BOOKINGS.map(b => `
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
          <div class="flex-1 min-w-0">
            <p class="font-bold text-navy-900">${b.customer} <span class="font-mono text-xs text-gray-400 ml-2">${b.id}</span></p>
            <p class="text-sm text-gray-500">${b.vehicle} · ${b.start}</p>
          </div>
          <!-- Simulated doc thumbnails -->
          <div class="flex gap-2">
            <div class="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 border border-gray-200">KTP</div>
            <div class="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 border border-gray-200">SIM</div>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-bold ${b.docStatus === 'Disetujui' ? 'bg-green-100 text-green-700' : b.docStatus === 'Review' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}">${b.docStatus}</span>
          <div class="flex gap-2">
            ${b.docStatus !== 'Disetujui' ? `
              <button onclick="approveDoc('${b.id}')" class="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">✓ Setujui</button>
              <button onclick="rejectDoc('${b.id}')" class="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">✗ Tolak</button>` :
              `<span class="text-green-600 font-semibold text-sm">✓ Sudah disetujui</span>`}
          </div>
        </div>`).join('')}
    </div>`;
}

function approveDoc(id) {
  const b = BOOKINGS.find(x => x.id === id);
  if (b) { b.docStatus = 'Disetujui'; showToast(`Dokumen ${id} disetujui! Notifikasi dikirim.`); renderAdminVerification(document.getElementById('adminContent')); lucide.createIcons(); }
}
function rejectDoc(id) {
  const b = BOOKINGS.find(x => x.id === id);
  if (b) { b.docStatus = 'Ditolak'; showToast(`Dokumen ${id} ditolak.`, 'error'); renderAdminVerification(document.getElementById('adminContent')); lucide.createIcons(); }
}

/** Admin: Drivers */
function renderAdminDrivers(container) {
  container.innerHTML = `
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-extrabold text-navy-900">Manajemen Sopir</h2>
        <p class="text-gray-500 text-sm">${DRIVERS.length} sopir terdaftar</p>
      </div>
      <button onclick="showToast('Form tambah sopir')" class="bg-accent hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
        <i data-lucide="user-plus" class="w-4 h-4"></i> Tambah Sopir
      </button>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      ${DRIVERS.map(d => `
        <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-navy-700 rounded-full flex items-center justify-center text-white font-bold">${d.name.charAt(0)}</div>
            <div>
              <p class="font-bold text-navy-900 text-sm">${d.name}</p>
              <p class="text-xs text-gray-400">${d.phone}</p>
            </div>
          </div>
          <div class="flex justify-between text-xs mb-3">
            <span>⭐ ${d.rating}/5.0</span>
            <span>🚗 ${d.trips} perjalanan</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold px-2 py-1 rounded-full ${d.status === 'Tersedia' ? 'bg-green-100 text-green-700' : d.status === 'Bertugas' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}">${d.status}</span>
            <button onclick="assignDriver(${d.id})" ${d.status !== 'Tersedia' ? 'disabled' : ''} class="text-xs bg-accent text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Tugaskan</button>
          </div>
        </div>`).join('')}
    </div>

    <!-- Assignment section -->
    <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <h3 class="font-bold text-navy-900 mb-4">Penugasan Sopir ke Pesanan</h3>
      <div class="grid sm:grid-cols-3 gap-3">
        <div><label class="form-label">Pilih Sopir</label>
          <select class="form-input">
            ${DRIVERS.filter(d => d.status === 'Tersedia').map(d => `<option value="${d.id}">${d.name}</option>`).join('')}
          </select></div>
        <div><label class="form-label">Pilih Pesanan</label>
          <select class="form-input">
            ${BOOKINGS.filter(b => b.driver === '-').map(b => `<option value="${b.id}">${b.id} — ${b.customer}</option>`).join('')}
          </select></div>
        <div class="flex items-end">
          <button onclick="showToast('Sopir berhasil ditugaskan!')" class="w-full bg-accent hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl transition-colors">Tugaskan</button>
        </div>
      </div>
    </div>`;
}

function assignDriver(id) {
  const d = DRIVERS.find(x => x.id === id);
  if (d) showToast(`${d.name} dipilih. Pilih pesanan dan klik Tugaskan.`);
}

/** Admin: Maintenance */
function renderAdminMaintenance(container) {
  container.innerHTML = `
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-extrabold text-navy-900">Jadwal Perawatan</h2>
        <p class="text-gray-500 text-sm">Unit otomatis tidak bisa disewa saat jadwal aktif</p>
      </div>
      <button onclick="showToast('Form jadwal perawatan')" class="bg-accent hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
        <i data-lucide="plus" class="w-4 h-4"></i> Jadwal Baru
      </button>
    </div>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table class="admin-table">
        <thead><tr><th>Kendaraan</th><th>Tanggal</th><th>Jenis Perawatan</th><th>Bengkel</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          ${MAINTENANCE.map(m => `
            <tr>
              <td class="font-semibold">${m.vehicle}</td>
              <td>${m.date}</td>
              <td>${m.type}</td>
              <td class="text-gray-500">${m.mechanic}</td>
              <td><span class="px-2 py-0.5 rounded-full text-xs font-bold ${m.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">${m.status}</span></td>
              <td>
                <button onclick="showToast('${m.vehicle} tandai selesai')" class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors">Tandai Selesai</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

/** Admin: Reports */
function renderAdminReports(container) {
  const dailyRevenue = [850000, 1200000, 650000, 1800000, 2100000, 950000, 1550000];
  const dayLabels    = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const maxRev       = Math.max(...dailyRevenue);

  const topUnits = [...FLEET].sort((a, b) => (b.status === 'Tersewa' ? 1 : 0) - (a.status === 'Tersewa' ? 1 : 0)).slice(0, 5);

  container.innerHTML = `
    <div class="mb-6">
      <h2 class="text-2xl font-extrabold text-navy-900">Laporan & Analitik</h2>
      <p class="text-gray-500 text-sm">Ringkasan finansial dan performa armada</p>
    </div>

    <!-- Revenue Bar Chart (Pure SVG/CSS, no library) -->
    <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
      <h3 class="font-bold text-navy-900 mb-4">Pendapatan 7 Hari Terakhir</h3>
      <div class="flex items-end gap-2 h-40">
        ${dailyRevenue.map((rev, i) => `
          <div class="flex-1 flex flex-col items-center gap-1">
            <span class="text-xs text-gray-400 font-semibold">${formatRupiah(rev).replace('Rp ', '')}</span>
            <div class="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-700"
                 style="height: ${Math.round((rev / maxRev) * 100)}%"></div>
            <span class="text-xs font-semibold text-gray-500">${dayLabels[i]}</span>
          </div>`).join('')}
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Top vehicles -->
      <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 class="font-bold text-navy-900 mb-4">Unit Terpopuler</h3>
        <div class="space-y-3">
          ${topUnits.map((v, i) => `
            <div class="flex items-center gap-3">
              <img src="${v.img}" alt="${v.name}" class="w-12 h-9 object-cover rounded-lg flex-shrink-0" />
              <div class="flex-1">
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-semibold text-navy-900">${v.name}</span>
                  <span class="text-xs text-gray-400">#${i + 1}</span>
                </div>
                <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full rounded-full bg-accent" style="width: ${100 - i * 15}%"></div>
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Transaction history -->
      <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 class="font-bold text-navy-900 mb-4">Riwayat Transaksi</h3>
        <div class="space-y-2 text-sm">
          ${BOOKINGS.map(b => `
            <div class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p class="font-semibold text-navy-900">${b.customer}</p>
                <p class="text-xs text-gray-400">${b.id} · ${b.start}</p>
              </div>
              <span class="font-bold ${b.status === 'Selesai' ? 'text-green-600' : b.status === 'Aktif' ? 'text-blue-600' : 'text-yellow-500'}">${formatRupiah(b.total)}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

/** Admin: GPS Tracking */
function renderAdminGPS(container) {
  container.innerHTML = `
    <div class="mb-6">
      <h2 class="text-2xl font-extrabold text-navy-900">GPS Tracking</h2>
      <p class="text-gray-500 text-sm">Pemantauan real-time posisi kendaraan aktif</p>
    </div>
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Map placeholder -->
      <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="bg-gray-100 h-72 flex items-center justify-center relative">
          <!-- Simulated map with markers -->
          <div class="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-teal-100 opacity-70"></div>
          <div class="relative text-center">
            <p class="text-4xl mb-2">🗺️</p>
            <p class="text-gray-500 font-semibold">Peta GPS Real-time</p>
            <p class="text-gray-400 text-xs mt-1">Integrasikan dengan Google Maps API atau Leaflet.js</p>
          </div>
          <!-- Simulated markers -->
          ${GPS_DATA.map((g, i) => `
            <div class="absolute w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform"
                 style="top: ${30 + i * 25}%; left: ${20 + i * 25}%"
                 title="${g.vehicle} — ${g.status}">
              🚗
            </div>`).join('')}
        </div>
        <div class="p-4 text-xs text-gray-500 flex gap-4">
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-accent inline-block"></span> Bergerak</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-gray-400 inline-block"></span> Parkir</span>
        </div>
      </div>

      <!-- Vehicle list -->
      <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 class="font-bold text-navy-900 mb-4">Unit Aktif GPS</h3>
        <div class="space-y-3">
          ${GPS_DATA.map(g => `
            <div class="p-3 rounded-xl border ${g.status === 'Bergerak' ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-gray-50'}">
              <div class="flex justify-between items-start mb-1">
                <p class="font-bold text-sm text-navy-900">${g.vehicle}</p>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full ${g.status === 'Bergerak' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}">${g.status}</span>
              </div>
              <p class="text-xs text-gray-500">🏷 ${g.plate}</p>
              <p class="text-xs text-gray-500">👤 ${g.renter}</p>
              <p class="text-xs text-gray-500">💨 ${g.speed} km/h · ${g.lastUpdate}</p>
              <p class="text-xs text-blue-500 font-mono mt-1">${g.lat.toFixed(4)}, ${g.lng.toFixed(4)}</p>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

/* ============================================================
   13. ADDITIONAL CSS INJECTED VIA JS
   ============================================================ */

/** Inject upload area and status badge pill styles */
function injectDynamicStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .upload-area {
      border: 2px dashed #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.25rem;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
      text-align: center;
    }
    .upload-area:hover { border-color: #f97316; background: #fff7ed; }
    .status-badge-pill {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 700;
    }
    .status-badge-pill.Aktif    { background: #dbeafe; color: #1d4ed8; }
    .status-badge-pill.Selesai  { background: #dcfce7; color: #15803d; }
    .status-badge-pill.Pending  { background: #fef9c3; color: #a16207; }
    .status-badge-pill.Dibatal  { background: #fee2e2; color: #dc2626; }
  `;
  document.head.appendChild(style);
}

/* ============================================================
   14. INITIALIZATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Inject dynamic CSS
  injectDynamicStyles();

  // Init Lucide icons
  lucide.createIcons();

  // Init Flatpickr date pickers
  initDatePickers();

  // Render fleet catalog
  renderFleet(FLEET);

  // Render testimonials
  renderTestimonials();

  // Close modals on backdrop click
  ['authModal', 'detailModal', 'bookingModal'].forEach(id => {
    document.getElementById(id).addEventListener('click', e => {
      if (e.target === document.getElementById(id)) closeModal(id);
    });
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('#mobileMenu a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('mobileMenu').classList.add('hidden'));
  });

  // Keyboard accessibility: close modals with Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      ['authModal', 'detailModal', 'bookingModal'].forEach(id => closeModal(id));
      if (!document.getElementById('adminPanel').classList.contains('hidden')) closeAdminPanel();
    }
  });

  console.log('🚗 Wowo Rental — Website berhasil dimuat!');
});
