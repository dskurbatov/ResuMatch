let words = 0


function buildHash(text){
  const map = new Map()
  const iterater = new TextIterater(text)
  let word
  while(iterater.isNext()){
    word = iterater.next()
    if(!map.has(word)){
      map.set(word, true)
    }
    words++
  }
  
  return map
}

export default function compare(text){
  const hash = buildHash(text)
  return function(resume){
    const iterater = new TextIterater(resume)
    let count = 0, word;
    while(iterater.isNext()){
      word = iterater.next()
      count += hash.has(word)
    }
    return Math.round(count * 100 / words)
  }
}

// const text = "Frontend Engineers are an essential part of Airbnb's Product Team.  Working closely with designers, we implement the user interface of our web app.  We build libraries and abstractions to make our lives easier, such as O2, our front-end toolkit.  We make the most of modern tools like React, ES6, and SASS, and we ensure our UIs work well on all screen sizes.  Some of us specialize in CSS, some in front-end infrastructure, but all of us are JavaScript pros and full-stack engineers."
// const text2 = 'We build libraries and abstractions to make our lives easier, such as O2, our front-end toolkit.  We make the most of modern tools like React, ES6, and SASS, and we ensure our UIs work well on all screen sizes.  Some of us specialize in CSS, some in front-end infrastructure, but all of us are JavaScript pros and full-stack engineers.'
// const word = "es6"
// console.log(compare(text)(text))
