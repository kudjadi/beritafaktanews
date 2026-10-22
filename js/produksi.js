/* =========================================================
   PRODUKSI PANEN — Data Terpisah
   ========================================================= */

const PRODUKSI_STORAGE_KEY = 'prime_agri_produksi_v1';

const DEFAULT_PRODUKSI = {
  header: {
    kebun: "KPKS JADI MANDIRI",
    noKlp: "37",
    tanggal: "06-07/02/2026",
    pengurus: "KHOIRUL HUDA & WELLI SANDRA",
    panenPusingan: "1",
    totalTanda: "3648",
    totalBerdondan: "613"
  },
  rows: [
    { id: "1", nama: "SURANTO", kavling: "908", absen: "1", berondolan: "", masak: "", mengkal: "", mentah: "", busuk: "", harga: "900", jumlah: "161" },
    { id: "2", nama: "JUWANDA", kavling: "851", absen: "1", berondolan: "", masak: "", mengkal: "", mentah: "", busuk: "", harga: "900", jumlah: "100" },
    { id: "3", nama: "KARDI", kavling: "852", absen: "1", berondolan: "", masak: "", mengkal: "", mentah: "", busuk: "", harga: "900", jumlah: "232" },
    { id: "4", nama: "ASEP PRIHATA", kavling: "853", absen: "1", berondolan: "", masak: "", mengkal: "", mentah: "", busuk: "", harga: "900", jumlah: "72" }
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

function renderProduksi() {
  const data = getProduksiData();
  
  // Render Header
  document.getElementById('p-kebun').textContent = data.header.kebun;
  document.getElementById('p-noklp').textContent = data.header.noKlp;
  document.getElementById('p-tanggal').textContent = data.header.tanggal;
  document.getElementById('p-pengurus').textContent = data.header.pengurus;
  document.getElementById('p-pusingan').textContent = data.header.panenPusingan;
  document.getElementById('p-total-tanda').textContent = data.header.totalTanda;
  document.getElementById('p-total-berdondan').textContent = data.header.totalBerdondan;

  // Render Tabel
  const tbody = document.getElementById('p-tbody');
  let totalJumlah = 0;

  if (data.rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="11" class="text-center py-4 text-gray-500">Belum ada data.</td></tr>`;
  } else {
    tbody.innerHTML = data.rows.map((row, index) => {
      totalJumlah += parseFloat(row.jumlah) || 0;
      return `
        <tr class="border-b border-gray-300 hover:bg-gray-50">
          <td class="p-1 border-r border-gray-300 font-medium text-xs md:text-sm">${row.nama}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.kavling}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.absen}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.berondolan}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.masak}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.mengkal}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.mentah}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.busuk}</td>
          <td class="p-1 border-r border-gray-300 text-right text-xs md:text-sm">${row.harga}</td>
          <td class="p-1 border-r border-gray-300 text-right font-bold text-xs md:text-sm">${row.jumlah}</td>
          <td class="p-1 text-center">
            <button onclick="hapusBaris(${index})" class="text-red-500 hover:text-red-700 font-bold px-2" title="Hapus">×</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Render Total Footer
  document.getElementById('p-total-jumlah').textContent = totalJumlah;
}

// Fungsi Tambah Data dari Form
function tambahBaris(event) {
  event.preventDefault();
  const data = getProduksiData();
  
  const newRow = {
    id: Date.now().toString(),
    nama: document.getElementById('in-nama').value,
    kavling: document.getElementById('in-kavling').value,
    absen: document.getElementById('in-absen').value,
    berondolan: document.getElementById('in-berondolan').value,
    masak: document.getElementById('in-masak').value,
    mengkal: document.getElementById('in-mengkal').value,
    mentah: document.getElementById('in-mentah').value,
    busuk: document.getElementById('in-busuk').value,
    harga: document.getElementById('in-harga').value,
    jumlah: document.getElementById('in-jumlah').value
  };

  data.rows.push(newRow);
  saveProduksiData(data);

  // Reset form
  document.getElementById('form-produksi').reset();
}

// Fungsi Hapus Data
function hapusBaris(index) {
  if (!confirm('Hapus data ini?')) return;
  const data = getProduksiData();
  data.rows.splice(index, 1);
  saveProduksiData(data);
}

function exportProduksi() {
  const data = getProduksiData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data-produksi-' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importProduksi(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      saveProduksiData(parsed);
      alert('Data produksi berhasil di-import!');
    } catch (err) {
      alert('File JSON tidak valid!');
    }
  };
  reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', renderProduksi);