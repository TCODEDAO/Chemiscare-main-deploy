export const playSound = async (name, volume = 0.5) => {
    const url = `${process.env.REACT_APP_PUBLIC_URL}/sounds/${name}.mp3`
    const a = new Audio(url)

    a.volume = volume

    await a.play()
}
