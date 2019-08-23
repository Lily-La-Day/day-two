
document.addEventListener('DOMContentLoaded', () => {

  const question = document.querySelector('.question')
  const orderContainer = document.querySelector('.order-container')




  const questions = [
    'Why do you want to be a developer?', 'Tell me about your background.', 'Where have you worked in the past?', 'How’d you get into web development?', 'How do you deal with people you don\'t necessarily get on with?', 'Tell me about a time you had an argument or dispute at work.', 'What is your biggest weakness?', 'How did you go about working in a group? What position did you assume?', 'What do you do when you come across a problem you can\'t solve?', 'Name one time you have had to turn around an issue during a difficult situation.', 'Why do you think you will be successful in this job?', 'Tell me about a time when you worked towards a very stretching goal/ target. How successful were you in meeting your target?', 'Have you ever had a bad experience with an employer?', 'Where do you expect to be in five years’ time?', 'Give an example of a time when you showed initiative.', 'What motivates you?', 'Tell me a about a time when you had a problem, (technical and non- technical) and what did you do about it.', 'Tell me about your involvement during your last role when you worked towards a very stretching target while leading a team: what made it stretching?', 'What\'s your favourite programming language and why?'
  ]

  const getQuestion = () => {
    return questions[Math.floor(Math.random() * question.length -1)]
  }

  // question.addEventListener('click', )

  // const functions = [vowelCount, reverseWord, wordType]

  const vowelCount = (sentence) => {
    const vowelArray = ['a', 'e', 'i', 'o', 'u']
    return sentence.split('').filter(letter => {

      if(vowelArray.includes(letter)) return letter

    }).length


  }



  const reverseWord = (sentence) => {
    const split = sentence.split(' ')
    const reversed = split.map(word => {
      return word.split('').reverse().join('')
    })
    return reversed

  }

  // const changeOrder = (e, el) => {
  //   console.log(e.target.innerText)
  //
  //
  //   el.addEventListener('dragend', function changeOrder(e, el) {
  //     console.log(e, el)
  //   })
  // }





  const toChangeOrder = () => {
    const draggable = document.querySelectorAll('.drag')
    // console.log(draggable)
    draggable.forEach(el => {
      // console.log(el)

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

      options[i].innerHTML = `<h3  data-index=${i} class="drag droptarget drag-target test" id="dragtarget" >${options[i].innerText}</h3> <h3 data-index=${i} class="hidden" >${options[i].innerText}</h3>`

      toChangeOrder()
    }
  }









  const makeDiv = (word) => {


    const option = document.createElement('div')
    option.innerText = word
    option.classList.add('container')
    option.classList.add('droptarget')


    orderContainer.appendChild(option)


  }

  document.addEventListener('dragstart', function(event) {
  // The dataTransfer.setData() method sets the data type and the value of the dragged data
    event.dataTransfer.setData('Text', event.target.dataset.index)
    console.log(event.target.dataset.index)
    // const before = document.querySelector(`[data-index="${data*10}"`)
    // before.dataTransfer.setData('Text', )
    // console.log('drag start', event.target.innerText)
    // event.dataTransfer.setData('Text', event.target.id)
  })

  document.addEventListener('dragenter', function(event) {
    if ( event.target.classList.contains('droptarget')) {
      const data = event.dataTransfer.getData('Text')
      // const before = document.querySelector(`[data-index="${data}"`)
      console.log(data)
      // console.log('dragging data', data)
      // event.target.innerText = data
    }
  })

  document.addEventListener('dragover', function(event) {
    event.preventDefault()
  })

  document.addEventListener('drop', function(event) {
    event.preventDefault()
    if ( event.target.classList.contains('droptarget')) {

      const data = event.dataTransfer.getData('Text')
      console.log('data', data)
      const before = document.querySelector(`[data-index="${parseInt(data)*10}"`)
      console.log(before)
      const nouveau = document.createElement('h3')
      nouveau.innerText = before.innerText


      if(nouveau.innerText !== '')

        event.target.childNodes[0].data = nouveau.innerText

      // before.innerHTML = `<h3 data-index=${event.target.dataset.index} class="drag droptarget drag-target" id="dragtarget" >${event.target.nextElementSibling.innerText}</h3><h3 data-index=${event.target.dataset.index} class="hidden" >${event.target.nextElementSibling.innerText}</h3>`
      before.firstChild.innerText = event.target.nextElementSibling.innerText
      before.lastChild.innerText = event.target.nextElementSibling.innerText

      const changeSibling = () => {
        if(nouveau.innerText !== '')
          console.log('before', event.target.nextElementSibling, before.innerText)
        event.target.nextElementSibling.innerText = nouveau.innerText
      }

      setTimeout(changeSibling, 100)
      toChangeOrder()

    }
  })




  const wordType = (sentence) => {

    sentence = sentence.replace(/[^A-Za-z]/g, ' ').toLowerCase()
    console.log(sentence.trim())
    console.log(sentence.trim().split(' ').length)

    let wordTypes = []
    const array = []
    wordTypes = sentence.trim().split(' ').map(word => {

      word = axios.get(`https://wordsapiv1.p.mashape.com/words/${word}`,  {

        headers: { 'X-Mashape-Key': '3460369150msh8609f9e537602d4p1446a9jsnb662278c8800'}
      })
        .then((res) => {

          array.concat(res.data.results[0].partOfSpeech)
          if (!res.data.results ) word = 'pronoun'
          else  word = res.data.results[0].partOfSpeech



          makeDiv(word)






        })

        .catch((err => console.log(err)))






    })
    setTimeout(getLength, 2000)
    console.log(wordTypes)

  }
  // setTimeout(getLength, 100)
  wordType(questions[0])


  const functionQs = [

    {
      function: vowelCount,
      question: 'How many vowels are there in this setence?'
    },
    {
      function: reverseWord,
      question: 'Write this sentence with the letters of each word in reverse order.'
    },
    {
      function: wordType,
      question: 'Put the word types in the correct order to correspond with the words in this sentence.'
    }
  ]





  //
  // console.log(questions)

})
