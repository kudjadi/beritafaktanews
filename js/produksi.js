// Variabel Global
let dataPanen = [];
let nomorUrut = 1;
let kelompokTerpilih = null;

// ==========================================
// DATABASE KELOMPOK & KAVLING (Dibuat Spesifik)
// ==========================================
const dataKelompok = {
  37: { 
    nama: "KHOIRUL HUDA", 
    kavling: [
      { kode: "908", nama: "SURANTO" }, 
      { kode: "851", nama: "WANDA" }, 
      { kode: "852", nama: "EGO NOFRI ADI" }, 
      { kode: "853", nama: "ASEP PRIHATA" }
    ] 
  },
  38: { 
    nama: "WELLI SANDRA", 
    kavling: [
      { kode: "875", nama: "ARIS FAUJI" }, 
      { kode: "876", nama: "KHOIRUDIN" }, 
      { kode: "877", nama: "SUKIMIN" }, 
      { kode: "878", nama: "RISKI SULISTIO" }
    ] 
  },
  39: { 
    nama: "SUGIANTO", 
    kavling: [
      { kode: "882", nama: "WAHYU GUNAWAN" }, 
      { kode: "950", nama: "WANDA" }, 
      { kode: "951", nama: "NURFAHRUDIN" }, 
      { kode: "952", nama: "SETIO WAHYUDI" }
    ] 
  },
  40: { 
    nama: "AHMAD FAUZI", 
    kavling: [
      { kode: "1006", nama: "PORWANTO" }, 
      { kode: "1007", nama: "ADI SUPRAYITNO" }, 
      { kode: "1008", nama: "EGO NOFRI ADI" }
    ] 
  },
  41: { 
    nama: "BAMBANG", 
    kavling: [
      { kode: "995", nama: "ADI PURNAWAN" }, 
      { kode: "994", nama: "SUKIMIN" }, 
      { kode: "993", nama: "KARDI" }
    ] 
  },
  42: { 
    nama: "JOKO S", 
    kavling: [
      { kode: "1042", nama: "IKSAN YULIANTO" }, 
      { kode: "1043", nama: "SUPARDI" }, 
      { kode: "1044", nama: "STIO WAHYUDI" }
    ] 
  },
  43: { 
    nama: "HERI", 
    kavling: [
      { kode: "1067", nama: "JUWANDA" }, 
      { kode: "1068", nama: "RUDI KURNIAWAN" }
    ] 
  },
  44: { 
    nama: "WELLI SANDRA", 
    kavling: [
      { kode: "1071", nama: "ARIS FAUZI" }, 
      { kode: "1072", nama: "KARDI" }, 
      { kode: "1085", nama: "FIRMAN ANDRIANSYAH" }
    ] 
  },
  45: { 
    nama: "DEDI", 
    kavling: [
      { kode: "1114", nama: "ARIS ARDIANSYAH" }, 
      { kode: "1115", nama: "KARDI" }
    ] 
  },
  46: { 
    nama: "IWAN", 
    kavling: [
      { kode: "1118", nama: "SUKIMIN" }, 
      { kode: "1119", nama: "ARI SUPARMANTO" }
    ] 
  },
  47: { 
    nama: "RUDI", 
    kavling: [
      { kode: "1167", nama: "ARIS FAUJI" }, 
      { kode: "1168", nama: "ASEP PRIHATA" }
    ] 
  },
  48: { 
    nama: "AGUS", 
    kavling: [
      { kode: "1171", nama: "IRIANTO" }, 
      { kode: "1172", nama: "SULTAN SRINANTO" }
    ] 
  }
};

// Konfigurasi GitHub Default
let githubConfig = {
  username: '',
  repo: 'data-panen-sawit',
  token: '',
  branch: 'main'
};

// Inisialisasi saat halaman dimuat
window.onload = function() {
  const today = new Date().toISOString().split('T')[0];
  const tglEl = document.getElementById('tanggal');
  if(tglEl) tglEl.value = today;
  
  muatData();
  loadGitHubConfig();
  
  const dropdownKelompok = document.getElementById('dropdown_kelompok');
  if(dropdownKelompok) {
    for (const key in dataKelompok) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = `${dataKelompok[key].nama} (${key})`;
      dropdownKelompok.appendChild(option);
    }
  }
};

