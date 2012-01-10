/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function(namespace){

	var Model = {
		data : {},
		params  : {
			n : '',
			q : 2
		},
		url : 'index.php'
	}

	Mvc.extendsModel(Model); //HERDANDO A CLASSE MVC MODEL
	
	//ADD NO NAMESPACE
	namespace.Home = namespace.Home || {};
	namespace.Home.Model  = Model;


})(Mvc)
