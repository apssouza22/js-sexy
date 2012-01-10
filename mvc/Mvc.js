/**
 * Implementação MVC para JS
 *@credits http://javiani.wordpress.com/2010/12/26/o-mvc-e-o-javascript-a-teoria/
 */


(function(namespace){

	//MÉTODOS OBRIGATÓRIOS PARA CLASSES DE CONTROLE
	var Interface = {
		actions : function(){
			this . request = this.request || function(){
				throw new Error('Implemente o método request em sua classe/objeto');
			}
			this . callback = this.callback || function(){
				throw new Error('Implemente o método callback em sua classe/objeto');
			}
		}
	}

	//ESTRUTURA GENERICA PARA AS CLASSES MVC
	var Mvc = {

		extendsModel : function(Model)
		{
			Mvc.Model.apply( Model );
		},
		
		extendsController : function(Controller)
		{
			Mvc.Controller.apply( Controller,[Mvc.Model] );
		},

		extendsView : function(View)
		{
			Mvc.View.apply( View );
		},

		Model : function(){
			this.data = this.data || {}
		},

		View : function()
		{
			var pattern =  /\@\{(\w*)\}/g;

			
			this.template	= '';

			this.inject = function(json, template){
				var html = (template || this.template).replace(pattern, function(key){
					return json[key.slice(2, -1)]
				})
				return html
			}

		},

		Controller : function(Model){

			Interface.actions.apply(this);//ESTENDENDO ACTIONS

			var self = this;
			var callback = this.callback;

			this.action = new this.Action;

			this.callback = function(data){
				Model.data = data;
				callback.call(self, data);
			}

			this.run = function( json, url ){
				var url = url || location.href;
				var result = null;
					for (var key in json) {
						var aux = key.replace(/\:(\w*)/, '([^&/#?]*)')//TROCA A VAR key QUE ESTA VINDO D ROTA ":(PALAVRA)" POR #/([^&/#?]*)
						result = url.match(aux); //EXTRAI DA URL "/#(TUDO ATE ENCONTRAR QUALQUER UM DESES &/#?)"
						if (result) {
							result.shift();
							json[key].call(this, decodeURIComponent(result[0]));//CHAMANDO A FUNCAO CRIADA NA ROTA PARA ESSA URL
						}
					}
			}

		},

		New :function(){this.apply(null, arguments)}

	}

	namespace.Mvc = Mvc;
	//namespace.Mvc.New = Mvc.New;

})(window)
