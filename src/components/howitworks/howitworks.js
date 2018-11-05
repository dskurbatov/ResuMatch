import React from 'react';
import './index.css'
import compare from '../../compare_using_hash'

class HowItWorks extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      requirementsText: null,
      resumeText: null,
      fileBoxDisabled: true,
      buttonDisabled: true,
      result: 0,
      errors: null
      
    }

    this.onChange = this.onChange.bind(this)
    this.onFile = this.onFile.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onChange(e){ 
    const text = e.target.value
    if(text.length === 0){
      return this.setState({
        fileBoxDisabled: true,
        buttonDisabled: true,
        requirementsText: null,
        result: 0,
        errors: 'Please enter some requirements'
      })
    }
    return this.setState({
      fileBoxDisabled: false,
      requirementsText: text,
      buttonDisabled: this.state.resumeText === null
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
      return this.setState({
        buttonDisabled: false,
        resumeText: e.target.result
      })
    }
    reader.readAsText(file)
  }

  onClick(){
    const { requirementsText, resumeText} = this.state
    return this.setState({
      result: compare(requirementsText)(resumeText)
    })
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