// --- FUNGSI DATA LOKAL & DUMMY ---
function muatData() {
  const saved = localStorage.getItem('dataPanenSawit');
  if (saved) {
    try {
      dataPanen = JSON.parse(saved);
      nomorUrut = dataPanen.length > 0 ? dataPanen[dataPanen.length - 1].no + 1 : 1;
    } catch (e) {
      console.error("Gagal memuat data", e);
    }
  } else {
    // === CONTOH DATA AWAL (DUMMY) AGAR TABEL TIDAK KOSONG ===
    dataPanen = [
      { no: 1, kelompok_nomor: "37", kelompok_nama: "KHOIRUL HUDA", tanggal: "2026-10-20", nama: "SURANTO", kavling: "908", tandan_mentah: 2, tandan_matang: 15, tandan_busuk: 1, jangkos: 0, berondolan: 12.5 },
      { no: 2, kelompok_nomor: "37", kelompok_nama: "KHOIRUL HUDA", tanggal: "2026-10-20", nama: "WANDA", kavling: "851", tandan_mentah: 1, tandan_matang: 20, tandan_busuk: 0, jangkos: 2, berondolan: 8.0 },
      { no: 3, kelompok_nomor: "38", kelompok_nama: "WELLI SANDRA", tanggal: "2026-10-21", nama: "ARIS FAUJI", kavling: "875", tandan_mentah: 0, tandan_matang: 18, tandan_busuk: 2, jangkos: 1, berondolan: 15.2 }
    ];
    nomorUrut = 4;
  }
  updateTabel();
}

function simpanData() {
  localStorage.setItem('dataPanenSawit', JSON.stringify(dataPanen));
}

// --- FUNGSI FORM ---
function updateDataKelompok() {
  const selectedValue = document.getElementById('dropdown_kelompok').value;
  const infoKelompok = document.getElementById('infoKelompok');
  const dropdownKavling = document.getElementById('dropdown_kavling');
  
  dropdownKavling.innerHTML = '<option value="">-- Pilih Kavling --</option>';
  
  if (selectedValue && dataKelompok[selectedValue]) {
    kelompokTerpilih = selectedValue;
    infoKelompok.textContent = `Pengurus: ${dataKelompok[selectedValue].nama}`;
    
    // Render kavling khusus untuk kelompok ini
    dataKelompok[selectedValue].kavling.forEach(item => {
      const option = document.createElement('option');
      option.value = item.kode;
      option.textContent = `${item.kode} - ${item.nama}`;
      dropdownKavling.appendChild(option);
    });
  } else {
    kelompokTerpilih = null;
    infoKelompok.textContent = "";
  }
}

