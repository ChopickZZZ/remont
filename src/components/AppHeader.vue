<template>
  <teleport to="#app">
    <AppModal v-if="isOpen" @close="modalClose" />
  </teleport>
  <header class="header">
    <div class="header__inner container">
      <router-link to="/" class="header__logo">
        <img
          src="https://ekaterinburg.spravka.ru/uploads/0/0/UG/DRaligq9FvKGWRpw9ALIWFoaoGBJ8d/original_50caabd7a0f302fc3e000011_5bab1f0aac29d.jpg"
          alt="Logo"
        />
      </router-link>
      <div class="header__info">
        <p class="header__address">Стерлитамак улица Гоголя 45/4</p>
        <div class="header__time">09:00 - 20:00 ежедневно</div>
      </div>
      <div class="header__info">
        <p class="header__address">Салават улица Ленина 29</p>
        <div class="header__time">08:00 - 20:00 ежедневно</div>
      </div>
      <a class="header__vk" target="_blank" href="https://vk.com/id484146541">
        <img
          src="https://vodos-service.ru/images/social/vk.svg"
          alt="Vk Link"
        />
      </a>
      <button class="header__button btn" @click="modalOpen">
        Заказать звонок
      </button>
    </div>
  </header>
</template>

<script>
import AppModal from './AppModal.vue'
export default {
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    modalOpen () {
      this.isOpen = true
      document.body.style.overflow = 'hidden'
    },
    modalClose () {
      this.isOpen = false
      document.body.style.overflow = 'auto'
    }
  },
  components: { AppModal }
}
</script>

<style lang="scss" scoped>
.header {
  min-height: 100px;
  width: 100%;
  padding: 25px 0;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  width: 200px;
  height: 100px;
  cursor: pointer;
}

.header__logo img {
  height: 100%;
  width: 105%;
  object-fit: cover;
}

.header__address {
  margin-bottom: 0.5rem;
}

.header__time {
  color: #86ffd3;
}

.header__vk {
  max-width: 50px;
  max-height: 50px;
  transition: 0.3s ease;
}

.header__vk:hover {
  transform: scale(1.1);
}

.header__vk img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header__button {
  font-size: 14px;
  padding: 0.5rem 1.5rem;
  color: #86ffd3;
  background-color: transparent;
  border: 1px solid #86ffd3;
  border-radius: 3px;
  letter-spacing: 0.5px;
  letter-spacing: 1px;
  transition: 0.3s ease;
}

.header__button:hover {
  color: #000;
  background-color: #86ffd3;
  transform: scale(1.1);
}
</style>
