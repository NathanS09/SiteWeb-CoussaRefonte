<script setup>
  import Header from "../components/Header.vue";
  import Footer from "../components/Footer.vue";
  </script>

<template>
    <Header />
    <div class="bureau-container">
      <section v-for="(member, index) in members" :key="index" class="bureau-card">
        <picture>
          <source :srcset="member.image.webp" type="image/webp" />
          <source :srcset="member.image.fallback" />
          <img class="bureau-img" :src="member.image.fallback" :alt="member.name" />
        </picture>
        <h4>{{ member.role }}</h4>
        <p>{{ member.name }} – {{ member.phone }}</p>
      </section>
    </div>
    <Footer />
  </template>
  
  <script>
  export default {
    name: "Bureau",
    data() {
      return {
        members: [
          {
            name: "Nicolas SANCHEZ",
            role: "Co-Président",
            phone: "06 75 91 49 55",
            image: {
              webp: "src/assets/lebureau/nicolas.webp",
              fallback: "src/assets/lebureau/nicolas.jpeg",
            },
          },
          {
            name: "Sébastien PEDOUSSAUT",
            role: "Co-Président",
            phone: "06 82 41 74 46",
            image: {
              webp: "src/assets/lebureau/sebastien.webp",
              fallback: "src/assets/lebureau/sebastien.png",
            },
          },
          {
            name: "William MACIEL",
            role: "Secrétaire",
            phone: "06 82 83 39 03",
            image: {
              webp: "src/assets/lebureau/william.webp",
              fallback: "src/assets/lebureau/william.png",
            },
          },
          {
            name: "Mélanie CAYLET",
            role: "Secrétaire",
            phone: "07 61 46 61 82",
            image: {
              webp: "src/assets/lebureau/default.webp",
              fallback: "src/assets/lebureau/default.png",
            },
          },
          {
            name: "Anick ARTUSO",
            role: "Trésorière",
            phone: "06 19 26 66 57",
            image: {
              webp: "src/assets/lebureau/annick.webp",
              fallback: "src/assets/lebureau/annick.jpg",
            },
          },
          {
            name: "Anaïs IRANZO",
            role: "Trésorière adjointe",
            phone: "06 75 80 82 82",
            image: {
              webp: "src/assets/lebureau/anais.webp",
              fallback: "src/assets/lebureau/anais.png",
            },
          },
          {
            name: "Loïc PAANEN",
            role: "Responsable de l'école de foot",
            phone: "06 40 95 88 03",
            image: {
              webp: "src/assets/lebureau/loic.webp",
              fallback: "src/assets/lebureau/loic.png",
            },
          },
          {
            name: "Gilles REDONDO",
            role: "Intendant",
            phone: "06 07 98 60 90",
            image: {
              webp: "src/assets/lebureau/gilles.webp",
              fallback: "src/assets/lebureau/gilles.png",
            },
          },
          {
            name: "Véronique FERRIEZ",
            role: "Intendante",
            phone: "06 37 89 24 88",
            image: {
              webp: "src/assets/lebureau/veronique.webp",
              fallback: "src/assets/lebureau/veronique.jpg",
            },
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>


  /* === Global Container === */
  .bureau-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    padding: 16px;
  }
  
  /* === Individual Card === */
  .bureau-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 16px;
    max-width: 300px;
    flex: 1;
  }
  
  .bureau-img {
    width: 100%;
    max-width: 150px;
    height: auto;
    border-radius: 50%;
    margin-bottom: 12px;
  }
  
  /* === Typography === */
  h4 {
    margin: 8px 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  
  p {
    margin: 4px 0;
    font-size: 14px;
    color: #555;
  }
  </style>
  