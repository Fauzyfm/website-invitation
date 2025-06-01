
// Countdown
const eventDate = new Date(2025, 5, 14, 10, 0, 0); // 14 Juni 2025, 10:00

document.addEventListener("DOMContentLoaded", function () {
  function updateCountdown() {
    const now = new Date();
    const timeDiff = eventDate - now;

    let days = 0, hours = 0, minutes = 0, seconds = 0;

    if (timeDiff > 0) {
      seconds = Math.floor(timeDiff / 1000) % 60;
      minutes = Math.floor(timeDiff / 1000 / 60) % 60;
      hours = Math.floor(timeDiff / (1000 * 60 * 60)) % 24;
      days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    }

    document.querySelectorAll(".day").forEach(el => {
      if (el) el.textContent = days;
    });
    document.getElementById("hour").textContent = hours;
    document.getElementById("minute").textContent = minutes;
    document.getElementById("second").textContent = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});


// update tahun pada footer
document.addEventListener("DOMContentLoaded", function () {
  const tahunSekarang = new Date().getFullYear();
  const tahunEl = document.getElementById("tahun");
  if (tahunEl) tahunEl.textContent = tahunSekarang;
});


// RSVP
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const namaInput = document.getElementById('nama');
    const alamatInput = document.getElementById('alamat');
    const radioInputs = document.querySelectorAll('input[name="konfirmasi"]');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nama = namaInput.value.trim();
        const alamat = alamatInput.value.trim();
        let konfirmasi = null;

        // Cek radio button yang dipilih
        for (const radio of radioInputs) {
            if (radio.checked) {
                konfirmasi = radio.nextElementSibling.textContent;
                break;
            }
        }

        // Validasi
        if (!nama) {
            alert('Nama wajib diisi.');
            return;
        }

        if (!konfirmasi) {
            alert('Silakan pilih jumlah kehadiran.');
            return;
        }

        // Format pesan
        const pesan = `Halo kak Laras dan Fikri\n\nTerimakasih atas undangan yang telah di berikan.\nKami dengan senang hati mengonfirmasi kehadiran pada acara Pernikahan Kalian. \n\nNama: ${nama}\n\nAlamat: ${alamat || '-'}\n\nKonfirmasi: ${konfirmasi}\n\n\nTerimakasih, Selamat Menempuh Kehidupan Baru😊`;

        // Ganti nomor WA berikut dengan nomor kamu (pakai format internasional, tanpa "+" dan tanpa spasi)
        const nomorWA = '6281389437086';

        // Buat URL WhatsApp
        const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

        // Buka WhatsApp
        window.open(url, '_blank');
    });
});


// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCunB7igfCEI2Q57uU38SJ4En32TnEvaXI",
  authDomain: "ucapan-section-web-invit-03.firebaseapp.com",
  databaseURL: "https://ucapan-section-web-invit-03-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ucapan-section-web-invit-03",
  storageBucket: "ucapan-section-web-invit-03.appspot.com",
  messagingSenderId: "769415452530",
  appId: "1:769415452530:web:9cf991bc3d9becac3d2feb",
  measurementId: "G-4VSZ8KYGXB"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Ambil elemen DOM
const formUcapan = document.getElementById('form-ucapan');
const inputNama = document.getElementById('nama-ucapan');
const inputUcapan = document.getElementById('ucapan-isi');
const boxUcapan = document.getElementById('box-ucapan');

// Submit form
formUcapan.addEventListener('submit', (e) => {
  e.preventDefault();

  const nama = inputNama.value.trim();
  const ucapan = inputUcapan.value.trim();

  if (!nama || !ucapan) {
    alert('Nama dan Ucapan tidak boleh kosong!');
    return;
  }

  const tanggal = new Date().toLocaleDateString('id-ID');

  // Kirim data ke Firebase
  const ucapanRef = ref(db, 'ucapan');
  push(ucapanRef, { nama, ucapan, tanggal });

  // Reset form
  inputNama.value = '';
  inputUcapan.value = '';
});

// Render ucapan secara real-time dari Firebase
function renderUcapanRealtime() {
  const ucapanRef = ref(db, 'ucapan');

  onValue(ucapanRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      boxUcapan.innerHTML = `<p class="text-slate-500 text-center text-[10px] mt-[20px]">Belum ada ucapan yang diberikan</p>`;
      return;
    }

    // Ubah data menjadi array dan urutkan berdasarkan waktu
    const ucapanArray = Object.values(data);

    // Buat HTML
    let html = '';
    ucapanArray.reverse().forEach(item => {
      html += `
        <div class="p-2 border-b border-gray-300 last:border-none">
          <p class="font-semibold text-merahAti">${item.nama}</p>
          <p class="text-slate-700 text-sm mb-1">${item.ucapan}</p>
          <p class="text-[10px] text-slate-400 italic">${item.tanggal}</p>
        </div>
      `;
    });

    boxUcapan.innerHTML = html;
  });
}

// Jalankan saat halaman dimuat
renderUcapanRealtime();


// Ambil parameter dari URL
const params = new URLSearchParams(window.location.search);
const namaTamu = params.get('to');

// Tampilkan nama jika ada
if (namaTamu) {
  document.getElementById('tamu-undangan').textContent = decodeURIComponent(namaTamu);
}

// open invitation
document.addEventListener("DOMContentLoaded", function() {
  // Lock scroll on page load
  document.body.classList.add("overflow-hidden");

  // Unlock scroll when button is clicked
  document.getElementById("open-invitation").addEventListener("click", function() {
      document.getElementById("surat").classList.remove('hidden')
      document.body.classList.remove("overflow-hidden");
  });
});

// membuat website ketika di refresh langsung ke page pertama/halaman atas
window.onload = function () {
    window.scrollTo(0, 0);
};
  
// Hapus fragment dari URL saat halaman dimuat
window.addEventListener('load', function () {
    if (window.location.hash) {
        // Simpan fragment untuk digunakan jika diperlukan
        const fragment = window.location.hash;
  
        // Hapus fragment dari URL
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
  
        // Optional: jika ingin langsung scroll ke posisi fragment setelah fragment dihapus
        // Uncomment baris di bawah ini
        // document.querySelector(fragment)?.scrollIntoView();
    }
});

// music
const musicButton = document.getElementById('music')
const musicAudio = document.getElementById('music-audio') 

const disk = document.getElementById('disk')
const play = document.getElementById('play')

document.getElementById('open-invitation').addEventListener('click', function () {
  musicButton.classList.remove('hidden')
  musicButton.classList.add('fade-up')
  musicAudio.play()
})

musicButton.addEventListener('click', function () {
  if (musicAudio.paused) {
      musicAudio.play()
      disk.classList.remove('hidden')
      play.classList.add('hidden')
      musicButton.classList.add('rotate-box')
    } else {
      musicAudio.pause()
      play.classList.remove('hidden')
      disk.classList.add('hidden')
      musicButton.classList.remove('rotate-box')
    }
    isPlaying = !isPlaying;
})