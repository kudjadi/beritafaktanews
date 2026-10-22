/* =========================================================
   PRODUKSI PANEN — Data Terpisah (Fix Dropdown & Header)
   ========================================================= */

const PRODUKSI_STORAGE_KEY = 'prime_agri_produksi_v5';

// --- DATABASE KELOMPOK & PENGURUS ---
const dataKelompok = {
  "37": "KHOIRUL HUDA", "38": "WELLI SANDRA", "39": "SUGIANTO", 
  "40": "AHMAD FAUZI", "41": "BAMBANG", "42": "JOKO S", 
  "43": "HERI", "44": "WELLI SANDRA", "45": "DEDI", 
  "46": "IWAN", "47": "RUDI", "48": "AGUS"
};

// --- DATABASE PEMANEN ---
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
  rows: []
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

function singkatNama(nama) {
  return nama.split(' ')[0];
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
    tbody.innerHTML = `<tr><td colspan="13" class="text-center py-4 text-gray-500">Belum ada data.</td></tr>`;
  } else {
    tbody.innerHTML = data.rows.map((row, index) => {
      totalJumlah += parseFloat(row.jumlah) || 0;
      return `
        <tr class="border-b border-gray-300 hover:bg-gray-50">
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${formatTanggal(row.tanggal)}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.pusingan}</td>
          <td class="p-1 border-r border-gray-300 text-center text-xs md:text-sm">${row.kelompok}</td>
          <td class="p-1 border-r border-gray-300 font-medium text-xs md:text-sm">${singkatNama(row.nama)}</td>
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

// --- LOGIKA FORM & INISIALISASI ---

// Pastikan fungsi ini jalan setelah DOM siap
document.addEventListener('DOMContentLoaded', () => {
  // 1. Isi Dropdown Kelompok & Pengurus
  const selectKelompok = document.getElementById('in-kelompok');
  if (selectKelompok) {
    for(let i=37; i<=48; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `${i} - ${dataKelompok[i] || ''}`;
      selectKelompok.appendChild(opt);
    }
  }

  // 2. Isi Dropdown Nama Pemanen
  const selectNama = document.getElementById('in-nama');
  if (selectNama) {
    dataPemanen.forEach((p, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `${p.nama} (${p.kavling})`; 
      selectNama.appendChild(opt);
    });
  }

  // 3. Render Tabel
  renderProduksi();
});

function pilihPemanen() {
  const index = document.getElementById('in-nama').value;
  const inputHarga = document.getElementById('in-harga');
  
  if (index === "") {
    if(inputHarga) inputHarga.value = "";
    return;
  }
  
  const p = dataPemanen[index];
  if(inputHarga) inputHarga.value = p.harga;
}

function updateKelompok() {
  const kelompok = document.getElementById('in-kelompok').value;
  if (kelompok && dataKelompok[kelompok]) {
    document.getElementById('p-noklp').textContent = kelompok;
    document.getElementById('p-pengurus').textContent = dataKelompok[kelompok];
  }
}

function tambahBaris(event) {
  event.preventDefault();
  const data = getProduksiData();
  
  const val = (id) => document.getElementById(id).value || "0";
  
  const indexPemanen = document.getElementById('in-nama').value;
  // Validasi jika belum pilih nama
  if(indexPemanen === "") {
    alert("Pilih nama pemanen terlebih dahulu!");
    return;
  }
  
  const pemanen = dataPemanen[indexPemanen];
  const totalBuah = parseFloat(val('in-masak')) + parseFloat(val('in-mengkal')) + parseFloat(val('in-mentah')) + parseFloat(val('in-busuk'));
  const harga = parseFloat(val('in-harga'));
  const jumlah = totalBuah * harga;

  const kelompok = document.getElementById('in-kelompok').value || "";
  const pengurus = dataKelompok[kelompok] || "-";

  const newRow = {
    id: Date.now().toString(),
    tanggal: document.getElementById('in-tanggal').value || "",
    pusingan: document.getElementById('in-pusingan').value || "1",
    kelompok: kelompok,
    nama: pemanen.nama,
    kavling: pemanen.kavling, // Otomatis dari data pemanen
    absen: val('in-absen'),
    berondolan: val('in-berondolan'),
    masak: val('in-masak'),
    mengkal: val('in-mengkal'),
    mentah: val('in-mentah'),
    busuk: val('in-busuk'),
    harga: harga.toString(),
    jumlah: jumlah.toString()
  };

  if (newRow.tanggal) data.header.tanggal = newRow.tanggal;
  if (newRow.pusingan) data.header.panenPusingan = newRow.pusingan;
  if (newRow.kelompok) {
    data.header.noKlp = newRow.kelompok;
    data.header.pengurus = pengurus;
  }

  data.rows.push(newRow);
  saveProduksiData(data);

  // Reset Form (Form Kavling sudah dihapus)
  document.getElementById('in-nama').value = "";
  document.getElementById('in-absen').value = "";
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