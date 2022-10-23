import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class Autocomplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: []
    };

    constructor(props) {
        super(props);

        this.state = {
            currentValue: props.currentValue,
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: props.currentTask.driver.name
        };
    }

    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        }
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <DropMenu>
                        {filteredSuggestions.map((suggestion) => {

                            return (
                                <DropItem key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </DropItem>
                            );
                        })}
                    </DropMenu>
                );
            } else {
                suggestionsListComponent = (
                    <DropMenu>
                        <DropItem>Ничего не найдено</DropItem>
                    </DropMenu>
                );
            }
        }

        return (
            <Fragment>
                <Input
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    // placeholder={}
                />
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

export default Autocomplete;

const Input = styled.input`
  width: 500px;
  padding: 10px 15px;
  border-radius: 5px;
  outline: none;
  border: none;
  :focus {
    border-radius: 5px 5px 0 0;
  }
`


const DropMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: white;
  border-radius: 0 0 15px 15px;
  width: 400px;
`
const DropItem = styled.div`
  color: black;
  padding: 5px 15px;
  width: 400px;
  display: flex;
  justify-content: space-between;
  :hover {
    background: #eeeeee;
  }
`