import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "rc-slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import "rc-slider/assets/index.css";

const Handle = Slider.Handle;

class StepSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  onSliderChange = value => {
    this.setState({
      value
    });
  };

  handle = props => {
    const { ...restProps } = props;
    return (
      <Tooltip title={this.state.value} placement="top">
        <Handle value={this.state.value} {...restProps} />
      </Tooltip>
    );
  };

  render() {
    const { classes, label, step, min, max } = this.props;
    const { value } = this.state;

    return (
      <div>
        <div className={classes.slider}>
          <Typography className={classes.label}>{label}</Typography>
          <Slider
            step={step}
            min={min}
            max={max}
            onChange={this.onSliderChange}
            handle={this.handle}
          />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  slider: {
    // margin: "0px 0px 50px 70px"
  },
  label: {
    fontWeight: "bold",
    marginBottom: "10px"
  }
});

export default withStyles(styles)(StepSlider);