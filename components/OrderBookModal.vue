<template>
  <modal class="modal" ref="modalName">
    <template v-slot:header>
      <h1>{{ book.volumeInfo.title }}</h1>
    </template>

    <template v-slot:body>
      <div class="info">
        <img
          v-if="
            book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
          "
          :src="book.volumeInfo.imageLinks.thumbnail"
          :alt="book.volumeInfo.title"
        />
        <BookPlaceholder v-else :alt="book.volumeInfo.title" />
        <div class="info__description" v-if="book.volumeInfo.description">
          {{ book.volumeInfo.description }}
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <div class="form-wraper">
        <h3>Введите данные</h3>
        <form
          class="form"
          id="form"
          novalidate="true"
          @submit.prevent="handleSendForm"
        >
          <div class="form__item">
            <label for="formName">Имя</label>
            <input
              class="form__input"
              id="formName"
              type="text"
              name="name"
              v-model="name"
            />

            <span style="white-space: nowrap" v-if="errors.errorName">
              {{ errors.errorName }}
            </span>
          </div>
          <div class="form__item">
            <label for="formEmail">Email</label>
            <input
              class="form__input"
              type="email"
              name="email"
              id="formEmail"
              v-model="email"
            />

            <span style="white-space: nowrap" v-if="errors.errorEmail">
              {{ errors.errorEmail }}
            </span>
          </div>
          <div class="form__item">
            <label style="white-space: nowrap" for="formTel"
              >Номер телефона</label
            >
            <input
              class="form__input"
              type="tel"
              name="tel"
              id="formTel"
              v-model="phoneNumber"
            />

            <span style="white-space: nowrap" v-if="errors.errorPhone">
              {{ errors.errorPhone }}
            </span>
          </div>
        </form>
        <div class="modal-batton">
          <button
            class="btn btn--secondary"
            @click="$refs.modalName.closeModal()"
          >
            Отменить
          </button>
          <button
            class="btn btn--primary"
            form="form"
            :disabled="!name.trim() || !email.trim() || !phoneNumber.trim()"
          >
            Отправить
          </button>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  data() {
    return {
      errors: {
        errorName: '',
        errorEmail: '',
        errorPhone: '',
      },
      name: '',
      email: '',
      phoneNumber: '',
    }
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },

  methods: {
    handleSendForm() {
      this.checkForm()
      if (this.checkForm() === true) {
        this.$store.dispatch('addOrderedBook', this.book)
        this.$refs.modalName.closeModal()
      } else {
        this.err()
        this.checkForm()
        if (this.checkForm() === true) {
          this.$store.dispatch('addOrderedBook', this.book)
          document
            .querySelector('.form__input')
            .setAttribute('disabled', 'disabled')
          this.$refs.modalName.closeModal()
        }
      }
    },
    checkForm() {
      if (!this.name) {
        this.errors.errorName = 'Укажите имя'
      } else if (!this.validName(this.name)) {
        this.errors.errorName = 'Введите полное имя'
      }
      if (!this.email) {
        this.errors.errorEmail = 'Укажите электронную почту'
      } else if (!this.validEmail(this.email)) {
        this.errors.errorEmail = 'Некорректный email'
      }
      if (!this.phoneNumber) {
        this.errors.errorPhone = 'Укажите телефон'
      } else if (!this.validPhone(this.phoneNumber)) {
        this.errors.errorPhone = 'Укажите корректный телефон'
      }
      if (
        !this.errors.errorName &&
        !this.errors.errorEmail &&
        !this.errors.errorPhone
      ) {
        return true
      }
    },
    validName(name) {
      const re = /^([а-я]{2,}|[a-z]{2,})/
      const lowerName = name.toLowerCase()
      return re.test(lowerName)
    },
    validEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validPhone(phone) {
      const re = /^(\+380|0)([0-9]{9})/
      return re.test(phone)
    },
    err() {
      this.errors.errorName = ''
      this.errors.errorEmail = ''
      this.errors.errorPhone = ''
    },
  },
}
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  &__item {
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
    width: 60%;
  }
  &__input {
    width: -webkit-fill-available;
  }
  span {
    color: rgb(238, 109, 109);
  }
}
.form-wraper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal-batton {
  display: flex;
  justify-content: space-between;
  width: 60%;
}
.btn {
  padding: 8px 16px;
  border-radius: 5px;
  &--primary {
    background-color: rgb(133, 199, 221);
    color: #fff;
  }
  &--secondary {
    background-color: #dddd;
    color: #000;
  }
}
.overflow-hidden {
  overflow: hidden;
}
button {
  background: none;
  border: none;
  outline: inherit;
  cursor: pointer;
}
.modal {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-size: 18px;
  }
}
</style>
