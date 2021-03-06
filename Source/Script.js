var deck_array = ['../Images/Ash.jpg', '../Images/Ash.jpg', '../Images/Banshee.jpg', '../Images/Banshee.jpg',
'../Images/Ember.jpg', '../Images/Ember.jpg', '../Images/Excalibur.jpg', '../Images/Excalibur.jpg',
'../Images/Frost.jpg', '../Images/Frost.jpg', '../Images/Loki.jpg', '../Images/Loki.jpg',
'../Images/Mag.jpg', '../Images/Mag.jpg', '../Images/Nekros.jpg', '../Images/Nekros.jpg',
'../Images/Nova.jpg', '../Images/Nova.jpg', '../Images/Nyx.jpg', '../Images/Nyx.jpg',
'../Images/Trinity.jpg', '../Images/Trinity.jpg', '../Images/Valkyr.jpg', '../Images/Valkyr.jpg'];
var card_value = [];
var card_ids = [];
var card_flipped = 0;
var score = 0;

Array.prototype.shuffleDeck = function()
{
	var i = this.length, j, temp;
	while (--i > 0)
	{
		j = Math.floor(Math.random() * (i + 1));
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
	}
}

function newGame()
{
	score = 0;
	card_flipped = 0;
	var output = '';
	deck_array.shuffleDeck();
	for (var i = 0; i < deck_array.length; i++)
	{
		output += '<div id="card_'+i+'" onclick="flipCard(this,\''+deck_array[i]+'\')"></div>';
	}
	document.getElementById('gameBoard').innerHTML = output;
}

function flipCard(card,val)
{
	if(card.innerHTML == "" && card_value.length < 2)
	{
		card.style.background = 'url('+val+')';
		if(card_value.length == 0)
		{
			card_value.push(val);
			card_ids.push(card.id);
		}
		else if (card_value.length == 1)
		{
			card_value.push(val);
			card_ids.push(card.id);
			if (card_value[0] == card_value[1])
			{
				score += 100;
				card_flipped += 2;
				card_value = [];
				card_ids = [];
				showScore();
				if (card_flipped == deck_array.length)
				{
					window.open("WinGame.html",'_self', false);
				}
			}
			else {
				function flipBack()
				{
					var card_1 = document.getElementById(card_ids[0]);
					var card_2 = document.getElementById(card_ids[1]);
					card_1.style.background = "url('../Images/Lotus_BG.jpg') no-repeat";
					card_1.innerHTML = "";
					card_2.style.background = "url('../Images/Lotus_BG.jpg') no-repeat";
					card_1.innerHTML = "";
					card_value = [];
					card_ids = [];
				}
				setTimeout(flipBack, 500);
			}
		}
	}
}

function startTimer(duration, display)
{
	var start = Date.now(),
		diff,
		minutes,
		seconds;
	function timer() 
	{
		diff = duration - (((Date.now() - start) / 1000) | 0);

		minutes = (diff / 60) | 0;
		seconds = (diff % 60) | 0;

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.textContent = minutes + ":" + seconds; 

		if (diff <= 0) {
			window.open("GameOver.html",'_self', false);
		}
	};
	timer();
	setInterval(timer, 1000);
}

function showTime() 
{
	var duration = 60 * 2;
	var display = document.querySelector(".time");
	startTimer(duration, display);
}

function showScore()
{
	document.querySelector(".score").textContent = score;
}