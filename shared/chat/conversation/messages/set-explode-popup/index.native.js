// @flow
import * as React from 'react'
import {messageExplodeDescriptions} from '../../../../constants/chat2'
import {type MessageExplodeDescription} from '../../../../constants/types/chat2'
import {Box, Icon, Text, FloatingPicker} from '../../../../common-adapters/index.native'
import {globalColors, globalMargins, globalStyles} from '../../../../styles'
import type {Props} from '.'

const sortedDescriptions = messageExplodeDescriptions.sort((a, b) => (a.seconds < b.seconds ? 1 : 0))

const Announcement = () => (
  <Box style={announcementContainerStyle}>
    <Box style={{marginTop: -10, marginBottom: -10}}>
      <Icon type="iconfont-boom" color={globalColors.white} fontSize={48} />
    </Box>
    <Text
      type="BodySemibold"
      backgroundMode="Announcements"
      style={{
        paddingLeft: globalMargins.medium,
        paddingRight: globalMargins.medium,
        flexGrow: 1,
        fontSize: 15,
        textAlign: 'center',
      }}
    >
      Set a timeout on your messages and watch them E X P L O D E
    </Text>
  </Box>
)

const announcementContainerStyle = {
  ...globalStyles.flexBoxColumn,
  alignItems: 'center',
  backgroundColor: globalColors.blue,
  padding: globalMargins.small,
  paddingBottom: globalMargins.tiny,
}

type State = {selected: MessageExplodeDescription}
class SetExplodePopup extends React.Component<Props, State> {
  state = {selected: {text: 'Never', seconds: 0}}

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {selected: nextProps.selected || {text: 'Never', seconds: 0}}
  }

  setSelected = (value: number | string) => {
    const selected = sortedDescriptions.find(item => item.seconds === value) || {text: 'Never', seconds: 0}
    this.setState({selected})
  }

  onDone = () => {
    this.props.onSelect(this.state.selected)
    this.props.onHidden()
  }

  render() {
    const items = sortedDescriptions.map(item => ({label: item.text, value: item.seconds}))
    return (
      <FloatingPicker
        header={this.props.isNew ? <Announcement /> : null}
        items={items}
        onSelect={this.setSelected}
        onHidden={this.props.onHidden}
        onCancel={this.props.onHidden}
        onDone={this.onDone}
        visible={this.props.visible}
        selectedValue={this.state.selected.seconds}
      />
    )
  }
}

export default SetExplodePopup
