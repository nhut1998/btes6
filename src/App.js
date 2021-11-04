import { MultipleChois } from './components/MultipleChois/index.js'
import { FilinBlank } from './components/FilinBlank/index.js'


class App {
    state = {
        questionHTML: ' '
    }
    questions = []

    fetchQuestions() {
        const promise = fetch('https://60d048cd7de0b200171082a0.mockapi.io/api/v1/questions', { method: 'GET' })
            .then(response => response.json())
            .then(questions => {
              
                this.renderQuestions(questions)

            })

            .catch(error => {
                console.log(error)
            })
        return promise
    }

    renderQuestions(questions = []) {
        
        let html = ''
        for (const index in questions) {
            const { questionType, id, content, answers } = questions[index]
            html += `<h6 class="mt-3">Câu ${parseInt(index) + 1} : ${content}</h6> `
            switch (questionType) {
                case 1:
                    const multipleChois = new MultipleChois(id, answers)
                    this.questions.push(multipleChois)
                    html += multipleChois.render()
                    break;
                case 2:
                    const filinBlank = new FilinBlank(id, answers)
                    this.questions.push(filinBlank)
                    html += filinBlank.render()
                    break;
                default:
                    break;
            }
        }
        this.state.questionHTML = html
        this.render()

    }
    render() {
        const title = 'truong quoc nhut'
        const {questionHTML} = this.state

        document.getElementById('root').innerHTML = `
        <div>
        <h1 class="text-center">${title}</h1>
        <div class="container">
        ${questionHTML}

       <button class='btn btn-warning' id='reset'>Làm lại</button>
        <button class='btn btn-success' id='submit'>Nộp bài</button>
        <div class='mt-2'>Bạn trả lời đúng <span id='display-total'>0</span>/${this.questions.length}</div>
        
         
        </div>
        
        </div>
        `

        document.getElementById('reset').addEventListener('click', ()=>{
            window.scrollTo(0, 0)
            window.location.reload()
        })

        document.getElementById('submit').addEventListener('click', () => {

            document.getElementById('display-total').innerHTML = 
            this.questions.reduce((total, ques) =>{
               

                console.log(ques.checkExact())
              return  total += ques.checkExact()
               
            },0)
            

            
        
        })


    }

    componentDidMount() {
        this.fetchQuestions()
    }
}


export default new App()