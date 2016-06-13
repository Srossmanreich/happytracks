var app = new Vue({
  el: "body",
  data: {
    showModal: false,
    registration: {
      email: null,
      first: null,
      last: null,
      password: null,
      confirm: null
    },
    registrationError: {
      email: null,
      first: null,
      last: null,
      password: null
    },
    registrationSuccess: false
  },
  methods: {
    onDownArrowClick(ev) {
      zenscroll.intoView(document.querySelector("#mainsection2"))
    },
    onCreateUser(ev) {
      this.$http.post("/api/users", this.registration).then(output => {

            if (output.data.success) {
              this.registrationSuccess = true;
              localStorage.setItem("token", output.data.token);
              localStorage.setItem("user", JSON.stringify(output.data.user[0]));
              window.location.href = "/dashboard";
            }
            else {
              this.registrationError = Object.assign({}, ...output.data.errors)
            }
          });
    },
    modalSignup(ev) {
    	app.showModal = true;
    }
  }
})


// var app = new Vue({
  
//   el: '#app',
  
//   data: {
//     message: 'Hello world'
//   },
  
//   created: function(){
//   },
  
//   methods: {
//    onClick: ev => {
//      fetch('/test')
//        .then(output => output.json())
//        .then(output =>{
//          output.test
//          app.message = output.test
//        })
//    }
//   }

// })
