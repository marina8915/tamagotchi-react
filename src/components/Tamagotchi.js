import React, {Component} from 'react';

export default class Tamagotchi extends Component {

    constructor(props) {
        super(props)

        this.state = {
            parameters: [],
            appetite: 0,
            health: 0,
            humor: 0,
            thirst: 0,
            ignoreEat: 0,
            ignoreDrink: 0,
            ignorePlay: 0,
            ignoreSleep: 0
        }

        this.renderHeader = this.renderHeader.bind(this)
        this.createDragon = this.createDragon.bind(this)
        this.life = this.life.bind(this)
        this.eventEat = this.eventEat.bind(this)
        this.eventDrink = this.eventDrink.bind(this)
        this.eventSleep = this.eventSleep.bind(this)
        this.eventAwake = this.eventAwake.bind(this)
        this.eventPlay = this.eventPlay.bind(this)
    }

    createDragon(event) {
        event.preventDefault()
        this.setState({
            parameters: this.state.parameters.concat([{
                appetite: this.state.appetite,
                health: this.state.health,
                humor: this.state.humor,
                thirst: this.state.thirst
            }]),
            appetite: 80,
            health: 100,
            humor: 100,
            thirst: 90
        })
        document.getElementById('name').style.display = 'none'
        document.getElementById('create').style.display = 'none'
        document.getElementById('eat').style.display = 'inline-block'
        document.getElementById('drink').style.display = 'inline-block'
        document.getElementById('sleep').style.display = 'inline-block'
        document.getElementById('play').style.display = 'inline-block'
        document.getElementById('say').innerHTML = 'Hello, my name is '
            + document.getElementById('name').value
    }

    life() {
        var text = ''
        if (this.state.humor <= 0 || this.state.appetite <= 0 || this.state.thirst <= 0) {
            this.state.health -= 50
            this.state.humor -= 50
        }
        if (this.state.humor < 100 ||
            this.state.health < 100) {
            text = 'I want to sleep\n'
            this.state.ignoreSleep++
        }
        if (this.state.ignoreSleep > 3) {
            this.state.health -= 20
            this.state.humor -= 20
        }
        if (this.state.appetite < 100) {
            text += 'Please, give me the feed\n'
            this.state.ignoreEat++
        }
        if (this.state.ignoreEat > 3) {
            this.state.health -= 20
            this.state.humor -= 20
            this.state.appetite -= 10
        }
        if (this.state.thirst < 100) {
            text += 'Please, give me the water\n'
            this.state.ignoreDrink++
        }
        if (this.state.ignoreDrink > 5) {
            this.state.health -= 20
            this.state.humor -= 20
            this.state.thirst -= 10
        }
        if (this.state.humor < 100) {
            text += 'I want to play'
            this.state.ignorePlay++
        }
        if (this.state.ignorePlay > 5) {
            this.state.health -= 10
            this.state.humor -= 20
        }
        if(this.state.humor <= 0 && this.state.health <= 0){
            text = 'Create new pet!'
        }
        return text
    }

    eventEat(event) {
        event.preventDefault()
        if (this.state.appetite >= 150) {
            document.getElementById('say').innerHTML = 'Thank you, I don`t want to eat'
        } else {
            document.getElementById('say').innerHTML = 'Yummy'
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst
                }]),
                appetite: this.state.appetite + 20,
                health: this.state.health + 10,
                humor: this.state.humor + 10,
                thirst: this.state.thirst - 10,
                ignoreEat: 0
            })
        }
    }

    eventDrink(event) {
        event.preventDefault()
        if (this.state.thirst >= 150) {
            document.getElementById('say').innerHTML = 'Thank you, I don`t want to drink'
        } else {
            document.getElementById('say').innerHTML = 'Thank you'
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst
                }]),
                appetite: this.state.appetite + 10,
                health: this.state.health + 10,
                humor: this.state.humor + 10,
                thirst: this.state.thirst + 20,
                ignoreDrink: 0
            })
        }
    }
    eventSleep(event) {
        event.preventDefault()
            document.getElementById('say').innerHTML = 'Zzz...'
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst
                }]),
                appetite: this.state.appetite - 20,
                health: this.state.health + 10,
                humor: this.state.humor + 10,
                thirst: this.state.thirst - 10,
                ignoreSleep: 0
            })
        document.getElementById('eat').disabled = 'true'
        document.getElementById('drink').disabled = 'true'
        document.getElementById('sleep').style.display = 'none'
        document.getElementById('play').disabled = 'true'
        document.getElementById('awake').style.display = 'inline-block'
        document.getElementById('want').innerHTML = ''
    }

    eventAwake(event) {
        event.preventDefault()
        document.getElementById('say').innerHTML = 'Good morning!'
        this.setState({
            parameters: this.state.parameters.concat([{
                appetite: this.state.appetite,
                health: this.state.health,
                humor: this.state.humor,
                thirst: this.state.thirst
            }]),
            appetite: this.state.appetite - 20,
            health: this.state.health + 10,
            humor: this.state.humor + 10,
            thirst: this.state.thirst - 10,
        })
        document.getElementById('eat').removeAttribute('disabled')
        document.getElementById('drink').removeAttribute('disabled')
        document.getElementById('sleep').style.display = 'inline-block'
        document.getElementById('play').removeAttribute('disabled')
        document.getElementById('awake').style.display = 'none'
    }

    eventPlay(event) {
        event.preventDefault()
        document.getElementById('say').innerHTML = 'I like fly!'
        this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst
                }]),
                appetite: this.state.appetite - 20,
                health: this.state.health + 10,
                humor: this.state.humor + 10,
                thirst: this.state.thirst - 10,
                ignorePlay: 0
        })
    }

    renderHeader() {
        return (
            <ul>
                <li>Appetite: {this.state.appetite};</li>
                <li>Health: {this.state.health};</li>
                <li>Humor: {this.state.humor};</li>
                <li>Thirst: {this.state.thirst};</li>
            </ul>
        )
    }

    render() {
        return (
            <div>
                <h2>Tamagotchi</h2>
                <form>
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                    />
                    <button
                        type="button"
                        id="create"
                        onClick={this.createDragon}>Create
                    </button>
                    <button
                        type="button"
                        id="eat"
                        onClick={this.eventEat}
                        style={{display: "none"}}>Eat
                    </button>
                    <button
                        type="button"
                        id="drink"
                        onClick={this.eventDrink}
                        style={{display: "none"}}>Drink
                    </button>
                    <button
                        type="button"
                        id="play"
                        onClick={this.eventPlay}
                        style={{display: "none"}}>Play
                    </button>
                    <button
                        type="button"
                        id="sleep"
                        onClick={this.eventSleep}
                        style={{display: "none"}}>Sleep
                    </button>
                    <button
                        type="button"
                        id="awake"
                        onClick={this.eventAwake}
                        style={{display: "none"}}>Awake
                    </button>
                </form>
                {this.renderHeader()}
                <div id="say"></div>
                <div id="want">{this.life()}</div>
            </div>
        )
    }
}