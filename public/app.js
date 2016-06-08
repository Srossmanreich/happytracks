
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
  methods: {
    onDownArrowClick: ev => {
      zenscroll.intoView(document.querySelector("#mainsection2"))
    }
  }
})