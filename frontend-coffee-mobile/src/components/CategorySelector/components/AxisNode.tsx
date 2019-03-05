import React, { FunctionComponent } from "react"
import { SystemFlex } from "../../../system-components/SystemFlex"
import { TouchableOpacity } from "react-native"
import { View } from "react-native"
import {
  MEDIUM_GREY,
  theme,
  BLACK
} from "../../../system-components/system-theme/theme"
import { SystemText } from "../../../system-components"
import { YtickAnimated, YtickContainer } from "./YtickAnimated"
import { SelectionGlowAnimated } from "./SelectionGlowAnimated"
import { IconTick } from "../../../assets/IconTick/IconTick"
import { IconCross } from "../../../assets/IconCross/IconCross"

interface ITickProps {
  handleFactorChange: (shade: string) => void
  factorLevel: string
  prevFactorLevel?: string
  label: string
}

const GreaterTick: FunctionComponent<ITickProps> = ({
  handleFactorChange,
  factorLevel,
  prevFactorLevel,
  label
}) => (
  <TouchableOpacity onPress={() => handleFactorChange(label)}>
    <SystemFlex noFlex align="center">
      <SelectionGlowAnimated
        label={label}
        factorLevel={factorLevel}
        prevFactorLevel={prevFactorLevel}
      >
        <SystemFlex justify="center" align="center">
          {label === factorLevel ? <IconTick /> : <IconCross />}
        </SystemFlex>
      </SelectionGlowAnimated>
      <YtickAnimated
        label={label}
        factorLevel={factorLevel}
        prevFactorLevel={prevFactorLevel}
      />
    </SystemFlex>
  </TouchableOpacity>
)

const Xaxis = ({ left, right }: any) => (
  <SystemFlex row noFlex>
    <View
      style={{
        flexGrow: 1,
        height: 2,
        backgroundColor: left ? undefined : theme.colors[MEDIUM_GREY]
      }}
    />
    <View
      style={{
        width: 2,
        height: 2,
        backgroundColor: theme.colors[MEDIUM_GREY]
      }}
    />
    <View
      style={{
        flexGrow: 1,
        height: 2,
        backgroundColor: right ? undefined : theme.colors[MEDIUM_GREY]
      }}
    />
  </SystemFlex>
)

const LowerTick: FunctionComponent<ITickProps> = ({
  label,
  handleFactorChange,
  factorLevel
}) => (
  <TouchableOpacity onPress={() => handleFactorChange(label)}>
    <SystemFlex noFlex align="center">
      <YtickContainer />
      <SystemText color={factorLevel === label ? BLACK : MEDIUM_GREY}>
        {label}
      </SystemText>
    </SystemFlex>
  </TouchableOpacity>
)

interface IAxisNode {
  left?: boolean
  right?: boolean
  label: string
  handleFactorChange: (shade: string) => void
  factorLevel: string
  prevFactorLevel: string
}

export const AxisNode: FunctionComponent<IAxisNode> = ({
  left,
  right,
  label,
  handleFactorChange,
  factorLevel,
  prevFactorLevel
}) => {
  return (
    <SystemFlex noFlex align="center">
      <GreaterTick
        handleFactorChange={handleFactorChange}
        factorLevel={factorLevel}
        prevFactorLevel={prevFactorLevel}
        label={label}
      />
      <Xaxis left={left} right={right} />
      <LowerTick
        handleFactorChange={handleFactorChange}
        factorLevel={factorLevel}
        label={label}
      />
    </SystemFlex>
  )
}