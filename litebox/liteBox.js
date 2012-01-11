(function(namespace){
//PopUp do site
var Popup = function(elPopup)
{
	//objetos Domm 
	var DOOM_popup 	= $(elPopup) || $('.popUp');
	var DOOM_btCloseBox = $('.close');
	var DOOM_mask 		=  createMask();

	applyListners();//LISTENER DOS BOTÕES
	

	var returnPublic = {};

	function positionCenterPopUP(){
		var width = DOOM_popup.width();
		var height = DOOM_popup.height();
		var posTop = Math.floor(height/2);
		var posLeft = Math.floor(width/2);
		DOOM_popup.css({
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
		DOOM_btCloseBox.live('click',closeBox);
	}

	function closeBox(){
		DOOM_popup .fadeOut();
		DOOM_mask.fadeOut();
	}

	 returnPublic.showPopup = function ()
	 {
		DOOM_popup.fadeIn()
		DOOM_mask.fadeTo("slow",0.7);
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
			.append(DOOM_popup);
		
		DOOM_popup.removeClass('hide');//agora o template que fica escondido
		DOOM_popup = templateDefault;
		$('body').append(DOOM_popup);

	}

	return returnPublic;
}//fim::PopUp
namespace.Popup = Popup;
})(window)