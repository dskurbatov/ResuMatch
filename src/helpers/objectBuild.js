import TextIterater from './text_iterater'

const objectBuild = (text) => {
  const obj = {}
  let count = 0
  const iterater = new TextIterater(text)
  let word = null
  while(iterater.isNext()){
    word = iterater.next()
    if(!obj[word]){
      obj[word] = true
    }
    count++
  }
  return {
    map: obj,
    count
  }
}

export default objectBuild