import React from 'react';
import './index.css'
import split from '../../helpers/split'
import objectBuild from '../../helpers/objectBuild'

class HowItWorks extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      requirements: {
        map: {},
        count: 0
      },
      resume: [],
      fileBoxDisabled: true,
      buttonDisabled: true,
      result: 0,
      errors: null 
    }

    this.onChange = this.onChange.bind(this)
    this.onFile = this.onFile.bind(this)
    this.onClick = this.onClick.bind(this)
    this.compare = this.compare.bind(this)
  }

  onChange(e){ 
    const text = e.target.value
    if(text.length === 0){
      return this.setState({
        fileBoxDisabled: true,
        buttonDisabled: true,
        requirements: {
          map: {},
          count: 0
        },
        result: 0,
        errors: 'Please enter some requirements'
      })
    }
    return this.setState({
      fileBoxDisabled: false,
      requirements: objectBuild(text),
      buttonDisabled: this.state.resume.length === 0,
      errors: null
    })
  }

  onFile(evt){
    const file = evt.target.files[0]
    if(file.size > 200000){ 
      return this.setState({
        buttonDisabled: true, 
        errors: 'File must be less then 200KB'
      })
    }
    const reader = new FileReader()
    
    reader.onload = e => {
      const resume = split(e.target.result)
      return this.setState({
        buttonDisabled: false,
        resume
      })
    }
    reader.readAsText(file)
  }

  onClick(){
    const { requirements, resume} = this.state
    return this.compare(requirements, resume)
  }

  compare({ map, count }, resume){
    const len = resume.length
    let result = 0, i, interval
    for(i = 0; i < len; i++){
      if(map[resume[i]]){
        result++
        this.setState({result: result * 100 / count})
      }
    }
    return
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
            <input type="file" onChange={this.onFile} disabled={this.state.fileBoxDisabled}/>
          </div>
        </form>
        <button onClick={this.onClick} disabled={this.state.buttonDisabled}><h3>Compare</h3></button>
        <span>{this.state.errors}</span>
        <span className={`result ${this.state.result > 80 ? "green" : "red"}`}>{this.state.result}%</span>
      </section>
    )
  }
}

export default HowItWorks;
