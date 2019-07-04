'use strict';
import React, {Component} from 'react';
import SortingHelper from 'utils/component/SortingHelper';
import Select from 'react-select';
import {FormControl, FormGroup, InputGroup, Button} from 'react-bootstrap';

class SearchFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputText: this.props.searchString
        ? searchString
        : ""
    }
  }

  handleInputChange = (e) => {
    this.props.updateSearchString
      ? this.props.updateSearchString(e.target.value)
      : this.setState({inputText: e.target.value})
  }
  render() {
    const {
      placeholder,
      onChange,
      options,
      loading,
      searchEnabled,
      searchClassName,
      triggerPropFunction,
      defaultSearchClassName
    } = this.props;
    return (<div className={searchClassName
        ? searchClassName
        : defaultSearchClassName} style={{
        "position" : "relative",
        "zIndex" : "0"
      }}>
      {
        searchEnabled
          ? <FormGroup>
              <InputGroup>
                <FormControl type="text" placeholder={placeholder} onKeyPress={(event) => {
                    event.key === "Enter"
                      ? triggerPropFunction(onChange, [
                        {
                          value: this.state.inputText
                        }
                      ])
                      : null
                  }} onChange={this.handleInputChange.bind(this)}/>
                <InputGroup.Button>
                  <Button bsStyle="primary" onClick={() => {
                      triggerPropFunction(onChange, [
                        {
                          value: this.state.inputText
                        }
                      ])
                    }}>
                    <i className="nicon-search"></i>
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          : null
      }
    </div>)
  }
}
const SortFilter = (props) => {
  const {
    loading,
    sortFunction,
    sortButtonList,
    sortingEnabled,
    sortingClassName,
    triggerPropFunction
  } = props;
  return (<div className={sortingClassName
      ? sortingClassName
      : "col-md-8 clearfix"}>
    {
      sortingEnabled
        ? <SortingHelper componentName="div" componentProps={{
              className: "row"
            }} btnClassName="col-xs-3" {...props} loading={loading} onButtonClick={(...args) => triggerPropFunction(sortFunction, args)} buttonList={sortButtonList}/>
        : null
    }
    <div className="visible-sm visible-xs m-b-md"></div>
  </div>)
}

export default function(props) {
  const {options, loading, onlySearch} = props;
  const styleObj = {
    opacity: (
      loading
      ? 0.7
      : 1)
  };

  const triggerPropFunction = (callback, options) => {
    if (!loading) {
      callback(...options)
    }
  }

  return (
    onlySearch
    ? <SearchFilter {...props} defaultSearchClassName="col-md-3" triggerPropFunction={triggerPropFunction}/>
    : <div className="ibox-content" style={{
        "paddingBottom" : 0
      }}>
      <div className="row" style={styleObj}>
        <SearchFilter {...props} defaultSearchClassName="col-md-4" triggerPropFunction={triggerPropFunction}/>
        <SortFilter {...props} triggerPropFunction={triggerPropFunction}/>
      </div>
    </div>)
}
