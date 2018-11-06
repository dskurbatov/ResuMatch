function isAlphabet(char){
  return /[a-zA-Z]/.test(char)
}

class TextIterater {
  constructor(text){
    this.text = text
    this.idx = 0
    this.size = text.length
  }

  isNext(){
    while(!isAlphabet(this.text[this.idx])){
      this.idx++
    }
    return this.idx < this.size
  }
  // return next word
  next(){
    let word = ''
    while(this.text[this.idx] && /[a-zA-Z0-9'-]/.test(this.text[this.idx])){
      word += this.text[this.idx].toLowerCase()
      this.idx++
    }
    return word
  }
}

export default TextIterater