
// var app = new Vue({
  
//   el: '#app',
  
//   data: {
//     message: 'Hello world'
//   },
  
//   created: function(){
//   },
  
//   methods: {
//   	onClick: ev => {
//   		fetch('/test')
//   			.then(output => output.json())
//   			.then(output =>{
//   				output.test
//   				app.message = output.test
//   			})
//   	}
//   }

// })


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
    }
  },
  methods: {
    onDownArrowClick: ev => {
      zenscroll.intoView(document.querySelector("#mainsection2"))
    },
    onCreateUser: ev => {
      app.$http.post("/api/users", app.registration)
          .then(output => console.log(output));
    },
    modalSignup: ev => {
    	app.showModal = true;
    }
  }
})
