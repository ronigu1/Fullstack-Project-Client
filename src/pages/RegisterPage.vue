<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.onlyLetters">
          User name must be in english letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-firstname"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstname"
      >
        <b-form-input
          id="firstname"
          v-model="$v.form.firstname.$model"
          type="text"
          :state="validateState('firstname')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstname.required">
          First name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.firstname.length">
          First name length should be at least 1 character long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.firstname.onlyLetters">
          First name must be in english letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-lastname"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastname"
      >
        <b-form-input
          id="lastname"
          v-model="$v.form.lastname.$model"
          type="text"
          :state="validateState('lastname')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastname.required">
          Last name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.lastname.length">
          Last name length should be at least 1 character long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.lastname.onlyLetters">
          Last name must be in english letters
        </b-form-invalid-feedback>
      </b-form-group>
      
      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="email"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          Email adress is not valid
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <!-- <option value disabled selected>Select your country</option> -->
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          placeholder="Enter Password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          The password must be between 5 to 10.
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.password.passWithNum">
          The password must to contain at least one
          <br />number and one special characters.
         <br />
        </b-form-invalid-feedback>

      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          placeholder="Enter Confirmation Password"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Register</b-button
      >
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import countries from '../assets/countries';
import {
  required,
  maxLength,
  minLength,
  sameAs,
  alpha,
  email,
  url,
} from 'vuelidate/lib/validators';
const passWithNum = value =>
  /\d/.test(value) && /[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g.test(value); 
export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: '', disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        onlyLetters: alpha
      },
      firstname: {
        required,
        length: (u) => minLength(1)(u),
        englishLetter: alpha,
      },
      lastname: {
        required,
        length: (u) => minLength(1)(u),
        englishLetter: alpha,
      },
      email: {
        required,
        email,
      },
      country: {
        required,
      },
      password: {
        required,
        passWithNum,
        minLength: minLength(5),
        maxLength: maxLength(10)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs('password'),
      }
      // username: {
      //   required,
      //   length: (u) => minLength(3)(u) && maxLength(8)(u),
      //   alpha
      // },
      // country: {
      //   required
      // },
      // password: {
      //   required,
      //   length: (p) => minLength(5)(p) && maxLength(10)(p)
      // },
      // confirmedPassword: {
      //   required,
      //   sameAsPassword: sameAs("password")
      // }
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/Register",
          {
            username: this.form.username,
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            country: this.form.country,
            password: this.form.password,
            email: this.form.email,
          }
        );
        this.$router.push('/login');
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: '',
        firstName: '',
        lastName: '',
        country: null,
        password: '',
        confirmedPassword: '',
        email: '',
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
