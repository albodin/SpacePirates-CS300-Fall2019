const SPRITES = {
    player: {
        img: null,
        data_uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfUlEQVQ4jb2TsQ0AIQhFbxcmYA1ncAY6G2ZgBRdwSa7CUCg5uUQSGuG/5JPv8wTVAbQDaLQTigeipiAmtj6GeICJjwCNSIVZhVkb0ez7ALORAgxELVW0VJmQNKAD5C2Y+M4R/dFWRwzz4IOzsxCm0ob+bbW8BXxd/vVDV/UCqZnHwNIgM74AAAAASUVORK5CYII="
    },
    planet: {
        img: null,
        data_uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jY2SsRGFIAyGXYij0M4OB6CgtGIEhqB1AGdgAYrXvxWY5n+FF40x+uQudwrky5+fdJ2yxqkh14JcC8apwfQzTD9Du3tJ5Mnr9/MeNJQFQ1n2BPofp7Z/2xR1CL/Eq1NwqE0RLni44HECUBDoKU4qZN9aSHW5FrjgN4hW9Y0amyJsimcAb4X2pR90Zvp580EzSlaXZwSwKR4AqeROOvfABY+ODwqXy/e50XS+myifkfevPW+u5TBQzsGdmbIlmkh1lP8BLtUlRBtlAjwm36m5jK5YP/Th/2+NxxGKAAAAAElFTkSuQmCC",
    },
    spaceStation: {
        img: null,
        data_uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAo0lEQVQ4jaVSwQ3EIAzLYLzoFuyQN+qffFihiL06je9zkWiAA/UiWTyiGMcOERE5d2D0ZhHUUpBFQN/S3qOcO2DRDiu01xHYisyYYTqgP66gah6EPiRkEZzXvfX6kBCZ4UPCKwXLlUZeLI0bpdHua3tbBLpaG+l2lNabyIxaSj+4MmqpoJaC87o72AOaetCeagur4FUK7eX9ncIWgU1ATf11TB+XgYVFKDX97gAAAABJRU5ErkJggg==",
    },
    asteroid: {
        img: null,
        data_uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmElEQVQ4ja1SSQqAMAzMq3qM93ygYP/g/2/xNBKnSYtgQNDiTGapyF/TVT1+DzO/zvN5hpkPM6/wr4lgfudFKbireledFByt+dFaTYJtXdXZAkhBspWe+Ye6iQCHkQBn2BytpQRMAkD0vvSPH6JcDi6Ct0HG5LfV8UA6h1amn8mrAkub4G6rzjmbpY3swpQ1fpnlTfyctojc1DLkCQAUSW8AAAAASUVORK5CYII=",
    },
    kokaKola: {
        img: null,
        data_uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaklEQVQ4jd2SsQnAMBADs4eLoOI7957F04SfwWtoBO+mVA6BNLYDMUQgUPOHQL9t/1RxVyVVSREQAR0xqrirG9AOCaiSKu79gGSmPYSHk9k4gMA7QL7lYUA2uzwFaEtUclGD6RXWP9KnOgH7KI6dVW01EgAAAABJRU5ErkJggg==",
    },
    miniMart: {
        img: null,
        data_uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAo0lEQVQ4jbWSsQ0DMQhFbwoKZnF3xWUUWpdZgc51enqPk2l+Ki7EsS1H0SEhhIBn9PG2XWUigtanA5kIZobCjFrrNJoZMhG6gEw0BcS+IcA36cUhoGe344D7sngp7Uhphwt5fzxPAWNtCaCqUNX/AEsbFGYU5q+m9g/EWmF+C+mJiMDX7nkEfgAy0ZnEV9orxFqcGWowAyyJONNg+Qruy4Bf7QWMOgdJKLrQYgAAAABJRU5ErkJggg==",
    },
    freighter: {
        img: null,
        data_uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiElEQVQ4je2QMQrAMAwD+5r2A108px9INo16Qfr/RZ0ckpAEunWowBgMOsvets8qhEuzWhoBiKQACEAxkRTJNQCA7px159xAHGRmY/N+nKoLQNNDuEofbvXYvr1OQVIxJsWYmjOm//CoZqb9OEsfmacn9SAzK+Z6tgQ4pDf1syWgVr/5NeDXXA9zwaPrn8CPiQAAAABJRU5ErkJggg==",
    }
}

// Loading data URI's into images is an asynchronous operation
for (let sprite in SPRITES) {
    sprite = SPRITES[sprite]
    let img = new Image()
    img.setAttribute("src", sprite.data_uri)
    img.addEventListener('load', () => {
        sprite.img = img
    })
}

