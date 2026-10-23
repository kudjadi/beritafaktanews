// Variabel Global
let dataPanen = [];
let nomorUrut = 1;
let kelompokTerpilih = null;

// DATA KELOMPOK, KAVLING, & HARGA
// Format: "NAMA KAVLING": harga_per_tandan
const dataKelompok = {
  37: { 
    nama: "KHOIRUL HUDA", 
    kavling: {
      "SURANTO 908": 900,
      "WANDA 851": 950,
      "EGO NOFRI ADI 852": 900,
      "ASEP PRIHATA 853": 1000
    } 
  },
  38: { 
    nama: "SLAMET", 
    kavling: {
      "ARIS FAUJI 875": 900, 
      "KHOIRUDIN 876": 950, 
      "SUKIMIN 877": 900
    } 
  },
  39: { nama: "NOVI ISWANTO", kavling: { "WAHYU GUNAWAN 882": 900, "WANDA 950": 900, "NURFAHRUDIN 951": 950 } },
  40: { nama: "SUWAT", kavling: { "PORWANTO 1006": 900, "ADI SUPRAYITNO 1007": 900 } },
  41: { nama: "EKO WAHYUDI", kavling: { "ADI PURNAWAN 995": 950, "SUKIMIN 994": 900, "KARDI 993": 900 } },
  42: { nama: "EDI SUPARNO", kavling: { "IKSAN YULIANTO 1042": 900, "SUPARDI 1043": 950 } },
  43: { nama: "BUDIONO", kavling: { "JUWANDA 1067": 900, "RUDI KURNIAWAN 1068": 950 } },
  44: { nama: "AGUS SISWANTO", kavling: { "ARIS FAUZI 1071": 900, "KARDI 1072": 900 } },
  45: { nama: "DEDI ARDIANSYAH", kavling: { "ARIS ARDIANSYAH 1114": 950, "KARDI 1115": 900 } },
  46: { nama: "SUPARDI", kavling: { "SUKIMIN 1118": 900, "ARI SUPARMANTO 1119": 900 } },
  47: { nama: "NGATIJO", kavling: { "ARIS FAUJI 1167": 950, "ASEP PRIHATA 1168": 1000 } },
  48: { nama: "RUKITO", kavling: { "IRIANTO 1171": 900, "SULTAN SRINANTO 1172": 900 } }
};

// KONFIGURASI GITHUB
let githubConfig = { username: '', repo: 'data-panen-sawit', token: '', branch: 'main' };

// DATA CONTOH
const dataContoh = [
  { no: 1, kelompok_nomor: "37", kelompok_nama: "KHOIRUL HUDA", tanggal: "2026-10-22", nama: "SURANTO", kavling: "SURANTO 908", tandan_mentah: 0, tandan_matang: 15, tandan_busuk: 1, jangkos: 0, berondolan: 5.5, total_tandan: 16, harga: 900, total_rp: 14400 },
  { no: 2, kelompok_nomor: "38", kelompok_nama: "SLAMET", tanggal: "2026-10-22", nama: "ARIS", kavling: "ARIS FAUJI 875", tandan_mentah: 2, tandan_matang: 20, tandan_busuk: 0, jangkos: 1, berondolan: 10.0, total_tandan: 22, harga: 900, total_rp: 19800 }
];

// --- INISIALISASI ---
window.onload = function() {
  const today = new Date().toISOString().split('T')[0];
  const tglEl = document.getElementById('tanggal');
  if (tglEl) tglEl.value = today;

  // Isi Dropdown Kelompok (Form & Filter)
  const dropdownKelompok = document.getElementById('dropdown_kelompok');
  const filterKelompok = document.getElementById('filter_kelompok');
  
  if (dropdownKelompok) {
    for (const key in dataKelompok) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = `Kel. ${key} - ${dataKelompok[key].nama}`;
      dropdownKelompok.appendChild(option);
    }
  }

  if (filterKelompok) {
    for (const key in dataKelompok) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = `Kel. ${key}`;
      filterKelompok.appendChild(option);
    }
  }

  muatData();
  loadGitHubConfig();
};

// --- FUNGSI DATA LOKAL ---
function muatData() {
  const saved = localStorage.getItem('dataPanenSawit');
  if (!saved || saved === "[]" || saved === "") {
    dataPanen = [...dataContoh];
    localStorage.setItem('dataPanenSawit', JSON.stringify(dataPanen)); 
  } else {
    dataPanen = JSON.parse(saved);
  }
  nomorUrut = dataPanen.length > 0 ? dataPanen[dataPanen.length - 1].no + 1 : 1;
  filterTabel();
}

function simpanData() {
  localStorage.setItem('dataPanenSawit', JSON.stringify(dataPanen));
}

