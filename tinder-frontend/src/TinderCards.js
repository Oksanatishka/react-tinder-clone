import React, {useEffect, useState} from 'react';
import './TinderCards.css'
import TinderCard from 'react-tinder-card'
import axios from './axios'

const TinderCards = () => {
    // store people in state 
    // Pull it from the backend => create a node.js app, express server which wil connect to mongodb, grab all data that is currently hardcoded and you can see it on your screen, putting that data into a mongodb database, pull it back

    // const [people, setPeople] = useState([
    //     {
    //         name: 'Elon Musk',
    //         imgUrl:'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f47d4de7637290765bce495%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1398%26cropX2%3D3908%26cropY1%3D594%26cropY2%3D3102',
    //     },
    //     {
    //         name: 'Jeff Bezos',
    //         imgUrl:'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg',
    //     }
    // ])

    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get('/tinder/cards')
            setPeople(req.data)
        }
        fetchData();
    }, [])

    console.log(people)
    
    const swiped = (direction, nameToDelete) => {
        console.log('removing: '+ nameToDelete)
        // setLastDirection(direction);
    }
    const outOfFrame = (name) => {
        console.log(name  + ' left the screen!')
    }

    return (
        <div className='tinderCards'>
            <div className='tinderCards__cardContainer'>
                {/* <h2>TinderCards</h2> */}
                {people.map((person) =>{
                    // return <h1>{person.name}</h1>
                    return (
                    <TinderCard className='swipe' key={person.name} preventSwipe={['up', 'down']} onSwipe={(dir)=> swiped(dir, person.name)} onCardLeftScreen={()=> outOfFrame(person.name)}>
                        {/* <div style={{backgroundImage: 'url('+person.imgUrl +')'}} className='card'> */}
                        <div style={{backgroundImage: `url(${person.imgUrl})`}} className='card'>
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                    )
                })}
            </div>
        </div>
    );
};

export default TinderCards;