const playSound = async(name) => {
    console.log(name);
    const url = `${process.env.REACT_APP_PUBLIC_URL}/sounds/${name}.mp3`
    const a = new Audio(url);
   await a.play();
}

export {playSound}