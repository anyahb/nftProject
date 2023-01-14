// making the sidebar to be shown/hidden when clicking the toggleBtn
let side = document.querySelector('.first-column')
let toggleBtn = document.getElementById('toggleBtn')
toggleBtn.addEventListener('click', () => {
    side.classList.toggle('open')
})

//hiding the sidebar title and "my Profile" text when clicking the toggleBtn

let title = document.querySelector('.first-column__title')
toggleBtn.addEventListener('click', () => {
    title.classList.toggle('showHide')
})

let myProfile = document.querySelector('.my-profile')
toggleBtn.addEventListener('click', () => {
    myProfile.classList.toggle('showHide')
})


const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', Authorization: '74df87e8-a684-43a5-bf41-c0765d15ee37'}
};


//hiding the sidebar elements except icons when the window width is less than 480px
if (window.innerWidth < 480) {
    side.classList.remove('open')
}

window.addEventListener("resize", function () {
    if (window.innerWidth < 480) {
        side.classList.remove("open")
        myProfile.classList.add('showhide')
        title.classList.remove('showhide')
    }
})


const createNftList = () => {




    //looping through the array of objects that contains info to display in the nft__option section


    const createOptions = (list) => {

        for (let i = 0; i < list.length; i++) {

            const nftOptions = document.querySelector('.nft__options')
            const nftOption = document.createElement('div')
            nftOption.classList.add("nft__option")
            nftOptions.append(nftOption)


            const nftImg = document.createElement('img')
            nftImg.classList.add("nft__img")
            nftImg.src = list[i].src
            nftOption.append(nftImg)


            //creating nft__title

            const nftTitle = document.createElement('div')
            nftTitle.classList.add("nft__title")
            nftOption.append(nftTitle)
            nftTitle.textContent = list[i].title


            //creating nft__description

            const nftDesc = document.createElement('div')
            nftDesc.classList.add("nft__description")
            nftOption.append(nftDesc)


            //creating intro

            const intro = document.createElement('div')
            intro.classList.add("intro")
            nftDesc.append(intro)

            //creating intro__img

            const introImg = document.createElement('div')
            introImg.classList.add("intro__img")
            intro.append(introImg)

            const introImgSrc = document.createElement('img')
            introImgSrc.src = list[i].icon
            introImg.append(introImgSrc)

            //creating intro__name

            const introName = document.createElement('div')
            introName.classList.add("intro__name")
            intro.append(introName)
            introName.textContent = list[i].name

            //creating points

            const points = document.createElement('div')
            points.classList.add("points")
            nftDesc.append(points)

            //creating points__container

            const pointsContainer = document.createElement('div')
            pointsContainer.classList.add('points__container')
            points.append(pointsContainer)

            //creating points__diamond

            const pointsDiamond = document.createElement('div')
            pointsDiamond.classList.add('points__diamond')
            pointsContainer.append(pointsDiamond)

            const pointsDiamondSrc = document.createElement('img')
            pointsDiamondSrc.classList.add('diam')
            pointsDiamondSrc.src = "./img/diam.png"
            pointsDiamond.append(pointsDiamondSrc)


            //creating points__desc

            const pointsDesc = document.createElement('div')
            pointsDesc.classList.add('points__desc')
            pointsContainer.append(pointsDesc)

            const pointsDescText = document.createTextNode(`${list[i].points} ETH`)
            pointsDesc.append(pointsDescText)


        }
    }

    const contractAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'
    const chain = 'ethereum'

    fetch(`https://api.nftport.xyz/v0/nfts/${contractAddress}?chain=${chain}`, options)
        .then(response => response.json())
        .then(response => {

            const allNfts = response.nfts
            const cutNfts = allNfts.slice(0,6)
            const customNftList = cutNfts.map(nft => {
                return {
                    src: nft.cached_file_url,
                    title: "Wrost Artwork 1",
                    name: "Tom Johnson",
                    points: 3.5,
                    icon: "./img/tom.png"
                }
            })

            createOptions(customNftList)


            console.log(response.nfts)

        })
        .catch(err => console.error(err));



}

createNftList()




