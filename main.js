(() => {
    // фунция, которая возвращает массив с объектами значений карточек
    function createValuesOfCards(count) {
        let arrOfValuesOfCards = []
        for (let i = 0; i < count; i++) {
            arrOfValuesOfCards.push(
                {
                    num: i,
                    disabled: true,
                    color: 'red'
                },
                {
                    num: i,
                    disabled: true,
                    color: 'red'
                }
            )
        }
        function addColorToCards(index, color) {
            for (let i in arrOfValuesOfCards) {
                if (index < arrOfValuesOfCards.length && arrOfValuesOfCards[i].num === index) {
                    arrOfValuesOfCards[i].color = color 
                }
            }
        }
        addColorToCards(0, 'red')
        addColorToCards(1, 'blue')
        addColorToCards(2, 'green')
        addColorToCards(3, 'black')
        addColorToCards(4, 'white')
        addColorToCards(5, 'lightgreen')
        addColorToCards(5, 'yellow')
        addColorToCards(7, 'orange')
        addColorToCards(8, 'tomato')
        addColorToCards(9, 'grey')
        console.log(arrOfValuesOfCards);
        arrOfValuesOfCards.sort(() => Math.random() - 0.5);
        return arrOfValuesOfCards
    }
    // создание карточки для DOM
    function createCards() {
        let card = document.createElement('div')
        card.classList.add('card')
        return card
    }

    let arrOfCards = []
    let choosedCard = 0
    let countOfGuessedCards = 0
    let gameActivity = true

    document.addEventListener('DOMContentLoaded', () => {
        const settingsBlock = document.querySelector('.settings')
        document.querySelector('button').addEventListener('click', () => {
            settingsBlock.style.display = 'none'
            // получем кол-во пар карточек, выбранных игроком
            let countOfPairs = document.querySelector('select').value
            // генерируем массив объектов значений карточек
            let arrayValuesOfCards = createValuesOfCards(countOfPairs)
            // создаём кол-во карточек равное длине массива 
            for (let i = 0; i < arrayValuesOfCards.length; i++) {
                const gameCard = createCards()
                arrOfCards.push(gameCard)
                document.querySelector('.cards').append(gameCard)
            }
            // перебираем все карточки и вешаем обработчик события при клинке
            for (let i in arrOfCards) {
                arrOfCards[i].addEventListener('click', () => {
                    // условие сработает, если значение disabled карточки равно true, кол-во угаданных
                    // карточек меньше их общего кол-ва,  значение gameActivity равно true
                    if (arrayValuesOfCards[i].disabled && countOfGuessedCards < arrayValuesOfCards.length && gameActivity) {
                        // блокируем повторное нажатие карточки
                        arrayValuesOfCards[i].disabled = false
                        // меняем цвет
                        arrOfCards[i].style.backgroundColor = arrayValuesOfCards[i].color
                        // если choosedCard равна 0, передадим переменой значение первой выбранной из
                        // пары карточки и завершаем функцию 
                        if (!choosedCard) {
                            choosedCard = {
                                index: i,
                                num: arrayValuesOfCards[i].num
                            }
                            return
                            // если первая карточка равна второй
                        } else if (choosedCard.num !== arrayValuesOfCards[i].num) {
                            // для gameActivity пишем значение false, чтобы следующую пару можно было открыть
                            // после setTimeout, где значение становится true
                            gameActivity = false
                            setTimeout(() => {
                                // меняем цвет и значение disabled для обоих карточек обратно
                                arrOfCards[choosedCard.index].style.backgroundColor = 'lightgray'
                                arrayValuesOfCards[choosedCard.index].disabled = true
                                arrOfCards[i].style.backgroundColor = 'lightgray'
                                arrayValuesOfCards[i].disabled = true
                                // очищаем значеме первой выбранной карточки для сравнения со второй
                                choosedCard = 0
                                // возвращаем значение true для поиска следующей пары
                                gameActivity = true
                            },500)
                            // если карточки равны
                        } else {    
                            // колличество угаданных карт += 2,
                            countOfGuessedCards += 2
                            console.log(countOfGuessedCards);
                            // очищаем значеме первой выбранной карточки для сравнения со второй
                            choosedCard = 0
                        }
    
                    }
                    // если кол-во угаданных пар равно кол-ву созданных 
                    if (countOfGuessedCards === arrayValuesOfCards.length) {
                        // очищаем массив и DOM от ранее созданных карточек
                        settingsBlock.style.display = 'flex'
                        arrOfCards = []
                        document.querySelector('.cards').innerHTML = ''
                        // кол-во угаданных карточек возвращаем равным 0
                        countOfGuessedCards = 0
                    }
                })
            }
        })

    })
    
}) ()
