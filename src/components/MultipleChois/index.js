import Question from '../Question/index.js'

export class MultipleChois extends Question {
    constructor(...restProps) {
        // console.log(restProps)
        super(...restProps)



    }


    renderChoices() {
        return this.answers.reduce((html, ans) => {
            return html += `
            <div class="form-check">
         <label class="form-check-label">
         <input type="radio" class="form-check-input" name="ans-${this.id}">
         ${ans.content}
         </label>
         </div>
            
            `

        }, '')
    }

checkExact () {
    const inputs = document.querySelectorAll(`input[name="ans-${this.id}"]`)

    let isExact = false

    for (const ansIdx in this.answers) {
      inputs[ansIdx].setAttribute('disabled', true)

      if (this.answers[ansIdx].exact) {
        isExact = inputs[ansIdx].checked 
        inputs[ansIdx].parentElement.classList.add(`text-${isExact ? 'success' : 'danger'}`, 'font-weight-bold')
      }
    }

    return isExact ? 1 : 0
  }

    render() {
        return this.renderChoices()
    }


}

