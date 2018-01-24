'use strict'

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM Loaded')

  const bingoSerie = [
    '122122122',
    '313113111',
    '111331212',
    '121212132',
    '212111223',
    '131111331'
  ]
  const serie = new BingoSerie()
  const ticketElements = document.querySelectorAll('.ticket')
  for (let e = 0; e < ticketElements.length; e++) {
    const ticket = new BingoTicket(bingoSerie[e])
    ticket.data.forEach((row, i) => {
      row.forEach((item, j) => {
        const index = i * 9 + j
        if (item === 0) {
          ticketElements[e].children[index].classList.add('-is-empty')
        } else {
          ticketElements[e].children[index].textContent = serie.selectNext(j)
          ticketElements[e].children[index].addEventListener('click', e => {
            e.target.classList.toggle('-is-marked')
          })
        }
      })
    })
  }
  document.querySelector('button').addEventListener('click', e => {
    const ticketElements = document.querySelectorAll('.ticket')
    for (let e = 0; e < ticketElements.length; e++) {
      console.log(27 - ticketElements[e].querySelectorAll('.-is-empty').length)
    }
  })
})

function random (maxValue) {
  return Math.floor(Math.random() * maxValue)
}

function BingoSerie () {
  this.data = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]
  ]
  this.selectNext = function (column) {
    const arr = this.data[column]
    const index = random(arr.length)
    this.data[column] = arr.slice(0, index).concat(arr.slice(index + 1))
    return arr[index]
  }
}

function BingoTicket (ticket) {
  this.data = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  function selectRandomRow (obj, rowControl, col) {
    const candidates = rowControl.available(obj, col)
    const selection = Number(candidates[random(candidates.length)])
    obj.data[selection][col] = 1
    rowControl.increase(selection)
  }

  function init (obj) {
    const arr = ticket.split('').map(k => Number(k))
    const rows = {
      one: 0,
      two: 0,
      three: 0,
      available: function (obj, col) {
        let s = ''
        if (this.one < 5 && obj.data[0][col] === 0) s = '0'
        if (this.two < 5 && obj.data[1][col] === 0) s = s + '1'
        if (this.three < 5 && obj.data[2][col] === 0) s = s + '2'
        return s
      },
      increase: function (value) {
        if (value === 0) {
          this.one++
        } else if (value === 1) {
          this.two++
        } else if (value === 2) {
          this.three++
        }
      }
    }
    // Process Number 3
    arr.forEach((element, index) => {
      if (element === 3) {
        for (let i = 0; i < 3; i++) {
          selectRandomRow(obj, rows, index)
        }
      }
    })
    // Process Number 2
    arr.forEach((element, index) => {
      if (element === 2) {
        for (let i = 0; i < 2; i++) {
          selectRandomRow(obj, rows, index)
        }
      }
    })
    // Process Number 1
    arr.forEach((element, index) => {
      if (element === 1) {
        selectRandomRow(obj, rows, index)
      }
    })
  }

  init(this)
}
