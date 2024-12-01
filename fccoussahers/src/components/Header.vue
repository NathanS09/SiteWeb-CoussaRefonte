<script setup>
  import { ref } from 'vue'
  const visible = ref(true)
</script>

<script>
  export default {
    name: "navigation",
    data() {
        return {
            mobile: null,
            mobileNav: null,
            scrollPosition: null,
            windowWidth: null,
            isClubMenuOpen: false,
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
        },
        checkScreen() {
            this.windowWidth = window.innerWidth < 970;
            this.mobile = this.windowWidth;
            if (!this.mobile) {
                this.mobileNav = false;
            }
        },
        toggleClubMenu() {
            this.isClubMenuOpen = !this.isClubMenuOpen;
        },
    },
  }
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
            <li @mouseenter="toggleClubMenu" @mouseleave="toggleClubMenu">
                <router-link class="link" :to="{name: 'Club'}"><i class="fas fa-info-circle"></i> Le club <i class="fas fa-chevron-down"></i></router-link>
                <ul v-show="isClubMenuOpen" class="dropdown-submenu">
                        <li>
                            <router-link class="link" :to="{name: 'Home'}">Historique</router-link>
                        </li>
                        <li>
                            <router-link class="link" :to="{name: 'Home'}">Bureau</router-link>
                        </li>
                        <li>
                            <router-link class="link" :to="{name: 'Home'}">Staff</router-link>
                        </li>
                    </ul>
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
            <li @click="toggleClubMenu">
                <router-link class="link" :to="{name: 'Club'}"><i class="fas fa-info-circle"></i> Le club <i class="fas fa-chevron-down"></i></router-link>
                <ul v-show="isClubMenuOpen" class="dropdown-submenu">
                    <li>
                        <router-link class="link" :to="{name: 'Home'}">Historique</router-link>
                    </li>
                    <li>
                        <router-link class="link" :to="{name: 'Home'}">Bureau</router-link>
                    </li>
                    <li>
                        <router-link class="link" :to="{name: 'Home'}">Staff</router-link>
                    </li>
                </ul>
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

<style lang="scss", scoped>

/* === HEADER === */
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.8);
    transition: 0.5s ease all;
    color: #fff;

    &.scrolled-nav {
        background-color: #000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
}

/* === NAVIGATION === */
nav {
    display: flex;
    align-items: center;
    padding: 8px 0;
    width: 90%;
    margin: 0 auto;

    .branding {
        display: flex;
        align-items: center;

        img {
            width: 50px;
            transition: 0.5s ease all;

            header.scrolled-nav & {
                width: 40px;
            }
        }
    }

    ul {
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            position: relative;
            padding: 12px;
            text-transform: uppercase;
            font-size: 14px;

            &:hover > .dropdown-submenu {
                display: flex;
            }

            .link {
                display: flex;
                align-items: center;
                color: #fff;
                transition: color 0.3s ease;

                &:hover {
                    color: #00afea;
                }
            }
        }
    }
}

/* === DESKTOP NAVIGATION === */
.navigation {
    flex: 1;
    justify-content: flex-end;
}

/* === MOBILE ICON === */
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

    .icon-active {
        transform: rotate(180deg);
    }
}

/* === MOBILE DROPDOWN === */
.dropdown-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 250px;
    background-color: #000;
    display: flex;
    flex-direction: column;
    height: 100%;

    li {
        margin-left: 0;

        .link {
            color: #fff;
        }
    }

    .dropdown-submenu {
        display: none;
        flex-direction: column;
        background-color: #111;
        padding: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        position: relative;
        top: 0;

        li {
            margin: 8px 0;

            .link {
                color: #fff;
                font-size: 14px;

                &:hover {
                    color: #00afea;
                }
            }
        }
    }
}

/* === SUBMENU === */
.dropdown-submenu {
    position: absolute;
    display: none;
    flex-direction: column;
    background-color: #000;
    padding: 10px;
    top: 100%;
    left: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    li {
        margin: 8px 0;

        .link {
            color: #fff;
            font-size: 14px;

            &:hover {
                color: #00afea;
            }
        }
    }
}

/* === MOBILE NAVIGATION ANIMATION === */
.mobile-nav-enter-active,
.mobile-nav-leave-active {
    transition: transform 0.5s ease, opacity 0.5s ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
    transform: translateX(-250px);
    opacity: 0;
}

.mobile-nav-enter-to,
.mobile-nav-leave-from {
    transform: translateX(0);
    opacity: 1;
}

/* === UTILITIES === */
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.link {
    text-decoration: none;
    text-transform: uppercase;
    color: #fff;
    font-size: 14px;
    transition: color 0.3s ease;

    &:hover {
        color: #00afea;
    }
}


.logo {
    width: 100%;
    transition: 0.5s ease all;

    header.scrolled-nav & {
        width: 40px;
    }
}


</style>
