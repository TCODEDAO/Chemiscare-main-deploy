export function questionsReturn(questions) {
    return [...questions].sort(() => Math.random() - 0.5).slice(0, 11)
}
