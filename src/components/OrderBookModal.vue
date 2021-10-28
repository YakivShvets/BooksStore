<template>
  <va-modal
    ref="bookModal"
    stateful
    hide-default-actions
    :title="book ? book.volumeInfo.title : ''"
    attach-element="#app"
    overlay-opacity="0.2"
  >
    <slot>
      <div v-if="book" class="info">
        <img
          v-if="
            book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
          "
          :src="book.volumeInfo.imageLinks.thumbnail"
          :alt="book.volumeInfo.title"
        />
        <div class="book__svg" v-else>
          <va-icon name="book" color="#9BEC15" class="mr-4" :size="150" />
        </div>
        <div class="info__description" v-if="book.volumeInfo.description">
          {{ book.volumeInfo.description }}
        </div>
      </div>

      <div class="form-wraper">
        <h3>Введите данные</h3>
        <form class="form" id="form" novalidate="true">
          <div class="form__item">
            <va-input
              class="mt-4 mb-2"
              type="text"
              name="name"
              v-model="name"
              label="Имя"
              placeholder="Введите имя"
            />

            <span style="white-space: nowrap" v-if="errors.errorName">
              {{ errors.errorName }}
            </span>
          </div>
          <div class="form__item">
            <va-input
              class="mt-4 mb-2"
              type="email"
              name="email"
              v-model="email"
              label="Email"
              placeholder="Введите ваш email"
            />

            <span style="white-space: nowrap" v-if="errors.errorEmail">
              {{ errors.errorEmail }}
            </span>
          </div>
          <div class="form__item">
            <va-input
              class="mt-4 mb-2"
              type="tel"
              name="tel"
              v-model="phoneNumber"
              label="Номер телефона"
              placeholder="+380*********"
            />

            <span style="white-space: nowrap" v-if="errors.errorPhone">
              {{ errors.errorPhone }}
            </span>
          </div>
        </form>
      </div>
    </slot>

    <template v-if="bookModal" #footer>
      <va-button @click="bookModal.hide" flat class="mr-4"> Закрыть </va-button>
      <va-button
        @click="handleSendForm"
        :disabled="!name || !email || !phoneNumber"
      >
        Отправить
      </va-button>
    </template>
  </va-modal>
</template>

<script>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
    showModal: {
      type: Function,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();

    const bookModal = ref(null);

    const errors = reactive({
      errorName: '',
      errorEmail: '',
      errorPhone: '',
    });

    const name = ref('');
    const email = ref('');
    const phoneNumber = ref('');

    function handleSendForm() {
      checkForm();
      if (checkForm() === true) {
        store.dispatch('addOrderedBook', props.book);
        bookModal.value.hide();
      } else {
        bookModal.value.show();
        err();
        checkForm();
        if (checkForm() === true) {
          store.dispatch('addOrderedBook', props.book);
          bookModal.value.hide();
        }
      }
    }

    function checkForm() {
      if (!name.value) {
        errors.errorName = 'Укажите имя';
      } else if (!validName(name.value)) {
        errors.errorName = 'Введите полное имя';
      }
      if (!email.value) {
        errors.errorEmail = 'Укажите электронную почту';
      } else if (!validEmail(email.value)) {
        errors.errorEmail = 'Некорректный email';
      }
      if (!phoneNumber.value) {
        errors.errorPhone = 'Укажите телефон';
      } else if (!validPhone(phoneNumber.value)) {
        errors.errorPhone = 'Укажите корректный телефон';
      }
      if (!errors.errorName && !errors.errorEmail && !errors.errorPhone) {
        return true;
      } else {
        return false;
      }
    }

    function validName(name) {
      let re = /^([а-я]{2,}|[a-z]{2,})/;
      let lowerName = name.toLowerCase();
      return re.test(lowerName);
    }

    function validEmail(email) {
      let re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    function validPhone(phone) {
      let re = /^(\+380|0)([0-9]{9})/;
      return re.test(phone);
    }

    function err() {
      errors.errorName = '';
      errors.errorEmail = '';
      errors.errorPhone = '';
    }

    return {
      handleSendForm,
      errors,
      name,
      email,
      phoneNumber,
      bookModal,
    };
  },
};
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

.va-modal__title {
  font-size: 1.25rem !important;
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
