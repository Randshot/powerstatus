const { React, getModuleByDisplayName } = require('powercord/webpack');
const { TextInput, SliderInput, SwitchItem } = require('powercord/components/settings');
const { Card, AsyncComponent } = require('powercord/components');
const FormText = AsyncComponent.from(getModuleByDisplayName('FormText'));
const TextArea = require('./TextArea.jsx');

module.exports = class Settings extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div>
              <SwitchItem
                value={this.props.getSetting('enable', true)}
                onChange={() => this.props.toggleSetting('enable', true)}
                  note='Turn off if you want to disable the status changer (reload after enabling)'
              >
                Enabled
              </SwitchItem>
                            <SwitchItem
                value={this.props.getSetting('randomStatus', true)}
                onChange={() => this.props.toggleSetting('randomStatus', true)}
                  note='Enable to use random statuses, instead of going down the list'
              >
                Random Status
              </SwitchItem>
              <TextInput
                onChange={val => this.props.updateSetting('delay', Math.round(parseFloat(val)*10)/10)}
                defaultValue={this.props.getSetting('delay')}
                note={"Delay in seconds between custom status changes"}
                style={{}}
              >
                Update Delay (Input)
              </TextInput>
              <SliderInput
                minValue={ 1 }
                maxValue={ 600 }
                markers={[ 10, 60, 120, 300, 600 ]}
                initialValue={this.props.getSetting('delay')}
                onValueChange={val => this.props.updateSetting('delay', Math.round(parseFloat(val)))}
                note="Delay in seconds between custom status changes"
                onValueRender={ v => <span>{Math.round(v)} s</span> }
              >
                Update Delay (Slider)
              </SliderInput>
              <TextArea
                value={this.props.getSetting('statusPrefixes')}
                onChange={val => this.props.updateSetting('statusPrefixes', val.toString())}
                rows={8}
              >
                Status Prefixes (Newline Separated)
              </TextArea>
              <TextArea
                value={this.props.getSetting('statuses')}
                onChange={val => this.props.updateSetting('statuses', val.toString())}
                rows={8}
              >
                Statuses (Newline Separated)
              </TextArea>
              <TextArea
                value={this.props.getSetting('statusSuffixes')}
                onChange={val => this.props.updateSetting('statusSuffixes', val.toString())}
                rows={8}
              >
                Status Suffixes (Newline Separated)
              </TextArea>
              <Card style={{"padding":"18px"}}>
                <FormText>
                  Feel free to check out some of my other plugins on <a href="https://github.com/power-plugs?tab=repositories" target="_BLANK">GitHub</a>!
                </FormText>
              </Card>
            </div>
        );
    }
};