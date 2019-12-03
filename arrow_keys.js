{
    const UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39, S = 83
    document.addEventListener('keydown', e => {
        // Ignore if in shop
        if (document.querySelector('#modal-parent').firstChild)
            return;
        switch (e.keyCode) {
            case UP: moveSpacecraft(3,1); break
            case DOWN: moveSpacecraft(1,1); break
            case LEFT: moveSpacecraft(4,1); break
            case RIGHT: moveSpacecraft(2,1); break
            case S: fireSensors(); break
            default: return
        }
        e.preventDefault()
    })
}