function formatTanggalSingkat(tanggal) {
  if (!tanggal) return '-';
  const date = new Date(tanggal);
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function tambahData() {
  const selectedKavling = document.getElementById('dropdown_kavling').value;
  const manualKavling = document.getElementById('kavling_manual').value.trim();
  const kavlingValue = selectedKavling || manualKavling;
  
  const data = {
    no: nomorUrut,
    kelompok_nomor: kelompokTerpilih,
    kelompok_nama: kelompokTerpilih ? dataKelompok[kelompokTerpilih].nama : '',
    tanggal: document.getElementById('tanggal').value,
    nama: document.getElementById('nama').value.trim(),
    kavling: kavlingValue,
    tandan_mentah: parseInt(document.getElementById('tandan_mentah').value) || 0,
    tandan_matang: parseInt(document.getElementById('tandan_matang').value) || 0,
    tandan_busuk: parseInt(document.getElementById('tandan_busuk').value) || 0,
    jangkos: parseInt(document.getElementById('jangkos').value) || 0,
    berondolan: parseFloat(document.getElementById('berondolan').value) || 0
  };

  if (!data.kelompok_nomor) { alert('Pilih kelompok terlebih dahulu!'); return; }
  if (!data.tanggal) { alert('Tanggal panen harus diisi!'); return; }
  if (!data.nama) { alert('Nama pemanen harus diisi!'); return; }
  if (!data.kavling) { alert('Nomor Kavling harus dipilih atau diisi manual!'); return; }

  dataPanen.push(data);
  nomorUrut++;
  
  updateTabel();
  simpanData();
  resetInput();
  
  const statusForm = document.getElementById('statusForm');
  statusForm.innerText = `✓ Data berhasil ditambahkan!`;
  setTimeout(() => { statusForm.innerText = ""; }, 3000);
}

function updateTabel() {
  const tbody = document.getElementById('tabelBody');
  const totalDataEl = document.getElementById('totalData');
  
  tbody.innerHTML = '';
  
  if (dataPanen.length === 0) {
    tbody.innerHTML = `<tr><td colspan="11" class="p-8 text-center text-gray-400">Belum ada data. Silakan input form di atas.</td></tr>`;
    totalDataEl.textContent = "0 Data";
    ['totalMentahMobile', 'totalMatangMobile', 'totalBusukMobile', 'totalJangkosMobile', 'totalBerondolanMobile'].forEach(id => {
      document.getElementById(id).textContent = id === 'totalBerondolanMobile' ? '0 Kg' : '0';
    });
    return;
  }
  
  let totalMentah = 0, totalMatang = 0, totalBusuk = 0, totalJangkos = 0, totalBerondolan = 0;
  
  dataPanen.forEach((data, index) => {
    totalMentah += data.tandan_mentah;
    totalMatang += data.tandan_matang;
    totalBusuk += data.tandan_busuk;
    totalJangkos += data.jangkos;
    totalBerondolan += data.berondolan;
    
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50 transition duration-150';
    row.innerHTML = `
      <td class="p-3 text-center font-medium text-gray-500">${data.no}</td>
      <td class="p-3 font-semibold text-emerald-700">${data.kelompok_nomor}</td>
      <td class="p-3 text-gray-600">${formatTanggalSingkat(data.tanggal)}</td>
      <td class="p-3 font-medium">${data.nama}</td>
      <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-bold">${data.kavling}</span></td>
      <td class="p-3 text-center">${data.tandan_matang}</td>
      <td class="p-3 text-center">${data.tandan_mentah}</td>
      <td class="p-3 text-center">${data.tandan_busuk}</td>
      <td class="p-3 text-center">${data.jangkos}</td>
      <td class="p-3 text-center font-semibold text-emerald-600">${data.berondolan.toFixed(1)} Kg</td>
      <td class="p-3 text-center">
        <button onclick="hapusData(${index})" class="bg-red-100 text-red-600 hover:bg-red-200 p-1.5 rounded transition" title="Hapus Data">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
  
  totalDataEl.textContent = `${dataPanen.length} Data`;
  document.getElementById('totalMentahMobile').textContent = totalMentah;
  document.getElementById('totalMatangMobile').textContent = totalMatang;
  document.getElementById('totalBusukMobile').textContent = totalBusuk;
  document.getElementById('totalJangkosMobile').textContent = totalJangkos;
  document.getElementById('totalBerondolanMobile').textContent = totalBerondolan.toFixed(1) + ' Kg';
}

function hapusData(index) {
  if (confirm('Hapus data ini?')) {
    dataPanen.splice(index, 1);
    dataPanen.forEach((data, i) => { data.no = i + 1; });
    nomorUrut = dataPanen.length + 1;
    updateTabel();
    simpanData();
  }
}

function resetInput() {
  document.getElementById('nama').value = '';
  document.getElementById('tandan_mentah').value = '';
  document.getElementById('tandan_matang').value = '';
  document.getElementById('tandan_busuk').value = '';
  document.getElementById('jangkos').value = '';
  document.getElementById('berondolan').value = '';
  document.getElementById('kavling_manual').value = '';
  document.getElementById('dropdown_kavling').selectedIndex = 0;
}

function resetForm() {
  if (dataPanen.length === 0) return;
  if (confirm(`Hapus SEMUA data (${dataPanen.length} entri)? Tindakan ini tidak bisa dibatalkan.`)) {
    dataPanen = [];
    nomorUrut = 1;
    document.getElementById('dropdown_kelompok').selectedIndex = 0;
    document.getElementById('infoKelompok').textContent = "";
    kelompokTerpilih = null;
    resetInput();
    updateTabel();
    simpanData();
  }
}

// --- FUNGSI EKSPOR & GITHUB ---
function exportJSON() {
  if (dataPanen.length === 0) { alert("Tidak ada data untuk diekspor."); return; }
  const dataToExport = { lastUpdated: new Date().toISOString(), totalData: dataPanen.length, dataPanen: dataPanen };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `panen_sawit_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
  document.getElementById('statusAksi').innerText = "✓ File JSON berhasil diunduh";
}

function loadGitHubConfig() {
  const saved = localStorage.getItem('githubConfig');
  if (saved) {
    githubConfig = JSON.parse(saved);
    if(document.getElementById('githubUsername')) document.getElementById('githubUsername').value = githubConfig.username || '';
    if(document.getElementById('githubRepo')) document.getElementById('githubRepo').value = githubConfig.repo || 'data-panen-sawit';
    if(document.getElementById('githubToken')) document.getElementById('githubToken').value = githubConfig.token || '';
  }
}

function saveGitHubConfig() {
  githubConfig = {
    username: document.getElementById('githubUsername').value.trim(),
    repo: document.getElementById('githubRepo').value.trim() || 'data-panen-sawit',
    token: document.getElementById('githubToken').value.trim(),
    branch: 'main'
  };
  localStorage.setItem('githubConfig', JSON.stringify(githubConfig));
  document.getElementById('githubStatus').innerText = '✓ Konfigurasi GitHub disimpan';
  document.getElementById('githubStatus').className = "text-sm mt-3 font-medium text-green-600";
}

async function syncToGitHub() {
  if (!githubConfig.username || !githubConfig.token) { alert('Harap isi konfigurasi GitHub terlebih dahulu!'); return; }
  if (dataPanen.length === 0) { alert('Tidak ada data untuk diupload!'); return; }
  
  const status = document.getElementById('githubStatus');
  status.innerText = '⏳ Mengupload data ke GitHub...';
  status.className = "text-sm mt-3 font-medium text-yellow-600";
  
  try {
    const dataToUpload = { lastUpdated: new Date().toISOString(), totalData: dataPanen.length, dataPanen: dataPanen };
    const checkUrl = `https://api.github.com/repos/${githubConfig.username}/${githubConfig.repo}/contents/data.json`;
    
    let sha = null;
    try {
      const checkResponse = await fetch(checkUrl, {
        headers: { 'Authorization': `token ${githubConfig.token}`, 'Accept': 'application/vnd.github.v3+json' }
      });
      if (checkResponse.ok) { const existingFile = await checkResponse.json(); sha = existingFile.sha; }
    } catch (e) {}
    
    const uploadUrl = `https://api.github.com/repos/${githubConfig.username}/${githubConfig.repo}/contents/data.json`;
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(dataToUpload, null, 2))));
    const uploadData = { message: `Update data panen - ${new Date().toLocaleDateString('id-ID')}`, content: content, branch: githubConfig.branch };
    
    if (sha) uploadData.sha = sha;
    
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Authorization': `token ${githubConfig.token}`, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json' },
      body: JSON.stringify(uploadData)
    });
    
    if (response.ok) {
      status.innerText = `✓ Data berhasil diupload ke GitHub!`;
      status.className = "text-sm mt-3 font-medium text-green-600";
    } else {
      const error = await response.json();
      throw new Error(error.message || 'Upload gagal');
    }
  } catch (error) {
    status.innerText = `❌ Gagal upload: ${error.message}`;
    status.className = "text-sm mt-3 font-medium text-red-600";
  }
}

