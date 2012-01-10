/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function(namespace){

	var View = {

		render  : {

			index :
				'<p class="title">@{title}</p>' +
				'<div class="description">@{description}</div>',

			not_found :
				'<p>Resultado não encontrado</p>'
		},

		events : {
			'#open' :  function(param){
				$('#open').bind('click',{parametro : param},View.showClick);
				return false;
			}
		},
		
		showClick : function(param) {
			param.preventDefault();
			console.log(param.data.parametro);
		}

	}

	Mvc.extendsView( View); //HERDANDO A CLASSE MVC VIEW

	//ADD NO NAMESPACE
	namespace.Home = namespace.Home || {};
	namespace.Home.View = View

	
})(Mvc)
