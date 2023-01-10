const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам многому нужно научиться", 12),
	new Result("Вы уже неплохо разбираетесь", 14),
	new Result("Ваш уровень выше среднего", 18),
	new Result("Вы в совершенстве знаете тему", 20)
];

//Массив с вопросами
const questions = 
[
	new Question(" Сколько двузначных чисел можно составить из пяти цифр 1,2,3,4,5 при условии, что ни одна цифра не повторяется?", 
	[
		new Answer("20", 1),
		new Answer("15", 0),
		new Answer("10", 0),
		new Answer("Не знаю", 0)

	]),

	new Question("В партии из 18 деталей находятся 4 бракованных. Наугад берут 5 деталей. Найти вероятность того,что из этих 5 деталей две окажутся бракованными.", 
	[
		new Answer("1,45", 0),
		new Answer("0,75", 0),
		new Answer("0,23", 1),
		new Answer("Не знаю", 0)
	]),

	new Question("Определите вероятность того, что при бросании игрального кубика (правильной кости) выпадет нечетное число очков.  ", 
	[
		new Answer("0,75", 0),
		new Answer("0,5", 1),
		new Answer("0,8", 0),
		new Answer("Не знаю", 0)
	]),

	new Question("Выбирают наугад  число от  1  до  100.  Определить вероятность того, что в этом  числе не окажется цифры  3.", 
	[
		new Answer("0,81", 1),
		new Answer("0,27", 0),
		new Answer("1,25", 0),
		new Answer("Не знаю", 0)
	]),

	new Question("В группе спортсменов 20 лыжников, 6 велосипедистов и 4 бегуна. Вероятность выполнить квалификационную норму такова: для лыжника—0,9, для велосипедиста—0,8 и для бегуна—0,75. Найти вероятность того, что спортсмен, выбранный наудачу, выполнит норму.", 
	[
		new Answer("0,75", 0),
		new Answer("0,86", 1),
		new Answer("0,55", 0),
		new Answer("Не знаю", 0)
	]),

	new Question("В урне находится 10 белых и 6 чёрных шаров. Найти вероятность того, что 3 наудачу вытянутых один за другим шара  окажутся чёрными?", 
	[
		new Answer("0,38", 0),
		new Answer("1", 0),
		new Answer("0,036", 1),
		new Answer("Не знаю ", 0)

	]),

	new Question("Область G ограничена окружностью x2 + y2 = 25, а область g — этой окружностью и параболой 16x - 3y2 > 0. Найдите вероятность попадания в область g.", 
	[
		new Answer("≈0,446", 0),
		new Answer("≈0,325", 0),
		new Answer("≈0,346", 1),
		new Answer("Не знаю ", 0)

	]),

		new Question("Двое друзей условились встретиться между 13 и 14 часами. Пришедший первым ждет второго в течение 20 минут, после чего уходит. Определите вероятность встречи друзей, если моменты их прихода в указанном промежутке времени равновозможны.", 
	[
		new Answer("8/9", 0),
		new Answer("2/6", 0),
		new Answer("5/9", 1),
		new Answer("Не знаю ", 0)

	]),

			new Question("Наугад взяты два положительных числа х и у, каждое из которых не превышает 2. Найти вероятность того, что их произведение не меньше 2, а сумма не больше 3.", 
	[
		new Answer("0,0296", 0),
		new Answer("0,2987", 0),
		new Answer("0,1137", 1),
		new Answer("Не знаю ", 0)

	]),

			new Question("В прямоугольник с вершинами R(-2;0), L(-2;9), M (4;9), N (4;0) брошена точка. Найдите вероятность того, что ее координаты будут удовлетворять неравенствам 0 ≤ y ≤ 2x – x2+8.", 
	[
		new Answer("≈0,666", 1),
		new Answer("4/6", 1),
		new Answer("2/3", 1),
		new Answer("Не знаю ", 0)

	]),

			new Question("В группе спортсменов 20 лыжников, 6 велосипедистов и 4 бегуна. Вероятность выполнить квалификационную норму такова: для лыжника—0,9, для велосипедиста—0,8 и для бегуна—0,75. Найти вероятность того, что спортсмен, выбранный наудачу, выполнит норму.", 
	[
		new Answer("0,75", 0),
		new Answer("0,86", 1),
		new Answer("0,55", 0),
		new Answer("Не знаю", 0)
	]),

			new Question("В классе  учащийся, среди них два друга — Вадим и Олег. Учащихся случайным образом разбивают на  равные группы.Найдите вероятность того, что Вадим и Олег окажутся в одной группе.", 
	[
		new Answer("3/8", 0),
		new Answer("3/10", 1),
		new Answer("2/5", 0),
		new Answer("Не знаю", 0)
	]),

			new Question("В сборнике билетов по физике всего  билетов, в  из них встречается вопрос по теме «Радиоактивность». Найдите вероятность того, что в случайно выбранном на экзамене билете школьнику достанется вопрос по теме «Радиоактивность».", 
	[
		new Answer("0,2", 0),
		new Answer("0,4", 1),
		new Answer("0,8", 0),
		new Answer("Не знаю", 0)
	]),

			new Question("В сборнике билетов по биологии всего  билетов. Только в двух билетах встречается вопрос о грибах. На экзамене выпускнику достаётся один случайно выбранный билет из этого сборника.Найдите вероятность того, что в этом билете будет вопрос о грибах.", 
	[
		new Answer("0,09", 0),
		new Answer("0,08", 1),
		new Answer("0,25", 0),
		new Answer("Не знаю", 0)
	]),

			new Question("В чемпионате мира участвуют  команд. С помощью жребия их нужно разделить на пять групп по шесть команд в каждой. В ящике вперемешку лежат карточки с номерами групп: 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5  Капитаны команд тянут по одной карточке. Какова вероятность того, что команда России окажется в третьей группе?", 
	[
		new Answer("0,23", 0),
		new Answer("0,2", 1),
		new Answer("0,8", 0),
		new Answer("Не знаю", 0)
	]),

			new Question("Перед началом первого тура чемпионата по шашкам участников разбивают на игровые пары случайным образом с помощью жребия. Всего в чемпионате участвует  игрок, среди которых  спортсменов из России, в том числе Виталий Сентюрёв. Найдите вероятность того, что в первом туре Виталий Сентюрёв будет играть с каким-либо участником соревнований из России.", 
	[
		new Answer("0,5", 0),
		new Answer("0,4", 1),
		new Answer("0,8", 0),
		new Answer("Не знаю", 0)
	]),

			new Question("Вероятность того, что мама отпустит Мишу погулять (даже если он еще не сделал уроки), равна 0,8. Вероятность того, что папа даст Мише денег на мороженое, равна 0,3. Решения по данным вопросам мама и папа принимают независимо друг от друга. Найдите вероятность того, что Миша пойдет гулять, но без мороженого.", 
	[
		new Answer("0,75", 0),
		new Answer("0,56", 1),
		new Answer("0,55", 0),
		new Answer("Не знаю", 0)
	]),

			new Question("Петя бросает игральный кубик. С какой вероятностью на верхней грани выпадет четное число?", 
	[
		new Answer("0,75", 0),
		new Answer("0,5", 1),
		new Answer("0,45", 0),
		new Answer("Не знаю", 0)
	]),

			new Question("Электролампы изготавливаются на трех заводах. Первый завод изготавливает 45% общего количества электроламп, второй — 40%, третий — 15%. Продукция первого завода содержит 70% стандартных электроламп, второго — 80%, третьего — 81%. Найти вероятность того, что случайно взятая электролампа будет стандартной.", 
	[
		new Answer("0,755", 0),
		new Answer("0,7565", 1),
		new Answer("0,215", 0),
		new Answer("Не знаю", 0)
	]),

			new Question("Средняя длина детали равна 50 см, а дисперсия длины равна 0,1. Оценить вероятность того, что изготовленная деталь окажется по своей длине не менее 49,5 см. и не более 50,5 см.", 
	[
		new Answer("0,75", 0),
		new Answer("0,6", 1),
		new Answer("0,55", 0),
		new Answer("Не знаю", 0)
	])
	
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}