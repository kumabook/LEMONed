import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import ReactS3Uploader from 'react-s3-uploader';

const fieldType = (info) => {
  if (info.type === 'integer' || info.type === 'float') {
    return 'number';
  }
  if (info.type === 'string') {
    if (info.format === 'data-url') {
      return 'data-url';
    } else if (info.format === 'date') {
      return 'date';
    } else if (info.format === 'date-time') {
      return 'date-time';
    }
  }
  return info.type;
};

class Form extends React.Component {
  static get propTypes() {
    return {
      schema:            PropTypes.object.isRequired,
      item:              PropTypes.object.isRequired,
      onSubmit:          PropTypes.func.isRequired,
      submitButtonLabel: PropTypes.string.isRequired,
    };
  }
  constructor(props) {
    super(props);
    this.state = { item: props.item };
  }
  handleValueChange(name, value) {
    const item = Object.assign({}, this.state.item, { [name]: value });
    this.setState({ item });
  }
  render() {
    const { schema } = this.props;
    const properties = Object.entries(schema.properties)
                             .filter(([name]) => !schema.primaryKeys.includes(name));
    const fields = properties.map(([name, info]) => {
      switch (fieldType(info)) {
        case 'number':
          return (
            <div key={name}>
              <TextField
                type="number"
                hintText={name}
                floatingLabelText={name}
                floatingLabelFixed
                onChange={(event, value) => this.handleValueChange(name, value)}
                value={this.state.item[name] || 0}
              />
            </div>
          );
        case 'string':
          return (
            <div key={name}>
              <TextField
                hintText={name}
                floatingLabelText={name}
                floatingLabelFixed
                onChange={(event, value) => this.handleValueChange(name, value)}
                value={this.state.item[name] || ''}
              />
            </div>
          );
        case 'data-url':
          return (
            <div key={name}>
              <TextField
                hintText={name}
                floatingLabelText={name}
                floatingLabelFixed
                value={this.state.item[name] || ''}
              />
              <ReactS3Uploader
                signingUrl="/s3/sign"
                signingUrlMethod="GET"
                accept="*"
                signingUrlWithCredentials
                uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
                contentDisposition="auto"
                scrubFilename={filename => filename.replace(/[^\w\d_\-.]+/ig, '')}
              />
            </div>
          );
        case 'date':
          return (
            <DatePicker
              floatingLabelText={name}
              floatingLabelFixed
              autoOk
              value={this.state.item[name]}
            />
          );
        case 'date-time':
          return (
            <div key={name}>
              <DatePicker
                floatingLabelText={`${name}:date`}
                floatingLabelFixed
                autoOk
              />
              <TimePicker
                floatingLabelText={`${name}:time`}
                floatingLabelFixed
                autoOk
              />
            </div>
          );
        default:
          return <div key={name}>unknown type</div>;
      }
    });
    return (
      <div style={{ margin: '40px' }}>
        {fields}
        <br />
        <RaisedButton
          label={this.props.submitButtonLabel}
          primary
          onTouchTap={() => this.props.onSubmit(this.state.item)}
        />
      </div>
    );
  }
}

export default Form;
