(() => {
    function createArrOfValuesOfCards(amount) {
        let arrOfValuesOfCards = []
        for (let i = 0; i < amount; i++) {
            arrOfValuesOfCards.push(
                {
                    num: i + 1,
                    disabled: true
                },
                
                {
                    num: i + 1,
                    disabled: true
                },
            )
        }
        console.log(arrOfValuesOfCards);
        return arrOfValuesOfCards.sort(() => Math.random() - 0.5);
    }
    function createCards() {
        let card = document.createElement('div')
        card.classList.add('card', 'card-hidden')
        // card.textContent = number
        return card
    }

    let arrOfCards = []
    let arrOfChooseCards = []
    let countOfguessedCards = 0

    document.addEventListener('DOMContentLoaded', () => {
        let arrayValuesOfCards = createArrOfValuesOfCards(8)
        for (value of arrayValuesOfCards) {
            const card = createCards()
            arrOfCards.push(card)
            document.querySelector('.cards').append(card)
        }
        for (let i in arrOfCards) {
            arrOfCards[i].addEventListener('click', () => {
                if (arrayValuesOfCards[i].disabled) {
                    arrayValuesOfCards[i].disabled = false
                    arrOfChooseCards.push(i)
                    arrOfCards[i].classList.remove('card-hidden')
                    if (arrayValuesOfCards[i].num === 1) {
                        arrOfCards[i].style.background = 'red'
                    }
                    if (arrayValuesOfCards[i].num === 2) {
                        arrOfCards[i].style.background = 'blue'
                    }
                    if (arrayValuesOfCards[i].num === 3) {
                        arrOfCards[i].style.background = 'green'
                    }
                    if (arrayValuesOfCards[i].num === 4) {
                        arrOfCards[i].style.background = 'yellow'
                    }
                    if (arrayValuesOfCards[i].num === 5) {
                        arrOfCards[i].style.background = '#fff'
                    }
                    if (arrayValuesOfCards[i].num === 6) {
                        arrOfCards[i].style.background = '#000'
                    }
                    if (arrayValuesOfCards[i].num === 7) {
                        arrOfCards[i].style.background = '#5c5c5c'
                    }
                    if (arrayValuesOfCards[i].num === 8) {
                        arrOfCards[i].style.background = '#2d2d2d'
                    }
                    if (arrOfChooseCards.length === 2) {
                        if (arrayValuesOfCards[arrOfChooseCards[0]].num === arrayValuesOfCards[arrOfChooseCards[1]].num) {
                            countOfguessedCards += 2
                            arrOfChooseCards = []
                        } else if (arrayValuesOfCards[arrOfChooseCards[0]].num !== arrayValuesOfCards[arrOfChooseCards[1]].num) {
                            arrOfCards[arrOfChooseCards[0]].classList.add('card-hidden')
                            arrOfCards[arrOfChooseCards[1]].classList.add('card-hidden')
                            arrOfCards[arrOfChooseCards[0]].style.background = 'lightgray'
                            arrOfCards[arrOfChooseCards[1]].style.background = 'lightgray'
                            arrayValuesOfCards[arrOfChooseCards[0]].disabled = true
                            arrayValuesOfCards[arrOfChooseCards[1]].disabled = true
                            arrOfChooseCards = []
                        }
                    }
    
                    console.log(countOfguessedCards);
                } else {
                    return
                }

                if (countOfguessedCards === arrayValuesOfCards.length) {
                    console.log('победа');
                }
            })
        }
    })
    
}) ()