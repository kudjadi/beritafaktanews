/* =========================================================
   PRODUKSI PANEN — Data Terpisah (Versi Ringkas)
   ========================================================= */

const PRODUKSI_STORAGE_KEY = 'prime_agri_produksi_v2';

// Data awal dikosongkan/disesuaikan
const DEFAULT_PRODUKSI = {
  header: {
    kebun: "KPKS JADI MANDIRI",
    noKlp: "37",
    tanggal: "06-07/02/2026",
    pengurus: "KHOIRUL HUDA",
    panenPusingan: "1"
  },
  rows: [
    // Contoh data dummy agar tabel tidak kosong saat pertama dibuka
    { id: "1", tanggal: "2026-02-06", pusingan: "1", kelompok: "37", pengurus: "KHOIRUL HUDA", kavling: "37", nama: "SURANTO", absen: "1", berondolan: "0", masak: "0", mengkal: "0", mentah: "0", busuk: "0", harga: "900", jumlah: "161" }
  ]
};

function getProduksiData() {
  try {
    const raw = localStorage.getItem(PRODUKSI_STORAGE_KEY);
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_PRODUKSI));
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_PRODUKSI));
  }
}

function saveProduksiData(data) {
  localStorage.setItem(PRODUKSI_STORAGE_KEY, JSON.stringify(data));
  renderProduksi();
}

// Fungsi untuk mengubah format tanggal HTML (YYYY-MM-DD) ke format tampilan (DD/MM/YYYY)
function formatTanggal(tgl) {
  if (!tgl) return "-";
  const d = new Date(tgl);
  if (isNaN(d)) return tgl;
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function renderProduksi() {
  const data = getProduksiData();
  
  // Render Header Info
  document.getElementById('p-kebun').textContent = data.header.kebun;
  document.getElementById('p-noklp').textContent = data.header.noKlp;
  document.getElementById('p-tanggal').textContent = formatTanggal(data.header.tanggal);
  document.getElementById('p-pengurus').textContent = data.header.pengurus;
  document.getElementById('p-pusingan').textContent = data.header.panenPusingan;

  // Render Tabel
  const tbody = document.getElementById('p-tbody');
  let totalJumlah = 0;

  if (data.rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="15" class="text-center py-4 text-gray-500">Belum ada data.</td></tr>`;
  } else {
    tbody.innerHTML = data.rows.map((row, index) => {
      totalJumlah += parseFloat(row.jumlah) || 0;
      return `
        <tr class="border-b border-gray-300 hover:bg-gray-50">
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${formatTanggal(row.tanggal)}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.pusingan}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.kelompok}</td>
          <td class="p-1 border-r border-gray-300 text-xs md:text-sm">${row.pengurus}</td>
          <td class="p-1 border-r border-gray-300 text-center font-bold text-xs md:text-sm bg-yellow-50">${row.kavling}</td>
          <td class="p-1 border-r border-gray-300 font-medium text-xs md:text-sm">${row.nama}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.absen}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.berondolan || 0}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.masak || 0}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.mengkal || 0}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.mentah || 0}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.busuk || 0}</td>
          <td class="p-1 border-r border-gray-300 text-right text-xs md:text-sm">${row.harga || 0}</td>
          <td class="p-1 border-r border-gray-300 text-right font-bold text-xs md:text-sm">${row.jumlah || 0}</td>
          <td class="p-1 text-center">
            <button onclick="hapusBaris(${index})" class="text-red-500 hover:text-red-700 font-bold px-2" title="Hapus">×</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  document.getElementById('p-total-jumlah').textContent = totalJumlah;
}

// Handler saat kelompok dipilih, otomatis isi no kavling
function updateKavling() {
  const kelompok = document.getElementById('in-kelompok').value;
  const kavlingInput = document.getElementById('in-kavling');
  if (kelompok) {
    kavlingInput.value = kelompok; // Kavling mengikuti nomor kelompok
  } else {
    kavlingInput.value = '';
  }
}

// Fungsi Tambah Data dari Form
function tambahBaris(event) {
  event.preventDefault();
  const data = getProduksiData();
  
  // Jika input kosong, set default jadi 0
  const val = (id) => document.getElementById(id).value || "0";

  const newRow = {
    id: Date.now().toString(),
    tanggal: document.getElementById('in-tanggal').value || "",
    pusingan: document.getElementById('in-pusingan').value || "1",
    kelompok: document.getElementById('in-kelompok').value || "",
    pengurus: document.getElementById('in-pengurus').value || "",
    kavling: document.getElementById('in-kavling').value || "",
    nama: document.getElementById('in-nama').value || "-",
    absen: document.getElementById('in-absen').value || "0",
    berondolan: val('in-berondolan'),
    masak: val('in-masak'),
    mengkal: val('in-mengkal'),
    mentah: val('in-mentah'),
    busuk: val('in-busuk'),
    harga: val('in-harga'),
    jumlah: val('in-jumlah')
  };

  // Opsional: Update header utama berdasarkan input terakhir
  if (newRow.tanggal) data.header.tanggal = newRow.tanggal;
  if (newRow.pusingan) data.header.panenPusingan = newRow.pusingan;
  if (newRow.kelompok) data.header.noKlp = newRow.kelompok;
  if (newRow.pengurus) data.header.pengurus = newRow.pengurus;

  data.rows.push(newRow);
  saveProduksiData(data);

  // Reset form
  document.getElementById('form-produksi').reset();
  document.getElementById('in-kavling').value = '';
  document.getElementById('in-pengurus').value = ''; // Kosongkan pengurus agar diisi ulang jika beda
}

function hapusBaris(index) {
  if (!confirm('Hapus data ini?')) return;
  const data = getProduksiData();
  data.rows.splice(index, 1);
  saveProduksiData(data);
}

// (Opsional) Generate daftar pengurus per kelompok (Bisa Anda sesuaikan)
const dataPengurus = {
  "37": "KHOIRUL HUDA",
  "38": "WELLI SANDRA",
  "39": "SUGIANTO",
  "40": "AHMAD FAUZI",
  "41": "BAMBANG",
  // ... tambahkan hingga 48
};

function updatePengurus() {
  const kelompok = document.getElementById('in-kelompok').value;
  const pengurusInput = document.getElementById('in-pengurus');
  if (dataPengurus[kelompok]) {
    pengurusInput.value = dataPengurus[kelompok];
  } else {
    pengurusInput.value = ""; // Kosongkan jika kelompok belum diset
  }
  updateKavling(); // sekaligus update kavling
}

document.addEventListener('DOMContentLoaded', renderProduksi);