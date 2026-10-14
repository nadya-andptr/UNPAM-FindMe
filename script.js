/* Detail Data Lowongan Kerja */

const jobs = [
    {
        id: 1,
        title: "Junior Web Developer",
        company: "Nusa Digital (contoh)",
        initials: "ND",
        category: "Teknologi",
        location: "Serang",
        type: "Magang",
        description: "Membantu membuat dan memperbaiki halaman web."
    },
    {
        id: 2,
        title: "Staf Administrasi",
        company: "Cipta Karya (contoh)",
        initials: "CK",
        category: "Administrasi",
        location: "Serang",
        type: "Full-time",
        description: "Membantu mengelola dokumen dan data."
    },
    {
        id: 3,
        title: "Social Media Intern",
        company: "Ruang Kreatif (contoh)",
        initials: "RK",
        category: "Marketing",
        location: "Remote",
        type: "Magang",
        description: "Membantu membuat konten media sosial."
    },
    {
        id: 4,
        title: "Graphic Designer",
        company: "Studio Arah (contoh)",
        initials: "SA",
        category: "Desain",
        location: "Tangerang",
        type: "Freelance",
        description: "Membuat materi visual digital."
    },
    {
        id: 5,
        title: "Customer Service",
        company: "Sahabat Layanan (contoh)",
        initials: "SL",
        category: "Layanan",
        location: "Jakarta",
        type: "Full-time",
        description: "Menjawab pertanyaan pelanggan."
    },
    {
        id: 6,
        title: "Data Entry Part-time",
        company: "Data Kita (contoh)",
        initials: "DK",
        category: "Administrasi",
        location: "Remote",
        type: "Part-time",
        description: "Memasukkan dan memeriksa data."
    },
    {
        id: 7,
        title: "Marketing Assistant",
        company: "Langkah Maju (contoh)",
        initials: "LM",
        category: "Marketing",
        location: "Serang",
        type: "Part-time",
        description: "Mendukung kegiatan promosi."
    },
    {
        id: 8,
        title: "IT Support Intern",
        company: "Solusi Sistem (contoh)",
        initials: "SS",
        category: "Teknologi",
        location: "Tangerang",
        type: "Magang",
        description: "Membantu dukungan teknis dasar."
    },
    {
        id: 9,
        title: "Finance Assistant",
        company: "Finansi Bersama (contoh)",
        initials: "FB",
        category: "Keuangan",
        location: "Jakarta",
        type: "Full-time",
        description: "Membantu pencatatan transaksi."
    }
];


/* Fungsi Keamanan Teks HTML */

function safe(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}


/* Kartu Lowongan Kerja */

function card(job) {
    return `
        <article class="job-card">
            <span class="company-mark">
                ${safe(job.initials)}
            </span>

            <span class="job-badge">
                ${safe(job.type)}
            </span>

            <h3>${safe(job.title)}</h3>

            <p class="company-name">
                ${safe(job.company)}
            </p>

            <div class="job-meta">
                <span>${safe(job.location)}</span>
                <span>${safe(job.category)}</span>
            </div>

            <div class="job-card-bottom">
                <span>Data contoh</span>

                <a href="lowongan.html?keyword=${encodeURIComponent(job.title)}">
                    Lihat →
                </a>
            </div>
        </article>
    `;
}


/* Lowongan Unggulan di Home*/

const featuredJobs = document.querySelector("#featured-jobs");

if (featuredJobs) {
    featuredJobs.innerHTML = jobs
        .slice(0, 3)
        .map(card)
        .join("");
}


/*Form Pencarian di Home */

const homeForm = document.querySelector("#home-search");
const homeKeyword = document.querySelector("#home-keyword");

if (homeForm && homeKeyword) {
    homeForm.addEventListener("submit", event => {
        event.preventDefault();

        const keyword = homeKeyword.value.trim();

        window.location.href =
            "lowongan.html?keyword=" + encodeURIComponent(keyword);
    });
}


