<template>
  <div class="modal modal-container">
    <div class="modal__backdrop" @click="$emit('close')"></div>
    <form class="modal__form" action="#" @submit.prevent="modalSubmit">
      <div class="modal-accept" v-if="ordered">
        <h2 class="modal-accept__title">Заявка принята</h2>
        <p class="modal-accept__text">Спасибо! Ваше сообщение отправлено!</p>
        <button class="modal-accept__btn" @click="$emit('close')">
          Закрыть окно
        </button>
      </div>
      <div class="modal__main" v-else>
        <div class="modal__content">
          <h3 class="modal__type">Заказать звонок</h3>
          <div class="modal__input-container">
            <label for="login">Ваше имя</label>
            <input
              class="modal__input"
              :class="{ invalid: nameInvalid }"
              type="text"
              id="login"
              placeholder="Имя"
              v-model="name"
              @input="nameInvalid = false"
            />
            <small v-if="nameInvalid">Введите Имя</small>
          </div>
          <div class="modal__input-container">
            <label for="phone">Телефон</label>
            <input
              class="modal__input"
              :class="{ invalid: phoneInvalid }"
              type="tel"
              id="phone"
              placeholder="Телефон"
              v-model="telephone"
              @input="phoneInvalid = false"
            />
            <small v-if="phoneInvalid">Некорректно введен номер</small>
          </div>
        </div>
        <div class="modal__buttons">
          <button type="submit" class="modal__btn">Подтвердить</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      telephone: '+7',
      ordered: false,
      open: false,
      nameInvalid: false,
      phoneInvalid: false
    }
  },
  methods: {
    modalSubmit () {
      if (!this.name.length) {
        this.nameInvalid = true
      }
      if (this.telephone.length < 12) {
        this.phoneInvalid = true
      }
      if (this.isValid) {
        this.ordered = true
      }
    }
  },
  computed: {
    isValid () {
      if (this.name.length > 0 && this.telephone.length === 12) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
html {
  font-size: 10px;
}

label {
  margin-bottom: 1rem;
}

small {
  color: red;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 100;
}

.modal__backdrop {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  cursor: pointer;
}

.modal__form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 550px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(7px);
  border: 1px solid #86ffd3;
  padding: 2.5rem 3rem;
  z-index: 1000;
}

.modal__main {
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.modal-accept {
  min-height: 200px;
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.modal-accept__title {
  font-size: 1.8rem;
  color: #86ffd3;
}

.modal-accept__btn {
  color: inherit;
  letter-spacing: 1px;
  display: inline-flex;
  padding: 1rem 2.25rem;
  background-color: transparent;
  outline: none;
  background-color: #4d987c;
  border: 1px solid #2c604d;
  transition: 0.35s ease;
  cursor: pointer;
}

.modal-accept__btn:hover {
  background-color: #2c604d;
}

.modal__content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.modal__type {
  color: #86ffd3;
  font-size: 1.8rem;
  margin-bottom: 3rem;
}

.modal__input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.modal__input-container.invalid input {
  border: 1px solid red;
}

.modal__input {
  font-size: inherit;
  padding: 1rem 1.5rem;
  transition: 0.35s ease;
  margin-bottom: 0.8rem;
}

.modal__input.invalid {
  border: 1px solid red;
}

.modal__input:focus {
  border: 1px solid #000;
}

.modal__buttons {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;
  justify-items: start;
}

.modal__btn {
  min-width: 120px;
  justify-content: center;
  display: inline-flex;
  padding: 0.8rem 1.7rem;
  color: inherit;
  background-color: #4d987c;
  outline: none;
  border: 1px solid #2c604d;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.35s ease;
}

.modal__btn:hover {
  background-color: #2c604d;
}

@media (max-width: 768px) {
  .modal-accept {
    min-height: 300px;
    justify-content: space-evenly;
  }
  .modal-accept__title {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .modal__backdrop {
    background-color: rgba(0, 0, 0, 0.9);
  }
  .modal__form {
    padding: 1.5rem 2.25rem;
  }
  .modal-accept {
    min-height: 200px;
  }
  .modal__type {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .modal__input-container {
    margin-bottom: 1.2rem;
  }
  .modal__buttons {
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
  .modal__btn--change {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .modal__btn--cancel {
    grid-column-start: 1;
  }
}
</style>
