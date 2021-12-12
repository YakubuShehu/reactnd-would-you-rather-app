let users = {
  neo: {
    id: 'neo',
    name: 'Neo',
    avatarURL: '/images/neo.png',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  morpheus: {
    id: 'morpheus',
    name: 'Morpheus',
    avatarURL: '/images/morpheus.png',
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  trinity: {
    id: 'trinity',
    name: 'Trinity',
    avatarURL: '/images/trinity.png',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
  niobe: {
    id: 'niobe',
    name: 'Niobe',
    avatarURL: '/images/niobe.png',
    answers: {},
    questions: [],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'neo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['neo'],
      text: 'Be able to do the limbo to dodge bullets',
    },
    optionTwo: {
      votes: [],
      text: 'Be able to deflect bullets with your fists'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'trinity',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'Wear cool shades 24/7 (even in the dark)',
    },
    optionTwo: {
      votes: ['trinity', 'neo'],
      text: 'Never look good in shades'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'neo',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'Fight Agent Smith 1v1',
    },
    optionTwo: {
      votes: ['neo'],
      text: 'Keep running from him'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'morpheus',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'Take the blue pill and wake up in your bed, believing whatever you want to',
    },
    optionTwo: {
      votes: ['neo'],
      text: 'Take the red pill, stay in Wonderland, and see how deep the rabbit hole goes'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'morpheus',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['morpheus'],
      text: 'Wear a stylish dark coat everywhere you go',
    },
    optionTwo: {
      votes: ['trinity'],
      text: 'Wear a cape with "The One" written on it'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'trinity',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['trinity'],
      text: 'Only be able to watch the 1999 Matrix for the rest of your life ',
    },
    optionTwo: {
      votes: ['morpheus'],
      text: 'Live in the movie for the rest of your life'
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((res, rej) => {
    const authorizedUser = question.author;
    const formattedQuestion = formatQuestion(question)

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }
      
      users = {
        ...users,
        [authorizedUser]: {
          ...users[authorizedUser],
          questions: users[authorizedUser].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authorizedUser, questionID, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authorizedUser]: {
          ...users[authorizedUser],
          answers: {
            ...users[authorizedUser].answers,
            [questionID]: answer
          }
        }
      }

      questions = {
        ...questions,
        [questionID]: {
          ...questions[questionID],
          [answer]: {
            ...questions[questionID][answer],
            votes: questions[questionID][answer].votes.concat([authorizedUser])
          }
        }
      }

      res()
    }, 500)
  })
}
