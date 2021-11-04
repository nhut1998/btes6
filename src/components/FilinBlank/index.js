import Question from '../Question/index.js'

export class FilinBlank extends Question {
    constructor(...restProps) {
        // console.log(restProps)
        super(...restProps)

    }

    checkExact(){
      return 0
    }

    render() {
        return `
      <div class="form-group">
      
      <input type="text"
        class="form-control" id="ans-${this.id} placeholder="Nhập đáp án">
      </div>
      
      
      `

    }


}
