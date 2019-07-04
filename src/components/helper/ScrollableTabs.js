import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './scrollableTabs.css';

export default class ScrollTabs extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired
    }

    listSizeObj = [];
    scrollableTabList = null;
    intervalID = null;

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            panRightDisabled:true,
            panLeftDisabled:false
        }
        // binds
        this.onTabClick = this.onTabClick.bind(this);
        this.panSliderLeft = this.panSliderLeft.bind(this);
        this.panSliderRight = this.panSliderRight.bind(this);
        this.getTabSize = this.getTabSize.bind(this);
        this.checkScroll = this.checkScroll.bind(this);
    }
    componentDidMount() {
        this.scrollableTabList = document.querySelector(`#${this.props.id} .scrollable-tab-list`);

        this.scrollableTabList.addEventListener( "scroll", ()=>{this.checkScroll();} );
    }

    getTabSize(width, id) {
        this.listSizeObj.push({ "id": id, "width": width });
    }

    onTabClick(id, value) {
        if(this.props.disabled)return;
        this.setState({
            activeTab:id
        }, () => {
            this.checkTabInView();
        })
        this.props.onChange ? this.props.onChange(id, value) : null;
    }

    checkTabInView() {
        const { activeTab } = this.state,
            list = this.scrollableTabList;
        
        let widthTilActive = 0,
            widthBeforeActive = 0,
            currentTabPos;
            
        currentTabPos = this.listSizeObj.find( ls => {
            widthTilActive += ls.width + 4;
            if(ls.id !== activeTab){
                widthBeforeActive += ls.width + 4;
            }
            return ls.id === activeTab;
        })

        if( (list.scrollLeft + list.clientWidth) <= widthTilActive ){
            list.scrollLeft += ( widthTilActive - (list.scrollLeft + list.clientWidth) )
        }

        if((list.scrollLeft > widthBeforeActive && list.scrollLeft < widthTilActive)) {
            list.scrollLeft -= list.scrollLeft - widthBeforeActive;
        }
        
    }

    panSliderLeft() {
        if(this.state.panLeftDisabled) return;
        clearInterval(this.intervalID);
        let list = this.scrollableTabList,
            listWidth = list.clientWidth - 20,
            panWidth = 0,
            counter = 0;

        this.scrollAnim(listWidth, 10, false);
    }
    
    scrollAnim(pos, step, decrement) {
        var elem = document.querySelector(`#${this.props.id} .scrollable-tab-list`);
        var counter = Math.round(pos/step);
        this.intervalID = setInterval(frame, 5);
        const self = this;
        function frame() {
            if (counter==0) {
                clearInterval(self.intervalID);
                self.checkScroll();
            }else {   
                counter--;
                let sl = elem.scrollLeft;
                sl = decrement ? sl-step : sl+step;
                elem.scrollLeft = sl;
            }
        }
    }

    checkScroll() {
        let list = this.scrollableTabList,
        updateObj = {
            panRightDisabled:false,
            panLeftDisabled:false
        };
        
        if( ( list.clientWidth + list.scrollLeft) >= list.scrollWidth ){
            updateObj.panLeftDisabled = true;
        } else if ( list.scrollLeft === 0 ){
            updateObj.panRightDisabled = true;
        }

        if( list.offsetWidth >= list.scrollWidth ){
            updateObj.panLeftDisabled = true;
            updateObj.panRightDisabled = true;
        }
        
        this.setState( {...updateObj} );
    }

    panSliderRight() {
        if(this.state.panRightDisabled) return;
        clearInterval(this.intervalID);
        let list = this.scrollableTabList,
            listWidth = list.clientWidth - 20,
            panWidth = 0,
            counter = 0;
        
        while (listWidth > panWidth) {
            panWidth += this.listSizeObj[counter].width
            counter++;
        }
        this.scrollAnim(panWidth, 10, true);
    }

    render() {
        const {
            id,
            children,
            tabList
        } = this.props;
        let { activeTab,panRightDisabled, panLeftDisabled } = this.state;

        return (
            <div id={id} className="scrollable-tabs-container">
                <div className={`scrollable-tabs-scroller btn btn-rounded left ${panRightDisabled?'disabled':''}`} onClick={this.panSliderRight}><i className="nicon-arrow-left3"></i></div>
                <ol className="scrollable-tab-list">
                    {
                        tabList.map((child, id) => {
                            // let { label,value, id } = child.props;
                            return (
                                <Tab
                                    activeTab={activeTab}
                                    onClick={this.onTabClick}
                                    label={child[this.props.labelKey]}
                                    value={child}
                                    getSize={this.getTabSize}
                                    id={id}
                                    key={id}
                                />
                            )
                        })
                    }
                </ol>
                <div className={`scrollable-tabs-scroller btn btn-rounded right ${panLeftDisabled?'disabled':''}`} onClick={this.panSliderLeft}><i className="nicon-arrow-right3"></i></div>
                <div className="scrollable-tab-content">
                {
                    children
                }
                </div>
            </div>
        )
    }
}

class Tab extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick(this.props.id, this.props.value)
    }

    componentDidMount() {
        let width = this.container.offsetWidth,
            id = this.props.id;
        this.props.getSize(width, id);
    }

    render() {
        const {
            label,
            activeTab,
            id
        } = this.props;

        let className = "scrollable-tab";

        if (id === activeTab) {
            className += " isActive";
        }

        return (
            <li className={className} key={id} onClick={this.onClick} ref={el => (this.container = el)} >
                {label}
            </li>
        )
    }

}