async function syncFromGitHub() {
  const status = document.getElementById('githubStatus');
  let dataUrl = localStorage.getItem('githubDataUrl');
  
  if (!dataUrl && githubConfig.username && githubConfig.repo) {
    dataUrl = `https://raw.githubusercontent.com/${githubConfig.username}/${githubConfig.repo}/main/data.json`;
  }
  if (!dataUrl) { alert('Tidak ada URL data GitHub. Upload data terlebih dahulu.'); return; }
  
  status.innerText = '⏳ Mendownload data dari GitHub...';
  status.className = "text-sm mt-3 font-medium text-yellow-600";
  
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const remoteData = await response.json();
    const rows = remoteData.dataPanen || remoteData;
    
    if (confirm(`Download ${rows.length} data dari GitHub? Data saat ini akan diganti.`)) {
      dataPanen = rows;
      nomorUrut = dataPanen.length > 0 ? dataPanen[dataPanen.length - 1].no + 1 : 1;
      dataPanen.forEach((data, index) => { data.no = index + 1; });
      simpanData();
      updateTabel();
      status.innerText = `✓ ${dataPanen.length} data berhasil didownload`;
      status.className = "text-sm mt-3 font-medium text-green-600";
    } else {
      status.innerText = 'Download dibatalkan';
      status.className = "text-sm mt-3 font-medium text-gray-600";
    }
  } catch (error) {
    status.innerText = `❌ Gagal download: ${error.message}`;
    status.className = "text-sm mt-3 font-medium text-red-600";
  }
}

async function createGitHubRepo() {
  if (!githubConfig.username || !githubConfig.token) { alert('Harap isi username dan token GitHub!'); return; }
  const status = document.getElementById('githubStatus');
  status.innerText = '⏳ Membuat repository GitHub...';
  status.className = "text-sm mt-3 font-medium text-yellow-600";
  
  try {
    const response = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: { 'Authorization': `token ${githubConfig.token}`, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json' },
      body: JSON.stringify({ name: githubConfig.repo, description: 'Database data panen sawit', private: false, auto_init: true })
    });
    if (response.ok) {
      status.innerText = '✓ Repository GitHub berhasil dibuat!';
      status.className = "text-sm mt-3 font-medium text-green-600";
      if (dataPanen.length > 0) setTimeout(() => { syncToGitHub(); }, 2000);
    } else {
      const error = await response.json();
      throw new Error(error.message || 'Gagal membuat repository');
    }
  } catch (error) {
    status.innerText = `❌ Gagal membuat repository: ${error.message}`;
    status.className = "text-sm mt-3 font-medium text-red-600";
  }
}