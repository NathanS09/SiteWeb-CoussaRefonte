<script setup>
  import { ref } from 'vue'
  const visible = ref(true)
</script>

<template>
    <header :class="{'scrolled-nav': scrollPosition}">
        <nav>
            <div class="branding">
            <img src="../assets/logo.webp" alt="logo" class="logo" />
        </div>
        <ul v-show="!mobile" class="navigation">
            <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fas fa-home"></i> Accueil</router-link>
            </li>
            <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fas fa-info-circle"></i> Le club <i class="fas fa-chevron-down"></i></router-link>
            </li>
            <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fas fa-users"></i> Equipes</router-link>
            </li>
            <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fas fa-trophy"></i> Competitions <i class="fas fa-chevron-down"></i></router-link>
            </li>
            <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fas fa-handshake"></i> Partenaires</router-link>
            </li>
            <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fas fa-shopping-cart"></i> Boutique</router-link>
            </li>
            <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fab fa-facebook-f"></i> Page FaceBook</router-link>
            </li>
        </ul>

        <div class="icon">
            <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{'icon-active': mobileNav}"></i>
        </div>
        <transition name="mobile-nav">
            <ul v-show="mobileNav" class="dropdown-nav">
                <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fas fa-home"></i> Accueil</router-link>
            </li>
            <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fas fa-info-circle"></i> Le club <i class="fas fa-chevron-down"></i></router-link>
            </li>
            <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fas fa-users"></i> Equipes</router-link>
            </li>
            <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fas fa-trophy"></i> Competitions <i class="fas fa-chevron-down"></i></router-link>
            </li>
            <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fas fa-handshake"></i> Partenaires</router-link>
            </li>
            <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fas fa-shopping-cart"></i> Boutique</router-link>
            </li>
            <li>
                <router-link class="link" :to="{name: 'Home'}"><i class="fab fa-facebook-f"></i> Page FaceBook</router-link>
            </li>

            <img src="../assets/logo.webp" alt="logo" class="logo" />
        </ul>
        </transition>
        </nav>
        
    </header>
</template>

<script>
  export default {
    name: "navigation",
    data() {
        return {
            mobile: null,
            mobileNav: null,
            scrollPosition: null,
            windowWidth: null,
        };
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", this.checkScreen);
        this.handleScroll();
        this.checkScreen();
    },
    methods: {
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        handleScroll() {
            this.scrollPosition = window.scrollY > 50;
            console.log(this.scrollPosition);
        },
        checkScreen() {
            this.windowWidth = window.innerWidth < 970;
            this.mobile = this.windowWidth;
            if (!this.mobile) {
                this.mobileNav = false;
            }
        },
    },
  }
</script>
<style lang="scss", scoped>

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.8);
    transition: 0.5s ease all;
    color: #fff;
}

nav{
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    transition: 0.5s ease all;
    width: 90%;
    margin: 0 auto;
    @media(min-width: 1140px){
        max-width: 1140px;
    }
    
    ul,
    .link{
        list-style: none;
        text-decoration: none;
        color: #fff;
        font-weight: 500;
    }

    li {
        text-transform: uppercase;
        margin-left: 16px;
        padding: 12px;
    }

    .link {
        font-size: 14px;
        transition: 0.5s ease all;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;

        &:hover {
            color: #00afea;
            border-color: #00afea;
        }
    }

    .branding {
       display: flex;
       align-items: center;

       img {
           width: 50px;
           transition: 0.5s ease all;
       }
    }

    .navigation {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 1;
    }

    .icon {
        display: flex;
        position: absolute;
        right: 24px;
        top: 0;
        align-items: center;
        height: 100%;
        
        i {
            font-size: 24px;
            cursor: pointer;
            transition: 0.8s ease all;
        }
    }

    .icon-active {
        transform: rotate(180deg);
    }

    .dropdown-nav {
        position: fixed;
        width: 100%;
        max-width: 250px;
        top: 0;
        left: 0;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        height: 100%;

        li {
            margin-left: 0;

            .link {
                color: #000;
            }
        }
    }



}

.scrolled-nav {
        background-color: #000;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        nav {
            padding: 8px 0;

            .branding {
                img {
                    width: 40px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
            }
        }
    }

/* Navigation commune à toutes les tailles */
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.link {
  font-size: 14px; /* Taille commune */
  text-transform: uppercase;
  text-decoration: none;
  color: #fff;
  transition: 0.3s ease all;
  padding: 8px 0px; /* Padding identique */

  &:hover {
    color: #00afea;
    border-color: #00afea;
  }
}

li {
  margin: 0; /* Suppression des marges conditionnelles */
}

/* Desktop navigation */
.navigation {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px; /* Espacement horizontal uniforme */
}

/* Mobile dropdown navigation */
.dropdown-nav {
  position: fixed;
  width: 100%; /* Assurez-vous que la largeur est cohérente */
  max-width: 250px;
  top: 0;
  left: 0;
  background-color: #000; /* Uniformité des couleurs */
  display: flex;
  flex-direction: column;
  gap: 8px; /* Espacement vertical uniforme */
  height: 100%;
}

.dropdown-nav li .link {
  color: #fff; /* Couleur adaptée pour mobile */
}

/* Logo branding */
.branding img {
  width: 50px;
  transition: 0.3s ease all;
}

.scrolled-nav .branding img {
  width: 40px; /* Taille du logo réduite au scroll */
}


</style>
