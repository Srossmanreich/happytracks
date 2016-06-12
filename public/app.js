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
    onDownArrowClick: ev => {
      zenscroll.intoView(document.querySelector("#mainsection2"))
    },
    onCreateUser: ev => {
      app.$http.post("/api/users", app.registration)
          .then(output => {
            console.log(output);
            if (!output.data.success) {
              app.registrationError = Object.assign({}, ...output.data.errors)
            } else {
              app.registrationSuccess = true
            }
          });
    },
    modalSignup: ev => {
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
