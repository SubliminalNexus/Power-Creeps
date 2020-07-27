var game = {};
game.gold = {};
game.gold.cur;
game.gold.delta;
game.creeps = {};
game.creeps.amount = [];
game.buycreep = {};
game.buycreep.amount = {};
game.buycreep.amount.cur;
game.buycreep.amount.pos = [1,10,100,1000,10000]; //"Next","Max", <<to be added along with functionality
game.buycreep.tier = {};
game.buycreep.tier.cur;
game.buycreep.cost = {};
game.buycreep.cost.cur;
game.functions = {};
game.functions.interval;
game.fps = {};
game.fps.val = 30;

$(function(){
game.gold.loc = $("#gold");
game.gold.cur = parseInt(game.gold.loc.html());
game.buycreep.tier.loc = $("#buycreeptier");
game.buycreep.tier.cur = parseInt($("#buycreeptier").html());
game.buycreep.amount.loc = $("#buycreepamount");
game.buycreep.amount.cur = parseInt($("#buycreepamount").html());
game.buycreep.cost.loc = $("#buycreepcost");
game.buycreep.cost.calculate = function(){
	game.buycreep.cost.cur = Math.floor(Math.pow(10, parseInt(game.buycreep.tier.loc.html()))*game.buycreep.amount.loc.html());
	game.buycreep.cost.loc.html(game.buycreep.cost.cur);
};
game.buycreep.cost.calculate();
//game.functions.appendcreeptiers = function(){};
game.functions.interval = setInterval(function(){
	game.gold.delta = 0;
	for(i=0;i<game.creeps.amount.length;i++){
		if(game.creeps.amount[i]){
			game.gold.delta += Math.pow(10,i)*game.creeps.amount[i];	
		}
	}
	game.gold.cur += game.gold.delta/game.fps.val;
	game.gold.loc.html(Math.floor(game.gold.cur));
},1000/game.fps.val);
game.functions.interval;

	$(".clickable").click(function(){
		switch($(this).attr("id")){
			case "buycreeptierminus":
					if(game.buycreep.tier.cur<=1){
						game.buycreep.tier.cur = 1;
					} else {
						game.buycreep.tier.cur--;
					};
					game.buycreep.tier.loc.html(game.buycreep.tier.cur);
				break;
			case "buycreeptierplus":
					game.buycreep.tier.cur++;
					game.buycreep.tier.loc.html(game.buycreep.tier.cur);
				break;
			case "buycreepamountminus":
					var temp = game.buycreep.amount.pos.indexOf(game.buycreep.amount.cur);
					if(game.buycreep.amount.pos[temp-1] != undefined){
						game.buycreep.amount.cur = game.buycreep.amount.pos[temp-1];
					}	
					game.buycreep.amount.loc.html(game.buycreep.amount.cur);
				break;
			case "buycreepamountplus":
					var temp = game.buycreep.amount.pos.indexOf(game.buycreep.amount.cur);
					if(game.buycreep.amount.pos[temp+1] != undefined){
						game.buycreep.amount.cur = game.buycreep.amount.pos[temp+1];
					}	
					game.buycreep.amount.loc.html(game.buycreep.amount.cur);
				break;
			case "buycreepbutton":
					if(game.gold.cur >= game.buycreep.cost.cur){
						game.gold.cur -= game.buycreep.cost.cur;

						if(!game.creeps.amount[game.buycreep.tier.cur-1]){
							game.creeps.amount[game.buycreep.tier.cur-1] = 0;
						};
						game.creeps.amount[game.buycreep.tier.cur-1] += game.buycreep.amount.cur;

					}
					for(i=0;i<game.creeps.amount.length;i++){
						if(game.creeps.amount[i]){
							$("#tier"+(i+1)).html("Tier "+(i+1)+": "+game.creeps.amount[i])
						}
					}
					game.gold.loc.html(Math.floor(game.gold.cur));
				break;
		};
		game.buycreep.cost.calculate();
	});
  
});
