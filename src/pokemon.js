import { Button } from 'bootstrap';
import React, { Component } from 'react';
import './pokemon.css'

class PokemonList extends React.Component {
    constructor(props) {
        super(props);
        this.nextButtonOnClick = this.nextButtonOnClick.bind(this);
        this.previousButtonOnClick = this.previousButtonOnClick.bind(this);
        this.pokemonOnClick = this.pokemonOnClick.bind(this);
        this.closeDetail = this.closeDetail.bind(this);
        this.state = {
            previous: null,
            next: null,
            loadData: false,
            data: null
        };
    }

    componentDidMount() {
        this.getPokemonsData('https://pokeapi.co/api/v2/pokemon/');
    }

    getPokemonsData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    ...this.state,
                    data: data.results,
                    next: data.next,
                    previous: data.previous,
                    loadData: true,
                    selectedRow: null,
                    selectedRowData: null
                });
            })
    }

    pokemonOnClick(url, name) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(this.state))
                this.setState({
                    ...this.state,
                    selectedRow: name,
                    selectedRowData: data

                });
            })
    }

    renderData() {
        var altClass = "row alter-row";

        console.log(JSON.stringify(this.state))
        const rows = this.state.data.map(pokemon => {
            altClass = altClass == "row" ? "row alter-row" : "row";
            if (this.state.selectedRow == pokemon.name) {
                altClass = altClass + " selected-row";
            }

            altClass= altClass ;
            return (<div key={pokemon.url} className={altClass}>
                <div className="col-3"><a class="link" href="#" onClick={() => this.pokemonOnClick(pokemon.url, pokemon.name)}>{pokemon.name}</a></div>
                <div className="col-8"><a class="link" href="#" onClick={() => this.pokemonOnClick(pokemon.url, pokemon.name)}>{pokemon.url}</a></div>
            </div>
            )
        }
        );
        if (this.state.selectedRow == null) {
            return (
                <div className="container">
                    {rows}
                </div>
            )
        }
        else {
            return (<div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="container">
                            {rows}
                        </div>
                    </div>
                    <div className="col-6">
                        {this.renderDetail()}
                    </div>
                </div>
            </div>)
        }
    }

    renderDetail() {
        const abilities = this.state.selectedRowData.abilities.map(item => {
            return (<div className="row">
                <div className="col-2">Slot</div>
                <div className="col-4">{item.slot}</div>
                <div className="col-2">Name</div>
                <div className="col-4">{item.ability.name}</div>
            </div>)
        });
        const types = this.state.selectedRowData.types.map(item => {
            return (<div className="row">
                <div className="col-2">Slot</div>
                <div className="col-4">{item.slot}</div>
                <div className="col-2">Name</div>
                <div className="col-4">{item.type.name}</div>
            </div>)
        });

        const stats = this.state.selectedRowData.stats.map(item => {
            return (<div className="row">
                <div className="col-2">base</div>
                <div className="col-4">{item.base_stat}</div>
                <div className="col-2">Name</div>
                <div className="col-4">{item.stat.name}</div>
            </div>)
        });
        const moves = this.state.selectedRowData.moves.map(item => {
            return (<div className="row">
                <div className="col-2">Name</div>
                <div className="col-8">{item.move.name}</div>
            </div>)
        });

        return (
            <div className="card">
                <div className="card-header">
                    <div className="float-left"><h5>{this.state.selectedRow}<span className="inline-block ml-1"></span></h5></div>
                    <div className="float-right"><button onClick={this.closeDetail}>Close</button></div>
                </div>
                <div className="card-body">
                    <div className="container mb-2">
                        <div className="row">
                            <div className="col-2">Order</div>
                            <div className="col-2">{this.state.selectedRowData.order}</div>
                        </div>
                    </div>
                    <div className="accordion" id="accordionExample">
                        <div className="card">
                            <div class="card-header" id="headingOne">
                                <h6 class="mb-0">
                                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseAb" aria-expanded="true" aria-controls="collapseOne">
                                        Abilities</button>
                                </h6>
                            </div>

                            <div id="collapseAb" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">{abilities}</div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h6 className="mb-0">
                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseType" aria-expanded="true" aria-controls="collapseOne">
                                        Types</button>
                                </h6>
                            </div>

                            <div id="collapseType" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">{types}</div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h6 className="mb-0">
                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseStat" aria-expanded="true" aria-controls="collapseOne">
                                        Stats</button>
                                </h6>
                            </div>

                            <div id="collapseStat" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">{stats}</div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h6 className="mb-0">
                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseMove" aria-expanded="true" aria-controls="collapseOne">
                                        Moves</button>
                                </h6>
                            </div>

                            <div id="collapseMove" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">{moves}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    closeDetail() {
        this.setState({
            ...this.state,
            selectedRow: null,
            selectedRowData: null
        })
    }

    nextButtonOnClick() {
        this.getPokemonsData(this.state.next);
    }
    previousButtonOnClick(){
        this.getPokemonsData(this.state.previous);
    }
    render() {
        return (
            <div className="container pt-3">
                <div className="card">
                    <div className="card-header">
                        <h3 className="header">Pokemons</h3>
                    </div>
                </div>
                {!this.state.loadData ?
                    <div>Loading...</div> :
                    <div className="mt-4 mb-4">{this.renderData()}</div>}

                <footer>
                    {this.state.next ? <button type="button" className="btn btn-primary nextButton" onClick={this.nextButtonOnClick}>Next</button> : <button type="button" className="btn btn-default" disabled>Next</button>}
                    {this.state.previous ? <button type="button" className="btn btn-primary" onClick={this.previousButtonOnClick}>Previous</button> : <button type="button" className="btn btn-default" disabled>Previous</button>}
                </footer>
            </div>
        )
    }
}

export default PokemonList;