/* Filter dan Hasil Pencarian */

const keywordInput = document.querySelector("#keyword");
const categoryFilter = document.querySelector("#category-filter");
const locationFilter = document.querySelector("#location-filter");
const typeFilter = document.querySelector("#type-filter");

const jobList = document.querySelector("#job-results");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");


/* Menampilkan Hasil Pencarian */

function renderJobs() {
    if (!jobList) {
        return;
    }

    const keyword = keywordInput.value.trim().toLowerCase();

    const filteredJobs = jobs.filter(job => {
        const searchableText = `
            ${job.title}
            ${job.company}
            ${job.category}
            ${job.location}
            ${job.type}
            ${job.description}
        `.toLowerCase();

        const matchesKeyword = searchableText.includes(keyword);

        const matchesCategory =
            !categoryFilter.value ||
            job.category === categoryFilter.value;

        const matchesLocation =
            !locationFilter.value ||
            job.location === locationFilter.value;

        const matchesType =
            !typeFilter.value ||
            job.type === typeFilter.value;

        return (
            matchesKeyword &&
            matchesCategory &&
            matchesLocation &&
            matchesType
        );
    });

    // Tampilkan daftar lowongan.
    jobList.innerHTML = filteredJobs.map(job => `
        <article class="job-row">
            <span class="company-mark">
                ${safe(job.initials)}
            </span>

            <div>
                <h3>${safe(job.title)}</h3>

                <p class="company-name">
                    ${safe(job.company)}
                </p>

                <div class="job-meta">
                    <span>${safe(job.location)}</span>
                    <span>${safe(job.category)}</span>
                    <span>${safe(job.type)}</span>
                </div>
            </div>

            <div class="job-row-side">
                <small>Data contoh</small>

                <a href="#" data-id="${job.id}">
                    Detail
                </a>
            </div>
        </article>
    `).join("");

    // Perbarui jumlah hasil pencarian.
    resultCount.textContent =
        `${filteredJobs.length} lowongan contoh`;

    // Tampilkan pesan jika hasil kosong.
    emptyState.hidden = filteredJobs.length > 0;
}


/* Reset Semua Filter */

function resetFilters() {
    if (!keywordInput) {
        return;
    }

    keywordInput.value = "";
    categoryFilter.value = "";
    locationFilter.value = "";
    typeFilter.value = "";

    renderJobs();
}


/* Inisialisasi Halaman Lowongan */

if (jobList) {
    // Pencarian berdasarkan kata kunci.
    keywordInput.addEventListener("input", renderJobs);

    // Filter berdasarkan pilihan.
    categoryFilter.addEventListener("change", renderJobs);
    locationFilter.addEventListener("change", renderJobs);
    typeFilter.addEventListener("change", renderJobs);

    // Tombol reset filter.
    document
        .querySelector("#reset-filters")
        .addEventListener("click", resetFilters);

    document
        .querySelector("#empty-reset")
        .addEventListener("click", resetFilters);


    /* Daftar Lowongan */

    jobList.addEventListener("click", event => {
        const detailLink = event.target.closest("[data-id]");

        if (!detailLink) {
            return;
        }

        event.preventDefault();

        const jobId = Number(detailLink.dataset.id);

        const selectedJob = jobs.find(job => job.id === jobId);

        if (!selectedJob) {
            return;
        }

        alert(`
Detail lowongan (data contoh)

${selectedJob.title}
${selectedJob.company}

Lokasi: ${selectedJob.location}
Tipe: ${selectedJob.type}

${selectedJob.description}

Ini bukan lowongan resmi.
        `.trim());
    });


    /* Membaca Parameter URL */

    const urlParams = new URLSearchParams(window.location.search);

    keywordInput.value = urlParams.get("keyword") || "";
    categoryFilter.value = urlParams.get("category") || "";

    // Tampilkan hasil sesuai parameter URL.
    renderJobs();
}