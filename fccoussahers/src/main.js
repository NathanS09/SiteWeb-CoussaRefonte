import { createApp } from 'vue'
import './style.css'
import App from './pages/App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import router from './router';

const app = createApp(App)
app.use(PrimeVue, { ripple: true, theme: Aura });
app.use(router);

app.component('Button', Button);
app.component('InputText', InputText);
app.component('FloatLabel', FloatLabel);

app.mount('#app');
