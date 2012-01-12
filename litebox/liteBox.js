(function(namespace){
//PopUp do site
var Popup = function(elPopup)
{
	//objetos Domm 
	var DOM_popup 	= $(elPopup) || $('.popUp');
	var DOM_btCloseBox = $('.close');
	var DOM_mask 		=  createMask();

	applyListners();//LISTENER DOS BOTÕES
	

	var returnPublic = {};

	function positionCenterPopUP(){
		var width = DOM_popup.width();
		var height = DOM_popup.height();
		var posTop = Math.floor(height/2);
		var posLeft = Math.floor(width/2);
		DOM_popup.css({
			marginLeft: -posLeft,
			marginTop: -posTop
		});

	}
	
	function createMask(){
		var mask = $('<div class="mask close"></div>');
		mask.css({
				position:'fixed',
				top:0,
				left:0,
				width:"100%",
				height:"100%",
				background:"#000000",
				zIndex:100,
				display:'none'
			})

			$('body').append(mask);
			
			return mask;
	}
	
	function applyListners()
	{		
		DOM_btCloseBox.live('click',closeBox);
	}

	function closeBox(){
		DOM_popup .fadeOut();
		DOM_mask.fadeOut();
	}

	 returnPublic.showPopup = function ()
	 {
		DOM_popup.fadeIn()
		DOM_mask.fadeTo("slow",0.7);
		positionCenterPopUP(); //CENTRALIZA POPUP
		return false;
	}

	/**
	 * Adiciona um elemento a ser usado para disparar a função de abrir o Popup
	 */
	returnPublic.addElementOpenListener = function (elListener)
	{
		$(elListener).live('click',showPopup);
	}

	returnPublic.addTemplateDefault = function(){
		var templateDefault = $('<div class="popUpDefault hide"><a class="button closePopup close ir">X</a><div class="popUpContent clearfix"></div></div>');
		templateDefault.find('.popUpContent')
			.append(DOM_popup);
		
		DOM_popup.removeClass('hide');//agora o template que fica escondido
		DOM_popup = templateDefault;
		$('body').append(DOM_popup);

	}

	return returnPublic;
}//fim::PopUp
namespace.Popup = Popup;
})(window)