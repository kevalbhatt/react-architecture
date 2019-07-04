import ImageHelper from 'utils/component/ImageHelper';

const NoRecordFoundHelper = (props) => {
  return <div className="row">
    <div className="col-xs-6 col-sm-4 col-sm-offset-4 col-xs-offset-4 col-xs-offset-3">
        <ImageHelper alt="image" showPreview={false} className="img-responsive center-block m-b-md proficiency-noshow" src={'img/norecordsfound.png'}/>
    </div>
  </div>
}

export default NoRecordFoundHelper;
