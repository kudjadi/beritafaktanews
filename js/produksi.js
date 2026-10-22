/* =========================================================
   PRODUKSI PANEN — Data Terpisah (Versi Auto-Calculate)
   ========================================================= */

const PRODUKSI_STORAGE_KEY = 'prime_agri_produksi_v3';

// --- DATABASE PEMANEN ---
// Anda bisa menambah/mengubah data ini sesuai kebutuhan
const dataPemanen = [
  { nama: "SURANTO", kavling: "37", harga: "900" },
  { nama: "JUWANDA", kavling: "38", harga: "900" },
  { nama: "KARDI", kavling: "39", harga: "900" },
  { nama: "ASEP PRIHATA", kavling: "40", harga: "900" },
  { nama: "BUDI SANTOSO", kavling: "41", harga: "950" },
  { nama: "JOKO WIDODO", kavling: "42", harga: "950" }
];

const DEFAULT_PRODUKSI = {
  header: {
    kebun: "KPKS JADI MANDIRI",
    noKlp: "37",
    tanggal: "2026-02-06",
    pengurus: "KHOIRUL HUDA",
    panenPusingan: "1"
  },
  rows: [
    { id: "1", tanggal: "2026-02-06", pusingan: "1", kelompok: "37", nama: "SURANTO", kavling: "37", absen: "1", berondolan: "0", masak: "10", mengkal: "0", mentah: "0", busuk: "0", harga: "900", jumlah: "9000" }
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
    tbody.innerHTML = `<tr><td colspan="14" class="text-center py-4 text-gray-500">Belum ada data.</td></tr>`;
  } else {
    tbody.innerHTML = data.rows.map((row, index) => {
      totalJumlah += parseFloat(row.jumlah) || 0;
      return `
        <tr class="border-b border-gray-300 hover:bg-gray-50">
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${formatTanggal(row.tanggal)}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.pusingan}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.kelompok}</td>
          <td class="p-1 border-r border-gray-300 font-medium text-xs md:text-sm">${row.nama}</td>
          <td class="p-1 border-r border-gray-300 text-center font-bold text-xs md:text-sm bg-yellow-50">${row.kavling}</td>
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

// --- LOGIKA FORM ---

// Isi dropdown nama saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  const selectNama = document.getElementById('in-nama');
  if (selectNama) {
    dataPemanen.forEach((p, i) => {
      const opt = document.createElement('option');
      opt.value = i; // Gunakan index sebagai value
      opt.textContent = p.nama;
      selectNama.appendChild(opt);
    });
  }
  renderProduksi();
});

// Saat nama dipilih, isi Kavling dan Harga otomatis
function pilihPemanen() {
  const index = document.getElementById('in-nama').value;
  if (index === "") return;
  
  const p = dataPemanen[index];
  document.getElementById('in-kavling').value = p.kavling;
  document.getElementById('in-harga').value = p.harga;
}

function updateKavling() {
  const kelompok = document.getElementById('in-kelompok').value;
  if (kelompok) document.getElementById('in-kavling').value = kelompok;
}

function tambahBaris(event) {
  event.preventDefault();
  const data = getProduksiData();
  
  const val = (id) => document.getElementById(id).value || "0";
  
  const indexPemanen = document.getElementById('in-nama').value;
  const pemanen = dataPemanen[indexPemanen] || { nama: "-", kavling: "-" };

  // Hitung total buah
  const totalBuah = 
    parseFloat(val('in-masak')) + 
    parseFloat(val('in-mengkal')) + 
    parseFloat(val('in-mentah')) + 
    parseFloat(val('in-busuk'));
    
  const harga = parseFloat(val('in-harga'));
  
  // Kalkulasi Jumlah Otomatis (Total Buah x Harga)
  const jumlah = totalBuah * harga;

  const newRow = {
    id: Date.now().toString(),
    tanggal: document.getElementById('in-tanggal').value || "",
    pusingan: document.getElementById('in-pusingan').value || "1",
    kelompok: document.getElementById('in-kelompok').value || "",
    nama: pemanen.nama,
    kavling: document.getElementById('in-kavling').value || "",
    absen: val('in-absen'),
    berondolan: val('in-berondolan'),
    masak: val('in-masak'),
    mengkal: val('in-mengkal'),
    mentah: val('in-mentah'),
    busuk: val('in-busuk'),
    harga: harga.toString(),
    jumlah: jumlah.toString()
  };

  // Update header atas
  if (newRow.tanggal) data.header.tanggal = newRow.tanggal;
  if (newRow.pusingan) data.header.panenPusingan = newRow.pusingan;
  if (newRow.kelompok) data.header.noKlp = newRow.kelompok;

  data.rows.push(newRow);
  saveProduksiData(data);

  // Reset Form (kecuali tanggal, pusingan, kelompok agar tidak perlu input ulang)
  document.getElementById('in-nama').value = "";
  document.getElementById('in-absen').value = "";
  document.getElementById('in-kavling').value = "";
  document.getElementById('in-berondolan').value = "";
  document.getElementById('in-masak').value = "";
  document.getElementById('in-mengkal').value = "";
  document.getElementById('in-mentah').value = "";
  document.getElementById('in-busuk').value = "";
  document.getElementById('in-harga').value = "";
}

function hapusBaris(index) {
  if (!confirm('Hapus data ini?')) return;
  const data = getProduksiData();
  data.rows.splice(index, 1);
  saveProduksiData(data);
}