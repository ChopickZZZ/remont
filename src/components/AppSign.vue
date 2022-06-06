<template>
  <main class="page">
    <div class="sign container">
      <div class="sign__done done" v-if="signed">
        <h1 class="done__title">Вы успешно записались!</h1>
        <h2 class="done__info">
          Имя: <span>{{ name }}</span>
        </h2>
        <h2 class="done__info">
          Телефон: <span>{{ phone }}</span>
        </h2>
        <h2 class="done__info">
          Дата: <span>{{ date }}</span>
        </h2>
        <h2 class="done__info">
          Время: <span>{{ time }}</span>
        </h2>
        <button class="done__btn" @click="clear">Перезаписаться</button>
      </div>
      <div class="sign__content" v-else>
        <h1 class="sign__title">Запись:</h1>
        <form action="#" class="sign__form form" @submit.prevent="formHandler">
          <div class="form__date date">
            <h2 class="date__title" :class="{ invalid: dateBtnInvalid }">
              Выберите дату*
            </h2>
            <button
              class="date__btn"
              v-for="date in dates"
              :key="date"
              @click.prevent="addDate(date, $event)"
            >
              {{ date }}
            </button>
          </div>
          <div class="form__time time">
            <h2 class="time__title" :class="{ invalid: timeBtnInvalid }">
              Выберите время*
            </h2>
            <div class="time__blocks">
              <div class="time__block">
                <h3 class="time__sub-title">День</h3>
                <button
                  class="time__btn"
                  v-for="time in dayTime"
                  :key="time"
                  @click.prevent="setTime(time, $event)"
                >
                  {{ time }}
                </button>
              </div>
              <div class="time__block">
                <h3 class="time__sub-title">Вечер</h3>
                <button
                  class="time__btn"
                  v-for="time in eveningTime"
                  :key="time"
                  @click.prevent="setTime(time, $event)"
                >
                  {{ time }}
                </button>
              </div>
            </div>
          </div>
          <div class="form__contacts contacts">
            <div class="contacts__block">
              <label class="contacts__label" for="name">Имя</label>
              <input
                class="contacts__input"
                :class="{ invalid: nameInvalid }"
                type="text"
                v-model="name"
                @input="nameInvalid = false"
              />
              <small v-if="nameInvalid">Введите Имя</small>
            </div>
            <div class="contacts__block">
              <label class="contacts__label" for="name">Телефон</label>
              <input
                class="contacts__input"
                :class="{ invalid: phoneInvalid }"
                type="tel"
                v-model="phone"
                @input="phoneInvalid = false"
              />
              <small v-if="phoneInvalid">Некорректный номер</small>
            </div>
            <button type="submit" class="contacts__btn">Отправить</button>
          </div>
        </form>
      </div>
      <div class="sign__img"></div>
    </div>
  </main>
</template>

