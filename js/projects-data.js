/*
  DATA PROYEK
  1. Tambahkan website baru dengan menyalin objek tipe "website".
  2. url: alamat deployment HTTPS yang akan ditampilkan di iframe.
  3. github: link repository.
  4. Jika iframe diblokir oleh website tujuan, isi screenshot dengan URL gambar langsung.
  5. Untuk game, isi images dengan tepat enam URL gambar langsung.
*/
window.PROJECTS = [

  // 1. WEBSITE LEARNING APPLICATION
  {
    id: "learning-01",
    type: "learning",
    title: "Game Bobo",
    category: "Learning Application",
    description: "Media interaktif untuk membantu siswa mengeksplorasi konsep Fungsi secara mandiri.",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://layinatulj.github.io/game_bobo/",
    github: "https://layinatulj.github.io/game_bobo/",
    screenshot: ""
  },

  {
    id: "learning-02",
    type: "learning",
    title: "Misteri Pak Taro",
    category: "Learning Application",
    description: "Media Interaktif untuk mempelajari Himpunan, mengenal Computational Thinking, menyelidiki Misteri Pak Taro, mengerjakan 21 soal HOTS, lalu menutup misi dengan refleksi.",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://layinatulj.github.io/himpunan/",
    github: "https://layinatulj.github.io/himpunan/",
    screenshot: ""
  },

  {
    id: "learning-03",
    type: "learning",
    title: "Microsoft Word",
    category: "Learning Application",
    description: "Media pembelajaran interaktif materi Microsoft Word yang berisi ringkasan materi, posttest 21 soal dengan nilai otomatis, dan refleksi pembelajaran (refleksi diri, HOTS, kepuasan, dan exit ticket 3-2-1). Hasil siswa tersimpan otomatis di Google Sheets.",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://layinatulj.github.io/mword/",
    github: "https://layinatulj.github.io/mword/",
    screenshot: ""
  },

  {
    id: "learning-04",
    type: "learning",
    title: "Microsoft powerpoint",
    category: "Learning Application",
    description: "Media pembelajaran interaktif untuk mempelajari fitur Microsoft PowerPoint langsung dari browser, tanpa perlu membuka aplikasinya. Dilengkapi simulasi fitur, tantangan kelompok, serta Pretest dan Posttest online yang bisa dikerjakan langsung.",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://layinatulj.github.io/mppt/",
    github: "https://layinatulj.github.io/mppt/",
    screenshot: ""
  },

  {
    id: "learning-05",
    type: "learning",
    title: "Flora Fauna Nusantara",
    category: "Learning Application",
    description: "Website untuk belajar Flora dan Fauna Nusantara",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://layinatulj.github.io/flofain/",
    github: "https://layinatulj.github.io/flofain/",
    screenshot: ""
  },

  {
    id: "learning-06",
    type: "learning",
    title: "Tirtaloka",
    category: "Learning Application",
    description: "Website untuk belajar PKn",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://layinatulj.github.io/tirtaloka-pkn/",
    github: "https://layinatulj.github.io/tirtaloka-pkn/",
    screenshot: ""
  },

  // 2. WEBSITE PORTOFOLIO
  {
    id: "portfolio-01",
    type: "portfolio",
    title: "Website Portofolio PPG",
    category: "Portfolio Website",
    description: "Website portofolio digital yang menampilkan profil Selama Melaksanakan PPL di SMP Lab UM, media pembelajaran yang sudah diciptakan, dan karya inovasi selama mengikuti PPG.",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://layinatulj.github.io/portof-ppg/",
    github: "https://layinatulj.github.io/portof-ppg/",
    screenshot: ""
  },

  {
    id: "portfolio-02",
    type: "portfolio",
    title: "Website Portofolio PPL Terbimbing",
    category: "Portfolio Website",
    description: "Website portofolio digital yang menampilkan profil, pengalaman mengajar, perangkat pembelajaran, media pembelajaran Selama PPL Terbimbing",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://layinatulj.github.io/portof-pplt/",
    github: "https://layinatulj.github.io/portof-pplt/",
    screenshot: ""
  },

  {
    id: "portfolio-03",
    type: "portfolio",
    title: "Website Portofolio Mata Kuliah CT (Computational Thinking)",
    category: "Portfolio Website",
    description: "Website portofolio digital yang menampilkan profil, Dokumen, Infografis, Artefak, dan Refleksi Mata Kuliah",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://layinatulj.github.io/portof-ct/",
    github: "https://layinatulj.github.io/portof-ct/",
    screenshot: ""
  },

  {
    id: "portfolio-04",
    type: "portfolio",
    title: "Website Portofolio PPL Mandiri",
    category: "Portfolio Website",
    description: "Website portofolio digital yang menampilkan profil, pengalaman mengajar, perangkat pembelajaran, media pembelajaran, dan karya inovasi selama mengikuti PPG.",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://layinatulj.github.io/portof-pplm/",
    github: "https://layinatulj.github.io/portof-pplm/",
    screenshot: ""
  },

  {
    id: "portfolio-05",
    type: "portfolio",
    title: "Website Portofolio Seminar",
    category: "Portfolio Website",
    description: "Website portofolio digital yang menampilkan profil, Artefak Pembelajaran Selama PPG, Refleksi, dan Karya Inovasi",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://layinatulj.github.io/portof-seminar/",
    github: "https://layinatulj.github.io/portof-seminar/",
    screenshot: ""
  },

  // 3. GAME EDUKASI
  {
  id: "game-01",
  type: "game",
  title: "Game Detektif Data",
  category: "Educational Game",
  description: "Game Detektif Data di mana setiap kelompok berperan sebagai detektif untuk menyelesaikan permasalahan.",
  usage: "Siswa dibentuk menjadi beberapa kelompok, kemudian dibagikan LKPD. Setelah itu, siswa mengerjakan misi secara bertahap. Siswa tidak dapat melanjutkan ke misi berikutnya jika jawaban masih salah.",
  audience: "Siswa SMP kelas VIII",
  platform: "LKPD, browser, dan aplikasi Microsoft Excel",
  images: [
    "https://drive.google.com/thumbnail?id=1u8t_T1VeJUPdgtexbigS4UJpyypNaUZ1&sz=w1200",
    "https://drive.google.com/thumbnail?id=1dv5oxR1JLLu7HPJgmvFdnJOLRju7J0H1&sz=w1200",
    "https://drive.google.com/thumbnail?id=1HsDEuxGYipCOorYCSziKa0k1uk1FkBpp&sz=w1200",
    "https://drive.google.com/thumbnail?id=1ilKijitsge_h1wTd6IWuF-VabscgSxRI&sz=w1200",
    "https://drive.google.com/thumbnail?id=1LRqBFGWxkFVFnLmxyO5fZ8JUuXuqBTPg&sz=w1200",
    "https://drive.google.com/thumbnail?id=1ApqxE5u8Ly_DOUemdOzXaxMHNyp11wkL&sz=w1200"
  ]
}

];