/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function(namespace, Model, View){

	var Controller = {
		request :function(url){
			return "conteudo do request";
			//$.getJSON( Model.url, Model.params, this.callback )
		},

		callback :function(){

		},

		/**
		 * @Actions
		 */
		Action :function(){

				this.home = function(page){
					var htm = View.inject({
						title:'meu titiulo',
						description : 'minha descricao'
					},View.render.index)

					console.log(htm);
				}

				this.not_found = function(){

				}

		},


		/**
		 * @Routes
		 */
		routes : {

			request :{
				'#/:page' :function( page ){
					this.action[page] ?
						this.action[page]() :this.action['not_found']()
				},
				'filtro/:param' :function( param ){
					console.log("parametro " +param)
				}
			}
			

		}

	}

	Mvc.extendsController( Controller); //HERDANDO A CLASSE MVC CONTROLE

	//ADD NO NAMESPACE
	namespace.Home = namespace.Home || {};
	namespace.Home.Controller = Controller;

	

})(Mvc, Mvc.Home.Model, Mvc.Home.View)