<script>
export default {
  mounted () {
    this.loadData()
  },
  data () {
    return {
      name: '',
      phone: '+7',
      signed: false,
      dates: [
        '7 пн',
        '8 вт',
        '9 ср',
        '10 чт',
        '11 пт',
        '12 сб',
        '13 вс',
        '14 пн'
      ],
      dayTime: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      eveningTime: ['19:00', '20:00', '21:00'],
      date: '',
      time: '',
      nameInvalid: false,
      phoneInvalid: false,
      timeBtnInvalid: false,
      dateBtnInvalid: false
    }
  },
  methods: {
    loadData () {
      if (localStorage.length === 1) {
        const data = JSON.parse(localStorage.getItem('obj'))
        this.signed = true

        this.name = data.name
        this.phone = data.phone
        this.date = data.date
        this.time = data.time
      }
    },
    formHandler () {
      if (!this.name.length) {
        this.nameInvalid = true
      }
      if (this.phone.length < 12) {
        this.phoneInvalid = true
      }
      if (!this.time) {
        this.timeBtnInvalid = true
      }
      if (!this.date) {
        this.dateBtnInvalid = true
      }
      if (this.isValid) {
        this.signed = true
        const obj = {
          name: this.name,
          phone: this.phone,
          date: this.date,
          time: this.time
        }
        localStorage.setItem('obj', JSON.stringify(obj))
      }
    },
    clear () {
      this.name = this.time = this.date = ''
      this.phone = '+7'
      this.signed = false
      localStorage.clear()
    },
    addDate (date, event) {
      this.dateBtnInvalid = false
      const btns = document.querySelectorAll('.date__btn')
      btns.forEach((btn) => (btn.disabled = false))

      event.target.disabled = true
      this.date = date
    },
    setTime (time, event) {
      this.timeBtnInvalid = false
      const btns = document.querySelectorAll('.time__btn')
      btns.forEach((btn) => (btn.disabled = false))

      event.target.disabled = true
      this.time = time
    }
  },
  computed: {
    isValid () {
      if (this.name.length > 0 && this.phone.length === 12) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
small {
  color: red;
}
.done {
  padding: 30px;
  border: 1px solid #fab587;
  min-width: 500px;
  color: #fab587;
  &__title {
    letter-spacing: 1px;
    font-size: 32px;
    margin-bottom: 25px;
  }
  &__info {
    font-size: 24px;
    margin-bottom: 30px;
    span {
      color: #fff;
    }
  }
  &__btn {
    font-size: inherit;
    letter-spacing: 1px;
    display: inline-flex;
    padding: 15px 30px;
    border: 1px solid #fab587;
    color: #fff;
    background: transparent;
    transition: 0.3s ease;
    &:hover {
      background-color: #d28755;
    }
  }
}
.sign {
  padding: 50px 0;
  display: flex;
  justify-content: space-between;

  &__content {
    flex: 0 1 50%;
  }

  &__title {
    color: #3a9473;
    font-size: 24px;
    margin-bottom: 30px;
  }

  &__img {
    flex: 0 1 50%;
    max-width: 500px;
    background-image: url("../assets/Sign-img.jpeg");
    background-position: center;
    background-size: cover;
  }
}

.date {
  margin-bottom: 30px;

  &__title {
    font-size: 18px;
    margin-bottom: 10px;
    &.invalid {
      color: red;
    }
  }

  &__btn {
    max-width: 64px;
    background-color: #3a9473;
    color: #fff;
    padding: 15px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1px;
    transition: 0.3s ease;
    &:not(:last-child) {
      margin-right: 10px;
    }

    &:hover,
    &:disabled {
      background-color: #28644e;
    }
  }
}

.time {
  margin-bottom: 30px;

  &__title {
    font-size: 18px;
    margin-bottom: 20px;
    &.invalid {
      color: red;
    }
  }

  &__sub-title {
    margin-bottom: 10px;
  }

  &__blocks {
    display: flex;
    gap: 20px;
  }

  &__block {
    display: flex;
    flex-direction: column;
  }

  &__btn {
    padding: 10px 20px;
    background-color: #3a9473;
    color: #fff;
    font-size: 16px;
    letter-spacing: 1px;
    transition: 0.3s ease;

    &:hover,
    &:disabled {
      background-color: #28644e;
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}

.contacts {
  padding: 20px;
  border: 1px solid #3a9473;

  &__block {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
  }

  &__label {
    margin-bottom: 10px;
  }

  &__input {
    color: #090909;
    padding: 10px 10px;
    min-width: 300px;
    font-size: inherit;
    background-color: #e9bda0;
    border-radius: 5px;
    margin-bottom: 10px;
    &.invalid {
      border: 1px solid red;
    }
  }

  &__btn {
    padding: 10px 20px;
    display: inline-flex;
    color: #fff;
    font-weight: 700;
    letter-spacing: 1px;
    background-color: #3a9473;
    border-radius: 3px;
    transition: 0.3s ease;

    &:hover {
      background-color: #28644e;
    }
  }
}
</style>
