import {NoRecordFoundHelper} from 'utils/ComponentHelper';

const NoStudentFound = (props) => {

  return (<div>
    <div className=" text-center">
      <h2 style={{
          color: "red"
        }}>
        <i className="nicon-sad m-r-sm"></i>
        No Students</h2>
      <div style={{
          color: "#008080"
        }} className="teal m-t-md">
        <h4>You dont have any students associated</h4>
      </div>
    </div>
    <NoRecordFoundHelper/>
  </div>)
}

export default NoStudentFound;