// --- LOGIKA FORM ---
function updateDataKelompok() {
  const selectedValue = document.getElementById('dropdown_kelompok').value;
  const dropdownKavling = document.getElementById('dropdown_kavling');
  
  dropdownKavling.innerHTML = '<option value="">-- Pilih Kavling --</option>';
  document.getElementById('harga').value = ''; // Reset harga
  
  if (selectedValue && dataKelompok[selectedValue]) {
    kelompokTerpilih = selectedValue;
    
    // Isi kavling & masukkan harga ke dalam atribut data
    for (const kavling in dataKelompok[selectedValue].kavling) {
      const option = document.createElement('option');
      option.value = kavling;
      option.textContent = kavling;
      option.setAttribute('data-harga', dataKelompok[selectedValue].kavling[kavling]);
      dropdownKavling.appendChild(option);
    }
  } else {
    kelompokTerpilih = null;
  }
}

function updateHarga() {
  const dropdown = document.getElementById('dropdown_kavling');
  const selectedOption = dropdown.options[dropdown.selectedIndex];
  const harga = selectedOption.getAttribute('data-harga') || '';
  document.getElementById('harga').value = harga;
}

function tambahData() {
  const selectedKavling = document.getElementById('dropdown_kavling').value;
  const manualKavling = document.getElementById('kavling_manual').value.trim();
  const kavlingValue = selectedKavling || manualKavling;
  
  if (!kelompokTerpilih) return alert('Pilih kelompok terlebih dahulu!');
  if (!kavlingValue) return alert('Pilih atau isi nomor kavling!');
  if (!document.getElementById('nama').value.trim()) return alert('Isi nama pemanen!');

  const tMatang = parseInt(document.getElementById('tandan_matang').value) || 0;
  const tMentah = parseInt(document.getElementById('tandan_mentah').value) || 0;
  const tBusuk = parseInt(document.getElementById('tandan_busuk').value) || 0;
  const jkg = parseInt(document.getElementById('jangkos').value) || 0;
  const brdln = parseFloat(document.getElementById('berondolan').value) || 0;
  const harga = parseFloat(document.getElementById('harga').value) || 0;
  
  const totalTandan = tMatang + tMentah + tBusuk;
  const totalRp = totalTandan * harga;

  const data = {
    no: nomorUrut,
    kelompok_nomor: kelompokTerpilih,
    kelompok_nama: dataKelompok[kelompokTerpilih].nama,
    tanggal: document.getElementById('tanggal').value,
    nama: document.getElementById('nama').value.trim(),
    kavling: kavlingValue,
    tandan_mentah: tMentah,
    tandan_matang: tMatang,
    tandan_busuk: tBusuk,
    jangkos: jkg,
    berondolan: brdln,
    total_tandan: totalTandan,
    harga: harga,
    total_rp: totalRp
  };

  dataPanen.push(data);
  nomorUrut++;
  
  filterTabel(); // Render ulang dengan filter
  simpanData();
  resetInput();
  
  const statusForm = document.getElementById('statusForm');
  statusForm.innerText = `✓ Data berhasil ditambahkan!`;
  setTimeout(() => { statusForm.innerText = ""; }, 2000);
}

