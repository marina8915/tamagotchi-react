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
            isDisplayCreate: true,
            isDisplayDragon: false,
            isDisplayButtonAwake: false,
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
        this.life()
    }

    getName(event) {
        this.setState({value: event.target.value});
    }

    createDragon(event) {
        event.preventDefault()
        var name = this.state.value
        if (name.replace(/ /g, '')) {
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst,
                    die: this.state.die
                }]),
                isDisplayCreate: false,
                isDisplayDragon: true
            })
            this.state.appetite = 80
            this.state.health = 100
            this.state.humor = 100
            this.state.thirst = 90
            this.say = 'Hello, my name is '
                + name
            this.src = require('../images/1.gif')
        }
        this.life()
    }

    life() {
        this.text = ''
        var sumIgnore = this.state.ignoreEat + this.state.ignoreDrink + this.state.ignorePlay + this.state.ignoreSleep
        if (this.state.value.replace(/ /g, '')) {
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst,
                    ignoreEat: this.state.ignoreEat,
                    ignoreDrink: this.state.ignoreDrink,
                    ignorePlay: this.state.ignorePlay,
                    ignoreSleep: this.state.ignoreSleep,
                    isDisplayCreate: this.state.isDisplayCreate,
                    isDisplayDragon: this.state.isDisplayDragon,
                    isDisplayButtonAwake: this.state.isDisplayButtonAwake
                }]),
            })
            if (this.state.humor <= 0 || this.state.appetite <= 0 || this.state.thirst <= 0) {
                this.state.health -= 50
                this.state.humor -= 50
            }
            if (this.state.humor < 100 ||
                this.state.health < 100) {
                this.text = 'I want to sleep\n'
                this.state.ignoreSleep++
            }
            if (this.state.ignoreSleep > 30) {
                this.state.health -= getRandomInt()
                this.state.humor -= getRandomInt()
            }
            if (this.state.appetite < 100) {
                this.text += 'Please, give me the feed\n'
                this.state.ignoreEat++
            }
            if (this.state.ignoreEat > 30) {
                this.state.health -= getRandomInt()
                this.state.humor -= getRandomInt()
                this.state.appetite -= getRandomInt()
            }
            if (this.state.thirst < 100) {
                this.text += 'Please, give me the water\n'
                this.state.ignoreDrink++
            }
            if (this.state.ignoreDrink > 30) {
                this.state.health -= getRandomInt()
                this.state.humor -= getRandomInt()
                this.state.thirst -= getRandomInt()
            }
            if (this.state.humor < 100) {
                this.text += 'I want to play\n'
                this.state.ignorePlay++
            }
            if (this.state.ignorePlay > 30) {
                this.state.health -= getRandomInt()
                this.state.humor -= getRandomInt()
            }
            if (this.state.appetite < 0) {
                this.state.ignoreEat++
                this.state.appetite = 0
                this.text += 'I really want to eat!\n'
            }
            if (this.state.humor < 0) {
                this.state.humor = 0
                this.state.ignorePlay++
            }
            if (this.state.humor > 100) {
                this.state.humor = 100
            }
            if (this.state.thirst < 0) {
                this.state.thirst = 0
                this.text += 'I really want to drink!'
                this.state.ignoreDrink++
            }
            if (this.state.health < 0) {
                this.state.health = 0
                this.state.ignoreSleep++
            }
            if (this.state.health > 100) {
                this.state.health = 100
            }
            if (this.state.appetite > 100) {
                this.state.appetite = 100
            }
            if (this.state.thirst > 100) {
                this.state.thirst = 100
            }
            //die
            if ((this.state.humor <= 0
                    || this.state.health <= 0
                    || this.state.appetite <= 0
                    || this.state.thirst <= 0)
                && sumIgnore > 0) {
                this.say = 'I am die'
                this.text = ''
                this.src = require('../images/die.gif')
                setTimeout(function () {
                    window.location.reload()
                }, 5000)
            }
        } else {
            this.text = 'Hello, create a new dragon!\n Please enter a name.'
        }
    }

    eventEat() {
        if (this.state.appetite >= 100) {
            this.say = 'I don`t want to eat'
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
            this.state.appetite += getRandomInt()
            this.state.health += getRandomInt()
            this.state.humor += getRandomInt()
            this.state.thirst -= getRandomInt()
            this.src = require('../images/eat.gif')
        }
        this.life()
    }

    eventDrink() {
        if (this.state.thirst >= 100) {
            this.say = 'I don`t want to drink'
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
            this.state.appetite += getRandomInt()
            this.state.health += getRandomInt()
            this.state.humor += getRandomInt()
            this.state.thirst += getRandomInt()
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
                thirst: this.state.thirst,
                isDisplayButtonAwake: this.state.isDisplayButtonAwake
            }]),
            ignoreSleep: 0,
            isDisplayDragon: false,
            isDisplayButtonAwake: true
        })
        this.src = require('../images/sleep.gif')
        this.text = ''
    }

    eventAwake() {
        this.say = 'Good morning!'
        this.setState({
            parameters: this.state.parameters.concat([{
                appetite: this.state.appetite,
                health: this.state.health,
                humor: this.state.humor,
                thirst: this.state.thirst,
                isDisplayButtonAwake: this.state.isDisplayButtonAwake
            }]),
            isDisplayDragon: true,
            isDisplayButtonAwake: false
        })
        this.state.appetite -= getRandomInt()
        this.state.health += getRandomInt()
        this.state.humor += getRandomInt()
        this.src = require('../images/1.gif')
        this.life()
    }

    eventPlay() {
        if (this.state.health <= 0 || this.state.appetite <= 0 || this.state.thirst <= 0) {
            this.say = 'I don`t want play!'
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst
                }]),
            })
        } else {
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
            this.state.appetite -= getRandomInt()
            this.state.health -= getRandomInt()
            this.state.humor += getRandomInt()
            this.src = require('../images/play.gif')

        }
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
        //style display
        if (this.state.isDisplayCreate) {
            this.displayCreate = 'inline-block'
        } else {
            this.displayCreate = 'none'
        }
        if (this.state.isDisplayDragon) {
            this.displayDragon = 'inline-block'
        } else {
            this.displayDragon = 'none'
        }
        if (this.state.isDisplayButtonAwake) {
            this.displayButtonAwake = 'inline-block'
        } else {
            this.displayButtonAwake = 'none'
        }
        return (
            <div>
                <h2>Tamagotchi</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Name"
                        value={this.state.value}
                        style={{display: this.displayCreate}}
                        onChange={this.getName}
                    />
                    <button
                        type="submit"
                        id="create"
                        onClick={this.createDragon}
                        style={{display: this.displayCreate}}>Create
                    </button>
                    <button
                        type="button"
                        id="eat"
                        onClick={this.eventEat}
                        style={{display: this.displayDragon}}>Eat
                    </button>
                    <button
                        type="button"
                        id="drink"
                        onClick={this.eventDrink}
                        style={{display: this.displayDragon}}>Drink
                    </button>
                    <button
                        type="button"
                        id="play"
                        onClick={this.eventPlay}
                        style={{display: this.displayDragon}}>Play
                    </button>
                    <button
                        type="button"
                        id="sleep"
                        onClick={this.eventSleep}
                        style={{display: this.displayDragon}}>Sleep
                    </button>
                    <button
                        type="button"
                        id="awake"
                        onClick={this.eventAwake}
                        style={{display: this.displayButtonAwake}}>Awake
                    </button>
                </form>
                {this.renderHeader()}
                <div id="speak">
                    <div id="say">{this.say}</div>
                    <div id="want">{this.text}</div>
                </div>
                <div id="gif"><img src={this.src} alt="dragon"/></div>
            </div>
        )
    }
}

function getRandomInt() {
    return Math.floor(Math.random() * (20 - 10 + 1)) + 10;
}
