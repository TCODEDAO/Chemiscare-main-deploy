export function questionsReturn(questions, task) {

    return [...questions].filter(question => question.task === task).sort(() => Math.random() - 0.5).slice(0, 11)
}
