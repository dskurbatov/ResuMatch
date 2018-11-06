import TextIterater from './text_iterater'

const split = (text) => {
  const array = []
  const iterater = new TextIterater(text)
  while(iterater.isNext()){
    array.push(iterater.next())
  }
  return array
}
export default split