// --- TAMPILAN TABEL & FILTER ---
function filterTabel() {
  const filterVal = document.getElementById('filter_kelompok').value;
  const tbody = document.getElementById('tabelBody');
  const totalDataEl = document.getElementById('totalData');
  
  tbody.innerHTML = '';
  
  // Filter data berdasarkan kelompok
  const filteredData = filterVal 
    ? dataPanen.filter(d => d.kelompok_nomor === filterVal) 
    : dataPanen;
  
  if (filteredData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="14" class="p-4 text-center text-gray-500">Tidak ada data.</td></tr>`;
    totalDataEl.textContent = "0 data";
    return;
  }
  
  let tMatang = 0, tMentah = 0, tBusuk = 0, tRp = 0;
  
  filteredData.forEach((data, index) => {
    // Cari index asli di array utama untuk fungsi hapus
    const originalIndex = dataPanen.findIndex(d => d.no === data.no);
    
    tMatang += data.tandan_matang;
    tMentah += data.tandan_mentah;
    tBusuk += data.tandan_busuk;
    tRp += (data.total_rp || 0);
    
    const totalTandan = data.total_tandan || (data.tandan_matang + data.tandan_mentah + data.tandan_busuk);
    const totalRp = data.total_rp || 0;
    
    const row = document.createElement('tr');
    row.className = index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100';
    row.innerHTML = `
      <td class="p-2 text-center">${data.no}</td>
      <td class="p-2 col-hide-sm">${data.kelompok_nomor}</td>
      <td class="p-2 col-hide-md">${formatTanggalSingkat(data.tanggal)}</td>
      <td class="p-2 truncate max-w-[60px]" title="${data.nama}">${data.nama.split(' ')[0]}</td>
      <td class="p-2 bg-green-50 text-center font-medium truncate max-w-[80px]" title="${data.kavling}">${data.kavling.split(' ')[1] || data.kavling}</td>
      <td class="p-2 text-center">${data.tandan_matang}</td>
      <td class="p-2 text-center col-hide-sm">${data.tandan_mentah}</td>
      <td class="p-2 text-center">${data.tandan_busuk}</td>
      <td class="p-2 text-center col-hide-sm">${data.jangkos}</td>
      <td class="p-2 text-center">${data.berondolan}</td>
      <td class="p-2 text-center font-bold">${totalTandan}</td>
      <td class="p-2 text-right">${data.harga || 0}</td>
      <td class="p-2 bg-yellow-50 text-right font-bold text-yellow-700">${totalRp.toLocaleString('id-ID')}</td>
      <td class="p-2 text-center">
        <button onclick="hapusData(${originalIndex})" class="text-red-500 hover:text-red-700 font-bold px-2" title="Hapus">×</button>
      </td>
    `;
    tbody.appendChild(row);
  });
  
  totalDataEl.textContent = `${filteredData.length} data`;
  document.getElementById('totalMatangMobile').textContent = tMatang;
  document.getElementById('totalMentahMobile').textContent = tMentah;
  document.getElementById('totalBusukMobile').textContent = tBusuk;
  document.getElementById('totalRpMobile').textContent = 'Rp ' + tRp.toLocaleString('id-ID');
}

// --- UTILITAS ---
function hapusData(index) {
  if (confirm('Hapus data ini?')) {
    dataPanen.splice(index, 1);
    dataPanen.forEach((data, i) => { data.no = i + 1; });
    nomorUrut = dataPanen.length + 1;
    filterTabel();
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
  document.getElementById('harga').value = '';
  document.getElementById('nama').focus();
}

function resetForm() {
  if (dataPanen.length === 0) return;
  if (confirm(`Hapus semua data (${dataPanen.length} entri)?`)) {
    dataPanen = [];
    nomorUrut = 1;
    document.getElementById('dropdown_kelompok').selectedIndex = 0;
    resetInput();
    filterTabel();
    simpanData();
  }
}

function formatTanggalSingkat(tanggal) {
  if (!tanggal) return '-';
  const date = new Date(tanggal);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
}

// --- EKSPOR & GITHUB ---
function exportJSON() {
  if (dataPanen.length === 0) return alert("Tidak ada data.");
  
  const dataToExport = {
    lastUpdated: new Date().toISOString(),
    totalData: dataPanen.length,
    dataPanen: dataPanen
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", `panen_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  
  const statusAksi = document.getElementById('statusAksi');
  statusAksi.innerText = "✓ File JSON diunduh";
  setTimeout(() => { statusAksi.innerText = ""; }, 3000);
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
  const status = document.getElementById('githubStatus');
  status.innerText = '✓ Tersimpan';
  setTimeout(() => { status.innerText = ''; }, 3000);
}

async function syncToGitHub() {
  if (!githubConfig.username || !githubConfig.token) return alert('Isi konfigurasi GitHub di bagian Pengaturan!');
  if (dataPanen.length === 0) return alert('Data kosong!');
  
  const status = document.getElementById('githubStatus');
  if(status) status.innerText = '⏳ Uploading...';
  
  try {
    const dataToUpload = { lastUpdated: new Date().toISOString(), totalData: dataPanen.length, dataPanen: dataPanen };
    const checkUrl = `https://api.github.com/repos/${githubConfig.username}/${githubConfig.repo}/contents/data.json`;
    
    let sha = null;
    try {
      const checkResponse = await fetch(checkUrl, {
        headers: { 'Authorization': `token ${githubConfig.token}`, 'Accept': 'application/vnd.github.v3+json' }
      });
      if (checkResponse.ok) {
        const existingFile = await checkResponse.json();
        sha = existingFile.sha;
      }
    } catch (e) {}

    const content = btoa(unescape(encodeURIComponent(JSON.stringify(dataToUpload, null, 2))));
    const uploadData = {
      message: `Update data panen - ${new Date().toLocaleDateString('id-ID')}`,
      content: content,
      branch: githubConfig.branch
    };
    if (sha) uploadData.sha = sha;

    const response = await fetch(checkUrl, {
      method: 'PUT',
      headers: { 'Authorization': `token ${githubConfig.token}`, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json' },
      body: JSON.stringify(uploadData)
    });

    if (response.ok) {
      if(status) {
        status.innerText = '✓ Berhasil diupload!';
        status.className = "text-center text-xs text-green-600 font-medium mt-2";
      }
      localStorage.setItem('githubDataUrl', `https://raw.githubusercontent.com/${githubConfig.username}/${githubConfig.repo}/main/data.json`);
    } else {
      throw new Error('Upload gagal');
    }
  } catch (error) {
    if(status) {
      status.innerText = `❌ Gagal: ${error.message}`;
      status.className = "text-center text-xs text-red-600 font-medium mt-2";
    }
  }
  setTimeout(() => { if(status) status.innerText = ''; }, 3000);
}