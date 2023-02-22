// making the sidebar to be shown/hidden when clicking the toggleBtn
let side = document.querySelector('.navigation')
let toggleBtn = document.getElementById('navigation__toggle-btn')
toggleBtn.addEventListener('click', () => {
    side.classList.toggle('open')
})

//hiding the sidebar title and "my Profile" text when clicking the toggleBtn

let title = document.querySelector('.navigation__title')
toggleBtn.addEventListener('click', () => {
    title.classList.toggle('showHide')
})

let myProfile = document.querySelector('.navigation__my-profile')
toggleBtn.addEventListener('click', () => {
    myProfile.classList.toggle('showHide')
})


const apiKey = '74df87e8-a684-43a5-bf41-c0765d15ee37'
const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', Authorization: apiKey}
};


//hiding the sidebar elements except icons when the window width is less than 480px
if (window.innerWidth < 480) {
    side.classList.remove('open')
    title.classList.remove('showHide')
    myProfile.classList.remove('showHide')
}



window.addEventListener("resize", function () {
    if (window.innerWidth < 480) {
        side.classList.remove("open")
        title.classList.remove('showHide')
        myProfile.classList.remove('showHide')
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
            introImgSrc.classList.add("intro-src")
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


    const getNfts = () => {
        const contractAddress = '0x39ee2c7b3cb80254225884ca001f57118c8f21b6'
        const chain = 'ethereum'

        fetch(`https://api.nftport.xyz/v0/nfts/${contractAddress}?chain=${chain}`, options)
            .then(response => response.json())
            .then(response => {
                const contractInfo = response.contract
                const creatorIcon = contractInfo.metadata.thumbnail_url
                const allNfts = response.nfts
                const cutNfts = allNfts.slice(0, 6)
                const customNftList = cutNfts.map(nft => {
                    const metaData = nft.metadata

                    const attributes = metaData.attributes
                    const randomIndexTitle = 0
                    const randomTitle = attributes[randomIndexTitle].value

                    const randomIndexName = 2
                    const randomName = attributes[randomIndexName].value
                    return {
                        src: nft.cached_file_url,
                        title: randomTitle,
                        name: randomName,
                        points: 3.5,
                        icon: creatorIcon
                    }
                })

                createOptions(customNftList)


            })
            .catch(err => console.error(err));
    }

    getNfts()
}

createNftList()


const createTopCreatorsList = () => {

    const topCreators = (list) => {

        const chartContainer = document.querySelector('.chart__container')
        const chartHeader = document.createElement('div')
        chartHeader.classList.add("chart__header")
        chartContainer.append(chartHeader)


        const chartTitle = document.createElement('div')
        chartTitle.classList.add("chart__title")
        chartTitle.textContent = "TOP CREATORS"
        chartHeader.append(chartTitle)


        const chartLink = document.createElement('div')
        chartLink.classList.add("chart__link")
        chartLink.textContent = "See all"
        chartHeader.append(chartLink)

        for (let i = 0; i < list.length; i++) {

            const creators = document.createElement('div')
            creators.classList.add("creators")
            chartContainer.append(creators)

            const creator = document.createElement('div')
            creator.classList.add("creator")
            creators.append(creator)

            const introItems = document.createElement('div')
            introItems.classList.add('items') /*kak dobavit dva classa - creator__intro items*/
            creator.append(introItems)

            const itemsPic = document.createElement('div')
            itemsPic.classList.add('items__pic')
            introItems.append(itemsPic)
            const itemsPicImg = document.createElement('img')
            itemsPicImg.classList.add("items-img")
            itemsPicImg.src = list[i].src
            itemsPic.append(itemsPicImg)

            const itemsText = document.createElement('div')
            itemsText.classList.add('items__text')
            introItems.append(itemsText)
            itemsText.textContent = list[i].name

            const creatorButton = document.createElement('button')
            creatorButton.classList.add("creator__button")
            creatorButton.textContent = "Follow"
            creator.append(creatorButton)
        }
    }


    const getTopCreators = () => {
        const contractAddress = '0x892848074ddea461a15f337250da3ce55580ca85'
        const chain = 'ethereum'

        fetch(`https://api.nftport.xyz/v0/nfts/${contractAddress}?chain=${chain}`, options)
            .then(response => response.json())
            .then(response => {
                const allCreatorNfts = response.nfts
                const cutCreatorNfts = allCreatorNfts.slice(0, 20)
                const customCreatorNftList = cutCreatorNfts.map(nft => {

                    const creatorIcon = nft.cached_file_url
                    const creatorName = nft.metadata.name

                    return {
                        src: creatorIcon,
                        name: creatorName
                    }
                })

                topCreators(customCreatorNftList)

            })
            .catch(err => console.error(err));
    }

    getTopCreators()

}

createTopCreatorsList()





