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
            ignorePlay: 0
        }

        this.renderHeader = this.renderHeader.bind(this)
        this.createDragon = this.createDragon.bind(this)
        this.life = this.life.bind(this)
        this.addEat = this.addEat.bind(this)
        this.addDrink = this.addDrink.bind(this)
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
        document.getElementById('eat').style.display = 'block'
        document.getElementById('drink').style.display = 'block'
        document.getElementById('say').innerHTML = 'Hello, my name is '
            + document.getElementById('name').value
        {this.life()}
    }

    life() {
        document.getElementById('want').innerHTML = ''
        if (this.state.humor <= 0 || this.state.appetite <= 0 || this.state.thirst <= 0) {
            this.state.health -= 50
            this.state.humor -= 50
        }
        if (this.state.humor <= 100 ||
            this.state.appetite <= 100 ||
            this.state.thirst <= 100||
            this.state.health <= 100) {
            document.getElementById('want').innerHTML = 'I want to sleep'
        }
        if (this.state.appetite < 100) {
            document.getElementById('want').innerHTML += '<br/>Please, give me the feed'
            this.state.ignoreEat++
        }
        if (this.state.ignoreEat > 3) {
            this.state.health -= 20
            this.state.humor -= 20
            this.state.appetite -= 10
        }
        if (this.state.thirst < 100) {
            document.getElementById('want').innerHTML += '<br/>Please, give me the water'
            this.state.ignoreDrink++
        }
        if (this.state.ignoreDrink > 5) {
            this.state.health -= 20
            this.state.humor -= 20
            this.state.thirst -= 10
        }
        if (this.state.humor < 100) {
            document.getElementById('want').innerHTML += '<br/>I want to play'
            this.state.ignorePlay++
        }
    }

    addEat(event) {
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
        {this.life()}
    }

    addDrink(event) {
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
        {this.life()}
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
                        onClick={this.addEat}
                        style={{display: "none"}}>Eat
                    </button>
                    <button
                        type="button"
                        id="drink"
                        onClick={this.addDrink}
                        style={{display: "none"}}>Drink
                    </button>
                </form>
                <div id="say"></div>
                <div id="want"></div>
                {this.renderHeader()}
            </div>
        )
    }
}