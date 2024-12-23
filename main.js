let fixedNav = document .querySelector('.header')
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixedNav.classList.add('.active') : fixedNav.classList.remove('.active')
})

/////////////quran sec////////////////////

let surahsContainer = document.querySelector('.surahscontainer')
getSurahs()

function getSurahs(){
//fetch surahs meta data 
    fetch("https://api.alquran.cloud/v1/meta")
    .then(response => response.json())
    .then(data=>{
        let surahs = data.data.surahs.references;
        let numberOfSurahs = 114;
        surahsContainer.innerHTML = "" ;
        for(let i = 0 ; i < numberOfSurahs ; i++){
            surahsContainer.innerHTML += 
            `<div class="surah">
                <p>${surahs[i].name}</p>
                <p>${surahs[i].englishName}</p>
            </div>`
        }
        let SurahsTitels = document.querySelectorAll('.surah'); 
        let popup = document.querySelector('.surah-popup'),
            AyatContainer = document.querySelector('.ayat');
                SurahsTitels.forEach((title,index)=>{
                title.addEventListener('click',()=>{
                    fetch(`https://api.alquran.cloud/v1/surah/${index+1}`)
                    .then(response => response.json())
                    .then(data=>{
                        AyatContainer.innerHTML = "" ;
                        let Ayat = data.data.ayahs;
                        Ayat.forEach(aya=>{
                            popup.classList.add('active');
                            AyatContainer.innerHTML += `
                            <p>(${aya.numberInSurah}) - ${aya.text}</p>
                            `
                        })
                    })
                })
                })
        let closePopup = document.querySelector('.close-popup')  
            closePopup.addEventListener('click', ()=>{
                popup.classList.remove('active');
            })  
            })
    }

// SHOW SCROLL UP 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
        }
    window.addEventListener('scroll', scrollUp)
                

//praytime API

let cards = document.querySelector('.cards');
getPrayTimes();
function getPrayTimes(){
        fetch("https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8")
        .then(response => response.json())
        .then( data=>{
        let times = data.data.timings;
        cards.innerHTML ="";
        for(let time in times){
            cards.innerHTML+=
            `
                <div class="card">
                    <div class="circle">
                        <svg>
                            <circle cx="100" cy="100" r="100"></circle>
                        </svg>
                        <div class="praytime">${times[time]}</div>
                    </div> 
                    <p>${time}</p>
                    </div>
                </div>
            `
        }
        })
}









