
document.addEventListener('DOMContentLoaded', () => {

  const question = document.querySelector('.question')
  const orderContainer = document.querySelector('.order-container')
  const button = document.querySelector('.submit-button')
  const win = document.querySelector('.win')
  const next = document.querySelector('.next')
  const writingArea = document.querySelector('.writing-area')
  const container = document.querySelector('.order-container')
  const correct = document.querySelector('.correct')

  const sentenceContainer = document.querySelector('.sentence')

  const questions = [
    'Why do you want to be a developer?', 'Tell me about your background.', 'Where have you worked in the past?', 'How did you get into web development?', 'How do you deal with people you do not necessarily get on with?', 'Tell me about a time you had an argument or dispute at work.', 'What is your biggest weakness?', 'How did you go about working in a group and what position did you assume?', 'What do you do when you come across a problem you can not solve?', 'Name one time you have had to turn around an issue during a difficult situation.', 'Why do you think you will be successful in this job?', 'Tell me about a time when you worked towards a very stretching goal/ target. How successful were you in meeting your target?', 'Have you ever had a bad experience with an employer?', 'Where do you expect to be in five years’ time?', 'Give an example of a time when you showed initiative.', 'What motivates you?', 'Tell me a about a time when you had a problem, (technical and non- technical) and what did you do about it.', 'Tell me about your involvement during your last role when you worked towards a very stretching target while leading a team', 'What is your favourite programming language and why?'
  ]









  const getPhrase = () => {
    wordType(questions[Math.floor(Math.random() * questions.length -1)])
  }




  const vowelCount = (sentence) => {

    container.style.display = 'none'
    writingArea.style.display = 'flex'
    question.innerText = 'How many vowels?'
    sentenceContainer.innerText = sentence
    const vowelArray = ['a', 'e', 'i', 'o', 'u']
    correct.innerText = sentence.split('').filter(letter => {

      if(vowelArray.includes(letter)) return letter

    }).length



  }



  const reverseWord = (sentence) => {
    container.style.display = 'none'
    writingArea.style.display = 'flex'
    question.innerText = 'Type The sentence below but reverse the letters of each word'
    sentenceContainer.innerText = sentence
    const split = sentence.split(' ')
    const reversed = split.map(word => {
      return word.split('').reverse().join(' ')
    })
    correct.innerText = reversed

  }




  const toChangeOrder = () => {
    const draggable = document.querySelectorAll('.drag')
    draggable.forEach(el => {
      el.draggable = true
    })

  }




  const getLength = () => {
    const length = [...document.querySelectorAll('.droptarget')].length
    const options = document.querySelectorAll('.droptarget')
    console.log(options)
    // console.log(length)
    for(let i = 0; i < length; i ++) {
      options[i].dataset.index = i*10

      options[i].innerHTML = `<h3  data-index=${i} class="drag droptarget drag-target" id="dragtarget" >${options[i].innerText}</h3> <h3 data-index=${i} class="hidden" >${options[i].innerText}</h3>`

      toChangeOrder()
    }
  }

  const correctOrder = (word) => {


    const correct = document.createElement('div')

    correct.classList.add('container')
    correct.classList.add('sentence')


    axios.get(`https://wordsapiv1.p.mashape.com/words/${word}`,  {

      headers: { 'X-Mashape-Key': '3460369150msh8609f9e537602d4p1446a9jsnb662278c8800'}
    })
      .then((res) => {
        let type = ''
        console.log(word)


        if (!res.data.results ) type = 'pronoun'
        else  type = res.data.results[0].partOfSpeech
        if (word === 'why'){

          type = 'interrogative'

        }
        if (word === 'do'){

          type = 'adverb'

        }


        correct.innerHTML = `<h3>${word}</h3><h4 class="correct hidden">${type}</h4>`

      })


    orderContainer.appendChild(correct)



  }

  const determine = (e) => {
    e.preventDefault()
    let correct
    let answers
    const correctArr = [...document.querySelectorAll('.correct')]
    if(correctArr.length > 0)
      correct = correctArr.map(el => el.innerText)
    const answersArr = [...document.querySelectorAll('.drag-target')]
    if(answersArr.length > 0)
      answers = answersArr.map(el => el.innerText)
    else correct =
    console.log(answers, correct)
    winFunction(answers, correct)
  }

  button.addEventListener('click', determine)


  const makeDiv = (word) => {


    const option = document.createElement('div')
    option.innerText = word
    option.classList.add('randomise')
    option.classList.add('container')
    option.classList.add('droptarget')


    orderContainer.appendChild(option)


    setTimeout(distribute, 300)

  }
  const distribute = () =>{
    const randoms = [...document.querySelectorAll('.randomise')]
    console.log(Math.floor(Math.random() * randoms.length - 1))

    randoms[Math.floor(Math.random() + randoms.length - 1)].style.gridColumn = Math.floor(Math.random() + randoms.length - 1)

  }

  document.addEventListener('dragstart', function(event) {
  // The dataTransfer.setData() method sets the data type and the value of the dragged data
    event.dataTransfer.setData('Text', event.target.dataset.index)
  })


  document.addEventListener('dragover', function(event) {
    event.preventDefault()
  })

  document.addEventListener('drop', function(event) {
    event.preventDefault()
    if ((event.target.classList.contains('droptarget')) && (event.target.draggable === true)) {

      const data = event.dataTransfer.getData('Text')
      console.log('data', data)
      const before = document.querySelector(`[data-index="${parseInt(data)*10}"`)
      console.log(before)
      const nouveau = document.createElement('h3')
      nouveau.innerText = before.innerText


      if(nouveau.innerText !== '')

        event.target.childNodes[0].data = nouveau.innerText

      before.firstChild.innerText = event.target.nextElementSibling.innerText
      before.lastChild.innerText = event.target.nextElementSibling.innerText

      const changeSibling = () => {
        if(nouveau.innerText !== '')

          event.target.nextElementSibling.innerText = nouveau.innerText
      }

      setTimeout(changeSibling, 100)
      toChangeOrder()


    }
  })




  const wordType = (sentence) => {
    container.style.display = 'grid'
    writingArea.style.display = 'none'
    question.innerText = 'Put the word types in the correct order'
    sentenceContainer.innerText = sentence
    sentence = sentence.replace(/[^A-Za-z]/g, ' ').toLowerCase()
    const correct = sentence.trim().split(' ').map(word => correctOrder(word))
    wordTypes = sentence.trim().split(' ').map(word => {

      axios.get(`https://wordsapiv1.p.mashape.com/words/${word}`,  {

        headers: { 'X-Mashape-Key': '3460369150msh8609f9e537602d4p1446a9jsnb662278c8800'}
      })
        .then((res) => {
          let type = ''
          if (!res.data.results ) type = 'pronoun'
          else  type = res.data.results[0].partOfSpeech
          if (word === 'why'){

            type = 'adverb'

          }
          if (word === 'do'){

            type = 'adverb'

          }




          makeDiv(type)
        })

        .catch((err => console.log(err)))

    })


    setTimeout(getLength, 2000)


  }




  const winFunction = (answers, correct) => {
    console.log('win', answers, correct)
    win.classList.remove('hidden')
    if(answers.join() !== correct.join()) win.innerText = 'Incorrect'
    if(answers.join() === correct.join()) win.innerText = 'correct'

  }



  const makeQuestion = () => {

    const sentence = questions[Math.floor(Math.random() * questions.length -1)]
    next.addEventListener('click', getQuestion(sentence))

  }
  const quizQuestions = ['reverseWord', 'vowelCount', 'wordType']

  const getQuestion = () => {
    const sentence = questions[Math.floor(Math.random() * questions.length -1)]

    const func = quizQuestions[Math.floor(Math.random() * quizQuestions.length )]

    const functionVar = eval(func)
    console.log(typeof functionVar(sentence))

  }

  const changeHandler = (e) => {

    const data = e.target.value
    console.log(data)
  }

  next.addEventListener('click', getQuestion)

  writingArea.addEventListener('keydown', changeHandler)

  // makeQuestion()














})
