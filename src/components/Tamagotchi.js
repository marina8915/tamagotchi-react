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
            ignoreSleep: 0,
            displayCreate: 'inline-block',
            displayDragon: 'none',
            displayButtonAwake: 'none',
            value: ''
        }

        this.renderHeader = this.renderHeader.bind(this)
        this.createDragon = this.createDragon.bind(this)
        this.life = this.life.bind(this)
        this.eventEat = this.eventEat.bind(this)
        this.eventDrink = this.eventDrink.bind(this)
        this.eventSleep = this.eventSleep.bind(this)
        this.eventAwake = this.eventAwake.bind(this)
        this.eventPlay = this.eventPlay.bind(this)
        this.getName = this.getName.bind(this)
        this.src = require('../images/born.gif')
    }

    getName(event) {
        this.setState({value: event.target.value});
    }
    createDragon(event) {
        var value = this.state.value
        var empty = -value
        if ((value) && (empty !== -0)) {
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst,
                    die: this.state.die
                }]),
                appetite: 80,
                health: 100,
                humor: 100,
                thirst: 90,
                displayCreate: 'none',
                displayDragon: 'inline-block'
            })
            event.preventDefault()
            this.say = 'Hello, my name is '
                + value
            this.src = require('../images/1.gif')
        }
    }

    getRandomInt() {
        return Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    }

    life() {
        var text = ''
        var globalIgnore = this.state.ignoreEat + this.state.ignoreDrink + this.state.ignorePlay + this.state.ignoreSleep
        if (this.state.appetite === 0 &&
            this.state.health === 0 &&
            this.state.humor === 0 &&
            this.state.thirst === 0) {
            text = 'Hello, create a new dragon!\n Please enter a name.'
        } else {
            if (this.state.humor <= 0 || this.state.appetite <= 0 || this.state.thirst <= 0) {
                this.state.health -= 50
                this.state.humor -= 50
            }
            if (this.state.humor < 100 ||
                this.state.health < 100) {
                text = 'I want to sleep\n'
                this.state.ignoreSleep++
            }
            if (this.state.ignoreSleep > 5) {
                this.state.health -= this.getRandomInt()
                this.state.humor -= this.getRandomInt()
            }
            if (this.state.appetite < 100) {
                text += 'Please, give me the feed\n'
                this.state.ignoreEat++
            }
            if (this.state.ignoreEat > 5) {
                this.state.health -= this.getRandomInt()
                this.state.humor -= this.getRandomInt()
                this.state.appetite -= this.getRandomInt()
            }
            if (this.state.thirst < 100) {
                text += 'Please, give me the water\n'
                this.state.ignoreDrink++
            }
            if (this.state.ignoreDrink > 5) {
                this.state.health -= this.getRandomInt()
                this.state.humor -= this.getRandomInt()
                this.state.thirst -= this.getRandomInt()
            }
            if (this.state.humor < 100) {
                text += 'I want to play'
                this.state.ignorePlay++
            }
            if (this.state.ignorePlay > 5) {
                this.state.health -= this.getRandomInt()
                this.state.humor -= this.getRandomInt()
            }
            if (this.state.appetite <= 0) {
                this.state.ignoreEat++
                this.state.appetite = 0
                text = 'I really want to eat!\n'
            }
            if (this.state.humor <= 0) {
                this.state.humor = 0
                this.state.ignorePlay++
            }
            if (this.state.humor >= 100) {
                this.state.humor = 100
            }
            if (this.state.thirst <= 0) {
                this.state.thirst = 0
                text = 'I really want to drink!'
                this.state.ignoreDrink++
            }
            if (this.state.health <= 0) {
                this.state.health = 0
                this.state.ignoreSleep++
            }
            if (this.state.health >= 100) {
                this.state.health = 100
            }
            if (this.state.appetite >= 100) {
                this.state.appetite = 100
            }
            if (this.state.thirst >= 100) {
                this.state.thirst = 100
            }
            if (this.state.displayButtonAwake !== 'none') {
                text = ''
            }
        }
        //die
        if (this.state.humor <= 0 && this.state.health <= 0 && globalIgnore > 0) {
            window.location.reload()
        }
        return text
    }

    eventEat() {
        if (this.state.appetite >= 100) {
            this.say = 'Thank you, I don`t want to eat'
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst
                }]),
            })
        } else {
            this.say = 'Yummy'
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst
                }]),
                ignoreEat: 0
            })
            this.state.appetite += this.getRandomInt()
            this.state.health += this.getRandomInt()
            this.state.humor += this.getRandomInt()
            this.state.thirst -= this.getRandomInt()
            this.src = require('../images/eat.gif')
        }
        this.life()
    }

    eventDrink() {
        if (this.state.thirst >= 100) {
            this.say = 'Thank you, I don`t want to drink'
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst
                }]),
            })
        } else {
            this.say = 'Thank you'
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst
                }]),
                ignoreDrink: 0
            })
            this.state.appetite += this.getRandomInt()
            this.state.health += this.getRandomInt()
            this.state.humor += this.getRandomInt()
            this.state.thirst += this.getRandomInt()
            this.src = require('../images/drink.gif')
        }
        this.life()
    }

    eventSleep() {
        this.say = 'Zzz...'
        this.setState({
            parameters: this.state.parameters.concat([{
                appetite: this.state.appetite,
                health: this.state.health,
                humor: this.state.humor,
                thirst: this.state.thirst
            }]),
            ignoreSleep: 0,
            displayDragon: 'none',
            displayButtonAwake: 'inline-block'
        })
        this.state.appetite -= this.getRandomInt()
        this.state.health += this.getRandomInt()
        this.state.humor += this.getRandomInt()
        this.state.thirst += this.getRandomInt()
        this.src = require('../images/sleep.gif')
        this.life()
    }

    eventAwake() {
        this.say = 'Good morning!'
        this.setState({
            parameters: this.state.parameters.concat([{
                appetite: this.state.appetite,
                health: this.state.health,
                humor: this.state.humor,
                thirst: this.state.thirst
            }]),
            displayDragon: 'inline-block',
            displayButtonAwake: 'none'
        })
        this.src = require('../images/1.gif')
        this.life()
    }

    eventPlay() {
        this.say = 'I like to play!'
        this.setState({
            parameters: this.state.parameters.concat([{
                appetite: this.state.appetite,
                health: this.state.health,
                humor: this.state.humor,
                thirst: this.state.thirst
            }]),
            ignorePlay: 0
        })
        this.state.appetite -= this.getRandomInt()
        this.state.health -= this.getRandomInt()
        this.state.humor += this.getRandomInt()
        this.state.thirst += this.getRandomInt()
        this.src = require('../images/play.gif')
        this.life()
    }

    renderHeader() {
        return (
            <ul>
                <li>
                    <p>Appetite: {this.state.appetite}</p>
                    <p className="line" style={{width: this.state.appetite + 'px'}}>
                        {this.state.appetite}
                    </p>
                </li>
                <li>
                    <p>Health: {this.state.health}</p>
                    <p className="line" style={{width: this.state.health + 'px'}}>
                        {this.state.health}
                    </p>
                </li>
                <li>
                    <p>Humor: {this.state.humor}</p>
                    <p className="line" style={{width: this.state.humor + 'px'}}>
                        {this.state.humor}
                    </p>
                </li>
                <li>
                    <p>Thirst: {this.state.thirst}</p>
                    <p className="line" style={{width: this.state.thirst + 'px'}}>
                        {this.state.thirst}
                    </p>
                </li>
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
                        value={this.state.value}
                        style={{display: this.state.displayCreate}}
                        onChange={this.getName}
                    />
                    <button
                        type="submit"
                        id="create"
                        onClick={this.createDragon}
                        style={{display: this.state.displayCreate}}>Create
                    </button>
                    <button
                        type="button"
                        id="eat"
                        onClick={this.eventEat}
                        style={{display: this.state.displayDragon}}>Eat
                    </button>
                    <button
                        type="button"
                        id="drink"
                        onClick={this.eventDrink}
                        style={{display: this.state.displayDragon}}>Drink
                    </button>
                    <button
                        type="button"
                        id="play"
                        onClick={this.eventPlay}
                        style={{display: this.state.displayDragon}}>Play
                    </button>
                    <button
                        type="button"
                        id="sleep"
                        onClick={this.eventSleep}
                        style={{display: this.state.displayDragon}}>Sleep
                    </button>
                    <button
                        type="button"
                        id="awake"
                        onClick={this.eventAwake}
                        style={{display: this.state.displayButtonAwake}}>Awake
                    </button>
                </form>
                {this.renderHeader()}
                <div id="speak">
                    <div id="say">{this.say}</div>
                    <div id="want">{this.life()}</div>
                </div>
                <div id="gif"><img src={this.src} alt="dragon"/></div>
            </div>
        )
    }
}