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
        <div class="info__description mb-4" v-if="book.volumeInfo.description">
          {{ book.volumeInfo.description }}
        </div>
      </div>

      <hr />

      <div class="form-wraper">
        <!-- <h3>Введите данные</h3> -->
        <h3 v-if="!$store.getters.getOrderedBooks.length">Введите данные</h3>
        <div v-else class="checking-form">
          <h3>Проверьте данные</h3>
          <va-button class="disabledBtn mt-2" flat @click="disabledChange"
            >Изменить</va-button
          >
        </div>
        <form class="form" id="form" novalidate="true">
          <div class="form__item">
            <va-input
              class="mt-4 mb-2"
              type="text"
              name="name"
              v-model="name"
              label="Имя"
              placeholder="Введите имя"
              :disabled="store.getters.getDisabled"
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
              :disabled="store.getters.getDisabled"
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
              :disabled="store.getters.getDisabled"
            />

            <span style="white-space: nowrap" v-if="errors.errorPhone">
              {{ errors.errorPhone }}
            </span>
          </div>
        </form>
      </div>
    </slot>

    <template v-if="bookModal" #footer>
      <va-button @click="disabledBtn()" flat class="mr-4"> Закрыть </va-button>
      <va-button
        @click="handleSendForm()"
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
        if (
          store.getters.getOrderedBooks.find(
            (book) => book.id === props.book.id
          )
        ) {
          confirm('Эта книга уже есть в корзине. Все равно добавить?');
        }
        store.dispatch('addOrderedBook', props.book);
        store.dispatch('switchDisabled', true);
        bookModal.value.hide();
      } else {
        bookModal.value.show();
        err();
        checkForm();
        if (checkForm() === true) {
          store.dispatch('addOrderedBook', props.book);
          store.dispatch('switchDisabled', true);
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

    function disabledChange() {
      store.dispatch('switchDisabled', false);
    }
    function disabledBtn() {
      if (
        !store.getters.getOrderedBooks.length &&
        (!name.value || !email.value || !phoneNumber.value)
      ) {
        store.dispatch('switchDisabled', false);
        bookModal.value.hide();
      }
      if (
        !store.getters.getOrderedBooks.length &&
        (name.value || email.value || phoneNumber.value)
      ) {
        store.dispatch('switchDisabled', false);
        name.value = '';
        email.value = '';
        phoneNumber.value = '';
        bookModal.value.hide();
      }
      if (store.getters.getOrderedBooks.length) {
        store.dispatch('switchDisabled', true);
        bookModal.value.hide();
      }
    }

    return {
      store,
      handleSendForm,
      errors,
      name,
      email,
      phoneNumber,
      bookModal,
      disabledBtn,
      disabledChange,
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
    width: 60%;
  }
  &__input {
    width: -webkit-fill-available;
  }
  span {
    color: rgb(238, 109, 109);
  }
}
.form-wraper,
.checking-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.overflow-hidden {
  overflow: hidden;
}
.va-modal__title {
  font-size: 1.25rem !important;
}
</style>
