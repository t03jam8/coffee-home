import React, { FunctionComponent } from "react"
import {
  SystemFlex,
  SystemSpace,
  SystemText
} from "../../../../system-components"
import styled from "../../../../system-components/system-theme/styled-components"
import { View } from "react-native"
import {
  REGULAR,
  SMALL
} from "../../../../system-components/system-theme/theme"
import { BoundsBar } from "../../../../components/BoundsBar"
import { MapFixed } from "./components/MapFixed"
import { SelectLocationTextComponent } from "./components/SelectedLocationTextComponent"
import { selectRegular, selectSmall } from "../../../../utils/selectors"

const SelectedLocationContainer = styled(View)<any>`
  height: 132;
`

interface ICoordinates {
  latitude: number
  longitude: number
}

export const SelectedLocation: FunctionComponent<{ point: ICoordinates }> = ({
  point
}) => {
  return (
    <SystemFlex row noFlex>
      <SystemSpace size={selectRegular} />
      <SystemFlex>
        <BoundsBar space={REGULAR} />
        <SystemFlex row>
          <SystemSpace size={selectRegular} />
          <SystemFlex>
            <SystemText>SelectedLocation</SystemText>
            <SystemSpace size={selectSmall} />
            <SelectLocationTextComponent
              field="Latitude:"
              value={`${Math.round(point.latitude * 1000) / 1000}°`}
            />
            <SelectLocationTextComponent
              field="Longitude:"
              value={`${Math.round(point.longitude * 1000) / 1000}°`}
            />
          </SystemFlex>
          {/* <MapFixed point={point} /> */}
          <SystemSpace size={selectRegular} />
        </SystemFlex>
        <BoundsBar space={REGULAR} />
        <SystemSpace size={selectRegular} />
      </SystemFlex>
    </SystemFlex>
  )
}
