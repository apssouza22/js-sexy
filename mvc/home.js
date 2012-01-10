(function(namespace, Model, View, Controller){

	var Home  = {

		initialize :function(){
			View.events['#open']('abraOpen');
			Controller.request();
			Controller.run(Controller.routes.request);
		},

		display :function(){

		}

	}
	
	namespace.Home = Home;
	
	Home.initialize()

})(window, Mvc.Home.Model, Mvc.Home.View, Mvc.Home.Controller)
