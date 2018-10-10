import React from 'react';
import './index.css'
import compare from '../../compare_using_hash'

class HowItWorks extends React.Component {
  constructor(props){
    super(props)
    this.compareTo = null
    this.text = null

    this.onChange = this.onChange.bind(this)
    this.onFile = this.onFile.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onChange(e){
    const textBox = document.querySelector('input[type="file"]')
    const text = e.target.value
    if(text.length === 0){
      textBox.disabled = true
      return
    }
    textBox.disabled = false
    this.compareTo = compare(text)
  }

  onFile(evt){
    const button = document.querySelector('.compare')
    const file = evt.target.files[0]
    if(file.size > 200000){
      document.querySelector('.result').textContent = 'File must be less then 20Kb'
      button.disabled = true
      return  
    }
    const reader = new FileReader()
    button.disabled = false
    
    reader.onload = e => {
      this.text = e.target.result
    }
    reader.readAsText(evt.target.files[0])
  }

  onClick(){
    document.querySelector('.result').textContent = this.compareTo(this.text) + "%"
  }

  render(){
    return (
      <section>
        <h1>HOW IT WORKS</h1>
        <p>We calculate your match rate and let you know how to optimize your resume</p> 
        <form className="matching">
          <textarea 
            maxLength="1000"
            placeholder="please copy and paste your job requirements here. 1000 characters limit" 
            onChange={this.onChange}>
          </textarea>
          <div className="drag_and_drop"> 
            <input type="file" onChange={this.onFile} disabled/>
          </div>
        </form>
        <button className="compare" onClick={this.onClick} disabled><h3>Compare</h3></button>
        <span className="result"></span>
      </section>
    )
  }
}

export default HowItWorks;
