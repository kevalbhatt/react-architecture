import Enum from 'utils/Enum';

const NoDataFoundDynamicHelper = (props) => {
  return (
    <div className="row">
      <div className="col-xs-6 col-sm-4 col-sm-offset-4 col-xs-offset-4 col-xs-offset-3">
            <div className="center-block m-b-md m-t-sm no-data-found"><i className={Enum.Groups[props.keyName].icon}></i></div>
            <h1 className="text-center"><strong>No {Enum.Groups[props.keyName].label}(s) Found</strong></h1>
      </div>
    </div>)
}

export default NoDataFoundDynamicHelper;
